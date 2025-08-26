// Animation Manager - Handles all scroll-triggered animations
// Single responsibility for intersection observer and element animations

import { APP_CONFIG, SELECTORS, ANIMATIONS_CONFIG } from './constants.js';

class AnimationManager {
    constructor() {
        this.observer = null;
        
        this.init = this.init.bind(this);
        this.handleIntersection = this.handleIntersection.bind(this);
    }
    
    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: APP_CONFIG.ANIMATIONS.INTERSECTION_THRESHOLD,
            rootMargin: APP_CONFIG.ANIMATIONS.INTERSECTION_MARGIN
        };
        
        this.observer = new IntersectionObserver(this.handleIntersection, observerOptions);
    }
    
    observeElements() {
        const animatedElements = document.querySelectorAll(SELECTORS.ANIMATED_ELEMENTS);
        
        animatedElements.forEach(element => {
            // Set initial state - prepare for animation
            this.prepareElementForAnimation(element);
            
            // Start observing
            this.observer.observe(element);
        });
    }
    
    prepareElementForAnimation(element) {
        const elementStyles = {
            opacity: '0',
            transform: 'translateY(30px)',
            transition: `opacity 0.6s ${APP_CONFIG.ANIMATIONS.EASING}, transform 0.6s ${APP_CONFIG.ANIMATIONS.EASING}`
        };
        
        Object.assign(element.style, elementStyles);
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateElement(entry.target);
            }
        });
    }
    
    animateElement(element) {
        // Common animation - make element visible
        element.classList.add('animate-in');
        
        // Special animations based on element type
        if (element.classList.contains('timeline-item')) {
            this.animateTimelineItem(element);
        } else if (element.classList.contains('hero-stats')) {
            this.animateStats(element);
        }
    }
    
    animateTimelineItem(item) {
        const metricElements = item.querySelectorAll(SELECTORS.METRIC_VALUES);
        
        metricElements.forEach((metric, index) => {
            setTimeout(() => {
                this.animateMetricValue(metric);
            }, index * ANIMATIONS_CONFIG.TIMELINE.METRIC_DELAY);
        });
    }
    
    animateMetricValue(metric) {
        const { SCALE_START, SCALE_END, SCALE_DURATION } = ANIMATIONS_CONFIG.TIMELINE;
        
        metric.style.transform = `scale(${SCALE_START})`;
        
        setTimeout(() => {
            metric.style.transform = `scale(${SCALE_END})`;
        }, SCALE_DURATION);
    }
    
    animateStats(statsContainer) {
        const statNumbers = statsContainer.querySelectorAll(SELECTORS.STAT_NUMBERS);
        
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                this.animateNumber(stat);
            }, index * ANIMATIONS_CONFIG.STATS.DELAY_BETWEEN);
        });
    }
    
    animateNumber(element) {
        const finalText = element.textContent;
        
        // Don't animate special values like "#1"
        if (finalText.includes('#')) return;
        
        const hasPlus = finalText.includes('+');
        const hasPercent = finalText.includes('%');
        const finalNumber = parseInt(finalText);
        
        if (isNaN(finalNumber)) return;
        
        this.runNumberAnimation(element, finalNumber, hasPlus, hasPercent);
    }
    
    runNumberAnimation(element, finalNumber, hasPlus, hasPercent) {
        const { COUNTER_STEPS, COUNTER_DURATION } = ANIMATIONS_CONFIG.STATS;
        const increment = Math.ceil(finalNumber / COUNTER_STEPS);
        const stepTime = COUNTER_DURATION / (finalNumber / increment);
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                clearInterval(timer);
            }
            
            const displayText = this.formatCounterText(current, hasPlus, hasPercent);
            element.textContent = displayText;
        }, stepTime);
    }
    
    formatCounterText(value, hasPlus, hasPercent) {
        let displayText = value.toString();
        if (hasPlus) displayText += '+';
        if (hasPercent) displayText += '%';
        return displayText;
    }
}

// Export singleton instance
export const animationManager = new AnimationManager();