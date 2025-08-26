// Utility Functions - Reusable helper functions
// Following DRY principle - single source of truth for common functionality

import { APP_CONFIG, SELECTORS } from './constants.js';

// Debounce function for performance optimization
export function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Toast notification system
export function showToast(message, duration = APP_CONFIG.TOAST.DEFAULT_DURATION) {
    const toast = createToastElement(message);
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, APP_CONFIG.ANIMATIONS.DURATION.BASE);
    }, duration);
}

function createToastElement(message) {
    const toast = document.createElement('div');
    
    // Set content
    toast.textContent = message;
    
    // Apply styles using global CSS variables
    const toastStyles = {
        position: 'fixed',
        bottom: APP_CONFIG.TOAST.POSITION.BOTTOM,
        right: APP_CONFIG.TOAST.POSITION.RIGHT,
        background: 'var(--color-primary)',
        color: 'var(--color-text-inverse)',
        padding: 'var(--space-sm) var(--space-md)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: APP_CONFIG.TOAST.Z_INDEX,
        fontSize: 'var(--font-size-sm)',
        fontWeight: '500',
        transform: 'translateX(100%)',
        transition: `transform ${APP_CONFIG.ANIMATIONS.DURATION.BASE}ms ${APP_CONFIG.ANIMATIONS.EASING}`
    };
    
    // Apply styles
    Object.assign(toast.style, toastStyles);
    
    return toast;
}

// Update current year in footer
export function updateCurrentYear() {
    const yearElement = document.querySelector(SELECTORS.YEAR_ELEMENT);
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Create ripple effect for buttons
export function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    // Calculate position
    const rippleStyles = {
        width: `${size}px`,
        height: `${size}px`,
        left: `${(event.clientX - rect.left - size / 2)}px`,
        top: `${(event.clientY - rect.top - size / 2)}px`,
        position: 'absolute',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.3)',
        transform: 'scale(0)',
        animation: 'ripple 0.6s linear',
        pointerEvents: 'none'
    };
    
    // Apply styles
    Object.assign(ripple.style, rippleStyles);
    
    // Ensure parent element has proper styles
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    // Add ripple to element
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Toggle element display
export function toggleElementDisplay(element, show) {
    if (!element) return;
    
    element.style.display = show ? 'block' : 'none';
}

// Get current verification status from context
export function getVerificationStatus() {
    if (typeof HumanVerificationContext !== 'undefined') {
        return HumanVerificationContext.checkHuman();
    }
    return null;
}