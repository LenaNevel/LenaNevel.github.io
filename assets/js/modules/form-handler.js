// Form Handler - Manages contact form functionality
// Single responsibility for all form-related behaviors

import { APP_CONFIG, SELECTORS } from './constants.js';
import { toggleElementDisplay, getVerificationStatus, showToast } from './utils.js';

class FormHandler {
    constructor() {
        this.quickContactForm = null;
        this.humanCheckbox = null;
        this.calendlyField = null;
        
        this.init = this.init.bind(this);
        this.toggleQuickForm = this.toggleQuickForm.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleEscapeKey = this.handleEscapeKey.bind(this);
        this.toggleCalendlyField = this.toggleCalendlyField.bind(this);
        this.validateHumanCheck = this.validateHumanCheck.bind(this);
    }
    
    init() {
        this.quickContactForm = document.querySelector(SELECTORS.QUICK_CONTACT_FORM);
        this.humanCheckbox = document.querySelector(SELECTORS.HUMAN_CHECK);
        this.calendlyField = document.querySelector(SELECTORS.CALENDLY_FIELD);
        
        this.setupEventListeners();
        this.updateFormBasedOnVerification();
    }
    
    setupEventListeners() {
        // Outside click and escape key handling
        document.addEventListener('click', this.handleOutsideClick);
        document.addEventListener('keydown', this.handleEscapeKey);
        
        // Form state update on page load
        setTimeout(() => {
            this.updateFormBasedOnVerification();
        }, APP_CONFIG.FORM.VALIDATION_DELAY);
    }
    
    toggleQuickForm() {
        if (!this.quickContactForm) return;
        
        const isVisible = this.quickContactForm.style.display === 'flex';
        
        if (isVisible) {
            this.hideForm();
        } else {
            this.showForm();
        }
    }
    
    showForm() {
        this.quickContactForm.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Update form state and focus first input
        setTimeout(() => {
            this.updateFormBasedOnVerification();
            this.focusFirstInput();
        }, APP_CONFIG.FORM.FOCUS_DELAY);
    }
    
    hideForm() {
        this.quickContactForm.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    focusFirstInput() {
        const firstInput = this.quickContactForm?.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }
    
    handleOutsideClick(event) {
        if (event.target === this.quickContactForm) {
            this.toggleQuickForm();
        }
    }
    
    handleEscapeKey(event) {
        if (event.key === 'Escape' && this.isFormVisible()) {
            this.toggleQuickForm();
        }
    }
    
    isFormVisible() {
        return this.quickContactForm && this.quickContactForm.style.display === 'flex';
    }
    
    toggleCalendlyField() {
        if (!this.humanCheckbox || !this.calendlyField) return;
        
        const isChecked = this.humanCheckbox.checked;
        
        if (isChecked) {
            this.calendlyField.style.display = 'block';
            this.calendlyField.style.animation = APP_CONFIG.FORM.CALENDLY_FIELD_ANIMATION;
        } else {
            this.calendlyField.style.display = 'none';
        }
    }
    
    validateHumanCheck() {
        if (!this.humanCheckbox) return false;
        
        const isChecked = this.humanCheckbox.checked;
        const isVerified = getVerificationStatus();
        
        if (!isChecked && !isVerified) {
            showToast('Please verify that you are a human recruiter/hiring manager to send the message', 4000);
            this.humanCheckbox.focus();
            return false;
        }
        
        showToast('Opening your email client... 📧');
        return true;
    }
    
    updateFormBasedOnVerification() {
        const isVerified = getVerificationStatus();
        
        if (isVerified && this.humanCheckbox) {
            this.humanCheckbox.checked = true;
            
            if (this.calendlyField) {
                this.calendlyField.style.display = 'block';
            }
        }
    }
}

// Create singleton instance
const formHandler = new FormHandler();

// Export both the class and the methods needed for global access
export { formHandler as FormHandler };

// Global functions for HTML onclick handlers
export function toggleQuickForm() {
    formHandler.toggleQuickForm();
}

export function toggleCalendlyField() {
    formHandler.toggleCalendlyField();
}

export function validateHumanCheck() {
    return formHandler.validateHumanCheck();
}