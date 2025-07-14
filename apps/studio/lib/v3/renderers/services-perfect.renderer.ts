/**
 * Services Renderer V3 PERFECT - Design magnifique et ergonomie parfaite
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';
import { servicesDataSchema, servicesDefaults, type ServicesData } from '../schemas/blocks/services';
import { logger } from '../core/logger';

export class ServicesRendererV3Perfect extends BaseRendererV3<ServicesData> {
  type = 'services-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('ServicesRendererV3Perfect', 'constructor', '🚀 Initialisation du renderer Services V3 PERFECT');
  }

  validate(data: unknown): z.SafeParseReturnType<ServicesData, ServicesData> {
    return servicesDataSchema.safeParse(data);
  }

  getDefaultData(): ServicesData {
    return servicesDefaults;
  }

  /**
   * Retourne les propriétés éditables du bloc
   * Utilise la méthode de base qui génère automatiquement les props
   */
  getBlockProps(): BlockProp[] {
    // Utilise la méthode de la classe de base qui génère automatiquement
    // les props à partir des données par défaut
    return super.getBlockProps();
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   SERVICES V3 PERFECT - Styles magnifiques
   ======================================== */

.services {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  background: var(--services-bg, #ffffff);
}

.services__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header élégant */
.services__header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.services__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #1f2937;
}

.services__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #6b7280;
  line-height: 1.6;
}

/* ========================================
   VARIANTES SPECTACULAIRES
   ======================================== */

/* 1. Cards Hover 3D - Cartes avec effet 3D */
.services--cards-hover-3d .services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  perspective: 1000px;
}

.services--cards-hover-3d .service__card {
  position: relative;
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: translateZ(0);
}

.services--cards-hover-3d .service__card:hover {
  transform: translateZ(20px) rotateX(5deg) rotateY(-5deg);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.2);
}

.services--cards-hover-3d .service__card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s;
}

.services--cards-hover-3d .service__card:hover::before {
  opacity: 1;
}

.services--cards-hover-3d .service__icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1.5rem;
  transform: translateZ(30px);
  box-shadow: 0 10px 30px -10px rgba(102, 126, 234, 0.4);
}

.services--cards-hover-3d .service__name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
  transform: translateZ(20px);
}

.services--cards-hover-3d .service__description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  transform: translateZ(10px);
}

.services--cards-hover-3d .service__features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  transform: translateZ(15px);
}

.services--cards-hover-3d .service__feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: #4b5563;
}

.services--cards-hover-3d .service__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: gap 0.3s;
  transform: translateZ(25px);
}

.services--cards-hover-3d .service__link:hover {
  gap: 1rem;
}

/* 2. Hexagon Grid - Grille hexagonale */
.services--hexagon-grid .services__hexgrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.services--hexagon-grid .service__hex {
  position: relative;
  width: 250px;
  height: 289px;
  margin: 0 auto;
  cursor: pointer;
}

.services--hexagon-grid .service__hex-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform: rotate(30deg);
  overflow: hidden;
  border-radius: 20px;
}

.services--hexagon-grid .service__hex-content {
  position: absolute;
  inset: 2px;
  background: white;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  transform: rotate(-30deg);
  transition: all 0.3s;
  text-align: center;
}

.services--hexagon-grid .service__hex:hover .service__hex-content {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.services--hexagon-grid .service__hex-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  transition: transform 0.3s;
}

.services--hexagon-grid .service__hex:hover .service__hex-icon {
  transform: scale(1.2);
}

.services--hexagon-grid .service__hex-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.services--hexagon-grid .service__hex:hover * {
  color: white;
}

/* 3. Timeline Services - Services chronologiques */
.services--timeline .services__timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.services--timeline .services__line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #667eea, #764ba2, #f093fb);
}

.services--timeline .service__item {
  position: relative;
  padding: 2rem 0;
  width: 50%;
}

.services--timeline .service__item:nth-child(odd) {
  padding-right: 3rem;
  text-align: right;
}

.services--timeline .service__item:nth-child(even) {
  margin-left: 50%;
  padding-left: 3rem;
}

.services--timeline .service__item::before {
  content: '';
  position: absolute;
  top: 2.5rem;
  width: 20px;
  height: 20px;
  background: white;
  border: 4px solid #667eea;
  border-radius: 50%;
  z-index: 10;
  transition: all 0.3s;
}

.services--timeline .service__item:nth-child(odd)::before {
  right: -10px;
}

.services--timeline .service__item:nth-child(even)::before {
  left: -10px;
}

.services--timeline .service__item:hover::before {
  background: #667eea;
  transform: scale(1.3);
}

.services--timeline .service__content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.services--timeline .service__item:hover .service__content {
  transform: scale(1.05);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.15);
}

/* 4. Carousel Interactive - Carrousel interactif */
.services--carousel-interactive .services__carousel {
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
}

.services--carousel-interactive .services__track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.services--carousel-interactive .service__slide {
  flex: 0 0 350px;
  margin: 0 1rem;
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  cursor: pointer;
}

.services--carousel-interactive .service__slide.active {
  transform: scale(1.05);
  box-shadow: 0 20px 60px -15px rgba(102, 126, 234, 0.3);
}

.services--carousel-interactive .services__nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
}

.services--carousel-interactive .services__nav-btn {
  width: 50px;
  height: 50px;
  border: none;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.services--carousel-interactive .services__nav-btn:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: translateY(-2px);
}

.services--carousel-interactive .services__dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.services--carousel-interactive .services__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e5e7eb;
  cursor: pointer;
  transition: all 0.3s;
}

.services--carousel-interactive .services__dot.active {
  width: 30px;
  border-radius: 5px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

/* 5. Bento Box - Style Bento */
.services--bento-box .services__bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 1.5rem;
}

.services--bento-box .service__box {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.services--bento-box .service__box:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.15);
}

.services--bento-box .service__box--large {
  grid-column: span 2;
  grid-row: span 2;
}

.services--bento-box .service__box--wide {
  grid-column: span 2;
}

.services--bento-box .service__box--tall {
  grid-row: span 2;
}

.services--bento-box .service__box--featured {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.services--bento-box .service__box--featured .service__title,
.services--bento-box .service__box--featured .service__description {
  color: white;
}

.services--bento-box .service__box::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.services--bento-box .service__box:hover::before {
  opacity: 1;
}

/* 6. Floating Icons - Icônes flottantes */
.services--floating-icons {
  min-height: 600px;
  display: flex;
  align-items: center;
  position: relative;
}

.services--floating-icons .services__center {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.services--floating-icons .services__orbits {
  position: absolute;
  inset: -200px;
  pointer-events: none;
}

.services--floating-icons .service__orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px dashed rgba(102, 126, 234, 0.2);
  border-radius: 50%;
  animation: rotate 30s linear infinite;
}

.services--floating-icons .service__orbit:nth-child(1) {
  width: 300px;
  height: 300px;
}

.services--floating-icons .service__orbit:nth-child(2) {
  width: 450px;
  height: 450px;
  animation-duration: 40s;
  animation-direction: reverse;
}

.services--floating-icons .service__orbit:nth-child(3) {
  width: 600px;
  height: 600px;
  animation-duration: 50s;
}

@keyframes rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.services--floating-icons .service__float {
  position: absolute;
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  pointer-events: all;
}

.services--floating-icons .service__float:hover {
  transform: scale(1.1);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
}

.services--floating-icons .service__float-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.services--floating-icons .service__float-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

/* 7. Interactive Map - Carte interactive */
.services--interactive-map .services__map {
  position: relative;
  background: #f3f4f6;
  border-radius: 2rem;
  padding: 3rem;
  min-height: 500px;
  overflow: hidden;
}

.services--interactive-map .services__map-bg {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 50h100M50 0v100' stroke='%23667eea' stroke-width='0.5'/%3E%3C/svg%3E");
  background-size: 50px 50px;
}

.services--interactive-map .service__pin {
  position: absolute;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.services--interactive-map .service__pin::before {
  content: attr(data-number);
  transform: rotate(45deg);
  color: white;
  font-weight: 700;
}

.services--interactive-map .service__pin:hover {
  transform: rotate(-45deg) scale(1.2);
  box-shadow: 0 10px 30px -10px rgba(102, 126, 234, 0.5);
}

.services--interactive-map .service__popup {
  position: absolute;
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s;
  z-index: 100;
  min-width: 250px;
}

.services--interactive-map .service__pin:hover + .service__popup,
.services--interactive-map .service__popup:hover {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* 8. Glassmorphism Cards - Cartes effet verre */
.services--glassmorphism-cards {
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  position: relative;
}

.services--glassmorphism-cards::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(255,255,255,0.05)' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  animation: bgMove 20s linear infinite;
}

@keyframes bgMove {
  from { transform: translateX(0); }
  to { transform: translateX(60px); }
}

.services--glassmorphism-cards .services__grid {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.services--glassmorphism-cards .service__glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 2.5rem;
  color: white;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.services--glassmorphism-cards .service__glass:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
}

.services--glassmorphism-cards .service__glass::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.services--glassmorphism-cards .service__glass:hover::before {
  opacity: 1;
}

.services--glassmorphism-cards .service__glass-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.services--glassmorphism-cards .service__glass-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.services--glassmorphism-cards .service__glass-description {
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.services--glassmorphism-cards .service__glass-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  transition: all 0.3s;
}

.services--glassmorphism-cards .service__glass-link:hover {
  background: rgba(255, 255, 255, 0.2);
  gap: 1rem;
}

/* Éléments communs */
.service__icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin-bottom: 1.5rem;
}

.service__title,
.service__name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.service__description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service__price {
  font-size: 2rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.service__price-period {
  font-size: 1rem;
  color: #6b7280;
  font-weight: 400;
}

.service__features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.service__feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: #4b5563;
}

.service__feature::before {
  content: '✓';
  width: 20px;
  height: 20px;
  background: #d1fae5;
  color: #065f46;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.service__cta {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s;
}

.service__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px rgba(102, 126, 234, 0.4);
}

/* Badges */
.service__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Animations d'entrée */
.services--animated .service__card,
.services--animated .service__hex,
.services--animated .service__item,
.services--animated .service__slide,
.services--animated .service__box,
.services--animated .service__float,
.services--animated .service__glass {
  opacity: 0;
  animation: serviceFadeUp 0.8s ease-out forwards;
}

.services--animated *:nth-child(1) { animation-delay: 0.1s; }
.services--animated *:nth-child(2) { animation-delay: 0.2s; }
.services--animated *:nth-child(3) { animation-delay: 0.3s; }
.services--animated *:nth-child(4) { animation-delay: 0.4s; }
.services--animated *:nth-child(5) { animation-delay: 0.5s; }
.services--animated *:nth-child(6) { animation-delay: 0.6s; }

@keyframes serviceFadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Filtres */
.services__filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.services__filter {
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s;
}

.services__filter:hover {
  background: #e5e7eb;
  color: #4b5563;
}

.services__filter.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

/* Responsive */
@media (max-width: 1024px) {
  .services--timeline .service__item {
    width: 100%;
    padding-left: 3rem !important;
    padding-right: 0 !important;
    text-align: left !important;
  }
  
  .services--timeline .service__item:nth-child(even) {
    margin-left: 0;
  }
  
  .services--timeline .services__line {
    left: 15px;
  }
  
  .services--timeline .service__item::before {
    left: 5px !important;
    right: auto !important;
  }
  
  .services--bento-box .services__bento {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .services--bento-box .service__box--large {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .services--cards-hover-3d .services__grid,
  .services--hexagon-grid .services__hexgrid,
  .services--glassmorphism-cards .services__grid {
    grid-template-columns: 1fr;
  }
  
  .services--carousel-interactive .service__slide {
    flex: 0 0 280px;
  }
  
  .services--bento-box .services__bento {
    grid-template-columns: 1fr;
  }
  
  .services--bento-box .service__box--large,
  .services--bento-box .service__box--wide {
    grid-column: span 1;
  }
  
  .services--floating-icons .services__orbits {
    display: none;
  }
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .services {
    background: #0f172a;
  }
  
  .services__title {
    color: white;
  }
  
  .services__subtitle {
    color: #94a3b8;
  }
  
  .services--cards-hover-3d .service__card,
  .services--timeline .service__content,
  .services--carousel-interactive .service__slide,
  .services--bento-box .service__box {
    background: #1e293b;
  }
  
  .service__title,
  .service__name {
    color: white;
  }
  
  .service__description {
    color: #cbd5e1;
  }
  
  .service__feature {
    color: #cbd5e1;
  }
  
  .services__filter {
    background: #1e293b;
    color: #94a3b8;
  }
  
  .services__filter:hover {
    background: #334155;
    color: #cbd5e1;
  }
}
    `;
  }

  getDefaultJS(): string {
    return `
// Services V3 Perfect - JavaScript interactif
(function() {
  'use strict';
  
  // Initialisation Services
  function initServices() {
    const services = document.querySelectorAll('.services');
    
    services.forEach(service => {
      const variant = Array.from(service.classList).find(c => c.startsWith('services--'))?.replace('services--', '');
      
      // Filtres
      initFilters(service);
      
      // Variantes spécifiques
      switch(variant) {
        case 'carousel-interactive':
          initCarousel(service);
          break;
        case 'floating-icons':
          initFloatingIcons(service);
          break;
        case 'interactive-map':
          initInteractiveMap(service);
          break;
        case 'hexagon-grid':
          initHexagonGrid(service);
          break;
      }
      
      // Animations d'entrée
      observeServices(service);
      
      // Hover 3D pour cards-hover-3d
      if (variant === 'cards-hover-3d') {
        init3DHover(service);
      }
    });
  }
  
  // Filtres de services
  function initFilters(services) {
    const filters = services.querySelectorAll('.services__filter');
    const items = services.querySelectorAll('[data-category]');
    
    if (!filters.length || !items.length) return;
    
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.dataset.filter;
        
        // Update active state
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        // Filter items
        items.forEach(item => {
          const itemCategory = item.dataset.category;
          
          if (category === 'all' || itemCategory === category) {
            item.style.display = '';
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.transition = 'opacity 0.3s';
              item.style.opacity = '1';
            }, 50);
          } else {
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
        
        // Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'services_filter', {
            filter_category: category
          });
        }
      });
    });
  }
  
  // Carousel interactif
  function initCarousel(services) {
    const track = services.querySelector('.services__track');
    const slides = services.querySelectorAll('.service__slide');
    const prevBtn = services.querySelector('.services__nav-btn--prev');
    const nextBtn = services.querySelector('.services__nav-btn--next');
    const dots = services.querySelector('.services__dots');
    
    if (!track || !slides.length) return;
    
    let currentSlide = 0;
    const slidesPerView = window.innerWidth > 768 ? 3 : 1;
    const maxSlide = Math.max(0, slides.length - slidesPerView);
    
    // Create dots
    if (dots) {
      for (let i = 0; i <= maxSlide; i++) {
        const dot = document.createElement('div');
        dot.className = 'services__dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dots.appendChild(dot);
      }
    }
    
    function goToSlide(index) {
      currentSlide = Math.max(0, Math.min(index, maxSlide));
      const offset = currentSlide * (slides[0].offsetWidth + 32); // 32px = 2rem gap
      track.style.transform = \`translateX(-\${offset}px)\`;
      
      // Update dots
      const allDots = dots?.querySelectorAll('.services__dot');
      allDots?.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
      
      // Update active slide
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });
    }
    
    // Navigation
    prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    // Touch/swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      isDragging = true;
      track.style.transition = 'none';
    });
    
    track.addEventListener('touchmove', e => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      const offset = currentSlide * (slides[0].offsetWidth + 32);
      track.style.transform = \`translateX(\${-offset + diff}px)\`;
    });
    
    track.addEventListener('touchend', () => {
      isDragging = false;
      track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      const diff = currentX - startX;
      
      if (Math.abs(diff) > 100) {
        if (diff > 0) {
          goToSlide(currentSlide - 1);
        } else {
          goToSlide(currentSlide + 1);
        }
      } else {
        goToSlide(currentSlide);
      }
    });
    
    // Auto-play
    const autoPlay = services.dataset.autoplay === 'true';
    if (autoPlay) {
      setInterval(() => {
        goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
      }, 5000);
    }
  }
  
  // Floating icons
  function initFloatingIcons(services) {
    const floats = services.querySelectorAll('.service__float');
    const orbits = services.querySelectorAll('.service__orbit');
    
    // Position floating services
    const positions = [
      { top: '10%', left: '15%' },
      { top: '20%', right: '10%' },
      { bottom: '25%', left: '10%' },
      { bottom: '15%', right: '15%' },
      { top: '50%', left: '5%' },
      { top: '50%', right: '5%' }
    ];
    
    floats.forEach((float, index) => {
      if (positions[index]) {
        Object.assign(float.style, positions[index]);
      }
      
      // Hover effect
      float.addEventListener('mouseenter', () => {
        floats.forEach(f => {
          if (f !== float) {
            f.style.opacity = '0.3';
            f.style.filter = 'blur(2px)';
          }
        });
      });
      
      float.addEventListener('mouseleave', () => {
        floats.forEach(f => {
          f.style.opacity = '1';
          f.style.filter = 'none';
        });
      });
      
      // Click to expand
      float.addEventListener('click', () => {
        const isExpanded = float.classList.contains('expanded');
        
        floats.forEach(f => f.classList.remove('expanded'));
        
        if (!isExpanded) {
          float.classList.add('expanded');
        }
      });
    });
  }
  
  // Interactive map
  function initInteractiveMap(services) {
    const pins = services.querySelectorAll('.service__pin');
    
    pins.forEach((pin, index) => {
      // Random position within map
      const x = 20 + Math.random() * 60; // 20% to 80%
      const y = 20 + Math.random() * 60;
      
      pin.style.left = x + '%';
      pin.style.top = y + '%';
      
      // Create connection lines
      if (index > 0) {
        const prevPin = pins[index - 1];
        const line = createConnectionLine(prevPin, pin);
        services.querySelector('.services__map').appendChild(line);
      }
    });
    
    // Hover to show popup
    pins.forEach(pin => {
      const popup = pin.nextElementSibling;
      
      pin.addEventListener('mouseenter', () => {
        const rect = pin.getBoundingClientRect();
        const mapRect = pin.parentElement.getBoundingClientRect();
        
        // Position popup
        popup.style.left = (rect.left - mapRect.left + 50) + 'px';
        popup.style.top = (rect.top - mapRect.top) + 'px';
      });
    });
  }
  
  // Create connection line between pins
  function createConnectionLine(pin1, pin2) {
    const line = document.createElement('div');
    line.className = 'service__connection';
    
    const x1 = parseFloat(pin1.style.left);
    const y1 = parseFloat(pin1.style.top);
    const x2 = parseFloat(pin2.style.left);
    const y2 = parseFloat(pin2.style.top);
    
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    line.style.cssText = \`
      position: absolute;
      left: \${x1}%;
      top: \${y1}%;
      width: \${length}%;
      height: 1px;
      background: linear-gradient(90deg, transparent, #667eea, transparent);
      transform-origin: left center;
      transform: rotate(\${angle}deg);
      opacity: 0.3;
    \`;
    
    return line;
  }
  
  // Hexagon grid hover
  function initHexagonGrid(services) {
    const hexagons = services.querySelectorAll('.service__hex');
    
    hexagons.forEach(hex => {
      hex.addEventListener('mouseenter', () => {
        hexagons.forEach(h => {
          if (h !== hex) {
            h.style.opacity = '0.3';
            h.style.filter = 'grayscale(100%)';
          }
        });
      });
      
      hex.addEventListener('mouseleave', () => {
        hexagons.forEach(h => {
          h.style.opacity = '1';
          h.style.filter = 'none';
        });
      });
    });
  }
  
  // 3D hover effect
  function init3DHover(services) {
    const cards = services.querySelectorAll('.service__card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = \`
          perspective(1000px)
          rotateX(\${rotateX}deg)
          rotateY(\${rotateY}deg)
          translateZ(20px)
        \`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) translateZ(0)';
      });
    });
  }
  
  // Observer pour animations
  function observeServices(services) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('services--visible');
          
          // Animate elements
          animateElements(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(services);
  }
  
  // Animate elements
  function animateElements(container) {
    const elements = container.querySelectorAll('.service__card, .service__hex, .service__item, .service__slide, .service__box, .service__float, .service__glass');
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          element.style.transition = 'all 0.6s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 50);
      }, index * 100);
    });
  }
  
  // Service comparison
  function initComparison() {
    const compareBtns = document.querySelectorAll('[data-compare]');
    const compareBar = document.querySelector('.services__compare-bar');
    const compareList = document.querySelector('.services__compare-list');
    let selectedServices = [];
    
    compareBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const serviceId = btn.dataset.compare;
        const serviceName = btn.dataset.serviceName;
        
        if (selectedServices.find(s => s.id === serviceId)) {
          // Remove from comparison
          selectedServices = selectedServices.filter(s => s.id !== serviceId);
          btn.classList.remove('active');
        } else if (selectedServices.length < 3) {
          // Add to comparison
          selectedServices.push({ id: serviceId, name: serviceName });
          btn.classList.add('active');
        } else {
          // Show message
          showToast('Maximum 3 services en comparaison');
        }
        
        updateCompareBar();
      });
    });
    
    function updateCompareBar() {
      if (!compareBar || !compareList) return;
      
      if (selectedServices.length > 0) {
        compareBar.classList.add('active');
        compareList.innerHTML = selectedServices.map(s => \`
          <div class="services__compare-item">
            <span>\${s.name}</span>
            <button data-remove="\${s.id}">×</button>
          </div>
        \`).join('');
        
        // Remove buttons
        compareList.querySelectorAll('[data-remove]').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.remove;
            document.querySelector(\`[data-compare="\${id}"]\`)?.click();
          });
        });
      } else {
        compareBar.classList.remove('active');
      }
    }
  }
  
  // Toast notification
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'services__toast';
    toast.textContent = message;
    toast.style.cssText = \`
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #1f2937;
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    \`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  // Prix calculator
  function initPriceCalculator() {
    const calculators = document.querySelectorAll('.service__calculator');
    
    calculators.forEach(calc => {
      const inputs = calc.querySelectorAll('input[type="checkbox"]');
      const totalElement = calc.querySelector('.service__total');
      
      function updateTotal() {
        let total = 0;
        
        inputs.forEach(input => {
          if (input.checked) {
            total += parseFloat(input.dataset.price || 0);
          }
        });
        
        if (totalElement) {
          totalElement.textContent = total.toFixed(2) + '€';
          totalElement.style.transform = 'scale(1.1)';
          setTimeout(() => {
            totalElement.style.transform = 'scale(1)';
          }, 300);
        }
      }
      
      inputs.forEach(input => {
        input.addEventListener('change', updateTotal);
      });
      
      // Initial calculation
      updateTotal();
    });
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initServices();
      initComparison();
      initPriceCalculator();
    });
  } else {
    initServices();
    initComparison();
    initPriceCalculator();
  }
  
  // Export pour usage externe
  window.ServicesPerfect = {
    init: initServices,
    showToast: showToast
  };
})();
    `;
  }

  render(data: ServicesData, context?: RenderContext): RenderResult {
    try {
      // Validation des données
      const validation = this.validate(data);
      if (!validation.success) {
        logger.error('ServicesRendererV3Perfect', 'render', 'Validation échouée', validation.error);
        return {
          html: this.renderError('Données invalides'),
          css: this.getDefaultCSS(),
          js: this.getDefaultJS(),
          errors: validation.error.errors.map(e => ({
            message: e.message,
            path: e.path.join('.')
          }))
        };
      }

      const validData = validation.data;
      logger.info('ServicesRendererV3Perfect', 'render', 'Rendu Services avec variante:', validData.variant);

      // Générer le HTML selon la variante
      const html = this.renderVariant(validData);
      
      // CSS avec variables personnalisées
      const customCSS = this.generateCustomCSS(validData);
      
      return {
        html,
        css: this.getDefaultCSS() + customCSS,
        js: this.getDefaultJS()
      };
      
    } catch (error) {
      logger.error('ServicesRendererV3Perfect', 'render', 'Erreur lors du rendu', error);
      return {
        html: this.renderError('Erreur lors du rendu'),
        css: this.getDefaultCSS(),
        js: this.getDefaultJS(),
        errors: [{ message: error instanceof Error ? error.message : 'Erreur inconnue' }]
      };
    }
  }

  private renderVariant(data: ServicesData): string {
    // Header commun
    const header = data.showHeader !== false ? `
      <div class="services__header">
        <h2 class="services__title">${this.escapeHtml(data.title)}</h2>
        ${data.subtitle ? `<p class="services__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
      </div>
      ${data.showFilters ? this.renderFilters(data) : ''}
    ` : '';

    // Rendu selon la variante
    let content = '';
    switch(data.variant) {
      case 'cards-hover-3d':
        content = this.renderCardsHover3D(data);
        break;
      case 'hexagon-grid':
        content = this.renderHexagonGrid(data);
        break;
      case 'timeline':
        content = this.renderTimeline(data);
        break;
      case 'carousel-interactive':
        content = this.renderCarouselInteractive(data);
        break;
      case 'bento-box':
        content = this.renderBentoBox(data);
        break;
      case 'floating-icons':
        content = this.renderFloatingIcons(data);
        break;
      case 'interactive-map':
        content = this.renderInteractiveMap(data);
        break;
      case 'glassmorphism-cards':
        content = this.renderGlassmorphismCards(data);
        break;
      default:
        content = this.renderCardsHover3D(data);
    }

    return `
      <section class="services services--${data.variant} ${data.animation?.enabled ? 'services--animated' : ''}" id="${data.id || 'services'}">
        <div class="services__container">
          ${header}
          ${content}
        </div>
      </section>
    `;
  }

  private renderFilters(data: ServicesData): string {
    const categories = this.extractCategories(data.services);
    
    return `
      <div class="services__filters">
        <button class="services__filter active" data-filter="all">Tous</button>
        ${categories.map(cat => `
          <button class="services__filter" data-filter="${cat.toLowerCase()}">${this.escapeHtml(cat)}</button>
        `).join('')}
      </div>
    `;
  }

  private renderCardsHover3D(data: ServicesData): string {
    return `
      <div class="services__grid">
        ${data.services.map(service => this.renderServiceCard3D(service)).join('')}
      </div>
    `;
  }

  private renderServiceCard3D(service: any): string {
    return `
      <article class="service__card" ${service.category ? `data-category="${service.category.toLowerCase()}"` : ''}>
        ${service.badge ? `<span class="service__badge">${this.escapeHtml(service.badge)}</span>` : ''}
        <div class="service__icon">${service.icon || '🚀'}</div>
        <h3 class="service__name">${this.escapeHtml(service.name)}</h3>
        ${service.description ? `<p class="service__description">${this.escapeHtml(service.description)}</p>` : ''}
        
        ${service.features && service.features.length > 0 ? `
          <ul class="service__features">
            ${service.features.map(feature => `
              <li class="service__feature">${this.escapeHtml(feature)}</li>
            `).join('')}
          </ul>
        ` : ''}
        
        ${service.price ? `
          <div class="service__pricing">
            <div class="service__price">${service.price}€</div>
            ${service.period ? `<div class="service__price-period">/${service.period}</div>` : ''}
          </div>
        ` : ''}
        
        ${service.link ? `
          <a href="${service.link.url}" class="service__link">
            ${this.escapeHtml(service.link.text || 'En savoir plus')} <span>→</span>
          </a>
        ` : ''}
      </article>
    `;
  }

  private renderHexagonGrid(data: ServicesData): string {
    return `
      <div class="services__hexgrid">
        ${data.services.map((service, index) => `
          <div class="service__hex">
            <div class="service__hex-inner">
              <div class="service__hex-content">
                <div class="service__hex-icon">${service.icon || '⬡'}</div>
                <h3 class="service__hex-title">${this.escapeHtml(service.name)}</h3>
                ${service.shortDescription ? `<p>${this.escapeHtml(service.shortDescription)}</p>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderTimeline(data: ServicesData): string {
    return `
      <div class="services__timeline">
        <div class="services__line"></div>
        ${data.services.map((service, index) => `
          <div class="service__item">
            <div class="service__content">
              <h3>${this.escapeHtml(service.name)}</h3>
              ${service.description ? `<p>${this.escapeHtml(service.description)}</p>` : ''}
              ${service.price ? `<div class="service__price">${service.price}€</div>` : ''}
              ${service.link ? `
                <a href="${service.link.url}" class="service__cta">
                  ${this.escapeHtml(service.link.text || 'Découvrir')}
                </a>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderCarouselInteractive(data: ServicesData): string {
    return `
      <div class="services__carousel" ${data.autoplay ? 'data-autoplay="true"' : ''}>
        <div class="services__track">
          ${data.services.map((service, index) => `
            <div class="service__slide ${index === 0 ? 'active' : ''}">
              <div class="service__icon">${service.icon || '🎯'}</div>
              <h3>${this.escapeHtml(service.name)}</h3>
              ${service.description ? `<p>${this.escapeHtml(service.description)}</p>` : ''}
              ${service.price ? `
                <div class="service__price">${service.price}€${service.period ? `/${service.period}` : ''}</div>
              ` : ''}
              ${service.link ? `
                <a href="${service.link.url}" class="service__cta">
                  ${this.escapeHtml(service.link.text || 'En savoir plus')}
                </a>
              ` : ''}
            </div>
          `).join('')}
        </div>
        <div class="services__nav">
          <button class="services__nav-btn services__nav-btn--prev">←</button>
          <button class="services__nav-btn services__nav-btn--next">→</button>
        </div>
        <div class="services__dots"></div>
      </div>
    `;
  }

  private renderBentoBox(data: ServicesData): string {
    return `
      <div class="services__bento">
        ${data.services.map((service, index) => {
          const classes = ['service__box'];
          if (index === 0 && service.featured) classes.push('service__box--large');
          if (index === 1) classes.push('service__box--wide');
          if (index === 2) classes.push('service__box--tall');
          if (service.featured) classes.push('service__box--featured');
          
          return `
            <div class="${classes.join(' ')}">
              <div class="service__icon">${service.icon || '📦'}</div>
              <h3 class="service__title">${this.escapeHtml(service.name)}</h3>
              ${service.description ? `<p class="service__description">${this.escapeHtml(service.description)}</p>` : ''}
              ${service.link ? `
                <a href="${service.link.url}" class="service__cta">
                  ${this.escapeHtml(service.link.text || 'Découvrir')}
                </a>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  private renderFloatingIcons(data: ServicesData): string {
    return `
      <div class="services__center">
        <h2 class="services__title">${this.escapeHtml(data.title)}</h2>
        ${data.subtitle ? `<p class="services__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
      </div>
      <div class="services__orbits">
        <div class="service__orbit"></div>
        <div class="service__orbit"></div>
        <div class="service__orbit"></div>
      </div>
      ${data.services.map(service => `
        <div class="service__float">
          <div class="service__float-icon">${service.icon || '🌟'}</div>
          <div class="service__float-title">${this.escapeHtml(service.name)}</div>
        </div>
      `).join('')}
    `;
  }

  private renderInteractiveMap(data: ServicesData): string {
    return `
      <div class="services__map">
        <div class="services__map-bg"></div>
        ${data.services.map((service, index) => `
          <div class="service__pin" data-number="${index + 1}"></div>
          <div class="service__popup">
            <h4>${this.escapeHtml(service.name)}</h4>
            ${service.description ? `<p>${this.escapeHtml(service.description)}</p>` : ''}
            ${service.link ? `
              <a href="${service.link.url}">${this.escapeHtml(service.link.text || 'Détails')} →</a>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderGlassmorphismCards(data: ServicesData): string {
    return `
      <div class="services__grid">
        ${data.services.map(service => `
          <div class="service__glass">
            <div class="service__glass-icon">${service.icon || '✨'}</div>
            <h3 class="service__glass-title">${this.escapeHtml(service.name)}</h3>
            ${service.description ? `
              <p class="service__glass-description">${this.escapeHtml(service.description)}</p>
            ` : ''}
            ${service.link ? `
              <a href="${service.link.url}" class="service__glass-link">
                ${this.escapeHtml(service.link.text || 'Explorer')} <span>→</span>
              </a>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  private extractCategories(services: any[]): string[] {
    const categories = new Set<string>();
    services.forEach(service => {
      if (service.category) {
        categories.add(service.category);
      }
    });
    return Array.from(categories);
  }

  private generateCustomCSS(data: ServicesData): string {
    let css = '\n/* Custom Services Styles */\n';
    
    // Couleurs personnalisées
    if (data.styles?.colors) {
      const colors = data.styles.colors;
      css += `.services {
        --services-primary: ${colors.primary || '#667eea'};
        --services-secondary: ${colors.secondary || '#764ba2'};
        --services-accent: ${colors.accent || '#f093fb'};
        --services-text: ${colors.text || '#4b5563'};
        --services-heading: ${colors.heading || '#1f2937'};
        --services-bg: ${colors.background || '#ffffff'};
      }\n`;
    }

    // Layout personnalisé
    if (data.layout) {
      if (data.layout.columns) {
        css += `.services__grid {
          grid-template-columns: repeat(${data.layout.columns}, 1fr);
        }\n`;
      }
      if (data.layout.gap) {
        const gapSizes = { sm: '1rem', md: '2rem', lg: '3rem', xl: '4rem' };
        css += `.services__grid {
          gap: ${gapSizes[data.layout.gap] || '2rem'};
        }\n`;
      }
    }

    return css;
  }

  private renderError(message: string): string {
    return `
      <div class="services-error" style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 0.5rem; color: #c00;">
        <strong>Erreur Services:</strong> ${this.escapeHtml(message)}
      </div>
    `;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

export const servicesRendererV3Perfect = new ServicesRendererV3Perfect();