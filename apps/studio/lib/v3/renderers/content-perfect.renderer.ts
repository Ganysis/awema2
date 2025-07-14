/**
 * Content Renderer V3 PERFECT - Design magnifique et ergonomie parfaite
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';
import { contentDataSchema, contentDefaults, type ContentData } from '../schemas/blocks/content';
import { logger } from '../core/logger';

export class ContentRendererV3Perfect extends BaseRendererV3<ContentData> {
  type = 'content-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('ContentRendererV3Perfect', 'constructor', '🚀 Initialisation du renderer Content V3 PERFECT');
  }

  validate(data: unknown): z.SafeParseReturnType<ContentData, ContentData> {
    return contentDataSchema.safeParse(data);
  }

  getDefaultData(): ContentData {
    return contentDefaults;
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
   CONTENT V3 PERFECT - Styles magnifiques
   ======================================== */

.content {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  background: var(--content-bg, #ffffff);
}

.content__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ========================================
   VARIANTES SPECTACULAIRES
   ======================================== */

/* 1. Magazine Layout - Style magazine moderne */
.content--magazine-layout {
  font-family: 'Georgia', serif;
}

.content--magazine-layout .content__wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

.content--magazine-layout .content__header {
  text-align: center;
  padding-bottom: 3rem;
  border-bottom: 3px double #e5e7eb;
  margin-bottom: 3rem;
}

.content--magazine-layout .content__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.content--magazine-layout .content__meta {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.content--magazine-layout .content__body {
  column-count: 2;
  column-gap: 3rem;
  column-rule: 1px solid #e5e7eb;
  text-align: justify;
  hyphens: auto;
}

.content--magazine-layout .content__body > *:first-child {
  margin-top: 0;
}

.content--magazine-layout .content__dropcap {
  float: left;
  font-size: 5rem;
  line-height: 0.8;
  margin: 0.1em 0.1em 0 0;
  font-weight: 700;
  color: #667eea;
}

.content--magazine-layout .content__pullquote {
  font-size: 1.5rem;
  font-style: italic;
  text-align: center;
  margin: 3rem 0;
  padding: 2rem;
  border-top: 3px solid #667eea;
  border-bottom: 3px solid #667eea;
  column-span: all;
  color: #374151;
}

/* 2. Blog Modern - Blog moderne avec sidebar */
.content--blog-modern .content__wrapper {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 4rem;
}

.content--blog-modern .content__main {
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.content--blog-modern .content__sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content--blog-modern .content__widget {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1);
}

.content--blog-modern .content__widget-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
}

.content--blog-modern .content__toc {
  list-style: none;
  padding: 0;
  margin: 0;
}

.content--blog-modern .content__toc-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.content--blog-modern .content__toc-link {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.content--blog-modern .content__toc-link:hover {
  color: #667eea;
}

.content--blog-modern .content__toc-link.active {
  color: #667eea;
  font-weight: 600;
}

/* 3. Timeline Story - Histoire chronologique */
.content--timeline-story .content__timeline {
  position: relative;
  padding-left: 3rem;
}

.content--timeline-story .content__timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #667eea, #764ba2, #f093fb);
}

.content--timeline-story .content__chapter {
  position: relative;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateX(-20px);
  animation: contentSlideIn 0.6s ease-out forwards;
}

.content--timeline-story .content__chapter:nth-child(1) { animation-delay: 0.1s; }
.content--timeline-story .content__chapter:nth-child(2) { animation-delay: 0.2s; }
.content--timeline-story .content__chapter:nth-child(3) { animation-delay: 0.3s; }
.content--timeline-story .content__chapter:nth-child(4) { animation-delay: 0.4s; }

@keyframes contentSlideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.content--timeline-story .content__chapter::before {
  content: attr(data-year);
  position: absolute;
  left: -45px;
  top: 0;
  width: 30px;
  height: 30px;
  background: white;
  border: 3px solid #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  color: #667eea;
}

.content--timeline-story .content__chapter.active::before {
  background: #667eea;
  color: white;
  transform: scale(1.2);
}

.content--timeline-story .content__chapter-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.content--timeline-story .content__chapter-content {
  color: #4b5563;
  line-height: 1.8;
}

/* 4. Cards Grid - Grille de cartes */
.content--cards-grid .content__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.content--cards-grid .content__card {
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.content--cards-grid .content__card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.15);
}

.content--cards-grid .content__card-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.content--cards-grid .content__card-body {
  padding: 2rem;
}

.content--cards-grid .content__card-category {
  display: inline-block;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.content--cards-grid .content__card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.content--cards-grid .content__card-excerpt {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.content--cards-grid .content__card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: gap 0.3s;
}

.content--cards-grid .content__card-link:hover {
  gap: 1rem;
}

/* 5. Split Content - Contenu divisé */
.content--split-content .content__section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;
}

.content--split-content .content__section:nth-child(even) {
  direction: rtl;
}

.content--split-content .content__section:nth-child(even) > * {
  direction: ltr;
}

.content--split-content .content__text {
  padding: 2rem;
}

.content--split-content .content__text h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.content--split-content .content__text p {
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.content--split-content .content__visual {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.2);
}

.content--split-content .content__visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content--split-content .content__visual::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  opacity: 0;
  transition: opacity 0.3s;
}

.content--split-content .content__visual:hover::before {
  opacity: 1;
}

/* 6. Accordion Tabs - Accordéon et onglets */
.content--accordion-tabs .content__tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  border-bottom: 2px solid #e5e7eb;
}

.content--accordion-tabs .content__tab {
  padding: 1rem 2rem;
  background: none;
  border: none;
  font-size: 1.125rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.content--accordion-tabs .content__tab:hover {
  color: #4b5563;
}

.content--accordion-tabs .content__tab.active {
  color: #667eea;
}

.content--accordion-tabs .content__tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.content--accordion-tabs .content__panels {
  position: relative;
  min-height: 400px;
}

.content--accordion-tabs .content__panel {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s;
}

.content--accordion-tabs .content__panel.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  position: relative;
}

.content--accordion-tabs .content__accordion {
  margin-top: 2rem;
}

.content--accordion-tabs .content__accordion-item {
  background: white;
  border-radius: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1);
}

.content--accordion-tabs .content__accordion-header {
  padding: 1.5rem 2rem;
  background: #f9fafb;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
}

.content--accordion-tabs .content__accordion-header:hover {
  background: #f3f4f6;
}

.content--accordion-tabs .content__accordion-item.active .content__accordion-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.content--accordion-tabs .content__accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
}

.content--accordion-tabs .content__accordion-item.active .content__accordion-content {
  max-height: 500px;
  padding: 2rem;
}

/* 7. Comparison Table - Tableau comparatif */
.content--comparison-table .content__comparison {
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.content--comparison-table .content__table {
  width: 100%;
  border-collapse: collapse;
}

.content--comparison-table th,
.content--comparison-table td {
  padding: 1.5rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.content--comparison-table thead {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.content--comparison-table th {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}

.content--comparison-table tbody tr:hover {
  background: #f9fafb;
}

.content--comparison-table .content__badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.content--comparison-table .content__badge--success {
  background: #d1fae5;
  color: #065f46;
}

.content--comparison-table .content__badge--warning {
  background: #fed7aa;
  color: #92400e;
}

.content--comparison-table .content__badge--info {
  background: #dbeafe;
  color: #1e40af;
}

/* 8. Interactive Story - Histoire interactive */
.content--interactive-story {
  background: #0f172a;
  color: white;
}

.content--interactive-story .content__scene {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0;
  transition: opacity 1s;
}

.content--interactive-story .content__scene.active {
  opacity: 1;
}

.content--interactive-story .content__scene-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.content--interactive-story .content__scene-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
}

.content--interactive-story .content__scene-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 800px;
  padding: 3rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
}

.content--interactive-story .content__scene-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content--interactive-story .content__scene-text {
  font-size: 1.25rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.content--interactive-story .content__choices {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.content--interactive-story .content__choice {
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.content--interactive-story .content__choice:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Éléments communs */
.content__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.content__subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.content__body {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #4b5563;
}

.content__body h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 3rem 0 1.5rem;
  color: #1f2937;
}

.content__body h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2.5rem 0 1rem;
  color: #374151;
}

.content__body p {
  margin-bottom: 1.5rem;
}

.content__body ul,
.content__body ol {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.content__body li {
  margin-bottom: 0.5rem;
}

.content__body blockquote {
  margin: 2rem 0;
  padding: 1.5rem 2rem;
  background: #f9fafb;
  border-left: 4px solid #667eea;
  font-style: italic;
  color: #374151;
}

.content__body pre {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #1f2937;
  color: #e5e7eb;
  border-radius: 0.75rem;
  overflow-x: auto;
}

.content__body code {
  background: #f3f4f6;
  color: #667eea;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.content__body pre code {
  background: none;
  color: inherit;
  padding: 0;
}

/* Images */
.content__image {
  width: 100%;
  border-radius: 1rem;
  margin: 2rem 0;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.2);
}

.content__image-caption {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
  font-style: italic;
}

/* Call to action inline */
.content__cta-inline {
  margin: 3rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 1rem;
  text-align: center;
}

.content__cta-inline h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.content__cta-inline p {
  margin-bottom: 1.5rem;
  color: #4b5563;
}

.content__cta-inline a {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s;
}

.content__cta-inline a:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px rgba(102, 126, 234, 0.4);
}

/* Animations */
.content--animated .content__title,
.content--animated .content__subtitle,
.content--animated .content__body > * {
  opacity: 0;
  animation: contentFadeUp 0.8s ease-out forwards;
}

.content--animated .content__title { animation-delay: 0.1s; }
.content--animated .content__subtitle { animation-delay: 0.2s; }
.content--animated .content__body > *:nth-child(1) { animation-delay: 0.3s; }
.content--animated .content__body > *:nth-child(2) { animation-delay: 0.4s; }
.content--animated .content__body > *:nth-child(3) { animation-delay: 0.5s; }
.content--animated .content__body > *:nth-child(4) { animation-delay: 0.6s; }

@keyframes contentFadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Progress reading bar */
.content__progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
  z-index: 9999;
}

/* Responsive */
@media (max-width: 768px) {
  .content--magazine-layout .content__body {
    column-count: 1;
  }
  
  .content--blog-modern .content__wrapper {
    grid-template-columns: 1fr;
  }
  
  .content--split-content .content__section {
    grid-template-columns: 1fr;
  }
  
  .content--split-content .content__section:nth-child(even) {
    direction: ltr;
  }
  
  .content--accordion-tabs .content__tabs {
    flex-direction: column;
    border-bottom: none;
  }
  
  .content--accordion-tabs .content__tab.active::after {
    display: none;
  }
  
  .content--cards-grid .content__grid {
    grid-template-columns: 1fr;
  }
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .content {
    background: #0f172a;
  }
  
  .content__title {
    color: white;
  }
  
  .content__subtitle,
  .content__body {
    color: #cbd5e1;
  }
  
  .content__body h2,
  .content__body h3 {
    color: white;
  }
  
  .content__body blockquote {
    background: #1e293b;
    border-left-color: #667eea;
    color: #cbd5e1;
  }
  
  .content__body code {
    background: #1e293b;
    color: #667eea;
  }
  
  .content--blog-modern .content__main,
  .content--blog-modern .content__widget,
  .content--cards-grid .content__card,
  .content--accordion-tabs .content__accordion-item {
    background: #1e293b;
  }
  
  .content--comparison-table .content__comparison {
    background: #1e293b;
  }
  
  .content--comparison-table th,
  .content--comparison-table td {
    border-color: #334155;
  }
  
  .content--comparison-table tbody tr:hover {
    background: #334155;
  }
}
    `;
  }

  getDefaultJS(): string {
    return `
// Content V3 Perfect - JavaScript interactif
(function() {
  'use strict';
  
  // Initialisation Content
  function initContent() {
    const contents = document.querySelectorAll('.content');
    
    contents.forEach(content => {
      const variant = Array.from(content.classList).find(c => c.startsWith('content--'))?.replace('content--', '');
      
      // Progress bar
      initProgressBar(content);
      
      // Table of contents
      initTableOfContents(content);
      
      // Variantes spécifiques
      switch(variant) {
        case 'timeline-story':
          initTimelineStory(content);
          break;
        case 'accordion-tabs':
          initAccordionTabs(content);
          break;
        case 'interactive-story':
          initInteractiveStory(content);
          break;
        case 'cards-grid':
          initCardsGrid(content);
          break;
      }
      
      // Animations d'entrée
      observeContent(content);
      
      // Reading time
      calculateReadingTime(content);
    });
  }
  
  // Progress bar de lecture
  function initProgressBar(content) {
    const progressBar = document.createElement('div');
    progressBar.className = 'content__progress';
    document.body.appendChild(progressBar);
    
    let ticking = false;
    
    function updateProgress() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;
          const scrolled = window.scrollY;
          const progress = scrolled / documentHeight;
          
          progressBar.style.transform = \`scaleX(\${progress})\`;
          
          ticking = false;
        });
        
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }
  
  // Table des matières
  function initTableOfContents(content) {
    const toc = content.querySelector('.content__toc');
    if (!toc) return;
    
    const headings = content.querySelectorAll('h2, h3');
    const tocItems = [];
    
    // Créer les liens
    headings.forEach((heading, index) => {
      const id = \`heading-\${index}\`;
      heading.id = id;
      
      const level = heading.tagName.toLowerCase();
      const item = document.createElement('li');
      item.className = \`content__toc-item content__toc-item--\${level}\`;
      
      const link = document.createElement('a');
      link.href = \`#\${id}\`;
      link.className = 'content__toc-link';
      link.textContent = heading.textContent;
      
      if (level === 'h3') {
        link.style.paddingLeft = '1rem';
      }
      
      item.appendChild(link);
      tocItems.push({ element: item, target: heading, link });
    });
    
    // Ajouter au TOC
    toc.innerHTML = '';
    tocItems.forEach(item => toc.appendChild(item.element));
    
    // Smooth scroll
    tocItems.forEach(item => {
      item.link.addEventListener('click', (e) => {
        e.preventDefault();
        item.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    
    // Active state on scroll
    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = Array.from(headings).indexOf(entry.target);
        if (index !== -1) {
          if (entry.isIntersecting) {
            tocItems.forEach(item => item.link.classList.remove('active'));
            tocItems[index].link.classList.add('active');
          }
        }
      });
    }, observerOptions);
    
    headings.forEach(heading => observer.observe(heading));
  }
  
  // Timeline Story
  function initTimelineStory(content) {
    const chapters = content.querySelectorAll('.content__chapter');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.5 });
    
    chapters.forEach(chapter => observer.observe(chapter));
  }
  
  // Accordion Tabs
  function initAccordionTabs(content) {
    // Tabs
    const tabs = content.querySelectorAll('.content__tab');
    const panels = content.querySelectorAll('.content__panel');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        if (panels[index]) {
          panels[index].classList.add('active');
        }
      });
    });
    
    // Accordion items
    const accordionItems = content.querySelectorAll('.content__accordion-item');
    
    accordionItems.forEach(item => {
      const header = item.querySelector('.content__accordion-header');
      
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        accordionItems.forEach(i => i.classList.remove('active'));
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
  
  // Interactive Story
  function initInteractiveStory(content) {
    const scenes = content.querySelectorAll('.content__scene');
    let currentScene = 0;
    
    // Show first scene
    if (scenes.length > 0) {
      scenes[currentScene].classList.add('active');
    }
    
    // Handle choices
    const choices = content.querySelectorAll('.content__choice');
    
    choices.forEach(choice => {
      choice.addEventListener('click', (e) => {
        e.preventDefault();
        
        const nextSceneId = choice.getAttribute('data-next-scene');
        if (nextSceneId) {
          // Hide current scene
          scenes[currentScene].classList.remove('active');
          
          // Find and show next scene
          const nextScene = content.querySelector(\`#\${nextSceneId}\`);
          if (nextScene) {
            const nextIndex = Array.from(scenes).indexOf(nextScene);
            if (nextIndex !== -1) {
              currentScene = nextIndex;
              nextScene.classList.add('active');
              
              // Scroll to scene
              nextScene.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }
        
        // Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'story_choice', {
            choice_text: choice.textContent,
            scene_id: nextSceneId
          });
        }
      });
    });
  }
  
  // Cards Grid
  function initCardsGrid(content) {
    const cards = content.querySelectorAll('.content__card');
    
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const link = card.querySelector('.content__card-link');
        if (link) {
          window.location.href = link.href;
        }
      });
    });
  }
  
  // Calculate reading time
  function calculateReadingTime(content) {
    const text = content.textContent || '';
    const wordsPerMinute = 200;
    const words = text.trim().split(/\\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    
    const readingTimeElement = content.querySelector('.content__reading-time');
    if (readingTimeElement) {
      readingTimeElement.textContent = \`\${minutes} min de lecture\`;
    }
  }
  
  // Observer pour animations
  function observeContent(content) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('content--visible');
          
          // Animate elements
          animateElements(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = content.querySelectorAll('.content__title, .content__subtitle, .content__body > *, .content__card');
    elements.forEach(el => observer.observe(el));
  }
  
  // Animate elements
  function animateElements(container) {
    const animatedElements = container.querySelectorAll('[data-animate]');
    
    animatedElements.forEach((element, index) => {
      const animationType = element.dataset.animate || 'fade';
      const delay = index * 100;
      
      setTimeout(() => {
        element.style.opacity = '0';
        
        switch(animationType) {
          case 'slide':
            element.style.transform = 'translateX(-30px)';
            break;
          case 'zoom':
            element.style.transform = 'scale(0.8)';
            break;
          default:
            element.style.transform = 'translateY(20px)';
        }
        
        setTimeout(() => {
          element.style.transition = 'all 0.6s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'none';
        }, 50);
      }, delay);
    });
  }
  
  // Copy code blocks
  function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
      const button = document.createElement('button');
      button.className = 'content__code-copy';
      button.textContent = 'Copier';
      button.style.cssText = \`
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        padding: 0.25rem 0.75rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 0.25rem;
        color: #e5e7eb;
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 0.3s;
      \`;
      
      block.style.position = 'relative';
      block.appendChild(button);
      
      button.addEventListener('click', async () => {
        const code = block.querySelector('code')?.textContent || block.textContent;
        
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = '✓ Copié !';
          button.style.background = '#10b981';
          
          setTimeout(() => {
            button.textContent = 'Copier';
            button.style.background = 'rgba(255, 255, 255, 0.1)';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }
  
  // Image zoom
  function initImageZoom() {
    const images = document.querySelectorAll('.content__image');
    
    images.forEach(img => {
      img.style.cursor = 'zoom-in';
      
      img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.className = 'content__image-overlay';
        overlay.style.cssText = \`
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: zoom-out;
          opacity: 0;
          transition: opacity 0.3s;
        \`;
        
        const zoomedImg = img.cloneNode();
        zoomedImg.style.cssText = \`
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          transform: scale(0.8);
          transition: transform 0.3s;
        \`;
        
        overlay.appendChild(zoomedImg);
        document.body.appendChild(overlay);
        
        // Force reflow
        overlay.offsetHeight;
        
        overlay.style.opacity = '1';
        zoomedImg.style.transform = 'scale(1)';
        
        overlay.addEventListener('click', () => {
          overlay.style.opacity = '0';
          zoomedImg.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            overlay.remove();
          }, 300);
        });
      });
    });
  }
  
  // Share functionality
  function initShare() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const platform = button.dataset.share;
        const url = window.location.href;
        const title = document.title;
        
        switch(platform) {
          case 'native':
            if (navigator.share) {
              try {
                await navigator.share({
                  title: title,
                  url: url
                });
              } catch (err) {
                console.log('Share cancelled');
              }
            }
            break;
            
          case 'twitter':
            window.open(\`https://twitter.com/intent/tweet?text=\${encodeURIComponent(title)}&url=\${encodeURIComponent(url)}\`);
            break;
            
          case 'facebook':
            window.open(\`https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(url)}\`);
            break;
            
          case 'linkedin':
            window.open(\`https://www.linkedin.com/sharing/share-offsite/?url=\${encodeURIComponent(url)}\`);
            break;
            
          case 'copy':
            try {
              await navigator.clipboard.writeText(url);
              button.textContent = '✓ Lien copié !';
              setTimeout(() => {
                button.textContent = button.dataset.originalText || 'Copier le lien';
              }, 2000);
            } catch (err) {
              console.error('Failed to copy:', err);
            }
            break;
        }
      });
    });
  }
  
  // Print friendly
  function initPrint() {
    const printButton = document.querySelector('[data-print]');
    if (!printButton) return;
    
    printButton.addEventListener('click', () => {
      window.print();
    });
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initContent();
      initCodeCopy();
      initImageZoom();
      initShare();
      initPrint();
    });
  } else {
    initContent();
    initCodeCopy();
    initImageZoom();
    initShare();
    initPrint();
  }
  
  // Export pour usage externe
  window.ContentPerfect = {
    init: initContent,
    calculateReadingTime: calculateReadingTime
  };
})();
    `;
  }

  render(data: ContentData, context?: RenderContext): RenderResult {
    try {
      // Validation des données
      const validation = this.validate(data);
      if (!validation.success) {
        logger.error('ContentRendererV3Perfect', 'render', 'Validation échouée', validation.error);
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
      logger.info('ContentRendererV3Perfect', 'render', 'Rendu Content avec variante:', validData.variant);

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
      logger.error('ContentRendererV3Perfect', 'render', 'Erreur lors du rendu', error);
      return {
        html: this.renderError('Erreur lors du rendu'),
        css: this.getDefaultCSS(),
        js: this.getDefaultJS(),
        errors: [{ message: error instanceof Error ? error.message : 'Erreur inconnue' }]
      };
    }
  }

  private renderVariant(data: ContentData): string {
    let content = '';
    
    switch(data.variant) {
      case 'magazine-layout':
        content = this.renderMagazineLayout(data);
        break;
      case 'blog-modern':
        content = this.renderBlogModern(data);
        break;
      case 'timeline-story':
        content = this.renderTimelineStory(data);
        break;
      case 'cards-grid':
        content = this.renderCardsGrid(data);
        break;
      case 'split-content':
        content = this.renderSplitContent(data);
        break;
      case 'accordion-tabs':
        content = this.renderAccordionTabs(data);
        break;
      case 'comparison-table':
        content = this.renderComparisonTable(data);
        break;
      case 'interactive-story':
        content = this.renderInteractiveStory(data);
        break;
      default:
        content = this.renderMagazineLayout(data);
    }

    return `
      <section class="content content--${data.variant} ${data.animation?.enabled ? 'content--animated' : ''}" id="${data.id || 'content'}">
        <div class="content__container">
          ${content}
        </div>
      </section>
    `;
  }

  private renderMagazineLayout(data: ContentData): string {
    return `
      <div class="content__wrapper">
        <header class="content__header">
          <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
          ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
          ${data.meta ? this.renderMeta(data.meta) : ''}
        </header>
        <div class="content__body">
          ${data.content ? this.renderRichContent(data.content) : ''}
        </div>
      </div>
    `;
  }

  private renderBlogModern(data: ContentData): string {
    return `
      <div class="content__wrapper">
        <main class="content__main">
          <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
          ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
          ${data.meta ? this.renderMeta(data.meta) : ''}
          <div class="content__body">
            ${data.content ? this.renderRichContent(data.content) : ''}
          </div>
        </main>
        <aside class="content__sidebar">
          ${data.sidebar ? this.renderSidebar(data.sidebar) : ''}
        </aside>
      </div>
    `;
  }

  private renderTimelineStory(data: ContentData): string {
    const chapters = data.chapters || [];
    
    return `
      <div class="content__timeline">
        <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        ${chapters.map((chapter, index) => `
          <div class="content__chapter" data-year="${chapter.year || index + 1}">
            <h2 class="content__chapter-title">${this.escapeHtml(chapter.title)}</h2>
            <div class="content__chapter-content">
              ${chapter.content}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderCardsGrid(data: ContentData): string {
    const cards = data.cards || [];
    
    return `
      <div>
        <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__grid">
          ${cards.map(card => `
            <article class="content__card">
              ${card.image ? `<img src="${card.image?.url || card.image}" alt="${card.image?.alt || ''}" class="content__card-image">` : ''}
              <div class="content__card-body">
                ${card.category ? `<span class="content__card-category">${this.escapeHtml(card.category)}</span>` : ''}
                <h3 class="content__card-title">${this.escapeHtml(card.title)}</h3>
                <p class="content__card-excerpt">${this.escapeHtml(card.excerpt || '')}</p>
                <a href="${card.link?.url || card.link || '#'}" class="content__card-link">
                  Lire la suite <span>→</span>
                </a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderSplitContent(data: ContentData): string {
    const sections = data.sections || [];
    
    return `
      <div>
        <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        ${sections.map(section => `
          <div class="content__section">
            <div class="content__text">
              <h3>${this.escapeHtml(section.title)}</h3>
              <p>${section.content}</p>
              ${section.link ? `<a href="${section.link?.url || section.link}" class="content__link">${this.escapeHtml(section.link?.text || 'En savoir plus')} →</a>` : ''}
            </div>
            <div class="content__visual">
              ${section.image ? `<img src="${section.image?.url || section.image}" alt="${section.image?.alt || ''}">` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderAccordionTabs(data: ContentData): string {
    const tabs = data.tabs || [];
    
    return `
      <div>
        <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__tabs">
          ${tabs.map((tab, index) => `
            <button class="content__tab ${index === 0 ? 'active' : ''}" data-tab="${index}">
              ${this.escapeHtml(tab.title)}
            </button>
          `).join('')}
        </div>
        
        <div class="content__panels">
          ${tabs.map((tab, index) => `
            <div class="content__panel ${index === 0 ? 'active' : ''}">
              <div>${tab.content}</div>
              
              ${tab.accordion && tab.accordion.length > 0 ? `
                <div class="content__accordion">
                  ${tab.accordion.map(item => `
                    <div class="content__accordion-item">
                      <div class="content__accordion-header">
                        <span>${this.escapeHtml(item.question)}</span>
                        <span>+</span>
                      </div>
                      <div class="content__accordion-content">
                        <div>${item.answer}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderComparisonTable(data: ContentData): string {
    const comparison = data.comparison || { headers: [], rows: [] };
    
    return `
      <div>
        <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__comparison">
          <table class="content__table">
            <thead>
              <tr>
                ${comparison.headers.map(header => `<th>${this.escapeHtml(header)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${comparison.rows.map(row => `
                <tr>
                  ${row.cells.map(cell => `
                    <td>
                      ${cell.badge ? `
                        <span class="content__badge content__badge--${cell.badge.type || 'info'}">
                          ${this.escapeHtml(cell.value)}
                        </span>
                      ` : this.escapeHtml(cell.value)}
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private renderInteractiveStory(data: ContentData): string {
    const scenes = data.scenes || [];
    
    return `
      ${scenes.map((scene, index) => `
        <div class="content__scene ${index === 0 ? 'active' : ''}" id="scene-${index}">
          ${scene.background ? `
            <div class="content__scene-bg">
              <img src="${scene.background.url}" alt="${scene.background.alt || ''}">
            </div>
          ` : ''}
          <div class="content__scene-content">
            <h2 class="content__scene-title">${this.escapeHtml(scene.title)}</h2>
            <p class="content__scene-text">${scene.text}</p>
            
            ${scene.choices && scene.choices.length > 0 ? `
              <div class="content__choices">
                ${scene.choices.map(choice => `
                  <a href="#" class="content__choice" data-next-scene="scene-${choice.nextScene}">
                    ${this.escapeHtml(choice.text)}
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    `;
  }

  private renderMeta(meta: any): string {
    return `
      <div class="content__meta">
        ${meta.author ? `<span class="content__author">Par ${this.escapeHtml(meta.author)}</span>` : ''}
        ${meta.date ? `<span class="content__date">${this.escapeHtml(meta.date)}</span>` : ''}
        ${meta.readingTime ? `<span class="content__reading-time">${meta.readingTime} min</span>` : ''}
      </div>
    `;
  }

  private renderSidebar(sidebar: any): string {
    return `
      ${sidebar.toc ? `
        <div class="content__widget">
          <h3 class="content__widget-title">Table des matières</h3>
          <ul class="content__toc"></ul>
        </div>
      ` : ''}
      
      ${sidebar.author ? `
        <div class="content__widget">
          <h3 class="content__widget-title">À propos de l'auteur</h3>
          <div class="content__author-bio">
            ${sidebar.author?.avatar ? `<img src="${sidebar.author.avatar}" alt="${sidebar.author?.name || 'Auteur'}" class="content__author-avatar">` : ''}
            <h4>${this.escapeHtml(sidebar.author?.name || 'Auteur')}</h4>
            <p>${this.escapeHtml(sidebar.author?.bio || '')}</p>
          </div>
        </div>
      ` : ''}
      
      ${sidebar.related && sidebar.related.length > 0 ? `
        <div class="content__widget">
          <h3 class="content__widget-title">Articles similaires</h3>
          <ul class="content__related">
            ${sidebar.related.map(item => `
              <li><a href="${item.link?.url || item.link || '#'}">${this.escapeHtml(item.title)}</a></li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    `;
  }

  private renderRichContent(content: string): string {
    // Add drop cap to first letter if magazine layout
    if (content.startsWith('<p>')) {
      const firstParagraph = content.substring(3);
      const firstLetter = firstParagraph.charAt(0);
      const rest = firstParagraph.substring(1);
      return `<p><span class="content__dropcap">${firstLetter}</span>${rest}`;
    }
    
    return content;
  }

  private generateCustomCSS(data: ContentData): string {
    let css = '\n/* Custom Content Styles */\n';
    
    // Couleurs personnalisées
    if (data.styles?.colors) {
      const colors = data.styles.colors;
      css += `.content {
        --content-primary: ${colors.primary || '#667eea'};
        --content-secondary: ${colors.secondary || '#764ba2'};
        --content-text: ${colors.text || '#4b5563'};
        --content-heading: ${colors.heading || '#1f2937'};
        --content-bg: ${colors.background || '#ffffff'};
      }\n`;
    }

    // Typography
    if (data.styles?.typography) {
      const typo = data.styles.typography;
      css += `.content {
        ${typo.fontFamily ? `font-family: ${typo.fontFamily};` : ''}
        ${typo.fontSize ? `font-size: ${typo.fontSize};` : ''}
        ${typo.lineHeight ? `line-height: ${typo.lineHeight};` : ''}
      }\n`;
    }

    return css;
  }

  private renderError(message: string): string {
    return `
      <div class="content-error" style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 0.5rem; color: #c00;">
        <strong>Erreur Content:</strong> ${this.escapeHtml(message)}
      </div>
    `;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

export const contentRendererV3Perfect = new ContentRendererV3Perfect();