// Modern Portfolio JavaScript - Olena Nevel


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initStickyHeader();
    initSmoothScrolling();
    initAnimations();
    initInteractivity();
    initYear();
    
    console.log('🚀 Portfolio loaded - Olena Nevel, Senior Software Engineer');
});

// Theme Toggle (Dark/Light Mode)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
        updateThemeIcon(icon, savedTheme === 'dark');
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(icon, isDark);
        
        // Add a little celebration animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

function updateThemeIcon(icon, isDark) {
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Sticky Header with Scroll Detection
function initStickyHeader() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        header.classList.toggle('scrolled', currentScrollY > 50);
        
        // Hide/show header based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', debounce(updateNavOnScroll, 100));
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            const correspondingLink = document.querySelector(`.nav a[href="#${sectionId}"]`);
            if (correspondingLink) {
                updateActiveNavLink(correspondingLink);
            }
        }
    });
}

// Scroll-triggered Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
                
                // Special animation for stats
                if (entry.target.classList.contains('hero-stats')) {
                    animateStats(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .hero-stats');
    animatedElements.forEach(el => {
        observer.observe(el);
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

function animateTimelineItem(item) {
    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
    
    // Animate impact metrics
    const metrics = item.querySelectorAll('.metric-value');
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            metric.style.transform = 'scale(1.1)';
            setTimeout(() => {
                metric.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

function animateStats(statsContainer) {
    statsContainer.style.opacity = '1';
    statsContainer.style.transform = 'translateY(0)';
    
    const statNumbers = statsContainer.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
        setTimeout(() => {
            animateNumber(stat);
        }, index * 200);
    });
}

function animateNumber(element) {
    const finalText = element.textContent;
    const hasPlus = finalText.includes('+');
    const hasPercent = finalText.includes('%');
    const hasHash = finalText.includes('#');
    
    if (hasHash) return; // Don't animate "#1"
    
    const finalNumber = parseInt(finalText);
    if (isNaN(finalNumber)) return;
    
    let current = 0;
    const increment = Math.ceil(finalNumber / 30);
    const duration = 1000;
    const stepTime = duration / (finalNumber / increment);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }
        
        let displayText = current.toString();
        if (hasPlus) displayText += '+';
        if (hasPercent) displayText += '%';
        
        element.textContent = displayText;
    }, stepTime);
}

// Interactive Features
function initInteractivity() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}





// Toast Notifications
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = 'var(--primary)';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = 'var(--radius)';
    toast.style.boxShadow = 'var(--shadow-lg)';
    toast.style.zIndex = '10000';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'transform 0.3s ease';
    
    document.body.appendChild(toast);
    
    // Slide in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

// Update Year in Footer
function initYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Utility Functions
function debounce(func, wait, immediate) {
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

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
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
`;
document.head.appendChild(style);

// Quick Contact Form Toggle
function toggleQuickForm() {
    const form = document.getElementById('quickContactForm');
    if (form.style.display === 'none' || !form.style.display) {
        form.style.display = 'flex';
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Check and update form based on verification status
        setTimeout(() => {
            updateFormIfVerified();
            const firstInput = form.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    } else {
        form.style.display = 'none';
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Close form on outside click
document.addEventListener('click', function(e) {
    const form = document.getElementById('quickContactForm');
    if (e.target === form) {
        toggleQuickForm();
    }
});

// Close form on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const form = document.getElementById('quickContactForm');
        if (form && form.style.display === 'flex') {
            toggleQuickForm();
        }
    }
});

// Toggle Calendly field based on human verification
function toggleCalendlyField() {
    const humanCheck = document.getElementById('humanCheck');
    const calendlyField = document.getElementById('calendlyField');
    
    if (humanCheck.checked) {
        calendlyField.style.display = 'block';
        calendlyField.style.animation = 'slideDown 0.3s ease';
    } else {
        calendlyField.style.display = 'none';
    }
}

// Validate human verification before form submission
function validateHumanCheck() {
    const humanCheck = document.getElementById('humanCheck');
    const isVerified = HumanVerificationContext.checkHuman();
    
    if (!humanCheck.checked && !isVerified) {
        showToast('Please verify that you are a human recruiter/hiring manager to send the message', 4000);
        humanCheck.focus();
        return false;
    }
    
    showToast('Opening your email client... 📧');
    return true;
}

// Pre-check the form checkbox if already verified
function updateFormIfVerified() {
    const isVerified = HumanVerificationContext.checkHuman();
    if (isVerified) {
        const humanCheck = document.getElementById('humanCheck');
        const calendlyField = document.getElementById('calendlyField');
        if (humanCheck) {
            humanCheck.checked = true;
            if (calendlyField) calendlyField.style.display = 'block';
        }
    }
}


// Initialize form state based on verification status
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateFormIfVerified, 100);
});

// Global functions for HTML onclick handlers
window.toggleQuickForm = toggleQuickForm;
window.toggleCalendlyField = toggleCalendlyField;
window.validateHumanCheck = validateHumanCheck;