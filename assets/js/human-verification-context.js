// Human Verification Context - Single Source of Truth
// Manages all human verification state and modal interactions

const HumanVerificationContext = (function() {
    let isHuman = null; // null = not checked yet, true = verified, false = denied
    let pendingAction = null;
    let modal = null;
    
    function init() {
        modal = document.getElementById('verificationModal');
        if (!modal) {
            console.error('Verification modal not found');
            return;
        }
        
        // Always start hidden
        modal.style.setProperty('display', 'none', 'important');
        
        // For testing, clear localStorage and start fresh
        localStorage.removeItem('humanVerified');
        isHuman = null;
        
        // Set up modal event handlers
        setupModalEventHandlers();
        
        console.log('Human verification context initialized, isHuman:', isHuman);
    }
    
    function setupModalEventHandlers() {
        // Close modal on outside click
        document.addEventListener('click', function(e) {
            if (e.target === modal) {
                cancelVerification();
            }
        });
        
        // Close modal on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                cancelVerification();
            }
        });
    }
    
    function checkHuman() {
        return isHuman;
    }
    
    function requireVerification(action) {
        if (isHuman === true) {
            // Already verified, execute immediately
            executeAction(action);
        } else {
            // Need verification, show modal
            pendingAction = action;
            showModal();
        }
    }
    
    function showModal() {
        if (modal) {
            modal.style.setProperty('display', 'flex', 'important');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function hideModal() {
        if (modal) {
            modal.style.setProperty('display', 'none', 'important');
            document.body.style.overflow = '';
            pendingAction = null;
        }
    }
    
    function confirmHuman() {
        isHuman = true;
        localStorage.setItem('humanVerified', 'true');
        hideModal();
        
        // Update email section immediately after verification
        toggleEmailDisplay(true);
        
        if (pendingAction) {
            executeAction(pendingAction);
            pendingAction = null;
        }
        
        showToast('Verification complete! You now have access to protected content. ✅');
    }
    
    function toggleEmailDisplay(showCopy) {
        const showReveal = document.getElementById('showReveal');
        const showCopySection = document.getElementById('showCopy');
        
        if (showReveal && showCopySection) {
            if (showCopy) {
                showReveal.style.display = 'none';
                showCopySection.style.display = 'block';
            } else {
                showReveal.style.display = 'block';
                showCopySection.style.display = 'none';
            }
        }
    }
    
    function cancelVerification() {
        isHuman = false;
        hideModal();
    }
    
    function executeAction(action) {
        switch(action.type) {
            case 'revealEmail':
                actuallyRevealEmail();
                break;
            case 'accessResume':
                actuallyAccessResume(action.data);
                break;
            default:
                console.error('Unknown action type:', action.type);
        }
    }
    
    function actuallyRevealEmail() {
        toggleEmailDisplay(true);
        showToast('Email revealed! Click to copy 📧');
    }
    
    function actuallyAccessResume(type) {
        switch(type) {
            case 'full':
                window.open('resume_content.html', '_blank');
                break;
            case 'recruiter':
                window.open('recruiter-resume.html', '_blank');
                break;
            case 'pdf':
                window.open('recruiter-resume.html?print=true', '_blank');
                break;
        }
        showToast('Opening resume... 📄');
    }
    
    // Public API
    return {
        init: init,
        checkHuman: checkHuman,
        requireVerification: requireVerification,
        confirmHuman: confirmHuman,
        cancelVerification: cancelVerification
    };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    HumanVerificationContext.init();
    
    // Check if already verified and update email section
    setTimeout(() => {
        if (HumanVerificationContext.checkHuman()) {
            toggleEmailDisplay(true);
        }
    }, 100);
    
    function toggleEmailDisplay(showCopy) {
        const showReveal = document.getElementById('showReveal');
        const showCopySection = document.getElementById('showCopy');
        
        if (showReveal && showCopySection) {
            if (showCopy) {
                showReveal.style.display = 'none';
                showCopySection.style.display = 'block';
            } else {
                showReveal.style.display = 'block';
                showCopySection.style.display = 'none';
            }
        }
    }
});

// Global functions for HTML onclick handlers
window.confirmHuman = function() {
    HumanVerificationContext.confirmHuman();
};

window.closeVerificationModal = function() {
    HumanVerificationContext.cancelVerification();
};

window.revealEmail = function() {
    HumanVerificationContext.requireVerification({type: 'revealEmail'});
};

window.accessResume = function(type) {
    HumanVerificationContext.requireVerification({type: 'accessResume', data: type});
};

window.copyEmail = copyEmail;

// Utility functions needed by the context
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

function copyEmail() {
    const email = 'lenanevel1@gmail.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showToast('Email copied to clipboard! 📧');
        }).catch(() => {
            fallbackCopyEmail(email);
        });
    } else {
        fallbackCopyEmail(email);
    }
}

function fallbackCopyEmail(email) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Email copied to clipboard! 📧');
    } catch (err) {
        showToast('Could not copy email. Please copy manually: ' + email);
    }
    
    document.body.removeChild(textArea);
}