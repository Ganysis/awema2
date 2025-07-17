'use client';

import { useState, useRef, useEffect } from 'react';
import { BlockProp } from '@awema/shared';

interface VisualEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  config?: any;
}

export function VisualEditor({ value, onChange, placeholder, config }: VisualEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);

  // Formats disponibles
  const formats = [
    { value: 'p', label: 'Paragraphe', icon: '¶' },
    { value: 'h1', label: 'Titre 1', icon: 'H1' },
    { value: 'h2', label: 'Titre 2', icon: 'H2' },
    { value: 'h3', label: 'Titre 3', icon: 'H3' },
    { value: 'h4', label: 'Titre 4', icon: 'H4' },
    { value: 'blockquote', label: 'Citation', icon: '❝' },
    { value: 'pre', label: 'Code', icon: '</>' }
  ];

  // Fonction pour appliquer un format de bloc
  const applyBlockFormat = (format: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (selectedText) {
      // Créer le nouveau contenu avec le format
      let newContent = '';
      switch (format) {
        case 'h1':
          newContent = `<h1>${selectedText}</h1>`;
          break;
        case 'h2':
          newContent = `<h2>${selectedText}</h2>`;
          break;
        case 'h3':
          newContent = `<h3>${selectedText}</h3>`;
          break;
        case 'h4':
          newContent = `<h4>${selectedText}</h4>`;
          break;
        case 'blockquote':
          newContent = `<blockquote>${selectedText}</blockquote>`;
          break;
        case 'pre':
          newContent = `<pre><code>${selectedText}</code></pre>`;
          break;
        default:
          newContent = `<p>${selectedText}</p>`;
      }

      // Remplacer la sélection
      const currentHtml = editorRef.current?.innerHTML || '';
      const beforeSelection = currentHtml.substring(0, range.startOffset);
      const afterSelection = currentHtml.substring(range.endOffset);
      
      onChange(beforeSelection + newContent + afterSelection);
    }
    
    setShowFormatMenu(false);
  };

  // Fonction pour appliquer un format inline
  const applyInlineFormat = (command: string, value?: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (selectedText) {
      let formattedText = '';
      
      switch (command) {
        case 'bold':
          formattedText = `<strong>${selectedText}</strong>`;
          break;
        case 'italic':
          formattedText = `<em>${selectedText}</em>`;
          break;
        case 'underline':
          formattedText = `<u>${selectedText}</u>`;
          break;
        case 'link':
          const url = prompt('URL du lien:', 'https://');
          if (url) {
            formattedText = `<a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText}</a>`;
          } else {
            return;
          }
          break;
        case 'color':
          if (value) {
            formattedText = `<span style="color: ${value}">${selectedText}</span>`;
          }
          break;
        default:
          formattedText = selectedText;
      }

      // Obtenir la position dans le HTML complet
      const currentHtml = editorRef.current?.innerHTML || '';
      const textContent = editorRef.current?.textContent || '';
      
      // Trouver la position du texte sélectionné dans le contenu
      const textIndex = textContent.indexOf(selectedText);
      if (textIndex !== -1) {
        // Remplacer dans le HTML
        const beforeText = textContent.substring(0, textIndex);
        const afterText = textContent.substring(textIndex + selectedText.length);
        
        // Reconstruire le HTML en préservant la structure
        let newHtml = currentHtml;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = currentHtml;
        
        // Parcourir et remplacer le texte
        const replaceTextInNode = (node: Node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
            if (text.includes(selectedText)) {
              const parent = node.parentElement;
              if (parent) {
                const newSpan = document.createElement('span');
                newSpan.innerHTML = text.replace(selectedText, formattedText);
                parent.replaceChild(newSpan, node);
              }
            }
          } else {
            node.childNodes.forEach(child => replaceTextInNode(child));
          }
        };
        
        tempDiv.childNodes.forEach(node => replaceTextInNode(node));
        onChange(tempDiv.innerHTML);
      }
    }
  };

  // Fonction pour insérer un élément
  const insertElement = (type: string) => {
    const currentHtml = editorRef.current?.innerHTML || '';
    let newElement = '';
    
    switch (type) {
      case 'image':
        const imageUrl = prompt('URL de l\'image:', 'https://');
        if (imageUrl) {
          const imageAlt = prompt('Texte alternatif:', 'Image');
          newElement = `<img src="${imageUrl}" alt="${imageAlt}" class="w-full rounded-lg my-4" />`;
        }
        break;
      case 'button':
        const buttonText = prompt('Texte du bouton:', 'Cliquez ici');
        if (buttonText) {
          newElement = `<button class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">${buttonText}</button>`;
        }
        break;
      case 'divider':
        newElement = '<hr class="my-8 border-gray-200" />';
        break;
      case 'list':
        newElement = '<ul class="list-disc list-inside space-y-2"><li>Élément 1</li><li>Élément 2</li><li>Élément 3</li></ul>';
        break;
      case 'table':
        newElement = `
          <table class="w-full border-collapse my-4">
            <thead>
              <tr class="bg-gray-100">
                <th class="border px-4 py-2">Colonne 1</th>
                <th class="border px-4 py-2">Colonne 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">Cellule 1</td>
                <td class="border px-4 py-2">Cellule 2</td>
              </tr>
            </tbody>
          </table>
        `;
        break;
      case 'stats':
        newElement = `
          <div class="grid grid-cols-3 gap-4 my-8">
            <div class="text-center">
              <div class="text-4xl font-bold text-primary-600">100+</div>
              <div class="text-gray-600">Clients satisfaits</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-primary-600">15</div>
              <div class="text-gray-600">Années d'expérience</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-primary-600">24/7</div>
              <div class="text-gray-600">Support disponible</div>
            </div>
          </div>
        `;
        break;
    }
    
    if (newElement) {
      onChange(currentHtml + newElement);
    }
  };

  // Gérer les changements dans l'éditeur
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Mettre à jour le contenu quand la valeur change
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  return (
    <div className="visual-editor space-y-2">
      {/* Barre d'outils principale */}
      <div className="toolbar bg-gray-50 border border-gray-200 rounded-lg p-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Sélecteur de format */}
          <div className="relative">
            <button
              onClick={() => setShowFormatMenu(!showFormatMenu)}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2"
            >
              <span>Format</span>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showFormatMenu && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                {formats.map(format => (
                  <button
                    key={format.value}
                    onClick={() => applyBlockFormat(format.value)}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span className="font-mono text-gray-400 w-8">{format.icon}</span>
                    <span>{format.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-300" />

          {/* Boutons de format inline */}
          <button
            onClick={() => applyInlineFormat('bold')}
            className="w-8 h-8 font-bold bg-white border border-gray-300 rounded hover:bg-gray-50"
            title="Gras (Ctrl+B)"
          >
            B
          </button>
          
          <button
            onClick={() => applyInlineFormat('italic')}
            className="w-8 h-8 italic bg-white border border-gray-300 rounded hover:bg-gray-50"
            title="Italique (Ctrl+I)"
          >
            I
          </button>
          
          <button
            onClick={() => applyInlineFormat('underline')}
            className="w-8 h-8 underline bg-white border border-gray-300 rounded hover:bg-gray-50"
            title="Souligné (Ctrl+U)"
          >
            U
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Boutons d'insertion */}
          <button
            onClick={() => applyInlineFormat('link')}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
            title="Insérer un lien"
          >
            🔗 Lien
          </button>
          
          <button
            onClick={() => insertElement('image')}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
            title="Insérer une image"
          >
            🖼️ Image
          </button>
          
          <button
            onClick={() => insertElement('button')}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
            title="Insérer un bouton"
          >
            🔘 Bouton
          </button>
          
          <button
            onClick={() => insertElement('list')}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
            title="Insérer une liste"
          >
            📝 Liste
          </button>
          
          <button
            onClick={() => insertElement('table')}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
            title="Insérer un tableau"
          >
            📊 Tableau
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Couleur du texte */}
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600">Couleur:</span>
            <input
              type="color"
              onChange={(e) => applyInlineFormat('color', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              title="Couleur du texte"
            />
          </div>
        </div>

        {/* Barre d'outils secondaire - Insertions rapides */}
        {config?.quickInsert && (
          <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-500">Insertion rapide:</span>
            {config.quickInsert.map((item: any, index: number) => (
              <button
                key={index}
                onClick={() => insertElement(item.action.replace('insert-', ''))}
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                title={item.label}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zone d'édition */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[200px] p-4 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: value || '' }}
        placeholder={placeholder}
        style={{
          // Styles pour l'éditeur
          lineHeight: '1.6',
          fontSize: '14px'
        }}
      />

      {/* Aide contextuelle */}
      <div className="text-xs text-gray-500">
        💡 Sélectionnez du texte pour le formater ou utilisez les boutons pour insérer des éléments
      </div>
    </div>
  );
}