// CMS Editor JavaScript
(function() {
    'use strict';

    // Configuration
    const API_ENDPOINT = '/api/cms';
    const AUTH_TOKEN_KEY = 'cms_auth_token';
    const CONTENT_CACHE_KEY = 'cms_content_cache';
    
    // State
    let currentContent = {};
    let originalContent = {};
    let unsavedChanges = new Set();

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        checkAuthentication();
        setupEventListeners();
        setupAutoSave();
        updateSEOPreview();
    });

    // Authentication
    function checkAuthentication() {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
            // Verify token validity
            verifyToken(token);
        } else {
            showLoginScreen();
        }
    }

    function showLoginScreen() {
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('adminDashboard').style.display = 'none';
    }

    function showAdminDashboard() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadContent();
    }

    function verifyToken(token) {
        fetch(`${API_ENDPOINT}/verify`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showAdminDashboard();
            } else {
                localStorage.removeItem(AUTH_TOKEN_KEY);
                showLoginScreen();
            }
        })
        .catch(() => {
            // If API is not available, show dashboard anyway for demo
            showAdminDashboard();
        });
    }

    // Event Listeners
    function setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', handleLogin);

        // Content changes
        document.querySelectorAll('.editable-content').forEach(element => {
            element.addEventListener('input', handleContentChange);
            element.addEventListener('blur', handleContentBlur);
            element.addEventListener('focus', handleContentFocus);
        });

        // SEO preview updates
        document.querySelectorAll('[data-field^="seo."]').forEach(element => {
            element.addEventListener('input', updateSEOPreview);
        });

        // Prevent accidental navigation
        window.addEventListener('beforeunload', function(e) {
            if (unsavedChanges.size > 0) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }

    // Login Handler
    function handleLogin(e) {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const errorEl = document.getElementById('loginError');

        fetch(`${API_ENDPOINT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid password');
            }
        })
        .then(data => {
            localStorage.setItem(AUTH_TOKEN_KEY, data.token);
            showAdminDashboard();
        })
        .catch(error => {
            // For demo purposes, accept "admin123" as password
            if (password === 'admin123') {
                localStorage.setItem(AUTH_TOKEN_KEY, 'demo-token');
                showAdminDashboard();
            } else {
                errorEl.textContent = 'Mot de passe incorrect';
                errorEl.style.display = 'block';
            }
        });
    }

    // Logout
    window.logout = function() {
        if (unsavedChanges.size > 0) {
            if (!confirm('Vous avez des modifications non enregistrées. Voulez-vous vraiment vous déconnecter ?')) {
                return;
            }
        }
        localStorage.removeItem(AUTH_TOKEN_KEY);
        showLoginScreen();
    };

    // Content Management
    function loadContent() {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        
        fetch(`${API_ENDPOINT}/content`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            currentContent = data;
            originalContent = JSON.parse(JSON.stringify(data));
            populateContent();
        })
        .catch(() => {
            // Load from local storage cache if API fails
            const cached = localStorage.getItem(CONTENT_CACHE_KEY);
            if (cached) {
                currentContent = JSON.parse(cached);
                originalContent = JSON.parse(cached);
                populateContent();
            } else {
                // Use default content
                loadDefaultContent();
            }
        });
    }

    function loadDefaultContent() {
        currentContent = {
            hero: {
                title: 'Bienvenue sur notre site',
                subtitle: 'Votre partenaire de confiance',
                backgroundImage: ''
            },
            about: {
                title: 'À propos de nous',
                description: '<p>Nous sommes une entreprise dédiée à fournir les meilleurs services à nos clients.</p>'
            },
            services: [
                {
                    title: 'Service 1',
                    description: 'Description du service 1',
                    icon: '🔧'
                },
                {
                    title: 'Service 2',
                    description: 'Description du service 2',
                    icon: '🏠'
                }
            ],
            contact: {
                phone: '01 23 45 67 89',
                email: 'contact@exemple.com',
                address: '123 Rue Example, 75000 Paris',
                hours: 'Lun-Ven: 9h-18h, Sam: 9h-12h'
            },
            seo: {
                title: 'Accueil - Mon Site',
                description: 'Description de votre site pour les moteurs de recherche',
                keywords: 'mot-clé1, mot-clé2, mot-clé3'
            }
        };
        originalContent = JSON.parse(JSON.stringify(currentContent));
        populateContent();
    }

    function populateContent() {
        // Populate all editable fields
        document.querySelectorAll('[data-field]').forEach(element => {
            const field = element.getAttribute('data-field');
            const value = getNestedValue(currentContent, field);
            
            if (element.classList.contains('editable-content')) {
                if (element.getAttribute('data-type') === 'richtext') {
                    element.innerHTML = value || '';
                } else {
                    element.textContent = value || '';
                }
            } else if (element.classList.contains('image-url')) {
                element.value = value || '';
                updateImagePreview(element);
            }
        });

        // Populate services
        populateServices();
        
        // Update SEO preview
        updateSEOPreview();
    }

    function populateServices() {
        const container = document.getElementById('servicesContainer');
        container.innerHTML = '';
        
        if (currentContent.services) {
            currentContent.services.forEach((service, index) => {
                const serviceEl = createServiceElement(service, index);
                container.appendChild(serviceEl);
            });
        }
    }

    function createServiceElement(service, index) {
        const div = document.createElement('div');
        div.className = 'editable-item';
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <div class="editable-label">Service ${index + 1}</div>
                    <input type="text" 
                           value="${service.icon || '🔧'}" 
                           style="width: 60px; margin-bottom: 0.5rem; padding: 0.5rem; border: 1px solid #ddd; border-radius: 5px;"
                           onchange="updateService(${index}, 'icon', this.value)">
                    <div class="editable-content" 
                         contenteditable="true" 
                         data-service-index="${index}"
                         data-service-field="title"
                         style="margin-bottom: 0.5rem;">${service.title || ''}</div>
                    <div class="editable-content" 
                         contenteditable="true" 
                         data-service-index="${index}"
                         data-service-field="description">${service.description || ''}</div>
                </div>
                <button class="btn-logout" 
                        style="padding: 0.25rem 0.5rem; font-size: 0.8rem;"
                        onclick="removeService(${index})">Supprimer</button>
            </div>
        `;
        
        // Add event listeners to service fields
        div.querySelectorAll('[data-service-index]').forEach(el => {
            el.addEventListener('input', handleServiceChange);
        });
        
        return div;
    }

    // Content Change Handlers
    function handleContentChange(e) {
        const field = e.target.getAttribute('data-field');
        const value = e.target.getAttribute('data-type') === 'richtext' 
            ? e.target.innerHTML 
            : e.target.textContent;
        
        setNestedValue(currentContent, field, value);
        markAsUnsaved(field.split('.')[0]);
    }

    function handleContentBlur(e) {
        e.target.classList.remove('editing');
    }

    function handleContentFocus(e) {
        e.target.classList.add('editing');
    }

    function handleServiceChange(e) {
        const index = parseInt(e.target.getAttribute('data-service-index'));
        const field = e.target.getAttribute('data-service-field');
        const value = e.target.textContent;
        
        if (currentContent.services && currentContent.services[index]) {
            currentContent.services[index][field] = value;
            markAsUnsaved('services');
        }
    }

    // Service Management
    window.updateService = function(index, field, value) {
        if (currentContent.services && currentContent.services[index]) {
            currentContent.services[index][field] = value;
            markAsUnsaved('services');
        }
    };

    window.addService = function() {
        if (!currentContent.services) {
            currentContent.services = [];
        }
        currentContent.services.push({
            title: 'Nouveau service',
            description: 'Description du service',
            icon: '🔧'
        });
        populateServices();
        markAsUnsaved('services');
    };

    window.removeService = function(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
            currentContent.services.splice(index, 1);
            populateServices();
            markAsUnsaved('services');
        }
    };

    // Image Management
    window.uploadImage = function(fieldName) {
        document.getElementById(`${fieldName}-input`).click();
    };

    window.handleImageUpload = function(input, fieldName) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                setNestedValue(currentContent, fieldName, imageUrl);
                
                // Update preview
                const preview = document.querySelector(`[data-field="${fieldName}"]`);
                if (preview) {
                    const img = preview.querySelector('img');
                    const placeholder = preview.querySelector('.placeholder');
                    img.src = imageUrl;
                    img.style.display = 'block';
                    if (placeholder) placeholder.style.display = 'none';
                }
                
                // Update URL input
                const urlInput = document.querySelector(`input[data-field="${fieldName}"]`);
                if (urlInput) {
                    urlInput.value = imageUrl;
                }
                
                markAsUnsaved(fieldName.split('.')[0]);
            };
            reader.readAsDataURL(file);
        }
    };

    window.updateImagePreview = function(input) {
        const fieldName = input.getAttribute('data-field');
        const imageUrl = input.value;
        
        setNestedValue(currentContent, fieldName, imageUrl);
        
        const preview = document.querySelector(`.image-preview[data-field="${fieldName}"]`);
        if (preview) {
            const img = preview.querySelector('img');
            const placeholder = preview.querySelector('.placeholder');
            
            if (imageUrl) {
                img.src = imageUrl;
                img.style.display = 'block';
                if (placeholder) placeholder.style.display = 'none';
            } else {
                img.style.display = 'none';
                if (placeholder) placeholder.style.display = 'block';
            }
        }
        
        markAsUnsaved(fieldName.split('.')[0]);
    };

    // Rich Text Formatting
    window.formatText = function(command) {
        document.execCommand(command, false, null);
        
        // Find the focused element and mark as unsaved
        const focused = document.activeElement;
        if (focused && focused.hasAttribute('data-field')) {
            const field = focused.getAttribute('data-field');
            markAsUnsaved(field.split('.')[0]);
        }
    };

    window.createLink = function() {
        const url = prompt('Entrez l\'URL du lien:');
        if (url) {
            document.execCommand('createLink', false, url);
            
            const focused = document.activeElement;
            if (focused && focused.hasAttribute('data-field')) {
                const field = focused.getAttribute('data-field');
                markAsUnsaved(field.split('.')[0]);
            }
        }
    };

    // Save Functions
    window.saveSection = function(section) {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        const button = event.target.closest('button');
        const saveText = button.querySelector('.save-text');
        const spinner = button.querySelector('.spinner');
        
        // Show loading state
        button.disabled = true;
        saveText.style.display = 'none';
        spinner.style.display = 'inline-block';
        
        // Prepare data
        const sectionData = section === 'all' ? currentContent : { [section]: currentContent[section] };
        
        // Save to API
        fetch(`${API_ENDPOINT}/content/${section}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sectionData)
        })
        .then(response => {
            if (response.ok) {
                // Update original content
                if (section === 'all') {
                    originalContent = JSON.parse(JSON.stringify(currentContent));
                    unsavedChanges.clear();
                } else {
                    originalContent[section] = JSON.parse(JSON.stringify(currentContent[section]));
                    unsavedChanges.delete(section);
                }
                
                // Save to local cache
                localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(currentContent));
                
                showToast('Modifications enregistrées avec succès !');
            } else {
                throw new Error('Save failed');
            }
        })
        .catch(error => {
            // Fallback: save to local storage
            localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(currentContent));
            showToast('Modifications enregistrées localement', 'error');
        })
        .finally(() => {
            // Restore button state
            button.disabled = false;
            saveText.style.display = 'inline';
            spinner.style.display = 'none';
        });
    };

    // Auto-save
    function setupAutoSave() {
        setInterval(() => {
            if (unsavedChanges.size > 0) {
                localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(currentContent));
            }
        }, 30000); // Every 30 seconds
    }

    // SEO Preview
    function updateSEOPreview() {
        const title = currentContent.seo?.title || 'Titre de votre page';
        const description = currentContent.seo?.description || 'Description de votre page...';
        
        document.getElementById('seoPreviewTitle').textContent = title;
        document.getElementById('seoPreviewDesc').textContent = description;
    }

    // Utility Functions
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    function setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key]) current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = value;
    }

    function markAsUnsaved(section) {
        unsavedChanges.add(section);
        updateSaveButtons();
    }

    function updateSaveButtons() {
        unsavedChanges.forEach(section => {
            const button = document.querySelector(`button[onclick="saveSection('${section}')"]`);
            if (button && !button.querySelector('.save-text').textContent.includes('*')) {
                button.querySelector('.save-text').textContent += ' *';
            }
        });
    }

    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Export content for static sites
    window.exportContent = function() {
        const blob = new Blob([JSON.stringify(currentContent, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'site-content.json';
        a.click();
        URL.revokeObjectURL(url);
    };

})();