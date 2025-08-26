// Mobile Navigation Manager - Handles hamburger menu and mobile navigation
// Single responsibility for mobile navigation concerns

import { APP_CONFIG } from './constants.js';

class MobileNavigationManager {
    constructor() {
        this.mobileMenuToggle = null;
        this.mobileMenu = null;
        this.mobileThemeToggle = null;
        this.isOpen = false;
        
        this.init = this.init.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleEscapeKey = this.handleEscapeKey.bind(this);
        this.syncThemeToggles = this.syncThemeToggles.bind(this);
    }
    
    init() {
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileThemeToggle = document.getElementById('mobileThemeToggle');
        
        if (!this.mobileMenuToggle || !this.mobileMenu) {
            console.warn('Mobile navigation elements not found');
            return;
        }
        
        this.setupEventListeners();
        this.syncThemeToggles();
    }
    
    setupEventListeners() {
        // Menu toggle click
        this.mobileMenuToggle.addEventListener('click', this.toggleMenu);
        
        // Mobile theme toggle
        if (this.mobileThemeToggle) {
            this.mobileThemeToggle.addEventListener('click', this.handleMobileThemeToggle.bind(this));
        }
        
        // Close menu on outside click
        document.addEventListener('click', this.handleOutsideClick);
        
        // Close menu on escape key
        document.addEventListener('keydown', this.handleEscapeKey);
        
        // Sync theme toggles when main theme changes
        document.body.addEventListener('classchange', this.syncThemeToggles);
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.isOpen = true;
        this.mobileMenu.classList.add('active');
        this.mobileMenuToggle.classList.add('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
        
        // Add aria attributes for accessibility
        this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
        this.mobileMenu.setAttribute('aria-hidden', 'false');
    }
    
    closeMenu() {
        this.isOpen = false;
        this.mobileMenu.classList.remove('active');
        this.mobileMenuToggle.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Update aria attributes
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        this.mobileMenu.setAttribute('aria-hidden', 'true');
    }
    
    handleOutsideClick(event) {
        if (!this.isOpen) return;
        
        // Check if click is outside the mobile menu area
        if (!this.mobileMenu.contains(event.target) && 
            !this.mobileMenuToggle.contains(event.target)) {
            this.closeMenu();
        }
    }
    
    handleEscapeKey(event) {
        if (event.key === 'Escape' && this.isOpen) {
            this.closeMenu();
        }
    }
    
    handleMobileThemeToggle() {
        // Trigger the main theme toggle
        const mainThemeToggle = document.getElementById('themeToggle');
        if (mainThemeToggle) {
            mainThemeToggle.click();
        }
    }
    
    syncThemeToggles() {
        if (!this.mobileThemeToggle) return;
        
        // Get current theme state
        const isDark = document.body.classList.contains('dark-mode');
        const mainThemeIcon = document.querySelector('#themeToggle i');
        
        if (mainThemeIcon && this.mobileThemeToggle.querySelector('i')) {
            // Sync the icon
            const mobileIcon = this.mobileThemeToggle.querySelector('i');
            mobileIcon.className = mainThemeIcon.className;
        }
    }
    
    // Public method to close menu from external calls
    closeMobileMenu() {
        this.closeMenu();
    }
}

// Export singleton instance
export const mobileNavigationManager = new MobileNavigationManager();

// Global function for HTML onclick handlers
export function closeMobileMenu() {
    mobileNavigationManager.closeMobileMenu();
}