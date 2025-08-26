// UI Interactions Manager - Handles hover effects and button interactions
// Single responsibility for interactive UI behaviors

import { SELECTORS, ANIMATIONS_CONFIG } from './constants.js';
import { createRippleEffect } from './utils.js';

class UIInteractionsManager {
    constructor() {
        this.init = this.init.bind(this);
        this.handleCardHover = this.handleCardHover.bind(this);
        this.handleCardLeave = this.handleCardLeave.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    
    init() {
        this.setupCardHoverEffects();
        this.setupButtonRippleEffects();
        this.injectAnimationStyles();
    }
    
    setupCardHoverEffects() {
        const projectCards = document.querySelectorAll(SELECTORS.PROJECT_CARDS);
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleCardHover);
            card.addEventListener('mouseleave', this.handleCardLeave);
        });
    }
    
    setupButtonRippleEffects() {
        const buttons = document.querySelectorAll(SELECTORS.BUTTONS);
        
        buttons.forEach(button => {
            button.addEventListener('click', this.handleButtonClick);
        });
    }
    
    handleCardHover(event) {
        const card = event.target;
        card.style.transform = ANIMATIONS_CONFIG.CARDS.HOVER_TRANSFORM;
    }
    
    handleCardLeave(event) {
        const card = event.target;
        card.style.transform = ANIMATIONS_CONFIG.CARDS.DEFAULT_TRANSFORM;
    }
    
    handleButtonClick(event) {
        const button = event.currentTarget;
        createRippleEffect(event, button);
    }
    
    injectAnimationStyles() {
        // Only inject if not already present
        if (document.getElementById('ui-animations-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'ui-animations-styles';
        style.textContent = this.getAnimationCSS();
        
        document.head.appendChild(style);
    }
    
    getAnimationCSS() {
        return `
            @keyframes ripple {
                to { 
                    transform: scale(4); 
                    opacity: 0; 
                }
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .header.scrolled {
                background: rgba(255, 255, 255, 0.98) !important;
                box-shadow: var(--shadow) !important;
            }
            
            body.dark-mode .header.scrolled {
                background: rgba(13, 17, 23, 0.98) !important;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    max-height: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    max-height: 200px;
                    transform: translateY(0);
                }
            }
        `;
    }
}

// Export singleton instance
export const uiInteractionsManager = new UIInteractionsManager();