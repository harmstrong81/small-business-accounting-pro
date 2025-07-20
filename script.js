// Form Validation and Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Form validation
    function validateForm() {
        let isValid = true;
        const fields = ['name', 'email', 'service', 'message'];
        
        // Clear previous error states
        fields.forEach(field => {
            const element = document.getElementById(field);
            const errorElement = document.getElementById(field + 'Error');
            const formGroup = element.closest('.form-group');
            
            formGroup.classList.remove('error', 'success');
            errorElement.textContent = '';
        });

        // Validate each field
        fields.forEach(field => {
            const element = document.getElementById(field);
            const errorElement = document.getElementById(field + 'Error');
            const formGroup = element.closest('.form-group');
            const value = element.value.trim();

            if (!value) {
                formGroup.classList.add('error');
                errorElement.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                isValid = false;
            } else if (field === 'email' && !isValidEmail(value)) {
                formGroup.classList.add('error');
                errorElement.textContent = 'Please enter a valid email address';
                isValid = false;
            } else if (field === 'phone' && value && !isValidPhone(value)) {
                formGroup.classList.add('error');
                errorElement.textContent = 'Please enter a valid phone number';
                isValid = false;
            } else {
                formGroup.classList.add('success');
            }
        });

        return isValid;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    // Show loading state
    function showLoading() {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;
    }

    // Hide loading state
    function hideLoading() {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }

    // Show success message
    function showSuccess() {
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    }

    // Show error message
    function showError() {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        showLoading();

        // Submit form to Formspree
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showSuccess();
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError();
        })
        .finally(() => {
            hideLoading();
        });
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const field = this.id;
            const errorElement = document.getElementById(field + 'Error');
            const formGroup = this.closest('.form-group');
            const value = this.value.trim();

            formGroup.classList.remove('error', 'success');
            errorElement.textContent = '';

            if (value) {
                if (field === 'email' && !isValidEmail(value)) {
                    formGroup.classList.add('error');
                    errorElement.textContent = 'Please enter a valid email address';
                } else if (field === 'phone' && !isValidPhone(value)) {
                    formGroup.classList.add('error');
                    errorElement.textContent = 'Please enter a valid phone number';
                } else {
                    formGroup.classList.add('success');
                }
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe stat numbers for animation
document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// Add animation styles
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .stat-number {
        transition: all 0.8s ease;
    }
    
    .stat-number.animate {
        transform: scale(1.1);
        color: #10b981;
    }
`;
document.head.appendChild(animationStyle); 