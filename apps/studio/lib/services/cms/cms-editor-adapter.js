// Adaptateur CMS Editor pour Supabase
// Ce fichier fait le pont entre l'ancien cms-editor.js et le nouveau service Supabase

(function() {
    'use strict';

    // Configuration globale
    window.CMS_CONFIG = window.CMS_CONFIG || {
        siteId: new URLSearchParams(window.location.search).get('site_id') || 'default',
        supabaseUrl: window.SUPABASE_URL || '',
        supabaseKey: window.SUPABASE_ANON_KEY || '',
        mode: 'supabase' // 'supabase' ou 'hybrid' ou 'offline'
    };

    // Import dynamique du service Supabase
    let cmsCore = null;
    let isInitialized = false;

    // Initialisation asynchrone
    async function initializeCMS() {
        if (isInitialized) return cmsCore;

        try {
            // Charger le module CMS Core Supabase
            if (window.CMSCoreSupabase) {
                // Utiliser la version chargée
                const { createLegacyCompatibleCMS } = window.CMSCoreSupabase;
                cmsCore = createLegacyCompatibleCMS(
                    window.INITIAL_CMS_DATA || getDefaultData(),
                    '/api/cms'
                );
            } else {
                // Fallback sur l'ancien système
                console.warn('CMSCoreSupabase not found, using localStorage fallback');
                cmsCore = createLocalStorageFallback();
            }

            isInitialized = true;
            return cmsCore;
        } catch (error) {
            console.error('Failed to initialize CMS:', error);
            // Utiliser le fallback localStorage
            cmsCore = createLocalStorageFallback();
            isInitialized = true;
            return cmsCore;
        }
    }

    // Fallback localStorage pour compatibilité
    function createLocalStorageFallback() {
        const STORAGE_KEY = `cms_${window.CMS_CONFIG.siteId}_content`;
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(getDefaultData()));

        return {
            // Auth
            async login(email, password) {
                if (password === 'admin123') {
                    localStorage.setItem('cms_auth_token', 'demo-token');
                    return true;
                }
                return false;
            },

            logout() {
                localStorage.removeItem('cms_auth_token');
            },

            isAuthenticatedStatus() {
                return !!localStorage.getItem('cms_auth_token');
            },

            // Getters
            getPages() { return data.pages || []; },
            getPage(slug) { return data.pages?.find(p => p.slug === slug); },
            getBusinessInfo() { return data.businessInfo || {}; },
            getGlobalHeader() { return data.globalHeader; },
            getGlobalFooter() { return data.globalFooter; },
            getTheme() { return data.theme || { colors: {}, typography: {} }; },

            // Setters
            async updateBusinessInfo(info) {
                data.businessInfo = { ...data.businessInfo, ...info };
                this.saveData();
                return true;
            },

            async updatePageMeta(slug, meta) {
                const page = this.getPage(slug);
                if (page) {
                    page.meta = { ...page.meta, ...meta };
                    this.saveData();
                    return true;
                }
                return false;
            },

            async updateTheme(theme) {
                data.theme = { ...data.theme, ...theme };
                this.saveData();
                return true;
            },

            // Export
            exportData() {
                return JSON.parse(JSON.stringify(data));
            },

            // Helpers
            saveData() {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            },

            isOfflineMode() {
                return true;
            }
        };
    }

    // Données par défaut
    function getDefaultData() {
        return {
            pages: [{
                id: '1',
                name: 'Accueil',
                slug: 'home',
                blocks: [],
                meta: {
                    title: 'Accueil - Mon Site',
                    description: 'Bienvenue sur notre site'
                }
            }],
            businessInfo: {
                companyName: 'Mon Entreprise',
                phone: '01 23 45 67 89',
                email: 'contact@exemple.com',
                address: '123 Rue Example, 75000 Paris',
                openingHours: {
                    monday: '9h-18h',
                    tuesday: '9h-18h',
                    wednesday: '9h-18h',
                    thursday: '9h-18h',
                    friday: '9h-18h',
                    saturday: 'Fermé',
                    sunday: 'Fermé'
                }
            },
            theme: {
                colors: {
                    primary: '#1a73e8',
                    secondary: '#ea4335',
                    accent: '#fbbc04',
                    background: '#ffffff',
                    text: '#202124'
                },
                typography: {
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px'
                }
            }
        };
    }

    // Override des fonctions globales de cms-editor.js
    window.CMS_ADAPTER = {
        // Initialisation
        async init() {
            return await initializeCMS();
        },

        // Authentification
        async login(email, password) {
            const cms = await initializeCMS();
            return await cms.login(email, password);
        },

        async logout() {
            const cms = await initializeCMS();
            cms.logout();
        },

        async isAuthenticated() {
            const cms = await initializeCMS();
            return cms.isAuthenticatedStatus();
        },

        // Chargement du contenu
        async loadContent() {
            const cms = await initializeCMS();
            return {
                pages: cms.getPages(),
                businessInfo: cms.getBusinessInfo(),
                globalHeader: cms.getGlobalHeader(),
                globalFooter: cms.getGlobalFooter(),
                theme: cms.getTheme(),
                seo: cms.getPage('home')?.meta || {}
            };
        },

        // Sauvegarde du contenu
        async saveContent(section, data) {
            const cms = await initializeCMS();
            
            switch(section) {
                case 'businessInfo':
                    return await cms.updateBusinessInfo(data);
                case 'theme':
                    return await cms.updateTheme(data);
                case 'seo':
                    return await cms.updatePageMeta('home', data);
                case 'all':
                    // Sauvegarder toutes les sections
                    const promises = [];
                    if (data.businessInfo) promises.push(cms.updateBusinessInfo(data.businessInfo));
                    if (data.theme) promises.push(cms.updateTheme(data.theme));
                    if (data.seo) promises.push(cms.updatePageMeta('home', data.seo));
                    const results = await Promise.all(promises);
                    return results.every(r => r);
                default:
                    console.warn('Unknown section:', section);
                    return false;
            }
        },

        // Upload d'images
        async uploadImage(file) {
            const cms = await initializeCMS();
            
            if (cms.uploadMedia) {
                const result = await cms.uploadMedia(file);
                return result ? result.url : null;
            }

            // Fallback: conversion en base64
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        },

        // Export
        async exportContent() {
            const cms = await initializeCMS();
            return cms.exportData();
        },

        // Status
        async getStatus() {
            const cms = await initializeCMS();
            return {
                isOffline: cms.isOfflineMode ? cms.isOfflineMode() : true,
                isAuthenticated: cms.isAuthenticatedStatus(),
                siteId: window.CMS_CONFIG.siteId
            };
        }
    };

    // Intercepter les appels localStorage dans cms-editor.js
    if (window.CMS_CONFIG.mode !== 'offline') {
        const originalSetItem = localStorage.setItem;
        const originalGetItem = localStorage.getItem;
        const originalRemoveItem = localStorage.removeItem;

        // Override localStorage pour les clés CMS
        localStorage.setItem = function(key, value) {
            if (key.startsWith('cms_') && window.CMS_ADAPTER) {
                // Ignorer les écritures CMS, on utilise Supabase
                console.debug('Intercepted localStorage.setItem:', key);
                return;
            }
            return originalSetItem.call(this, key, value);
        };

        localStorage.getItem = function(key) {
            if (key === 'cms_auth_token' && window.CMS_ADAPTER) {
                // Utiliser le token de session Supabase
                return originalGetItem.call(this, 'cms_session_token');
            }
            return originalGetItem.call(this, key);
        };

        localStorage.removeItem = function(key) {
            if (key === 'cms_auth_token' && window.CMS_ADAPTER) {
                // Supprimer aussi le token Supabase
                originalRemoveItem.call(this, 'cms_session_token');
                originalRemoveItem.call(this, 'cms_site_id');
            }
            return originalRemoveItem.call(this, key);
        };
    }

    // Auto-initialisation au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeCMS().then(() => {
                console.log('CMS Adapter initialized');
            });
        });
    } else {
        initializeCMS().then(() => {
            console.log('CMS Adapter initialized');
        });
    }

})();