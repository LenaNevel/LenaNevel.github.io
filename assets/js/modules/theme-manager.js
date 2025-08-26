// Theme Manager - Single responsibility for theme switching
// Clean, focused module following the guidelines

import { APP_CONFIG, SELECTORS } from './constants.js';

class ThemeManager {
    constructor() {
        this.themeToggle = null;
        this.body = document.body;
        this.icon = null;
        
        this.init = this.init.bind(this);
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    
    init() {
        // Get DOM elements
        this.themeToggle = document.querySelector(SELECTORS.THEME_TOGGLE);
        this.icon = document.querySelector(SELECTORS.THEME_ICON);
        
        if (!this.themeToggle || !this.icon) {
            console.warn('Theme toggle elements not found');
            return;
        }
        
        // Set initial theme from localStorage
        this.loadSavedTheme();
        
        // Set up event listener
        this.themeToggle.addEventListener('click', this.handleToggleClick);
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem(APP_CONFIG.THEME.STORAGE_KEY);
        const isDark = savedTheme === APP_CONFIG.THEME.MODES.DARK;
        
        this.setTheme(isDark);
    }
    
    handleToggleClick() {
        const isDark = this.body.classList.contains(APP_CONFIG.THEME.CLASSES.DARK_MODE);
        const newTheme = !isDark;
        
        this.setTheme(newTheme);
        this.animateToggle();
    }
    
    setTheme(isDark) {
        // Update body class
        this.body.classList.toggle(APP_CONFIG.THEME.CLASSES.DARK_MODE, isDark);
        
        // Update icon
        this.updateIcon(isDark);
        
        // Save preference
        const themeValue = isDark ? APP_CONFIG.THEME.MODES.DARK : APP_CONFIG.THEME.MODES.LIGHT;
        localStorage.setItem(APP_CONFIG.THEME.STORAGE_KEY, themeValue);
    }
    
    updateIcon(isDark) {
        // Show sun icon when in dark mode (to switch to light)
        // Show moon icon when in light mode (to switch to dark)
        this.icon.className = isDark ? APP_CONFIG.THEME.ICONS.LIGHT : APP_CONFIG.THEME.ICONS.DARK;
    }
    
    animateToggle() {
        const rotationStyle = `rotate(360deg)`;
        const transitionStyle = `transform ${APP_CONFIG.ANIMATIONS.DURATION.BASE}ms ${APP_CONFIG.ANIMATIONS.EASING}`;
        
        this.themeToggle.style.transition = transitionStyle;
        this.themeToggle.style.transform = rotationStyle;
        
        // Reset animation after completion
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, APP_CONFIG.ANIMATIONS.DURATION.BASE);
    }
}

// Export singleton instance
export const themeManager = new ThemeManager();