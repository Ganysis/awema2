'use client';

import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Tablet,
  Maximize2,
  X,
  Eye
} from 'lucide-react';

interface TemplatePreviewProps {
  template: {
    id: string;
    name: string;
    blocks: any[];
    theme: any;
  };
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  };

  // Helper function pour obtenir le titre CTA selon la variante
  const getCtaTitle = (variant: string) => {
    switch(variant) {
      case 'neon-glow':
        return 'FUTURE IS NOW';
      case 'liquid-morph':
        return 'Créons ensemble l\'extraordinaire';
      case 'glitch-effect':
        return 'DISRUPT THE ORDINARY';
      case 'particle-explosion':
        return 'Libérez votre potentiel créatif';
      case '3d-flip':
        return 'Une nouvelle dimension pour vos projets';
      case 'floating-cards':
        return 'Innovation • Performance • Excellence';
      case 'wave-animation':
        return 'Surfez sur la vague du succès';
      case 'countdown':
        return 'Offre limitée : Ne manquez pas cette opportunité';
      case 'urgency-banner':
        return 'Urgence ? Nous intervenons immédiatement';
      default:
        return 'Prêt à transformer votre projet en réalité ?';
    }
  };
  
  // Helper function pour obtenir le texte du bouton CTA selon la variante
  const getCtaButtonText = (variant: string) => {
    switch(variant) {
      case 'neon-glow':
        return 'ACTIVATE NOW';
      case 'liquid-morph':
        return 'Commencer l\'aventure';
      case 'glitch-effect':
        return 'BREAK BARRIERS';
      case 'particle-explosion':
        return 'Exploser les limites';
      case '3d-flip':
        return 'Explorer en 3D';
      case 'floating-cards':
        return 'Découvrir plus';
      case 'wave-animation':
        return 'Plonger maintenant';
      case 'countdown':
        return 'Profiter de l\'offre';
      case 'urgency-banner':
        return 'Appel Urgent';
      default:
        return 'Devis Gratuit';
    }
  };

  const renderBlock = (block: any, index: number) => {
    const { type, variant, props: rawProps = {} } = block;
    const { colors = {} } = template.theme || {};
    
    // Nettoyer les props pour éviter les erreurs React
    const sanitizeValue = (value: any): any => {
      if (value === null || value === undefined) return '';
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
      if (Array.isArray(value)) {
        return value.map(item => {
          if (typeof item === 'object' && item !== null) {
            return item.name || item.title || item.label || 'Item';
          }
          return item;
        });
      }
      if (typeof value === 'object') {
        // Si c'est un objet service, extraire le nom
        return value.name || value.title || value.label || '';
      }
      return '';
    };
    
    // Nettoyer toutes les props
    const props = Object.keys(rawProps).reduce((acc, key) => {
      acc[key] = sanitizeValue(rawProps[key]);
      return acc;
    }, {} as any);
    
    // Log pour debug
    console.log(`Rendering ${type}:`, { variant, props });

    // Styles de base pour chaque type de bloc avec support des nouveaux thèmes
    const blockStyles: Record<string, any> = {
      'header-v3-perfect': {
        backgroundColor: colors.surface || colors.background || '#fff',
        borderBottom: `1px solid ${colors.surface || '#e5e7eb'}`,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: colors.text || '#1f2937',
        position: variant?.includes('transparent') || variant?.includes('float') ? 'absolute' : 'relative',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1000,
        backdropFilter: variant?.includes('glass') ? 'blur(10px)' : 'none',
        background: variant?.includes('transparent') ? 'rgba(0,0,0,0.1)' : colors.surface || colors.background
      },
      'hero-v3-perfect': {
        background: colors.gradient || `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        color: colors.background === '#000000' || colors.background?.includes('0A0A') ? '#fff' : colors.text || '#fff',
        padding: '6rem 2rem 4rem',
        textAlign: variant?.includes('centered') ? 'center' : 'left',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      },
      'services-v3-perfect': {
        backgroundColor: colors.background || '#f9fafb',
        padding: '5rem 2rem',
        position: 'relative'
      },
      'gallery-v3-perfect': {
        backgroundColor: colors.surface || '#fff',
        padding: '5rem 2rem'
      },
      'testimonials-v3-perfect': {
        backgroundColor: colors.background || '#f3f4f6',
        padding: '5rem 2rem'
      },
      'cta-v3-perfect': {
        background: variant?.includes('gradient') ? colors.gradient : colors.accent || colors.secondary,
        color: colors.background === '#000000' ? '#fff' : colors.text || '#fff',
        padding: '5rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      },
      'contact-v3-perfect': {
        backgroundColor: '#fff',
        padding: '3rem 2rem'
      },
      'footer-v3-perfect': {
        backgroundColor: '#111827',
        color: '#9ca3af',
        padding: '2rem',
        textAlign: 'center'
      }
    };

    const style = blockStyles[type] || { padding: '2rem', backgroundColor: '#f5f5f5' };

    // Rendu simplifié selon le type
    switch (type) {
      case 'header-v3-perfect':
        return (
          <div key={index} style={style}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.primary }}>
              {props.businessName || 'Logo'}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span>Accueil</span>
              <span>Services</span>
              <span>Contact</span>
              <button style={{ 
                backgroundColor: colors.primary, 
                color: '#fff', 
                padding: '0.5rem 1rem', 
                borderRadius: '0.375rem',
                border: 'none'
              }}>
                {props.ctaText || 'Devis'}
              </button>
            </div>
          </div>
        );

      case 'hero-v3-perfect':
        return (
          <div key={index} style={{
            ...style,
            minHeight: '70vh', // Réduit de 100vh
            padding: '120px 2rem 80px',
            background: props.backgroundImage 
              ? `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%), url(${props.backgroundImage})`
              : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary || colors.primary}dd 100%)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Overlay pattern */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23fff" fill-opacity="0.03"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"%3E%3C/path%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '40px 40px'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              {props.urgencyBadge && (
                <div style={{ 
                  backgroundColor: '#fbbf24', 
                  color: '#000',
                  padding: '0.75rem 2rem',
                  borderRadius: '50px',
                  marginBottom: '2rem',
                  display: 'inline-block',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)',
                  animation: 'pulse 2s infinite'
                }}>
                  {props.urgencyBadge}
                </div>
              )}
              
              <h1 style={{ 
                fontSize: 'clamp(3rem, 8vw, 5.5rem)', // Responsive
                lineHeight: '1.1',
                marginBottom: '2rem',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: '#fff',
                textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
                animation: 'fadeInUp 0.8s ease-out'
              }}>
                {props.title || 'Votre expert artisan'}
              </h1>
              
              <p style={{ 
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', 
                marginBottom: '3rem', 
                opacity: 0.9,
                maxWidth: '700px',
                margin: '0 auto 3rem',
                lineHeight: '1.6',
                color: '#fff',
                textShadow: '1px 2px 4px rgba(0,0,0,0.3)',
                animation: 'fadeInUp 0.8s ease-out 0.2s both'
              }}>
                {props.subtitle || 'Services professionnels de qualité'}
              </p>
              
              <div style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                animation: 'fadeInUp 0.8s ease-out 0.4s both'
              }}>
                <button style={{ 
                  backgroundColor: colors.accent || '#fbbf24', 
                  color: '#000', 
                  padding: '1.25rem 3rem', 
                  borderRadius: '50px',
                  border: 'none',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  letterSpacing: '0.02em',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  ':hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                }}>
                  {props.primaryButtonText || 'Contactez-nous'}
                </button>
                
                {props.secondaryButtonText && (
                  <button style={{ 
                    backgroundColor: 'transparent', 
                    color: '#fff', 
                    padding: '1.25rem 3rem', 
                    borderRadius: '50px',
                    border: '2px solid #fff',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#fff';
                  }}>
                    {props.secondaryButtonText}
                  </button>
                )}
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'bounce 2s infinite'
            }}>
              <div style={{
                width: '30px',
                height: '50px',
                border: '2px solid rgba(255,255,255,0.5)',
                borderRadius: '25px',
                position: 'relative'
              }}>
                <div style={{
                  width: '4px',
                  height: '10px',
                  backgroundColor: '#fff',
                  borderRadius: '2px',
                  position: 'absolute',
                  left: '50%',
                  top: '8px',
                  transform: 'translateX(-50%)',
                  animation: 'scroll 2s infinite'
                }} />
              </div>
            </div>
            
            <style>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
              }
              @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
                40% { transform: translateX(-50%) translateY(-10px); }
                60% { transform: translateX(-50%) translateY(-5px); }
              }
              @keyframes scroll {
                0% { transform: translateX(-50%) translateY(0); opacity: 1; }
                100% { transform: translateX(-50%) translateY(20px); opacity: 0; }
              }
            `}</style>
          </div>
        );

      case 'services-v3-perfect':
        // Récupérer les services depuis les props
        const services = [];
        for (let i = 1; i <= 8; i++) {
          if (props[`service${i}_title`]) {
            services.push({
              title: props[`service${i}_title`],
              description: props[`service${i}_description`],
              icon: props[`service${i}_icon`] || '🔧',
              price: props[`service${i}_price`],
              image: props[`service${i}_image`]
            });
          }
        }
        
        return (
          <div key={index} style={{
            ...style,
            padding: '100px 2rem',
            backgroundColor: '#f8f9fa'
          }}>
            {/* Titre de section amélioré */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{
                display: 'inline-block',
                padding: '0.5rem 2rem',
                backgroundColor: colors.primary + '20',
                color: colors.primary,
                borderRadius: template.theme?.style?.borderRadius || '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                Nos expertises
              </span>
              <h2 style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                fontWeight: '900',
                color: colors.text || '#1a1a1a',
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
                fontFamily: template.theme?.fonts?.heading || 'system-ui'
              }}>
                {props.title || 'Services Professionnels'}
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: colors.textMuted || '#6b7280',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6',
                fontFamily: template.theme?.fonts?.body || 'system-ui'
              }}>
                Des solutions sur mesure pour tous vos besoins
              </p>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {services.length > 0 ? services.map((service, i) => (
                <div key={i} style={{ 
                  backgroundColor: colors.surface || '#fff', 
                  borderRadius: template.theme?.style?.borderRadius || '20px',
                  overflow: 'hidden',
                  boxShadow: template.theme?.style?.shadows === 'sharp' ? '5px 5px 0 rgba(0,0,0,0.1)' : 
                            template.theme?.style?.shadows === 'dreamy' ? '0 20px 50px rgba(0,0,0,0.1)' :
                            '0 10px 40px rgba(0,0,0,0.08)',
                  transition: template.theme?.style?.transitions || 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
                  border: colors.background === '#000000' ? '1px solid rgba(255,255,255,0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                }}>
                  {/* Bande colorée en haut */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent || colors.secondary || colors.primary} 100%)`
                  }} />
                  
                  {service.image && (
                    <div style={{ 
                      height: '240px',
                      backgroundImage: `url(${service.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7))',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }} />
                    </div>
                  )}
                  
                  <div style={{ padding: '2rem' }}>
                    <div style={{ 
                      fontSize: '3rem', 
                      marginBottom: '1rem',
                      color: colors.primary,
                      opacity: 0.8
                    }}>
                      {service.icon}
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '700',
                      marginBottom: '0.75rem', 
                      color: '#1a1a1a',
                      letterSpacing: '-0.01em'
                    }}>
                      {service.title}
                    </h3>
                    
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '1rem', 
                      lineHeight: '1.6',
                      marginBottom: '1.5rem' 
                    }}>
                      {service.description}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      {service.price && (
                        <div style={{ 
                          fontSize: '1.75rem', 
                          fontWeight: '800', 
                          color: colors.primary 
                        }}>
                          {service.price}
                        </div>
                      )}
                      
                      <button style={{
                        padding: '0.75rem 2rem',
                        backgroundColor: colors.primary,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.secondary || colors.primary;
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = colors.primary;
                        e.currentTarget.style.transform = 'scale(1)';
                      }}>
                        En savoir plus
                        <span style={{ fontSize: '1.25rem' }}>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                // Fallback amélioré
                [1, 2, 3].map(i => (
                  <div key={i} style={{ 
                    backgroundColor: '#fff', 
                    padding: '2rem', 
                    borderRadius: '20px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', color: colors.primary }}>🔧</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: '700' }}>Service {i}</h3>
                    <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.6' }}>
                      Description professionnelle du service avec tous les détails importants
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'gallery-v3-perfect':
        // Récupérer les images depuis les props
        const images = [];
        for (let i = 1; i <= 20; i++) {
          if (props[`image${i}_src`]) {
            images.push({
              src: props[`image${i}_src`],
              title: props[`image${i}_title`],
              description: props[`image${i}_description`],
              category: props[`image${i}_category`]
            });
          }
        }
        
        return (
          <div key={index} style={{
            ...style,
            padding: '100px 2rem',
            backgroundColor: '#fff'
          }}>
            {/* Titre amélioré */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{
                display: 'inline-block',
                padding: '0.5rem 2rem',
                backgroundColor: colors.primary + '15',
                color: colors.primary,
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                Portfolio
              </span>
              <h2 style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                fontWeight: '900',
                color: '#1a1a1a',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>
                {props.title || 'Nos Réalisations'}
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#6b7280',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Des projets réussis qui parlent d'eux-mêmes
              </p>
            </div>
            
            {/* Filtres catégories */}
            {images.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '3rem',
                flexWrap: 'wrap'
              }}>
                <button style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: colors.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Tous
                </button>
                {Array.from(new Set(images.map(img => img.category).filter(Boolean))).map((cat, i) => (
                  <button key={i} style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    border: '2px solid #e5e7eb',
                    borderRadius: '50px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.color = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.color = '#6b7280';
                  }}>
                    {cat}
                  </button>
                ))}
              </div>
            )}
            
            {/* Grille masonry */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {images.length > 0 ? images.slice(0, 8).map((img, i) => (
                <div key={i} style={{ 
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#f3f4f6',
                  cursor: 'pointer',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
                  gridRow: i % 3 === 0 ? 'span 2' : 'span 1'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                  <div style={{ 
                    paddingBottom: i % 3 === 0 ? '120%' : '75%',
                    position: 'relative'
                  }}>
                    <img
                      src={img.src}
                      alt={img.title}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    
                    {/* Overlay amélioré */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.5s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '2rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                    >
                      <h4 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '700', 
                        marginBottom: '0.5rem',
                        color: '#fff',
                        transform: 'translateY(20px)',
                        transition: 'transform 0.5s ease',
                        letterSpacing: '-0.01em'
                      }}>
                        {img.title}
                      </h4>
                      {img.description && (
                        <p style={{ 
                          fontSize: '1rem', 
                          opacity: 0.9,
                          color: '#fff',
                          transform: 'translateY(20px)',
                          transition: 'transform 0.5s ease 0.1s'
                        }}>
                          {img.description}
                        </p>
                      )}
                      
                      {/* Bouton voir plus */}
                      <button style={{
                        marginTop: '1rem',
                        padding: '0.75rem 2rem',
                        backgroundColor: '#fff',
                        color: '#000',
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transform: 'translateY(20px)',
                        transition: 'all 0.5s ease 0.2s',
                        alignSelf: 'flex-start'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.primary;
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.color = '#000';
                      }}>
                        Voir le projet
                      </button>
                    </div>
                    
                    {/* Badge catégorie */}
                    {img.category && (
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {img.category}
                      </div>
                    )}
                  </div>
                </div>
              )) : (
                // Fallback amélioré
                [1, 2, 3, 4].map(i => (
                  <div key={i} style={{ 
                    backgroundColor: '#f3f4f6', 
                    paddingBottom: i % 2 === 0 ? '120%' : '75%',
                    borderRadius: '20px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#9ca3af',
                      fontSize: '3rem'
                    }}>
                      📷
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* CTA voir plus */}
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <button style={{
                padding: '1rem 3rem',
                backgroundColor: 'transparent',
                color: colors.primary,
                border: `2px solid ${colors.primary}`,
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.primary;
              }}>
                Voir tous nos projets
              </button>
            </div>
          </div>
        );

      case 'testimonials-v3-perfect':
        // Récupérer les témoignages depuis les props
        const testimonials = [];
        for (let i = 1; i <= 10; i++) {
          if (props[`testimonial${i}_text`]) {
            testimonials.push({
              text: props[`testimonial${i}_text`],
              author: props[`testimonial${i}_author`],
              service: props[`testimonial${i}_service`],
              rating: props[`testimonial${i}_rating`] || 5,
              image: props[`testimonial${i}_image`]
            });
          }
        }
        
        return (
          <div key={index} style={{
            ...style,
            padding: '100px 2rem',
            backgroundColor: '#f8f9fa',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background pattern */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: colors.primary + '10'
            }} />
            
            {/* Titre amélioré */}
            <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}>
              <span style={{
                display: 'inline-block',
                padding: '0.5rem 2rem',
                backgroundColor: colors.primary + '15',
                color: colors.primary,
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                Témoignages
              </span>
              <h2 style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                fontWeight: '900',
                color: '#1a1a1a',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>
                {props.title || 'Ils Nous Font Confiance'}
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#6b7280',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                La satisfaction de nos clients est notre priorité
              </p>
            </div>
            
            {/* Grille de témoignages améliorée */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
              gap: '2.5rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {testimonials.length > 0 ? testimonials.slice(0, 4).map((testimonial, i) => (
                <div key={i} style={{ 
                  backgroundColor: '#fff', 
                  padding: '3rem', 
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.08)';
                }}>
                  {/* Quote icon */}
                  <div style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    fontSize: '4rem',
                    color: colors.primary + '20',
                    fontFamily: 'Georgia, serif',
                    lineHeight: 1
                  }}>
                    "
                  </div>
                  
                  {/* Étoiles améliorées */}
                  <div style={{ 
                    marginBottom: '1.5rem',
                    display: 'flex',
                    gap: '0.25rem'
                  }}>
                    {[...Array(5)].map((_, starIndex) => (
                      <span key={starIndex} style={{
                        fontSize: '1.25rem',
                        color: starIndex < testimonial.rating ? '#fbbf24' : '#e5e7eb',
                        transition: 'color 0.2s ease'
                      }}>
                        ★
                      </span>
                    ))}
                  </div>
                  
                  {/* Texte du témoignage */}
                  <p style={{ 
                    fontSize: '1.125rem',
                    lineHeight: '1.8',
                    color: '#374151',
                    marginBottom: '2rem',
                    fontStyle: 'italic',
                    position: 'relative',
                    paddingLeft: '2rem'
                  }}>
                    {testimonial.text}
                  </p>
                  
                  {/* Auteur amélioré */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #f3f4f6'
                  }}>
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '3px solid ' + colors.primary + '20'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: colors.primary + '20',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: colors.primary
                      }}>
                        {testimonial.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div style={{ 
                        fontWeight: '700',
                        fontSize: '1.125rem',
                        color: '#1a1a1a',
                        marginBottom: '0.25rem'
                      }}>
                        {testimonial.author}
                      </div>
                      {testimonial.service && (
                        <div style={{ 
                          fontSize: '0.875rem', 
                          color: '#6b7280',
                          fontWeight: '500'
                        }}>
                          {testimonial.service}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Badge vérifié */}
                  <div style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#10b981' + '15',
                    color: '#10b981',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    ✓ Vérifié
                  </div>
                </div>
              )) : (
                // Fallback amélioré
                [1, 2].map(i => (
                  <div key={i} style={{ 
                    backgroundColor: '#fff', 
                    padding: '3rem', 
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
                  }}>
                    <div style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#fbbf24' }}>★★★★★</div>
                    <p style={{ fontSize: '1.125rem', fontStyle: 'italic', marginBottom: '2rem', color: '#374151', lineHeight: '1.8' }}>
                      "Un service exceptionnel, une équipe professionnelle et des résultats au-delà de nos attentes."
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: colors.primary + '20',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: colors.primary
                      }}>
                        C
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>Client satisfait</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Service réalisé</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* CTA Google Reviews */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: '4rem',
              padding: '2rem',
              backgroundColor: '#fff',
              borderRadius: '20px',
              maxWidth: '600px',
              margin: '4rem auto 0',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png" 
                  alt="Google" 
                  style={{ height: '30px' }}
                />
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1a1a1a' }}>
                  4.9/5 sur Google
                </div>
              </div>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Plus de 250 avis clients vérifiés</p>
              <button style={{
                padding: '0.75rem 2rem',
                backgroundColor: colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                Voir tous les avis
              </button>
            </div>
          </div>
        );

      case 'cta-v3-perfect':
      case 'cta-ultra-modern':
        // Déterminer la variante d'effet
        const effectVariant = variant || 'modern';
        const isUltraEffect = ['neon-glow', 'liquid-morph', 'glitch-effect', 'particle-explosion', '3d-flip', 'floating-cards', 'wave-animation', 'countdown'].includes(effectVariant);
        
        return (
          <div key={index} style={{
            ...style,
            padding: '120px 2rem',
            background: effectVariant === 'neon-glow'
              ? '#0a0a0a'
              : effectVariant === 'liquid-morph'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : effectVariant === 'glitch-effect'
              ? '#000'
              : effectVariant === 'particle-explosion'
              ? 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)'
              : effectVariant === '3d-flip'
              ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
              : effectVariant === 'floating-cards'
              ? 'linear-gradient(to right, #141e30, #243b55)'
              : effectVariant === 'wave-animation'
              ? 'linear-gradient(135deg, #06beb6 0%, #48b1bf 100%)'
              : effectVariant === 'countdown'
              ? 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)'
              : effectVariant === 'gradient-wave'
              ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary || colors.primary}dd 100%)`
              : effectVariant === 'urgency-banner'
              ? 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)'
              : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 100%)`,
            position: 'relative',
            overflow: 'hidden',
            perspective: effectVariant === '3d-flip' ? '1000px' : undefined
          }}>
            {/* Effets spécifiques par variante */}
            {effectVariant === 'neon-glow' && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, #00ffff 0%, transparent 25%, transparent 50%, #ff00ff 75%, transparent 100%)',
                transform: 'translate(-50%, -50%)',
                opacity: 0.3,
                animation: 'spin 20s linear infinite'
              }} />
            )}
            
            {effectVariant === 'liquid-morph' && (
              <>
                <div style={{
                  position: 'absolute',
                  width: '600px',
                  height: '600px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                  filter: 'blur(80px)',
                  opacity: 0.7,
                  top: '-300px',
                  left: '-300px',
                  animation: 'morph 20s ease-in-out infinite'
                }} />
                <div style={{
                  position: 'absolute',
                  width: '600px',
                  height: '600px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                  filter: 'blur(80px)',
                  opacity: 0.7,
                  bottom: '-300px',
                  right: '-300px',
                  animation: 'morph 15s ease-in-out infinite reverse'
                }} />
              </>
            )}
            
            {effectVariant === 'particle-explosion' && (
              <div style={{ position: 'absolute', inset: 0 }}>
                {[...Array(10)].map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    background: 'white',
                    borderRadius: '50%',
                    left: `${10 + i * 9}%`,
                    bottom: 0,
                    animation: `particleFloat ${10 + i}s infinite`,
                    animationDelay: `${i}s`
                  }} />
                ))}
              </div>
            )}
            
            {effectVariant === 'floating-cards' && (
              <>
                <div style={{
                  position: 'absolute',
                  top: '10%',
                  left: '5%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '2rem',
                  animation: 'floatCard 20s infinite ease-in-out'
                }}>✨ Innovation</div>
                <div style={{
                  position: 'absolute',
                  top: '60%',
                  right: '5%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '2rem',
                  animation: 'floatCard 20s infinite ease-in-out',
                  animationDelay: '5s'
                }}>🚀 Performance</div>
              </>
            )}
            
            {/* Background shapes par défaut */}
            {!isUltraEffect && (
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-10%',
                width: '120%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                transform: 'rotate(-30deg)',
                animation: 'float 20s ease-in-out infinite'
              }} />
            )}
            
            {/* Wave effect for gradient-wave variant */}
            {variant === 'gradient-wave' && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '200px',
                background: 'url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"%3E%3Cpath fill="%23ffffff20" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"%3E%3C/path%3E%3C/svg%3E")',
                backgroundSize: 'cover',
                animation: 'wave 10s ease-in-out infinite'
              }} />
            )}
            
            <div style={{ 
              position: 'relative', 
              zIndex: 1, 
              textAlign: 'center',
              ...(effectVariant === 'liquid-morph' ? {
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '4rem',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                maxWidth: '900px',
                margin: '0 auto'
              } : {})
            }}>
              {/* Countdown timer pour la variante countdown */}
              {effectVariant === 'countdown' && (
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  justifyContent: 'center',
                  marginBottom: '3rem'
                }}>
                  {[
                    { value: '07', label: 'Jours' },
                    { value: '12', label: 'Heures' },
                    { value: '45', label: 'Minutes' },
                    { value: '23', label: 'Secondes' }
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      padding: '2rem',
                      borderRadius: '15px',
                      minWidth: '100px',
                      textAlign: 'center',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                    }}>
                      <div style={{
                        fontSize: '3rem',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1
                      }}>{item.value}</div>
                      <div style={{
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginTop: '0.5rem',
                        color: '#2d3436',
                        opacity: 0.7
                      }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Urgency pulse effect */}
              {effectVariant === 'urgency-banner' && (
                <div style={{
                  display: 'inline-block',
                  padding: '0.75rem 2rem',
                  backgroundColor: '#fff',
                  color: '#dc2626',
                  borderRadius: '50px',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '2rem',
                  boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)',
                  animation: 'pulse 2s infinite'
                }}>
                  🔥 Intervention 24/7
                </div>
              )}
              
              <h2 style={{ 
                fontSize: effectVariant === 'neon-glow' || effectVariant === 'glitch-effect' 
                  ? 'clamp(3rem, 7vw, 5rem)'
                  : 'clamp(2.5rem, 6vw, 4rem)', 
                marginBottom: '1.5rem',
                fontWeight: '900',
                color: effectVariant === 'countdown' ? '#2d3436' : '#fff',
                letterSpacing: effectVariant === 'neon-glow' ? '0.1em' : '-0.02em',
                textTransform: effectVariant === 'neon-glow' || effectVariant === 'glitch-effect' ? 'uppercase' : 'none',
                textShadow: effectVariant === 'neon-glow' 
                  ? '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #0088ff'
                  : effectVariant === 'glitch-effect'
                  ? 'none'
                  : '2px 4px 8px rgba(0,0,0,0.2)',
                animation: effectVariant === 'neon-glow' 
                  ? 'neonFlicker 2s ease-in-out infinite alternate'
                  : effectVariant === 'glitch-effect'
                  ? 'glitchBase 2s infinite'
                  : 'fadeInUp 0.8s ease-out',
                position: effectVariant === 'glitch-effect' ? 'relative' : 'static'
              }}>
                {props.title || getCtaTitle(effectVariant)}
              </h2>
              
              <p style={{ 
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', 
                marginBottom: '3rem', 
                opacity: 0.95,
                maxWidth: '700px',
                margin: '0 auto 3rem',
                color: '#fff',
                lineHeight: '1.6',
                animation: 'fadeInUp 0.8s ease-out 0.2s both'
              }}>
                {props.subtitle || 'Contactez-nous dès maintenant pour un devis gratuit et sans engagement'}
              </p>
              
              {/* Dual CTA buttons */}
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                animation: 'fadeInUp 0.8s ease-out 0.4s both'
              }}>
                <button style={{ 
                  backgroundColor: effectVariant === 'neon-glow' 
                    ? 'transparent'
                    : effectVariant === 'particle-explosion'
                    ? 'transparent' 
                    : effectVariant === 'countdown'
                    ? colors.primary
                    : '#fff',
                  background: effectVariant === 'neon-glow'
                    ? 'linear-gradient(45deg, #00ffff, #0088ff)'
                    : effectVariant === 'particle-explosion'
                    ? 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)'
                    : undefined,
                  backgroundSize: effectVariant === 'particle-explosion' ? '200% 200%' : undefined,
                  color: effectVariant === 'neon-glow' 
                    ? '#0a0a0a' 
                    : effectVariant === 'countdown'
                    ? '#fff'
                    : effectVariant === 'urgency-banner' 
                    ? '#dc2626' 
                    : colors.primary, 
                  padding: '1.25rem 3rem', 
                  borderRadius: effectVariant === '3d-flip' ? '10px' : '50px',
                  border: effectVariant === 'neon-glow' ? 'none' : 'none',
                  fontSize: '1.125rem',
                  fontWeight: effectVariant === 'neon-glow' ? '900' : '700',
                  textTransform: effectVariant === 'neon-glow' || effectVariant === 'glitch-effect' ? 'uppercase' : 'none',
                  letterSpacing: effectVariant === 'neon-glow' ? '0.1em' : '0.02em',
                  boxShadow: effectVariant === 'neon-glow' 
                    ? '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.2)'
                    : effectVariant === '3d-flip'
                    ? '0 10px 20px rgba(0,0,0,0.2)'
                    : '0 20px 40px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transformStyle: effectVariant === '3d-flip' ? 'preserve-3d' : undefined,
                  animation: effectVariant === 'particle-explosion' ? 'gradientShift 3s ease infinite' : undefined
                }}
                onMouseEnter={(e) => {
                  if (effectVariant === '3d-flip') {
                    e.currentTarget.style.transform = 'translateZ(20px) rotateX(-10deg)';
                  } else if (effectVariant === 'neon-glow') {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 255, 255, 0.8), inset 0 0 30px rgba(0, 255, 255, 0.3)';
                  } else {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = effectVariant === '3d-flip' ? '' : 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = effectVariant === 'neon-glow' 
                    ? '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.2)'
                    : '0 20px 40px rgba(0,0,0,0.2)';
                }}>
                  <span style={{ fontSize: '1.5rem' }}>
                    {effectVariant === 'neon-glow' ? '⚡' : effectVariant === 'countdown' ? '🎯' : '📞'}
                  </span>
                  {props.buttonText || getCtaButtonText(effectVariant)}
                </button>
                
                <button style={{ 
                  backgroundColor: 'transparent', 
                  color: '#fff', 
                  padding: '1.25rem 3rem', 
                  borderRadius: '50px',
                  border: '2px solid #fff',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = variant === 'urgency-banner' ? '#dc2626' : colors.primary;
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                  <span style={{ fontSize: '1.25rem' }}>💬</span>
                  WhatsApp
                </button>
              </div>
              
              {/* Trust badges */}
              <div style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                opacity: 0.8
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                  <span style={{ fontSize: '1.5rem' }}>✓</span>
                  <span style={{ fontSize: '0.875rem' }}>Devis gratuit</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                  <span style={{ fontSize: '1.5rem' }}>✓</span>
                  <span style={{ fontSize: '0.875rem' }}>Sans engagement</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                  <span style={{ fontSize: '1.5rem' }}>✓</span>
                  <span style={{ fontSize: '0.875rem' }}>Réponse rapide</span>
                </div>
              </div>
            </div>
            
            <style>{`
              @keyframes float {
                0%, 100% { transform: rotate(-30deg) translateY(0); }
                50% { transform: rotate(-30deg) translateY(-20px); }
              }
              @keyframes wave {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(-50px); }
              }
            `}</style>
          </div>
        );

      case 'contact-v3-perfect':
        return (
          <div key={index} style={style}>
            <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', color: colors.primary }}>
              {props.title || 'Contactez-nous'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: variant?.includes('map') ? '1fr 1fr' : '1fr', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
              {/* Formulaire */}
              <div>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Nom complet"
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      fontSize: '1rem'
                    }}
                  />
                  <input 
                    type="email" 
                    placeholder="Email"
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      fontSize: '1rem'
                    }}
                  />
                  <input 
                    type="tel" 
                    placeholder="Téléphone"
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      fontSize: '1rem'
                    }}
                  />
                  <textarea 
                    placeholder="Votre message"
                    rows={4}
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                  <button 
                    type="submit"
                    style={{
                      padding: '0.75rem 2rem',
                      backgroundColor: colors.primary,
                      color: '#fff',
                      borderRadius: '0.375rem',
                      border: 'none',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Envoyer
                  </button>
                </form>
                
                {/* Infos de contact */}
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>📍</span>
                    <span>
                      {typeof props.address === 'object' 
                        ? (props.address.street || props.address.city || 'Adresse de l\'entreprise')
                        : (props.address || 'Adresse de l\'entreprise')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>📞</span>
                    <span>{props.phone || '01 23 45 67 89'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>✉️</span>
                    <span>{props.email || 'contact@entreprise.fr'}</span>
                  </div>
                  {props.showUrgency && (
                    <div style={{ 
                      marginTop: '1rem',
                      padding: '1rem',
                      backgroundColor: '#fee2e2',
                      borderRadius: '0.375rem',
                      border: '1px solid #fecaca'
                    }}>
                      <div style={{ fontWeight: 'bold', color: '#991b1b', marginBottom: '0.25rem' }}>
                        🚨 Urgence 24/7
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#dc2626' }}>
                        Intervention rapide pour toute urgence
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Map ou image */}
              {variant?.includes('map') && (
                <div style={{ 
                  backgroundColor: '#e5e7eb', 
                  borderRadius: '0.5rem',
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b7280'
                }}>
                  🗺️ Carte interactive
                </div>
              )}
            </div>
          </div>
        );

      case 'footer-v3-perfect':
        const footerVariant = variant || 'waves';
        const isUltraVariant = ['cyber-grid', 'aurora', 'glassmorphism', 'particle-flow', 'morphing-shapes', 'retro-synthwave', 'liquid-metal', 'minimalist-zen'].includes(footerVariant);
        
        return (
          <div key={index} style={{
            ...style,
            padding: '80px 2rem 40px',
            backgroundColor: footerVariant === 'cyber-grid' 
              ? '#0a0a0a'
              : footerVariant === 'aurora'
              ? '#0f0c29'
              : footerVariant === 'glassmorphism'
              ? 'rgba(255, 255, 255, 0.05)'
              : footerVariant === 'particle-flow'
              ? '#1a1a2e'
              : footerVariant === 'morphing-shapes'
              ? '#667eea'
              : footerVariant === 'retro-synthwave'
              ? '#0f0c29'
              : footerVariant === 'liquid-metal'
              ? '#232526'
              : footerVariant === 'minimalist-zen'
              ? '#fafafa'
              : '#0f172a',
            background: footerVariant === 'aurora'
              ? 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)'
              : footerVariant === 'morphing-shapes'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : footerVariant === 'retro-synthwave'
              ? 'linear-gradient(to bottom, #0f0c29 0%, #302b63 50%, #ff006e 100%)'
              : footerVariant === 'liquid-metal'
              ? 'linear-gradient(135deg, #232526 0%, #414345 100%)'
              : undefined,
            color: footerVariant === 'minimalist-zen' ? '#333' : '#94a3b8',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: footerVariant === 'glassmorphism' ? 'blur(20px)' : undefined,
            borderTop: footerVariant === 'glassmorphism' ? '1px solid rgba(255, 255, 255, 0.1)' : undefined
          }}>
            {/* Effets de fond spécifiques */}
            {footerVariant === 'cyber-grid' && (
              <>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 
                    'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                  animation: 'gridMove 20s linear infinite',
                  pointerEvents: 'none'
                }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                  animation: 'scanLine 3s linear infinite'
                }} />
              </>
            )}
            
            {footerVariant === 'aurora' && (
              <>
                <div style={{
                  position: 'absolute',
                  width: '200%',
                  height: '200%',
                  top: '-50%',
                  left: '-50%',
                  background: 'radial-gradient(ellipse at center, transparent 0%, #00ff88 25%, transparent 50%, #ff00ff 75%, transparent 100%)',
                  animation: 'aurora 15s ease-in-out infinite',
                  opacity: 0.2,
                  mixBlendMode: 'screen' as any
                }} />
              </>
            )}
            
            {footerVariant === 'particle-flow' && (
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {[...Array(10)].map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    width: '3px',
                    height: '3px',
                    background: '#fff',
                    borderRadius: '50%',
                    left: `${10 + i * 9}%`,
                    bottom: 0,
                    opacity: 0,
                    animation: `particleFlow 15s linear infinite`,
                    animationDelay: `${i * 1.5}s`
                  }} />
                ))}
              </div>
            )}
            
            {footerVariant === 'morphing-shapes' && (
              <>
                <div style={{
                  position: 'absolute',
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                  filter: 'blur(40px)',
                  opacity: 0.6,
                  top: '-200px',
                  left: '-200px',
                  animation: 'morphing 20s ease-in-out infinite'
                }} />
                <div style={{
                  position: 'absolute',
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                  filter: 'blur(40px)',
                  opacity: 0.6,
                  bottom: '-150px',
                  right: '-150px',
                  animation: 'morphing 20s ease-in-out infinite',
                  animationDelay: '10s'
                }} />
              </>
            )}
            
            {/* Background pattern par défaut */}
            {!isUltraVariant && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                opacity: 0.5
              }} />
            )}
            
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              position: 'relative'
            }}>
              {/* Top section avec colonnes */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '3rem',
                marginBottom: '4rem'
              }}>
                {/* Colonne entreprise */}
                <div>
                  <h3 style={{ 
                    fontSize: '2rem', 
                    fontWeight: '800', 
                    color: '#fff', 
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em'
                  }}>
                    {props.businessName || 'Entreprise Pro'}
                  </h3>
                  <p style={{ 
                    marginBottom: '1.5rem', 
                    lineHeight: '1.8',
                    opacity: 0.8 
                  }}>
                    Votre partenaire de confiance pour tous vos projets. 
                    Excellence, professionnalisme et satisfaction garantie.
                  </p>
                  {/* Social icons */}
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {['facebook', 'instagram', 'linkedin'].map((social, i) => (
                      <a key={i} href="#" style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.primary;
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}>
                        {social === 'facebook' && 'f'}
                        {social === 'instagram' && '📷'}
                        {social === 'linkedin' && 'in'}
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Services rapides */}
                <div>
                  <h4 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '700', 
                    color: '#fff', 
                    marginBottom: '1.5rem' 
                  }}>
                    Services
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['Dépannage urgent', 'Installation', 'Rénovation', 'Entretien', 'Conseils'].map((service, i) => (
                      <li key={i} style={{ marginBottom: '0.75rem' }}>
                        <a href="#" style={{
                          color: '#94a3b8',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colors.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#94a3b8';
                        }}>
                          <span style={{ opacity: 0.5 }}>→</span>
                          {service}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Contact */}
                <div>
                  <h4 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '700', 
                    color: '#fff', 
                    marginBottom: '1.5rem' 
                  }}>
                    Contact
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>📧</span>
                      <span>{props.email || 'contact@entreprise.fr'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>📞</span>
                      <span style={{ fontWeight: '600', color: '#fff' }}>
                        {props.phone || '01 23 45 67 89'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>📍</span>
                      <span>
                        {typeof props.address === 'object' 
                          ? (props.address.street || props.address.city || '123 Rue Example')
                          : (props.address || '123 Rue Example')}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Newsletter */}
                <div>
                  <h4 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '700', 
                    color: '#fff', 
                    marginBottom: '1.5rem' 
                  }}>
                    Newsletter
                  </h4>
                  <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
                    Restez informé de nos dernières actualités
                  </p>
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <input
                      type="email"
                      placeholder="Votre email"
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                      }}
                    />
                    <button style={{
                      padding: '0.75rem',
                      backgroundColor: colors.primary,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.secondary || colors.primary;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      S'inscrire
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Bottom section */}
              <div style={{
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '0.875rem' }}>
                  © 2024 {props.businessName || 'Entreprise'}. Tous droits réservés.
                </div>
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  fontSize: '0.875rem'
                }}>
                  <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                    Mentions légales
                  </a>
                  <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                    Politique de confidentialité
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case 'content-v3-perfect':
        // Log pour debug
        console.log(`Content block variant: ${variant}`, props);
        
        if (variant === 'stats') {
          const stats = [
            { value: props.stat1_value, label: props.stat1_label },
            { value: props.stat2_value, label: props.stat2_label },
            { value: props.stat3_value, label: props.stat3_label },
            { value: props.stat4_value, label: props.stat4_label }
          ].filter(stat => stat.value && stat.label);
          
          return (
            <div key={index} style={style}>
              <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', color: colors.primary }}>
                {props.title || 'Nos Résultats'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                {stats.length > 0 ? stats.map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '3rem', 
                      fontWeight: 'bold', 
                      color: colors.primary,
                      marginBottom: '0.5rem'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '1rem', color: '#6b7280' }}>
                      {stat.label}
                    </div>
                  </div>
                )) : (
                  // Fallback
                  [
                    { number: '500+', label: 'Projets réalisés' },
                    { number: '98%', label: 'Clients satisfaits' },
                    { number: '15 ans', label: "D'expérience" },
                    { number: '24/7', label: 'Disponibilité' }
                  ].map((stat, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '3rem', fontWeight: 'bold', color: colors.primary }}>
                        {stat.number}
                      </div>
                      <div style={{ fontSize: '1rem', color: '#6b7280' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        } else if (variant === 'about') {
          return (
            <div key={index} style={style}>
              <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', color: colors.primary }}>
                {props.title || 'À Propos'}
              </h2>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {props.founderImage && (
                  <div style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    backgroundImage: `url(${props.founderImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    margin: '0 auto 2rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} />
                )}
                <p style={{ 
                  lineHeight: '1.8', 
                  color: '#4b5563',
                  fontSize: '1.125rem',
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  {props.content || 'Notre histoire et nos valeurs...'}
                </p>
                {props.values && Array.isArray(props.values) && props.values.length > 0 && (
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    marginTop: '2rem'
                  }}>
                    {props.values.map((value: any, i: number) => (
                      <div key={i} style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: colors.primary + '20',
                        borderRadius: '9999px',
                        color: colors.primary,
                        fontWeight: '500'
                      }}>
                        {typeof value === 'string' ? value : (value.name || value.title || 'Valeur')}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        } else if (variant === 'team' || variant === 'team-showcase') {
          const team = [];
          for (let i = 1; i <= 10; i++) {
            if (props[`member${i}_name`]) {
              team.push({
                name: props[`member${i}_name`],
                role: props[`member${i}_role`],
                photo: props[`member${i}_photo`],
                bio: props[`member${i}_bio`]
              });
            }
          }
          
          return (
            <div key={index} style={style}>
              <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', color: colors.primary }}>
                {props.title || 'Notre Équipe'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {team.map((member, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      backgroundImage: member.photo ? `url(${member.photo})` : undefined,
                      backgroundColor: member.photo ? undefined : '#e5e7eb',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      margin: '0 auto 1rem',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                      {!member.photo && <div style={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '3rem'
                      }}>👤</div>}
                    </div>
                    <h3 style={{ marginBottom: '0.25rem', color: colors.primary }}>{member.name}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{member.role}</p>
                    {member.bio && (
                      <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>
                        {member.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (variant === 'certifications' || variant === 'trust-indicators') {
          const certs = [];
          for (let i = 1; i <= 10; i++) {
            if (props[`cert${i}_name`]) {
              certs.push({
                name: props[`cert${i}_name`],
                image: props[`cert${i}_image`],
                year: props[`cert${i}_year`]
              });
            }
          }
          
          return (
            <div key={index} style={style}>
              <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', color: colors.primary }}>
                {props.title || 'Nos Certifications'}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                {certs.map((cert, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    {cert.image && (
                      <img 
                        src={cert.image} 
                        alt={cert.name}
                        style={{ 
                          height: '80px', 
                          marginBottom: '0.5rem',
                          objectFit: 'contain' 
                        }}
                      />
                    )}
                    <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>{cert.name}</p>
                    {cert.year && (
                      <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Depuis {cert.year}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }
        // Gestion de toutes les autres variantes de content
        return (
          <div key={index} style={style}>
            <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', color: colors.primary }}>
              {props.title || 'Contenu'}
            </h2>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: '#4b5563' }}>
              {/* Si on a des services dans les props, les afficher en texte simple */}
              {props.services && Array.isArray(props.services) && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem', color: colors.primary }}>Services disponibles</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                    {props.services.map((service: any, i: number) => {
                      // Log pour debug
                      console.log('Rendering service in content block:', service);
                      const serviceName = typeof service === 'string' 
                        ? service 
                        : (service?.name || service?.title || 'Service');
                      
                      return (
                        <div key={i} style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: colors.primary + '10',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem'
                        }}>
                          {serviceName}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Contenu par défaut */}
              <p style={{ lineHeight: '1.8' }}>
                {(() => {
                  const content = props.content || props.description || 'Avec des années d\'expérience dans le secteur...';
                  // S'assurer que le contenu est une chaîne
                  if (typeof content === 'string') {
                    return content;
                  } else if (Array.isArray(content)) {
                    return content.map(item => 
                      typeof item === 'string' ? item : (item?.name || item?.title || '')
                    ).join(', ');
                  } else if (typeof content === 'object' && content !== null) {
                    return content.name || content.title || content.description || 'Contenu...';
                  }
                  return 'Avec des années d\'expérience dans le secteur...';
                })()}
              </p>
              {/* Si c'est une variante urgence */}
              {(variant === 'emergency-services' || variant === 'urgency') && props.urgencyMessage && (
                <div style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: '#fee2e2',
                  borderRadius: '0.5rem',
                  border: '1px solid #fecaca'
                }}>
                  <p style={{ color: '#991b1b', fontWeight: 'bold' }}>
                    {props.urgencyMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'features-v3-perfect':
        const features = [];
        for (let i = 1; i <= 8; i++) {
          if (props[`feature${i}_title`]) {
            features.push({
              title: props[`feature${i}_title`],
              description: props[`feature${i}_description`],
              icon: props[`feature${i}_icon`] || '✓'
            });
          }
        }
        
        if (variant === 'timeline') {
          return (
            <div key={index} style={style}>
              <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', color: colors.primary }}>
                {props.title || 'Notre Processus'}
              </h2>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                {features.length > 0 ? features.map((item, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '2rem',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: '50%', 
                      backgroundColor: colors.primary,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginRight: '1.5rem',
                      flexShrink: 0
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <h3 style={{ marginBottom: '0.25rem' }}>{item.title}</h3>
                      <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{item.description}</p>
                    </div>
                    {i < features.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        left: '25px',
                        top: '50px',
                        width: '1px',
                        height: '2rem',
                        backgroundColor: '#e5e7eb'
                      }}></div>
                    )}
                  </div>
                )) : (
                  // Fallback
                  [
                    { step: '1', title: 'Consultation', desc: 'Analyse de vos besoins' },
                    { step: '2', title: 'Devis', desc: 'Proposition détaillée' },
                    { step: '3', title: 'Réalisation', desc: 'Travaux de qualité' },
                    { step: '4', title: 'Suivi', desc: 'Satisfaction garantie' }
                  ].map((item, i) => (
                    <div key={i} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '2rem',
                      position: 'relative'
                    }}>
                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        borderRadius: '50%', 
                        backgroundColor: colors.primary,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        marginRight: '1.5rem',
                        flexShrink: 0
                      }}>
                        {item.step}
                      </div>
                      <div>
                        <h3 style={{ marginBottom: '0.25rem' }}>{item.title}</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{item.desc}</p>
                      </div>
                      {i < 3 && (
                        <div style={{
                          position: 'absolute',
                          left: '25px',
                          top: '50px',
                          width: '1px',
                          height: '2rem',
                          backgroundColor: '#e5e7eb'
                        }}></div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        }
        return (
          <div key={index} style={style}>
            <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', color: colors.primary }}>
              {props.title || 'Pourquoi nous choisir'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {features.length > 0 ? features.map((feature, i) => (
                <div key={i} style={{ 
                  textAlign: 'center',
                  padding: '1.5rem',
                  backgroundColor: '#fff',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '1rem',
                    color: colors.primary 
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ marginBottom: '0.5rem', color: colors.primary }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {feature.description}
                  </p>
                </div>
              )) : (
                // Fallback
                [1, 2, 3, 4].map(i => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Atout {i}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      Description de l'avantage
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'faq-v3-perfect':
        if (variant === 'chatbot') {
          return (
            <div key={index} style={style}>
              <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', color: colors.primary }}>
                Assistant Virtuel
              </h2>
              <div style={{ 
                maxWidth: '600px', 
                margin: '0 auto',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                padding: '2rem'
              }}>
                <div style={{ 
                  backgroundColor: '#fff',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ 
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: colors.primary,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem'
                    }}>
                      🤖
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>Assistant</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>En ligne</div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#e5e7eb', borderRadius: '0.375rem', padding: '1rem', marginBottom: '1rem' }}>
                    Bonjour ! Comment puis-je vous aider aujourd'hui ?
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      border: '1px solid #e5e7eb',
                      backgroundColor: '#fff',
                      fontSize: '0.875rem'
                    }}>
                      💬 Demander un devis
                    </button>
                    <button style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      border: '1px solid #e5e7eb',
                      backgroundColor: '#fff',
                      fontSize: '0.875rem'
                    }}>
                      📞 Urgence
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div key={index} style={style}>
            <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', color: colors.primary }}>
              Questions Fréquentes
            </h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ 
                  backgroundColor: '#fff',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Question {i} ?</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    Réponse détaillée à la question fréquemment posée par nos clients.
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pricing-v3-perfect':
        return (
          <div key={index} style={style}>
            <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', color: colors.primary }}>
              Nos Tarifs
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
              {['Essentiel', 'Standard', 'Premium'].map((plan, i) => (
                <div key={i} style={{ 
                  backgroundColor: '#fff',
                  borderRadius: '0.5rem',
                  padding: '2rem',
                  textAlign: 'center',
                  boxShadow: i === 1 ? '0 10px 25px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)',
                  transform: i === 1 ? 'scale(1.05)' : 'scale(1)'
                }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{plan}</h3>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: colors.primary, marginBottom: '1rem' }}>
                    {i === 0 ? '29€' : i === 1 ? '49€' : '99€'}
                  </div>
                  <ul style={{ textAlign: 'left', marginBottom: '2rem', color: '#4b5563' }}>
                    <li style={{ marginBottom: '0.5rem' }}>✓ Service de base</li>
                    <li style={{ marginBottom: '0.5rem' }}>✓ Support client</li>
                    {i > 0 && <li style={{ marginBottom: '0.5rem' }}>✓ Options avancées</li>}
                    {i > 1 && <li style={{ marginBottom: '0.5rem' }}>✓ Service prioritaire</li>}
                  </ul>
                  <button style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: i === 1 ? colors.primary : '#fff',
                    color: i === 1 ? '#fff' : colors.primary,
                    border: i === 1 ? 'none' : `2px solid ${colors.primary}`,
                    borderRadius: '0.375rem',
                    fontWeight: 'bold'
                  }}>
                    Choisir
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div key={index} style={style}>
            <div style={{ textAlign: 'center', color: '#9ca3af' }}>
              {type} - {variant || 'default'}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <Eye className="w-4 h-4" />
        Visualiser
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold">Aperçu : {template.name}</h3>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setDevice('desktop')}
                    className={`p-2 rounded ${device === 'desktop' ? 'bg-white shadow' : ''}`}
                    title="Desktop"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDevice('tablet')}
                    className={`p-2 rounded ${device === 'tablet' ? 'bg-white shadow' : ''}`}
                    title="Tablet"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDevice('mobile')}
                    className={`p-2 rounded ${device === 'mobile' ? 'bg-white shadow' : ''}`}
                    title="Mobile"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview */}
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
              <div 
                className="mx-auto bg-white shadow-lg transition-all duration-300"
                style={{ 
                  width: deviceWidths[device],
                  minHeight: '600px'
                }}
              >
                <div className="overflow-auto">
                  {template.blocks && template.blocks.length > 0 ? (
                    template.blocks.map((block, index) => renderBlock(block, index))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <p>Aucun bloc à afficher</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Animations CSS pour les effets visuels */}
      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes morph {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(100px, -100px) scale(1.2); }
          66% { transform: translate(-100px, 100px) scale(0.8); }
        }
        
        @keyframes particleFloat {
          0% {
            opacity: 0;
            transform: translateY(100vh) scale(0);
          }
          10% {
            opacity: 1;
            transform: translateY(80vh) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
          }
        }
        
        @keyframes floatCard {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(0) rotate(-5deg); }
          75% { transform: translateY(20px) rotate(3deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes wave {
          0% { background-position-x: 0; }
          100% { background-position-x: 1440px; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes neonFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes glitchBase {
          0%, 90%, 100% { opacity: 1; }
          92% { opacity: 0.8; }
          94% { opacity: 1; }
          96% { opacity: 0.8; }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes aurora {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.2); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(0.8); }
        }
        
        @keyframes morphing {
          0%, 100% {
            border-radius: 50%;
            transform: rotate(0deg) scale(1);
          }
          25% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: rotate(90deg) scale(1.1);
          }
          50% {
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
            transform: rotate(180deg) scale(0.9);
          }
          75% {
            border-radius: 30% 70% 70% 30% / 70% 30% 30% 70%;
            transform: rotate(270deg) scale(1.2);
          }
        }
        
        @keyframes liquidShift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-20px, -20px) scale(1.1); }
          66% { transform: translate(20px, 20px) scale(0.9); }
        }
      `}</style>
    </>
  );
}