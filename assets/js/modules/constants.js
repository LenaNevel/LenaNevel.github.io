// Constants and Configuration - Olena Nevel Portfolio
// Following DRY principle - single source of truth for all constants

export const APP_CONFIG = {
    THEME: {
        STORAGE_KEY: 'theme',
        MODES: {
            LIGHT: 'light',
            DARK: 'dark'
        },
        CLASSES: {
            DARK_MODE: 'dark-mode'
        },
        ICONS: {
            LIGHT: 'far fa-sun',        // Icon shown in dark mode (toggles to light) - clearer sun icon
            DARK: 'far fa-moon'         // Icon shown in light mode (toggles to dark) - using regular moon for clarity
        }
    },
    
    NAVIGATION: {
        HEADER_HEIGHT: 80,
        SCROLL_THRESHOLD: 50,
        HIDE_THRESHOLD: 100,
        SCROLL_BEHAVIOR: 'smooth',
        OBSERVER_MARGIN: '0px 0px -50px 0px',
        OBSERVER_THRESHOLD: 0.1
    },
    
    ANIMATIONS: {
        DURATION: {
            FAST: 150,
            BASE: 300,
            SLOW: 500
        },
        EASING: 'ease',
        INTERSECTION_THRESHOLD: 0.1,
        INTERSECTION_MARGIN: '0px 0px -50px 0px'
    },
    
    TOAST: {
        DEFAULT_DURATION: 3000,
        POSITION: {
            BOTTOM: '20px',
            RIGHT: '20px'
        },
        Z_INDEX: '10000'
    },
    
    FORM: {
        VALIDATION_DELAY: 100,
        FOCUS_DELAY: 100,
        CALENDLY_FIELD_ANIMATION: 'slideDown 0.3s ease'
    },
    
    DEBOUNCE: {
        SCROLL: 100,
        DEFAULT: 300
    }
};

export const SELECTORS = {
    // Theme
    THEME_TOGGLE: '#themeToggle',
    THEME_ICON: '#themeToggle i',
    
    // Navigation
    HEADER: '#header',
    NAV_LINKS: '.nav a[href^="#"]',
    SECTIONS: 'section[id]',
    
    // Animations
    ANIMATED_ELEMENTS: '.timeline-item, .project-card, .skill-category, .hero-stats',
    TIMELINE_ITEMS: '.timeline-item',
    HERO_STATS: '.hero-stats',
    METRIC_VALUES: '.metric-value',
    STAT_NUMBERS: '.stat-number',
    
    // Interactive Elements
    PROJECT_CARDS: '.project-card',
    BUTTONS: '.btn',
    
    // Forms
    QUICK_CONTACT_FORM: '#quickContactForm',
    HUMAN_CHECK: '#humanCheck',
    CALENDLY_FIELD: '#calendlyField',
    
    // Verification
    EMAIL_SECTION: '#emailSection',
    SHOW_REVEAL: '#showReveal',
    SHOW_COPY: '#showCopy',
    
    // Footer
    YEAR_ELEMENT: '#year'
};

export const ANIMATIONS_CONFIG = {
    TIMELINE: {
        METRIC_DELAY: 100,
        SCALE_START: 1.1,
        SCALE_END: 1,
        SCALE_DURATION: 200
    },
    
    STATS: {
        DELAY_BETWEEN: 200,
        COUNTER_STEPS: 30,
        COUNTER_DURATION: 1000
    },
    
    CARDS: {
        HOVER_TRANSFORM: 'translateY(-8px) scale(1.02)',
        DEFAULT_TRANSFORM: 'translateY(0) scale(1)'
    }
};

export const RIPPLE_CONFIG = {
    BACKGROUND: 'rgba(255, 255, 255, 0.3)',
    ANIMATION: 'ripple 0.6s linear',
    DURATION: 600
};