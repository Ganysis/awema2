/**
 * Styles pour CMS Standalone - Design moderne et professionnel
 */

export default function generateStandaloneCMSStyles(): string {
  return `
/* CMS Standalone - Modern Design System */

/* Variables CSS */
:root {
  /* Colors */
  --primary: #4F46E5;
  --primary-hover: #4338CA;
  --primary-light: #EEF2FF;
  --secondary: #06B6D4;
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
  
  /* Grays */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Transitions */
  --transition: all 0.2s ease;
  --transition-fast: all 0.15s ease;
  
  /* Border radius */
  --radius-sm: 0.375rem;
  --radius: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.5;
  color: var(--gray-900);
  background: var(--gray-50);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Login Page */
.cms-login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary) 0%, #7C3AED 100%);
  padding: var(--space-xl);
}

.cms-login-container {
  width: 100%;
  max-width: 400px;
  animation: fadeInUp 0.5s ease;
}

.cms-login-box {
  background: white;
  padding: var(--space-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  text-align: center;
}

.cms-logo {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--space-lg);
  color: var(--primary);
}

.cms-login-box h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: var(--space-xs);
}

.cms-login-box .subtitle {
  color: var(--gray-600);
  margin-bottom: var(--space-2xl);
}

.cms-login-form {
  text-align: left;
}

.form-group {
  margin-bottom: var(--space-lg);
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: var(--space-xs);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius);
  font-size: 1rem;
  transition: var(--transition);
  background: white;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.error-message {
  background: #FEE2E2;
  color: #DC2626;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius);
  font-size: 0.875rem;
  margin-bottom: var(--space-md);
}

/* Buttons */
.btn-primary,
.btn-secondary,
.btn-danger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  border: none;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--gray-100);
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--gray-200);
}

.btn-danger {
  background: var(--danger);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #DC2626;
}

.btn-block {
  width: 100%;
  justify-content: center;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
}

.btn-icon:hover {
  background: var(--gray-100);
  border-color: var(--gray-400);
}

.btn-icon svg {
  width: 16px;
  height: 16px;
  stroke: var(--gray-600);
}

/* Spinner */
.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Main App Layout */
.cms-app {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar */
.cms-sidebar {
  width: 280px;
  background: var(--gray-900);
  color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.cms-brand {
  padding: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 1.25rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cms-brand svg {
  width: 32px;
  height: 32px;
}

.cms-nav {
  flex: 1;
  padding: var(--space-md);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  color: var(--gray-300);
  text-decoration: none;
  border-radius: var(--radius);
  transition: var(--transition);
  margin-bottom: var(--space-xs);
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: var(--primary);
  color: white;
}

.nav-item .icon {
  width: 20px;
  height: 20px;
  stroke-width: 1.5;
}

.cms-sidebar-footer {
  padding: var(--space-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius);
  color: var(--gray-300);
  cursor: pointer;
  transition: var(--transition);
}

.btn-logout:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

/* Main Content */
.cms-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cms-header {
  background: white;
  padding: var(--space-lg) var(--space-xl);
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cms-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900);
}

.header-actions {
  display: flex;
  gap: var(--space-sm);
}

.cms-content {
  flex: 1;
  padding: var(--space-xl);
  overflow-y: auto;
  background: var(--gray-50);
}

/* Dashboard */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
}

.stat-card {
  background: white;
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  transition: var(--transition);
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.stat-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
}

.stat-icon svg {
  width: 32px;
  height: 32px;
  stroke-width: 1.5;
}

.stat-icon.pages {
  background: var(--primary-light);
  color: var(--primary);
}

.stat-icon.media {
  background: #DBEAFE;
  color: #3B82F6;
}

.stat-icon.visitors {
  background: #D1FAE5;
  color: #10B981;
}

.stat-icon.messages {
  background: #FEE2E2;
  color: #EF4444;
}

.stat-content h3 {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-900);
}

/* Recent Pages */
.dashboard-recent {
  background: white;
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-200);
}

.dashboard-recent h2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--space-lg);
}

.recent-pages {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.recent-page-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  background: var(--gray-50);
  border-radius: var(--radius);
  transition: var(--transition);
}

.recent-page-item:hover {
  background: var(--gray-100);
}

.page-info h4 {
  font-weight: 500;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.page-info p {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.btn-edit {
  padding: var(--space-xs) var(--space-md);
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
}

.btn-edit:hover {
  background: var(--primary-hover);
}

/* Pages Grid */
.pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
}

.page-card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
}

.page-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.page-header {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--gray-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900);
}

.page-actions {
  display: flex;
  gap: var(--space-xs);
}

.page-content {
  padding: var(--space-lg);
}

.page-content p {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: var(--space-xs);
}

/* Media Grid */
.media-filters {
  margin-bottom: var(--space-lg);
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius);
  font-size: 0.875rem;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-lg);
}

.media-item {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);
}

.media-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.media-preview {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--gray-100);
}

.media-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  opacity: 0;
  transition: var(--transition);
}

.media-item:hover .media-overlay {
  opacity: 1;
}

.media-overlay .btn-icon {
  background: white;
  border-color: white;
}

.media-overlay .btn-icon:hover {
  background: var(--gray-100);
}

.media-overlay .btn-icon svg {
  stroke: var(--gray-900);
}

.media-info {
  padding: var(--space-md);
}

.media-title {
  font-weight: 500;
  color: var(--gray-900);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.media-size {
  font-size: 0.75rem;
  color: var(--gray-500);
}

/* Settings */
.settings-container {
  max-width: 800px;
}

.settings-section {
  background: white;
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-200);
  margin-bottom: var(--space-xl);
}

.settings-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--space-lg);
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.maintenance-actions {
  display: flex;
  gap: var(--space-md);
}

/* Empty States */
.empty-state {
  text-align: center;
  padding: var(--space-2xl);
  color: var(--gray-500);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .cms-sidebar {
    position: fixed;
    left: -280px;
    height: 100%;
    z-index: 1000;
    transition: left 0.3s ease;
  }
  
  .cms-sidebar.open {
    left: 0;
  }
  
  .cms-main {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .pages-grid {
    grid-template-columns: 1fr;
  }
  
  .media-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .cms-header {
    padding: var(--space-md);
  }
  
  .cms-content {
    padding: var(--space-md);
  }
}`;
}