// App Controller - Main initialization and orchestration
// Clean initialization following single responsibility principle

import { themeManager } from './theme-manager.js';
import { navigationManager } from './navigation-manager.js';
import { mobileNavigationManager } from './mobile-navigation.js';
import { animationManager } from './animation-manager.js';
import { uiInteractionsManager } from './ui-interactions.js';
import { FormHandler } from './form-handler.js';
import { updateCurrentYear } from './utils.js';

class App {
    constructor() {
        this.isInitialized = false;
        
        this.init = this.init.bind(this);
        this.onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
    }
    
    init() {
        if (this.isInitialized) {
            console.warn('App already initialized');
            return;
        }
        
        // Check if DOM is already loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.onDOMContentLoaded);
        } else {
            // DOM is already loaded
            this.onDOMContentLoaded();
        }
    }
    
    onDOMContentLoaded() {
        console.log('🚀 Portfolio initializing - Olena Nevel, Senior Software Engineer');
        
        // Initialize all modules in logical order
        this.initializeModules();
        
        // Update dynamic content
        this.updateDynamicContent();
        
        // Mark as initialized
        this.isInitialized = true;
        
        console.log('✅ Portfolio initialization complete');
    }
    
    initializeModules() {
        // Order matters for some dependencies
        try {
            // Core UI functionality first
            themeManager.init();
            navigationManager.init();
            mobileNavigationManager.init();
            
            // Visual enhancements
            animationManager.init();
            uiInteractionsManager.init();
            
            // Form functionality
            FormHandler.init();
            
        } catch (error) {
            console.error('Error initializing modules:', error);
        }
    }
    
    updateDynamicContent() {
        try {
            // Update year in footer
            updateCurrentYear();
            
        } catch (error) {
            console.error('Error updating dynamic content:', error);
        }
    }
    
    // Public method to get initialization status
    getStatus() {
        return {
            initialized: this.isInitialized,
            modules: {
                theme: !!themeManager,
                navigation: !!navigationManager,
                animations: !!animationManager,
                ui: !!uiInteractionsManager,
                forms: !!FormHandler
            }
        };
    }
}

// Create and export singleton instance
export const app = new App();

// Auto-initialize when module is loaded
app.init();