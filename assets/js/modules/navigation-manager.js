// Navigation Manager - Handles header, smooth scrolling, and active nav
// Single responsibility for all navigation concerns

import { APP_CONFIG, SELECTORS } from './constants.js';
import { debounce } from './utils.js';

class NavigationManager {
    constructor() {
        this.header = null;
        this.navLinks = [];
        this.sections = [];
        this.lastScrollY = 0;
        
        this.init = this.init.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);
        this.updateNavOnScroll = debounce(this.updateNavOnScroll.bind(this), APP_CONFIG.DEBOUNCE.SCROLL);
    }
    
    init() {
        this.header = document.querySelector(SELECTORS.HEADER);
        this.navLinks = document.querySelectorAll(SELECTORS.NAV_LINKS);
        this.sections = document.querySelectorAll(SELECTORS.SECTIONS);
        
        if (!this.header) {
            console.warn('Header element not found');
            return;
        }
        
        this.setupEventListeners();
        this.lastScrollY = window.scrollY;
    }
    
    setupEventListeners() {
        // Scroll handling for sticky header
        window.addEventListener('scroll', this.handleScroll);
        
        // Scroll handling for active nav updates
        window.addEventListener('scroll', this.updateNavOnScroll);
        
        // Click handling for smooth scrolling
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick);
        });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Update header styling based on scroll position
        this.updateHeaderStyling(currentScrollY);
        
        // Show/hide header based on scroll direction
        this.updateHeaderVisibility(currentScrollY);
        
        this.lastScrollY = currentScrollY;
    }
    
    updateHeaderStyling(scrollY) {
        const isScrolled = scrollY > APP_CONFIG.NAVIGATION.SCROLL_THRESHOLD;
        this.header.classList.toggle('scrolled', isScrolled);
    }
    
    updateHeaderVisibility(scrollY) {
        const isScrollingDown = scrollY > this.lastScrollY;
        const isScrolledEnough = scrollY > APP_CONFIG.NAVIGATION.HIDE_THRESHOLD;
        
        if (isScrollingDown && isScrolledEnough) {
            this.header.style.transform = 'translateY(-100%)';
        } else {
            this.header.style.transform = 'translateY(0)';
        }
    }
    
    handleNavClick(event) {
        event.preventDefault();
        
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) {
            console.warn(`Target element not found: ${targetId}`);
            return;
        }
        
        this.scrollToTarget(targetElement);
        this.updateActiveNavLink(event.target);
    }
    
    scrollToTarget(targetElement) {
        const targetPosition = targetElement.offsetTop - APP_CONFIG.NAVIGATION.HEADER_HEIGHT;
        
        window.scrollTo({
            top: targetPosition,
            behavior: APP_CONFIG.NAVIGATION.SCROLL_BEHAVIOR
        });
    }
    
    updateActiveNavLink(activeLink) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        activeLink.classList.add('active');
    }
    
    updateNavOnScroll() {
        const scrollPos = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            const isInView = scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight;
            
            if (isInView) {
                const correspondingLink = document.querySelector(`.nav a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    this.updateActiveNavLink(correspondingLink);
                }
            }
        });
    }
}

// Export singleton instance
export const navigationManager = new NavigationManager();