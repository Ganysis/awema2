/**
 * Styles pour l'éditeur de pages amélioré
 */

export function generateEnhancedPageEditorStyles(): string {
  return `
/* Page Editor Enhanced Styles */
.page-editor-enhanced {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
}

/* Header */
.editor-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #111827;
}

.page-url {
  font-size: 0.875rem;
  color: #6b7280;
  font-family: monospace;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.save-status {
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

.save-status.pending {
  color: #f59e0b;
}

.save-status.saving {
  color: #3b82f6;
}

.save-status.success {
  color: #10b981;
}

.save-status.error {
  color: #ef4444;
}

.btn-save {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.btn-save:hover {
  background: #2563eb;
}

/* Layout */
.editor-layout {
  flex: 1;
  display: grid;
  grid-template-columns: 320px 1fr 380px;
  gap: 1px;
  background: #e5e7eb;
  overflow: hidden;
}

/* Sidebars */
.sidebar-left,
.sidebar-right {
  background: white;
  overflow-y: auto;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.btn-add-block {
  padding: 0.375rem 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.2s;
}

.btn-add-block:hover {
  background: #2563eb;
}

/* Blocks List */
.blocks-list {
  padding: 1rem;
}

.block-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
  transition: all 0.2s;
}

.block-item:hover {
  border-color: #d1d5db;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.block-item.selected {
  border-color: #3b82f6;
  background: #eff6ff;
}

.block-content {
  padding: 0.75rem;
  display: flex;
  gap: 0.75rem;
  cursor: pointer;
}

.block-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.block-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.block-info p {
  margin: 0;
  font-size: 0.75rem;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.block-actions {
  display: flex;
  border-top: 1px solid #e5e7eb;
  background: white;
}

.block-actions button {
  flex: 1;
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-right: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.block-actions button:last-child {
  border-right: none;
}

.block-actions button:hover:not(:disabled) {
  background: #f3f4f6;
  color: #111827;
}

.block-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-delete:hover {
  color: #ef4444;
}

/* Preview Area */
.preview-area {
  background: #f3f4f6;
  display: flex;
  flex-direction: column;
}

.preview-toolbar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 0.25rem;
}

.preview-mode {
  padding: 0.5rem 0.75rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.preview-mode:hover {
  background: #f3f4f6;
  color: #111827;
}

.preview-mode.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.preview-container {
  flex: 1;
  padding: 1rem;
  display: flex;
  justify-content: center;
  overflow: auto;
  transition: max-width 0.3s;
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Properties */
.properties-container {
  padding: 1rem;
}

.property-group {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.property-group:last-child {
  border-bottom: none;
}

.property-group-title {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.property-field {
  margin-bottom: 1rem;
}

.property-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.property-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.property-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.property-textarea {
  min-height: 80px;
  resize: vertical;
}

.property-select {
  cursor: pointer;
  background: white;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.btn-gallery-manager {
  width: 100%;
  padding: 0.75rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.btn-gallery-manager:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.field-info {
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
}

/* Gallery Manager Modal */
.gallery-manager-modal .modal-content {
  max-width: 900px;
  height: 80vh;
}

.gallery-tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.gallery-tabs .tab-btn {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.gallery-tabs .tab-btn:hover {
  color: #111827;
}

.gallery-tabs .tab-btn.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.tab-content {
  min-height: 400px;
}

/* Current Images */
.current-images {
  margin-bottom: 1.5rem;
}

.gallery-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.gallery-image-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  background: white;
}

.image-preview {
  position: relative;
  aspect-ratio: 1;
  background: #f3f4f6;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-actions {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.gallery-image-item:hover .image-actions {
  opacity: 1;
}

.btn-edit-image,
.btn-remove-image {
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: white;
  border: none;
  border-radius: 0.375rem;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-edit-image:hover {
  background: #3b82f6;
  color: white;
}

.btn-remove-image:hover {
  background: #ef4444;
  color: white;
}

.image-info {
  padding: 0.5rem;
}

.image-title {
  width: 100%;
  padding: 0.375rem 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}

.btn-add-from-library {
  width: 100%;
  padding: 0.75rem;
  background: #f3f4f6;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.btn-add-from-library:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
  color: #374151;
}

/* Media Library Grid */
.media-selection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
}

.media-select-item {
  position: relative;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.media-select-item:hover {
  border-color: #9ca3af;
}

.media-select-item.selected {
  border-color: #3b82f6;
}

.media-select-item img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.media-select-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: 0.625rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.media-select-checkbox {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: white;
  border-radius: 0.25rem;
  padding: 0.125rem;
}

/* Add Block Modal */
.add-block-modal .modal-content {
  max-width: 800px;
}

.block-categories {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.category-btn:hover {
  background: #e5e7eb;
}

.category-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.block-templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.block-template {
  padding: 1.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.block-template:hover {
  background: white;
  border-color: #3b82f6;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.template-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.block-template h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}

.block-template p {
  margin: 0;
  font-size: 0.75rem;
  color: #6b7280;
}

/* Empty states */
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
  font-size: 0.875rem;
}

.empty-state a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.empty-state a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 1200px) {
  .editor-layout {
    grid-template-columns: 280px 1fr 320px;
  }
}

@media (max-width: 1024px) {
  .editor-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
  
  .sidebar-left,
  .sidebar-right {
    max-height: 300px;
  }
  
  .preview-area {
    min-height: 500px;
  }
}

@media (max-width: 768px) {
  .editor-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: space-between;
  }
  
  .gallery-images-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
  
  .media-selection-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
  
  .block-templates-grid {
    grid-template-columns: 1fr;
  }
}`;
}