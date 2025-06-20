'use client';

import { useEditorStore } from '@/lib/store/editor-store';
import { ColorGenerator, TypographyGenerator, SpacingGenerator } from '@awema/templates';

export function ThemeSelector() {
  const { 
    theme, 
    setThemeVariant, 
    updateColors,
    updateTypography,
    setCustomCSS 
  } = useEditorStore();

  const colorPresets = [
    { name: 'Ocean Blue', primary: '#0284c7', secondary: '#7c3aed' },
    { name: 'Forest Green', primary: '#059669', secondary: '#ca8a04' },
    { name: 'Sunset Orange', primary: '#ea580c', secondary: '#e11d48' },
    { name: 'Royal Purple', primary: '#7c3aed', secondary: '#2563eb' },
    { name: 'Earth Tones', primary: '#92400e', secondary: '#059669' }
  ];

  const handleColorPreset = (preset: typeof colorPresets[0]) => {
    const newColors = ColorGenerator.generateScheme({
      baseHue: parseInt(preset.primary.slice(1, 3), 16),
      scheme: 'analogous',
      saturation: 'normal',
      theme: 'light'
    });
    updateColors(newColors);
  };

  const handleRandomTheme = () => {
    // Generate random color scheme
    const colors = ColorGenerator.generateScheme({
      scheme: ['monochromatic', 'analogous', 'complementary', 'triadic'][Math.floor(Math.random() * 4)] as any,
      saturation: ['muted', 'normal', 'vibrant'][Math.floor(Math.random() * 3)] as any,
      theme: 'light'
    });
    
    // Generate random typography
    const typography = TypographyGenerator.generateSystem({
      style: ['modern', 'classic', 'playful', 'elegant', 'technical', 'minimal'][Math.floor(Math.random() * 6)] as any,
      scale: 'normal',
      contrast: 'medium'
    });
    
    updateColors(colors);
    updateTypography(typography);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Theme Variants */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Theme Style</h3>
        <div className="space-y-2">
          {(['ultra-pro', 'premium', 'minimal'] as const).map(variant => (
            <label key={variant} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="variant"
                value={variant}
                checked={theme.variant === variant}
                onChange={() => setThemeVariant(variant)}
                className="mr-3"
              />
              <div>
                <p className="font-medium text-gray-900 capitalize">{variant.replace('-', ' ')}</p>
                <p className="text-xs text-gray-500">
                  {variant === 'ultra-pro' && 'Modern design with animations'}
                  {variant === 'premium' && 'Elegant and sophisticated'}
                  {variant === 'minimal' && 'Clean and simple'}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Color Presets */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Color Scheme</h3>
        <div className="grid grid-cols-2 gap-2">
          {colorPresets.map(preset => (
            <button
              key={preset.name}
              onClick={() => handleColorPreset(preset)}
              className="p-3 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2 mb-1">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: preset.primary }}
                />
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: preset.secondary }}
                />
              </div>
              <p className="text-xs text-gray-600">{preset.name}</p>
            </button>
          ))}
        </div>
        
        <button
          onClick={handleRandomTheme}
          className="w-full mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Generate Random Theme
        </button>
      </div>

      {/* Current Colors */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Colors</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Primary</span>
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded border border-gray-300"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <input
                type="color"
                value={theme.colors.primary}
                onChange={(e) => updateColors({ primary: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Secondary</span>
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded border border-gray-300"
                style={{ backgroundColor: theme.colors.secondary }}
              />
              <input
                type="color"
                value={theme.colors.secondary}
                onChange={(e) => updateColors({ secondary: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Accent</span>
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded border border-gray-300"
                style={{ backgroundColor: theme.colors.accent }}
              />
              <input
                type="color"
                value={theme.colors.accent}
                onChange={(e) => updateColors({ accent: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Typography</h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-600">Heading Font</label>
            <p className="text-sm font-medium">{theme.typography.fontFamily.heading}</p>
          </div>
          <div>
            <label className="text-xs text-gray-600">Body Font</label>
            <p className="text-sm">{theme.typography.fontFamily.body}</p>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Custom CSS</h3>
        <textarea
          value={theme.customCSS}
          onChange={(e) => setCustomCSS(e.target.value)}
          placeholder="/* Add custom CSS here */"
          className="w-full h-32 p-3 text-xs font-mono border rounded-lg"
        />
      </div>
    </div>
  );
}