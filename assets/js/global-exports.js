// Global Exports - Makes module functions available globally for HTML onclick handlers
// This bridges the gap between ES6 modules and inline HTML event handlers

import { toggleQuickForm, toggleCalendlyField, validateHumanCheck } from './modules/form-handler.js';
import { closeMobileMenu } from './modules/mobile-navigation.js';

// Export form handler functions to global scope
window.toggleQuickForm = toggleQuickForm;
window.toggleCalendlyField = toggleCalendlyField;
window.validateHumanCheck = validateHumanCheck;

// Export mobile navigation functions to global scope
window.closeMobileMenu = closeMobileMenu;