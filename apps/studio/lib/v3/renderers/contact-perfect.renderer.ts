/**
 * Contact Renderer V3 PERFECT - Design magnifique et ergonomie parfaite
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';
import { contactDataSchema, contactDefaults, type ContactData } from '../schemas/blocks/contact-perfect';
import { logger } from '../core/logger';

export class ContactRendererV3Perfect extends BaseRendererV3<ContactData> {
  type = 'contact-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('ContactRendererV3Perfect', 'constructor', '🚀 Initialisation du renderer Contact V3 PERFECT');
  }

  validate(data: unknown): z.SafeParseReturnType<ContactData, ContactData> {
    return contactDataSchema.safeParse(data);
  }

  getDefaultData(): ContactData {
    return contactDefaults;
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
   CONTACT V3 PERFECT - Styles magnifiques
   ======================================== */

.contact {
  position: relative;
  overflow: hidden;
  background: var(--contact-bg, #ffffff);
}

.contact__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header élégant */
.contact__header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.contact__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #1f2937;
}

.contact__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.contact__description {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.8;
}

/* ========================================
   VARIANTES SPECTACULAIRES
   ======================================== */

/* 1. Split Modern - Écran divisé moderne */
.contact--split-modern {
  padding: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.contact--split-modern .contact__container {
  width: 100%;
  max-width: none;
  padding: 0;
}

.contact--split-modern .contact__wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

.contact--split-modern .contact__content {
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
}

.contact--split-modern .contact__map-wrapper {
  position: relative;
  background: #f3f4f6;
}

.contact--split-modern .contact__map {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Info cards dans split modern */
.contact--split-modern .contact__info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 3rem 0;
}

.contact--split-modern .contact__info-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact--split-modern .contact__info-icon {
  width: 50px;
  height: 50px;
  background: #f3f4f6;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.contact--split-modern .contact__info-content {
  flex: 1;
}

.contact--split-modern .contact__info-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact--split-modern .contact__info-value {
  font-size: 1.125rem;
  color: #1f2937;
  font-weight: 600;
}

/* 2. Floating Cards - Cartes flottantes */
.contact--floating-cards {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}

.contact--floating-cards .contact__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  align-items: start;
}

.contact--floating-cards .contact__card {
  background: white;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.contact--floating-cards .contact__card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.2);
}

.contact--floating-cards .contact__card:nth-child(1) {
  animation: float-1 6s ease-in-out infinite;
}

.contact--floating-cards .contact__card:nth-child(2) {
  animation: float-2 6s ease-in-out infinite;
  animation-delay: 1s;
}

.contact--floating-cards .contact__card:nth-child(3) {
  animation: float-3 6s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes float-1 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0) rotate(1deg); }
  50% { transform: translateY(-15px) rotate(-1deg); }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-25px); }
}

.contact--floating-cards .contact__card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
}

/* 3. Glassmorphism - Effet verre dépoli */
.contact--glassmorphism {
  padding: 6rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.contact--glassmorphism::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.contact--glassmorphism .contact__wrapper {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 3rem;
}

.contact--glassmorphism .contact__panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 3rem;
  color: white;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.contact--glassmorphism .contact__title,
.contact--glassmorphism .contact__subtitle,
.contact--glassmorphism .contact__info-label,
.contact--glassmorphism .contact__info-value,
.contact--glassmorphism .contact__form-label {
  color: white;
}

.contact--glassmorphism .contact__form-input,
.contact--glassmorphism .contact__form-textarea,
.contact--glassmorphism .contact__form-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.contact--glassmorphism .contact__form-input::placeholder,
.contact--glassmorphism .contact__form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

/* 4. Map Fullscreen - Map plein écran */
.contact--map-fullscreen {
  padding: 0;
  min-height: 100vh;
  position: relative;
}

.contact--map-fullscreen .contact__map-container {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.contact--map-fullscreen .contact__map {
  width: 100%;
  height: 100%;
  filter: brightness(0.8);
}

.contact--map-fullscreen .contact__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.contact--map-fullscreen .contact__panel {
  background: white;
  border-radius: 2rem;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
}

/* 5. Minimal Centered - Minimaliste centré */
.contact--minimal-centered {
  padding: 8rem 0;
  text-align: center;
}

.contact--minimal-centered .contact__wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.contact--minimal-centered .contact__title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  margin-bottom: 2rem;
}

.contact--minimal-centered .contact__info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 3rem 0;
}

.contact--minimal-centered .contact__info-item {
  font-size: 1.25rem;
  color: #4b5563;
}

.contact--minimal-centered .contact__info-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}

.contact--minimal-centered .contact__info-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.contact--minimal-centered .contact__info-link:hover {
  color: #1f2937;
}

.contact--minimal-centered .contact__info-link:hover::after {
  transform: scaleX(1);
}

.contact--minimal-centered .contact__social {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 3rem;
}

.contact--minimal-centered .contact__social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.3s ease;
}

.contact--minimal-centered .contact__social-link:hover {
  background: #1f2937;
  border-color: #1f2937;
  color: white;
  transform: translateY(-3px);
}

/* 6. Gradient Waves - Vagues gradient */
.contact--gradient-waves {
  padding: 6rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  overflow: hidden;
}

.contact--gradient-waves::before,
.contact--gradient-waves::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 200px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E") no-repeat;
  background-size: cover;
}

.contact--gradient-waves::before {
  top: 0;
  transform: rotate(180deg);
}

.contact--gradient-waves::after {
  bottom: 0;
}

.contact--gradient-waves .contact__wrapper {
  position: relative;
  z-index: 1;
  color: white;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 3rem;
}

.contact--gradient-waves .contact__title,
.contact--gradient-waves .contact__subtitle,
.contact--gradient-waves .contact__description,
.contact--gradient-waves .contact__info-label,
.contact--gradient-waves .contact__info-value,
.contact--gradient-waves .contact__form-label {
  color: white;
}

.contact--gradient-waves .contact__form-wrapper {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* 7. Sidebar Sticky - Sidebar collante */
.contact--sidebar-sticky {
  padding: 6rem 0;
}

.contact--sidebar-sticky .contact__wrapper {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 4rem;
  align-items: start;
}

.contact--sidebar-sticky .contact__sidebar {
  position: sticky;
  top: 2rem;
  background: #f9fafb;
  border-radius: 1.5rem;
  padding: 2.5rem;
}

.contact--sidebar-sticky .contact__sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
}

.contact--sidebar-sticky .contact__info-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact--sidebar-sticky .contact__info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact--sidebar-sticky .contact__info-icon {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.contact--sidebar-sticky .contact__main {
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
}

/* 8. Chat Style - Style messagerie */
.contact--chat-style {
  padding: 6rem 0;
  background: #f9fafb;
}

.contact--chat-style .contact__wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.contact--chat-style .contact__chat-window {
  background: white;
  border-radius: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.contact--chat-style .contact__chat-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact--chat-style .contact__chat-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.contact--chat-style .contact__chat-info {
  flex: 1;
}

.contact--chat-style .contact__chat-name {
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.contact--chat-style .contact__chat-status {
  font-size: 0.875rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact--chat-style .contact__chat-status::before {
  content: '';
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}

.contact--chat-style .contact__chat-body {
  padding: 2rem;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.contact--chat-style .contact__chat-messages {
  flex: 1;
  margin-bottom: 2rem;
}

.contact--chat-style .contact__chat-message {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  animation: slideInLeft 0.3s ease;
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.contact--chat-style .contact__chat-bubble {
  background: #f3f4f6;
  border-radius: 1.5rem 1.5rem 1.5rem 0.25rem;
  padding: 1rem 1.5rem;
  max-width: 80%;
}

.contact--chat-style .contact__form {
  background: #f9fafb;
  border-radius: 1.5rem;
  padding: 1.5rem;
}

/* Formulaire */
.contact__form {
  margin-top: 3rem;
}

.contact__form-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
}

.contact__form-grid {
  display: grid;
  gap: 1.5rem;
}

.contact__form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact__form-group--half {
  grid-column: span 1;
}

.contact__form-group--full {
  grid-column: 1 / -1;
}

.contact__form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.contact__form-label--required::after {
  content: ' *';
  color: #ef4444;
}

.contact__form-input,
.contact__form-textarea,
.contact__form-select {
  padding: 0.875rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.contact__form-input:focus,
.contact__form-textarea:focus,
.contact__form-select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.contact__form-textarea {
  resize: vertical;
  min-height: 120px;
}

.contact__form-select {
  cursor: pointer;
}

.contact__form-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1rem;
}

.contact__form-checkbox input {
  margin-top: 0.25rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.contact__form-checkbox label {
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
}

.contact__form-submit {
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.contact__form-submit:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.5);
}

.contact__form-submit:active {
  transform: translateY(0);
}

.contact__form-submit--loading {
  opacity: 0.8;
  cursor: not-allowed;
}

.contact__form-submit--success {
  background: #10b981;
}

/* Horaires */
.contact__hours {
  margin-top: 2rem;
  background: #f9fafb;
  border-radius: 1rem;
  padding: 1.5rem;
}

.contact__hours-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.contact__hours-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact__hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.contact__hours-item:last-child {
  border-bottom: none;
}

.contact__hours-day {
  font-weight: 600;
  color: #374151;
}

.contact__hours-time {
  color: #6b7280;
}

.contact__hours-time--closed {
  color: #ef4444;
}

/* Social links */
.contact__social {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.contact__social-link {
  width: 45px;
  height: 45px;
  border-radius: 0.75rem;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #6b7280;
}

.contact__social-link:hover {
  background: #6366f1;
  color: white;
  transform: translateY(-3px);
}

/* Map */
.contact__map {
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 1rem;
  overflow: hidden;
}

.contact__map iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* FAQ */
.contact__faq {
  margin-top: 3rem;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 1rem;
}

.contact__faq-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.contact__faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact__faq-item {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact__faq-item:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.contact__faq-question {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact__faq-icon {
  transition: transform 0.3s ease;
}

.contact__faq-item.active .contact__faq-icon {
  transform: rotate(45deg);
}

.contact__faq-answer {
  color: #6b7280;
  line-height: 1.6;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.contact__faq-item.active .contact__faq-answer {
  max-height: 200px;
  margin-top: 0.5rem;
}

/* Testimonial */
.contact__testimonial {
  margin-top: 3rem;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 1rem;
  position: relative;
}

.contact__testimonial::before {
  content: '"';
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  font-size: 4rem;
  color: #e5e7eb;
  font-family: Georgia, serif;
  line-height: 1;
}

.contact__testimonial-content {
  font-style: italic;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.contact__testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 2rem;
}

.contact__testimonial-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.contact__testimonial-info {
  flex: 1;
}

.contact__testimonial-name {
  font-weight: 700;
  color: #1f2937;
}

.contact__testimonial-role {
  font-size: 0.875rem;
  color: #6b7280;
}

/* CTA */
.contact__cta {
  margin-top: 3rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 1.5rem;
  text-align: center;
  color: white;
}

.contact__cta-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.contact__cta-description {
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.contact__cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: white;
  color: #6366f1;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact__cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 1024px) {
  .contact--split-modern .contact__wrapper {
    grid-template-columns: 1fr;
  }
  
  .contact--split-modern .contact__map-wrapper {
    height: 400px;
  }
  
  .contact--sidebar-sticky .contact__wrapper {
    grid-template-columns: 1fr;
  }
  
  .contact--sidebar-sticky .contact__sidebar {
    position: static;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .contact__header {
    margin-bottom: 3rem;
  }
  
  .contact__title {
    font-size: 2rem;
  }
  
  .contact__form-grid {
    grid-template-columns: 1fr;
  }
  
  .contact__form-group--half {
    grid-column: 1 / -1;
  }
  
  .contact--floating-cards .contact__wrapper,
  .contact--glassmorphism .contact__wrapper,
  .contact--gradient-waves .contact__wrapper {
    grid-template-columns: 1fr;
  }
  
  .contact--split-modern .contact__info-grid {
    grid-template-columns: 1fr;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .contact {
    background: #1f2937;
  }
  
  .contact__title,
  .contact__form-title,
  .contact__hours-title,
  .contact__faq-title {
    color: white;
  }
  
  .contact__subtitle,
  .contact__description {
    color: #d1d5db;
  }
  
  .contact__form-input,
  .contact__form-textarea,
  .contact__form-select {
    background: #374151;
    border-color: #4b5563;
    color: white;
  }
  
  .contact__info-card,
  .contact__hours,
  .contact__faq {
    background: #374151;
  }
  
  .contact__info-value,
  .contact__hours-day {
    color: white;
  }
}`;
  }

  getDefaultJS(): string {
    return `
// ========================================
// CONTACT V3 PERFECT - JavaScript
// ========================================

class ContactV3Perfect {
  constructor(element) {
    this.element = element;
    this.variant = element.dataset.variant || 'split-modern';
    this.form = element.querySelector('.contact__form');
    
    this.init();
  }
  
  init() {
    console.log('📞 Initialisation Contact V3 Perfect:', this.variant);
    
    // Initialisation du formulaire
    this.initForm();
    
    // Initialisation de la map
    this.initMap();
    
    // Initialisation selon la variante
    switch(this.variant) {
      case 'chat-style':
        this.initChatStyle();
        break;
      case 'floating-cards':
        this.initFloatingCards();
        break;
    }
    
    // Fonctionnalités communes
    this.initFAQ();
    this.initSocialLinks();
    this.initAnimations();
  }
  
  // Gestion du formulaire
  initForm() {
    if (!this.form) return;
    
    const submitBtn = this.form.querySelector('.contact__form-submit');
    const inputs = this.form.querySelectorAll('input, textarea, select');
    
    // Validation en temps réel
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
    
    // Soumission du formulaire
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validation
      let isValid = true;
      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        this.shakeForm();
        return;
      }
      
      // Animation de soumission
      submitBtn.classList.add('contact__form-submit--loading');
      submitBtn.innerHTML = submitBtn.dataset.loadingText || 'Envoi en cours...';
      
      // Simulation d'envoi
      try {
        await this.submitForm();
        
        // Succès
        submitBtn.classList.remove('contact__form-submit--loading');
        submitBtn.classList.add('contact__form-submit--success');
        submitBtn.innerHTML = submitBtn.dataset.successText || 'Message envoyé !';
        
        // Confetti animation
        this.triggerConfetti();
        
        // Reset après 3 secondes
        setTimeout(() => {
          this.form.reset();
          submitBtn.classList.remove('contact__form-submit--success');
          submitBtn.innerHTML = submitBtn.dataset.text || 'Envoyer';
        }, 3000);
        
      } catch (error) {
        console.error('Erreur:', error);
        submitBtn.classList.remove('contact__form-submit--loading');
        submitBtn.innerHTML = 'Erreur, réessayer';
        
        setTimeout(() => {
          submitBtn.innerHTML = submitBtn.dataset.text || 'Envoyer';
        }, 3000);
      }
    });
  }
  
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Remove previous error
    field.classList.remove('error');
    
    // Required check
    if (required && !value) {
      this.showError(field, 'Ce champ est obligatoire');
      return false;
    }
    
    // Type-specific validation
    switch(type) {
      case 'email':
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (value && !emailRegex.test(value)) {
          this.showError(field, 'Email invalide');
          return false;
        }
        break;
        
      case 'tel':
        const phoneRegex = /^[\\+\\-\\(\\)\\s\\d]{10,}$/;
        if (value && !phoneRegex.test(value.replace(/\\s/g, ''))) {
          this.showError(field, 'Numéro de téléphone invalide');
          return false;
        }
        break;
    }
    
    // Custom validation
    if (field.dataset.minLength && value.length < parseInt(field.dataset.minLength)) {
      this.showError(field, \`Minimum \${field.dataset.minLength} caractères\`);
      return false;
    }
    
    return true;
  }
  
  showError(field, message) {
    field.classList.add('error');
    
    // Créer ou mettre à jour le message d'erreur
    let errorEl = field.parentElement.querySelector('.contact__form-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'contact__form-error';
      field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
    
    // Animation
    field.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      field.style.animation = '';
    }, 500);
  }
  
  shakeForm() {
    this.form.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      this.form.style.animation = '';
    }, 500);
  }
  
  async submitForm() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Intégrations
    const webhook = this.element.dataset.webhook;
    const emailTo = this.element.dataset.emailTo;
    
    if (webhook) {
      // Envoi vers webhook
      const response = await fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\\'envoi');
      }
    }
    
    // Simulation pour la démo
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  triggerConfetti() {
    // Effet confetti simple
    const colors = ['#667eea', '#764ba2', '#f093fb', '#10b981'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.cssText = \`
        position: fixed;
        width: 10px;
        height: 10px;
        background: \${colors[Math.floor(Math.random() * colors.length)]};
        left: \${Math.random() * 100}%;
        top: -10px;
        opacity: \${Math.random() * 0.5 + 0.5};
        transform: rotate(\${Math.random() * 360}deg);
        animation: confettiFall 3s ease-out forwards;
      \`;
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }
  }
  
  // Initialisation de la map
  initMap() {
    const mapContainer = this.element.querySelector('.contact__map');
    if (!mapContainer) return;
    
    const provider = mapContainer.dataset.provider || 'google';
    const lat = parseFloat(mapContainer.dataset.lat) || 48.8566;
    const lng = parseFloat(mapContainer.dataset.lng) || 2.3522;
    const zoom = parseInt(mapContainer.dataset.zoom) || 15;
    const style = mapContainer.dataset.style || 'roadmap';
    
    // Google Maps
    if (provider === 'google' && window.google) {
      const map = new google.maps.Map(mapContainer, {
        center: { lat, lng },
        zoom,
        mapTypeId: style,
        styles: style === 'dark' ? this.getDarkMapStyle() : []
      });
      
      // Marqueur principal
      new google.maps.Marker({
        position: { lat, lng },
        map,
        title: this.element.querySelector('.contact__title')?.textContent || 'Notre localisation',
        animation: google.maps.Animation.DROP
      });
      
      // Marqueurs additionnels
      const markers = mapContainer.dataset.markers;
      if (markers) {
        JSON.parse(markers).forEach(marker => {
          new google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map,
            title: marker.title
          });
        });
      }
    }
    
    // OpenStreetMap fallback
    else {
      const iframe = document.createElement('iframe');
      iframe.src = \`https://www.openstreetmap.org/export/embed.html?bbox=\${lng-0.01},\${lat-0.01},\${lng+0.01},\${lat+0.01}&layer=mapnik&marker=\${lat},\${lng}\`;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      mapContainer.appendChild(iframe);
    }
  }
  
  getDarkMapStyle() {
    return [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      }
    ];
  }
  
  // Chat Style
  initChatStyle() {
    const chatMessages = this.element.querySelector('.contact__chat-messages');
    if (!chatMessages) return;
    
    // Messages d'accueil
    const welcomeMessages = [
      'Bonjour ! Comment puis-je vous aider aujourd\\'hui ?',
      'N\\'hésitez pas à me poser vos questions.',
      'Je suis là pour vous accompagner dans votre projet.'
    ];
    
    // Afficher les messages avec délai
    welcomeMessages.forEach((message, index) => {
      setTimeout(() => {
        this.addChatMessage(message, 'agent');
      }, (index + 1) * 1000);
    });
    
    // Réponses automatiques
    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const messageField = this.form.querySelector('[name="message"]');
      if (messageField && messageField.value) {
        // Ajouter le message utilisateur
        this.addChatMessage(messageField.value, 'user');
        
        // Réponse automatique
        setTimeout(() => {
          this.addChatMessage('Merci pour votre message ! Notre équipe vous répondra dans les plus brefs délais.', 'agent');
        }, 1500);
        
        messageField.value = '';
      }
    });
  }
  
  addChatMessage(text, sender = 'agent') {
    const messagesContainer = this.element.querySelector('.contact__chat-messages');
    if (!messagesContainer) return;
    
    const message = document.createElement('div');
    message.className = \`contact__chat-message contact__chat-message--\${sender}\`;
    message.innerHTML = \`
      <div class="contact__chat-avatar">\${sender === 'agent' ? '🤖' : '👤'}</div>
      <div class="contact__chat-bubble">\${text}</div>
    \`;
    
    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Floating Cards
  initFloatingCards() {
    const cards = this.element.querySelectorAll('.contact__card');
    
    cards.forEach((card, index) => {
      // Parallax effect on mouse move
      this.element.addEventListener('mousemove', (e) => {
        const rect = this.element.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const offsetX = (x - 0.5) * 20 * (index + 1);
        const offsetY = (y - 0.5) * 20 * (index + 1);
        
        card.style.transform = \`translate(\${offsetX}px, \${offsetY}px)\`;
      });
    });
    
    // Reset on mouse leave
    this.element.addEventListener('mouseleave', () => {
      cards.forEach(card => {
        card.style.transform = '';
      });
    });
  }
  
  // FAQ
  initFAQ() {
    const faqItems = this.element.querySelectorAll('.contact__faq-item');
    
    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        // Toggle active state
        const wasActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!wasActive) {
          item.classList.add('active');
        }
      });
    });
  }
  
  // Social Links
  initSocialLinks() {
    const socialLinks = this.element.querySelectorAll('.contact__social-link');
    
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        // Effet de hover magnétique
        link.style.animation = 'magneticHover 0.3s ease forwards';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.animation = '';
      });
    });
  }
  
  // Animations
  initAnimations() {
    // Intersection Observer pour les animations au scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Animations spécifiques selon la classe
          if (entry.target.classList.contains('contact__info-card')) {
            entry.target.style.animationDelay = \`\${entry.target.dataset.index * 0.1}s\`;
          }
        }
      });
    }, observerOptions);
    
    // Observer les éléments
    const animatedElements = this.element.querySelectorAll('.contact__info-card, .contact__form-group, .contact__card');
    animatedElements.forEach((el, index) => {
      el.dataset.index = index;
      observer.observe(el);
    });
  }
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.contact').forEach(element => {
    new ContactV3Perfect(element);
  });
});

// CSS pour confetti
const style = document.createElement('style');
style.textContent = \`
  @keyframes confettiFall {
    to {
      top: 100vh;
      transform: rotate(720deg);
    }
  }
  
  @keyframes magneticHover {
    0% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-5px) scale(1.1); }
    100% { transform: translateY(-3px) scale(1.05); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  .contact__form-error {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  .contact__form-input.error,
  .contact__form-textarea.error,
  .contact__form-select.error {
    border-color: #ef4444;
  }
\`;
document.head.appendChild(style);`;
  }

  render(data: ContactData, context: RenderContext): RenderResult {
    logger.info('ContactRendererV3Perfect', 'render', '🎨 Rendu du bloc Contact', { variant: data.variant });

    const validatedData = this.validate(data);
    if (!validatedData.success) {
      logger.error('ContactRendererV3Perfect', 'render', '❌ Données invalides', validatedData.error);
      return {
        html: '<div class="error">Erreur de validation des données Contact</div>',
        css: '',
        js: ''
      };
    }

    const contact = validatedData.data;

    // Génération du HTML selon la variante
    let contentHTML = '';
    
    switch (contact.variant) {
      case 'split-modern':
        contentHTML = this.renderSplitModern(contact);
        break;
      case 'floating-cards':
        contentHTML = this.renderFloatingCards(contact);
        break;
      case 'glassmorphism':
        contentHTML = this.renderGlassmorphism(contact);
        break;
      case 'map-fullscreen':
        contentHTML = this.renderMapFullscreen(contact);
        break;
      case 'minimal-centered':
        contentHTML = this.renderMinimalCentered(contact);
        break;
      case 'gradient-waves':
        contentHTML = this.renderGradientWaves(contact);
        break;
      case 'sidebar-sticky':
        contentHTML = this.renderSidebarSticky(contact);
        break;
      case 'chat-style':
        contentHTML = this.renderChatStyle(contact);
        break;
      default:
        contentHTML = this.renderSplitModern(contact);
    }

    const html = `
      <section class="contact contact--${contact.variant}" 
               data-variant="${contact.variant}"
               ${contact.integrations?.webhook ? `data-webhook="${contact.integrations.webhook}"` : ''}
               ${contact.integrations?.emailTo ? `data-email-to="${contact.integrations.emailTo}"` : ''}
               ${contact.id ? `id="${contact.id}"` : ''}>
        ${contact.variant !== 'map-fullscreen' && contact.variant !== 'split-modern' ? `
          <div class="contact__container">
            ${this.renderHeader(contact)}
            ${contentHTML}
          </div>
        ` : contentHTML}
      </section>
    `;

    return {
      html,
      css: this.getDefaultCSS(),
      js: this.getDefaultJS()
    };
  }

  private renderHeader(contact: ContactData): string {
    if (!contact.title && !contact.subtitle && !contact.description) return '';
    
    return `
      <div class="contact__header">
        ${contact.title ? `<h2 class="contact__title">${contact.title}</h2>` : ''}
        ${contact.subtitle ? `<p class="contact__subtitle">${contact.subtitle}</p>` : ''}
        ${contact.description ? `<p class="contact__description">${contact.description}</p>` : ''}
      </div>
    `;
  }

  private renderContactInfo(contact: ContactData): string {
    if (!contact.contactInfo || contact.contactInfo.length === 0) return '';
    
    return `
      <div class="contact__info-list">
        ${contact.contactInfo.map((info, index) => `
          <div class="contact__info-item" data-index="${index}">
            ${info.icon ? `<div class="contact__info-icon">${info.icon}</div>` : ''}
            <div class="contact__info-content">
              ${info.label ? `<div class="contact__info-label">${info.label}</div>` : ''}
              ${info.link ? `
                <a href="${info.link}" class="contact__info-value contact__info-link">${info.value}</a>
              ` : `
                <div class="contact__info-value">${info.value}</div>
              `}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderForm(contact: ContactData): string {
    if (!contact.form?.enabled || !contact.form.fields) return '';
    
    return `
      <form class="contact__form">
        ${contact.form.title ? `<h3 class="contact__form-title">${contact.form.title}</h3>` : ''}
        
        <div class="contact__form-grid" style="grid-template-columns: repeat(2, 1fr);">
          ${contact.form.fields.map(field => this.renderFormField(field)).join('')}
        </div>
        
        ${contact.form.consent?.enabled ? `
          <div class="contact__form-checkbox">
            <input type="checkbox" 
                   id="consent" 
                   name="consent" 
                   ${contact.form.consent.required ? 'required' : ''}>
            <label for="consent">${contact.form.consent.text}</label>
          </div>
        ` : ''}
        
        <button type="submit" 
                class="contact__form-submit"
                data-text="${contact.form.submitButton?.text || 'Envoyer'}"
                data-loading-text="${contact.form.submitButton?.loadingText || 'Envoi en cours...'}"
                data-success-text="${contact.form.submitButton?.successText || 'Message envoyé !'}">
          ${contact.form.submitButton?.text || 'Envoyer'}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
          </svg>
        </button>
      </form>
    `;
  }

  private renderFormField(field: any): string {
    const labelHTML = `
      <label class="contact__form-label ${field.required ? 'contact__form-label--required' : ''}" 
             for="${field.name}">
        ${field.label}
      </label>
    `;
    
    let inputHTML = '';
    
    switch (field.type) {
      case 'textarea':
        inputHTML = `
          <textarea class="contact__form-textarea"
                    id="${field.name}"
                    name="${field.name}"
                    placeholder="${field.placeholder || ''}"
                    ${field.required ? 'required' : ''}
                    ${field.rows ? `rows="${field.rows}"` : ''}
                    ${field.validation?.minLength ? `data-min-length="${field.validation.minLength}"` : ''}
                    ${field.validation?.maxLength ? `maxlength="${field.validation.maxLength}"` : ''}></textarea>
        `;
        break;
        
      case 'select':
        inputHTML = `
          <select class="contact__form-select"
                  id="${field.name}"
                  name="${field.name}"
                  ${field.required ? 'required' : ''}>
            <option value="">Choisir...</option>
            ${field.options?.map((opt: any) => `
              <option value="${opt.value}">${opt.label}</option>
            `).join('') || ''}
          </select>
        `;
        break;
        
      default:
        inputHTML = `
          <input class="contact__form-input"
                 type="${field.type}"
                 id="${field.name}"
                 name="${field.name}"
                 placeholder="${field.placeholder || ''}"
                 ${field.required ? 'required' : ''}
                 ${field.validation?.pattern ? `pattern="${field.validation.pattern}"` : ''}
                 ${field.validation?.minLength ? `minlength="${field.validation.minLength}"` : ''}
                 ${field.validation?.maxLength ? `maxlength="${field.validation.maxLength}"` : ''}
                 ${field.validation?.min ? `min="${field.validation.min}"` : ''}
                 ${field.validation?.max ? `max="${field.validation.max}"` : ''}>
        `;
    }
    
    return `
      <div class="contact__form-group contact__form-group--${field.width || 'full'}">
        ${labelHTML}
        ${inputHTML}
      </div>
    `;
  }

  private renderHours(contact: ContactData): string {
    if (!contact.showHours || !contact.hours) return '';
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames: Record<string, string> = {
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche'
    };
    
    return `
      <div class="contact__hours">
        <h4 class="contact__hours-title">🕐 Horaires d'ouverture</h4>
        <div class="contact__hours-list">
          ${days.map(day => {
            const hours = contact.hours![day as keyof typeof contact.hours];
            const isClosed = !hours || hours.toLowerCase() === 'fermé';
            return `
              <div class="contact__hours-item">
                <span class="contact__hours-day">${dayNames[day]}</span>
                <span class="contact__hours-time ${isClosed ? 'contact__hours-time--closed' : ''}">
                  ${hours || 'Fermé'}
                </span>
              </div>
            `;
          }).join('')}
          ${contact.hours.special ? `
            <div class="contact__hours-item">
              <span class="contact__hours-day">Note</span>
              <span class="contact__hours-time">${contact.hours.special}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private renderSocialLinks(contact: ContactData): string {
    if (!contact.socialLinks || contact.socialLinks.length === 0) return '';
    
    const icons: Record<string, string> = {
      facebook: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
      twitter: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
      instagram: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>',
      linkedin: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      youtube: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
      whatsapp: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
      telegram: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'
    };
    
    return `
      <div class="contact__social">
        ${contact.socialLinks.map(link => `
          <a href="${link.url}" 
             class="contact__social-link" 
             target="_blank"
             rel="noopener noreferrer"
             title="${link.label || link.platform}">
            ${icons[link.platform] || '🔗'}
          </a>
        `).join('')}
      </div>
    `;
  }

  private renderMap(contact: ContactData): string {
    if (!contact.map?.enabled || !contact.displayOptions?.showMap) return '';
    
    return `
      <div class="contact__map"
           data-provider="${contact.map.provider}"
           data-lat="${contact.map.coordinates?.lat || 48.8566}"
           data-lng="${contact.map.coordinates?.lng || 2.3522}"
           data-zoom="${contact.map.zoom}"
           data-style="${contact.map.style}"
           ${contact.map.markers ? `data-markers='${JSON.stringify(contact.map.markers)}'` : ''}>
        <!-- Map will be initialized by JavaScript -->
      </div>
    `;
  }

  private renderFAQ(contact: ContactData): string {
    if (!contact.displayOptions?.showFAQ || !contact.faq) return '';
    
    return `
      <div class="contact__faq">
        <h3 class="contact__faq-title">Questions fréquentes</h3>
        <div class="contact__faq-list">
          ${contact.faq.map((item, index) => `
            <div class="contact__faq-item" data-index="${index}">
              <div class="contact__faq-question">
                ${item.question}
                <span class="contact__faq-icon">+</span>
              </div>
              <div class="contact__faq-answer">
                ${item.answer}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderTestimonial(contact: ContactData): string {
    if (!contact.displayOptions?.showTestimonial || !contact.testimonial) return '';
    
    return `
      <div class="contact__testimonial">
        <div class="contact__testimonial-content">
          ${contact.testimonial.content}
        </div>
        <div class="contact__testimonial-author">
          ${contact.testimonial.avatar ? `
            <img src="${contact.testimonial.avatar.url}" 
                 alt="${contact.testimonial.author}" 
                 class="contact__testimonial-avatar">
          ` : ''}
          <div class="contact__testimonial-info">
            <div class="contact__testimonial-name">${contact.testimonial.author}</div>
            ${contact.testimonial.role ? `
              <div class="contact__testimonial-role">${contact.testimonial.role}</div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private renderCTA(contact: ContactData): string {
    if (!contact.cta?.enabled) return '';
    
    return `
      <div class="contact__cta">
        <h3 class="contact__cta-title">${contact.cta.title}</h3>
        ${contact.cta.description ? `
          <p class="contact__cta-description">${contact.cta.description}</p>
        ` : ''}
        <a href="${contact.cta.button.link}" 
           class="contact__cta-button contact__cta-button--${contact.cta.button.style}">
          ${contact.cta.button.text}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </a>
      </div>
    `;
  }

  // Variantes de rendu
  private renderSplitModern(contact: ContactData): string {
    return `
      <div class="contact__container">
        <div class="contact__wrapper">
          <div class="contact__content">
            ${this.renderHeader(contact)}
            
            <div class="contact__info-grid">
              ${contact.contactInfo.slice(0, 4).map((info, index) => `
                <div class="contact__info-card" data-index="${index}">
                  ${info.icon ? `<div class="contact__info-icon">${info.icon}</div>` : ''}
                  <div class="contact__info-content">
                    ${info.label ? `<div class="contact__info-label">${info.label}</div>` : ''}
                    ${info.link ? `
                      <a href="${info.link}" class="contact__info-value">${info.value}</a>
                    ` : `
                      <div class="contact__info-value">${info.value}</div>
                    `}
                  </div>
                </div>
              `).join('')}
            </div>
            
            ${this.renderSocialLinks(contact)}
            ${contact.displayOptions?.showForm !== false ? this.renderForm(contact) : ''}
          </div>
          
          <div class="contact__map-wrapper">
            ${this.renderMap(contact)}
          </div>
        </div>
      </div>
    `;
  }

  private renderFloatingCards(contact: ContactData): string {
    return `
      <div class="contact__wrapper">
        <div class="contact__card">
          <h3 class="contact__card-title">📞 Contactez-nous</h3>
          ${this.renderContactInfo(contact)}
          ${this.renderHours(contact)}
        </div>
        
        ${contact.displayOptions?.showForm !== false ? `
          <div class="contact__card">
            ${this.renderForm(contact)}
          </div>
        ` : ''}
        
        ${contact.displayOptions?.showMap !== false && contact.map?.enabled ? `
          <div class="contact__card">
            <h3 class="contact__card-title">📍 Nous trouver</h3>
            ${this.renderMap(contact)}
          </div>
        ` : ''}
      </div>
      
      ${this.renderFAQ(contact)}
      ${this.renderTestimonial(contact)}
      ${this.renderCTA(contact)}
    `;
  }

  private renderGlassmorphism(contact: ContactData): string {
    return `
      <div class="contact__wrapper">
        <div class="contact__panel">
          <h3 class="contact__card-title">Informations</h3>
          ${this.renderContactInfo(contact)}
          ${this.renderHours(contact)}
          ${this.renderSocialLinks(contact)}
        </div>
        
        ${contact.displayOptions?.showForm !== false ? `
          <div class="contact__panel">
            ${this.renderForm(contact)}
          </div>
        ` : ''}
      </div>
    `;
  }

  private renderMapFullscreen(contact: ContactData): string {
    return `
      <div class="contact__map-container">
        ${this.renderMap(contact)}
      </div>
      
      <div class="contact__overlay">
        <div class="contact__panel">
          ${this.renderHeader(contact)}
          ${this.renderContactInfo(contact)}
          ${this.renderHours(contact)}
          ${this.renderSocialLinks(contact)}
        </div>
      </div>
    `;
  }

  private renderMinimalCentered(contact: ContactData): string {
    return `
      <div class="contact__wrapper">
        ${this.renderHeader(contact)}
        ${this.renderContactInfo(contact)}
        ${this.renderSocialLinks(contact)}
      </div>
    `;
  }

  private renderGradientWaves(contact: ContactData): string {
    return `
      <div class="contact__wrapper">
        <div class="contact__info-wrapper">
          ${this.renderHeader(contact)}
          ${this.renderContactInfo(contact)}
          ${this.renderHours(contact)}
          ${this.renderSocialLinks(contact)}
        </div>
        
        ${contact.displayOptions?.showForm !== false ? `
          <div class="contact__form-wrapper">
            ${this.renderForm(contact)}
          </div>
        ` : ''}
      </div>
      
      ${this.renderCTA(contact)}
    `;
  }

  private renderSidebarSticky(contact: ContactData): string {
    return `
      <div class="contact__wrapper">
        <aside class="contact__sidebar">
          <h3 class="contact__sidebar-title">Contact rapide</h3>
          ${this.renderContactInfo(contact)}
          ${this.renderHours(contact)}
          ${this.renderSocialLinks(contact)}
        </aside>
        
        <main class="contact__main">
          ${contact.displayOptions?.showForm !== false ? this.renderForm(contact) : ''}
          ${this.renderFAQ(contact)}
          ${this.renderTestimonial(contact)}
          ${contact.displayOptions?.showMap !== false ? this.renderMap(contact) : ''}
        </main>
      </div>
    `;
  }

  private renderChatStyle(contact: ContactData): string {
    return `
      <div class="contact__wrapper">
        <div class="contact__chat-window">
          <div class="contact__chat-header">
            <div class="contact__chat-avatar">💬</div>
            <div class="contact__chat-info">
              <div class="contact__chat-name">Support Client</div>
              <div class="contact__chat-status">En ligne</div>
            </div>
          </div>
          
          <div class="contact__chat-body">
            <div class="contact__chat-messages">
              <!-- Messages will be added by JavaScript -->
            </div>
            
            ${this.renderForm(contact)}
          </div>
        </div>
        
        <div class="contact__info-sidebar">
          ${this.renderContactInfo(contact)}
          ${this.renderHours(contact)}
        </div>
      </div>
    `;
  }
}