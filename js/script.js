// Navigation menu toggle for mobile
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && !isValidEmail(emailField.value)) {
                isValid = false;
                emailField.classList.add('error');
            }

            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            }
        });
    }
});

// Email validation helper function
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Intersection Observer for animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

// Membership Application Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const membershipForm = document.getElementById('membershipForm');
    
    if (membershipForm) {
        membershipForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic form validation
            if (!validateForm()) {
                return;
            }

            // Collect form data
            const formData = new FormData(membershipForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            try {
                // Here you would typically send the data to your backend
                // For now, we'll just show a success message
                showSuccessMessage();
                membershipForm.reset();
            } catch (error) {
                showErrorMessage('There was an error submitting your application. Please try again.');
            }
        });

        // Real-time validation
        const inputs = membershipForm.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
});

function validateForm() {
    const form = document.getElementById('membershipForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const errorMessage = field.parentElement.querySelector('.error-message');
    let isValid = true;

    // Remove existing error message
    if (errorMessage) {
        errorMessage.remove();
    }

    // Remove existing error class
    field.classList.remove('error');

    // Check if empty
    if (!field.value.trim()) {
        showFieldError(field, 'This field is required');
        isValid = false;
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    }

    // Phone validation
    if (field.id === 'phone' && field.value.trim()) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(field.value)) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        }
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

function showSuccessMessage() {
    const formWrapper = document.querySelector('.application-form-wrapper');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <h3>Application Submitted Successfully!</h3>
        <p>Thank you for applying to join APASA. We will review your application and contact you within 5 working days.</p>
        <p>Please check your email for further instructions.</p>
    `;
    
    formWrapper.innerHTML = '';
    formWrapper.appendChild(successMessage);
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.parentElement.insertBefore(errorDiv, submitButton);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}
