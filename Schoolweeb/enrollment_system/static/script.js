// DOM Elements
const form = document.getElementById('enrollment-form');
const studentTypeRadios = document.querySelectorAll('input[name="student_type"]');
const previousSchoolField = document.getElementById('previous-school-field');

// Toggle Previous School Field
studentTypeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'Transferee') {
            previousSchoolField.classList.remove('hidden');
            document.getElementById('previous-school').required = true;
        } else {
            previousSchoolField.classList.add('hidden');
            document.getElementById('previous-school').required = false;
            document.getElementById('previous-school').value = '';
        }
    });
});

// Form Validation
function validateForm() {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (field.type === 'radio') {
            const radioGroup = form.querySelectorAll(`input[name="${field.name}"]`);
            const isChecked = Array.from(radioGroup).some(r => r.checked);
            if (!isChecked) {
                isValid = false;
                showValidationError(field);
            }
        } else if (!field.value.trim()) {
            isValid = false;
            showValidationError(field);
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            showValidationError(field, 'Please enter a valid email');
        } else if (field.type === 'tel' && !isValidPhone(field.value)) {
            isValid = false;
            showValidationError(field, 'Please enter a valid phone number');
        }
    });

    return isValid;
}

function showValidationError(field, message = '') {
    const container = field.closest('.form-group') || field.closest('.radio-group');
    if (container) {
        container.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            container.style.animation = '';
        }, 500);
    }

    if (message) {
        alert(message);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^(\d{10}|\d{11}|09\d{9}|09\d{8}|\d{3}-\d{3}-\d{4})$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

// Form Submission - Allow normal form submission to Flask backend
form.addEventListener('submit', function(e) {
    if (!validateForm()) {
        e.preventDefault();
        alert('Please fill in all required fields correctly.');
    }
    // If validation passes, form submits normally to /submit
});

function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        animation: slideIn 0.5s ease;
        font-weight: 600;
    `;
    message.textContent = '✓ Form submitted successfully! Our team will review your enrollment.';
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => message.remove(), 500);
    }, 4000);
}

// Real-time validation on input
const inputFields = form.querySelectorAll('input[required], select[required]');
inputFields.forEach(field => {
    field.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });

    field.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '';
        }
    });
});

// Form reset handler
form.addEventListener('reset', function() {
    previousSchoolField.classList.add('hidden');
    document.getElementById('previous-school').required = false;
    setTimeout(() => {
        inputFields.forEach(field => {
            field.style.borderColor = '';
        });
    }, 100);
});

// Shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Course card selection feedback
const courseCards = document.querySelectorAll('.course-card input[type="radio"]');
courseCards.forEach(card => {
    card.addEventListener('change', function() {
        const label = this.closest('.course-card');
        if (label) {
            const courseName = label.querySelector('.course-card-content h3').textContent;
            const coursePrice = label.querySelector('.course-price').textContent;
            console.log(`Selected Course: ${courseName} - ${coursePrice}`);
        }
    });
});

// Smooth scroll on page load
document.addEventListener('DOMContentLoaded', function() {
    // Highlight required fields
    const requiredLabels = form.querySelectorAll('label');
    requiredLabels.forEach(label => {
        const input = label.querySelector('input[required], select[required], textarea[required]');
        if (input && label.textContent.includes('*') === false) {
            // Common required fields are already marked with *
        }
    });

    // Auto-format phone numbers
    const phoneInputs = form.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(inputField => {
        inputField.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 10) {
                value = value.substring(0, 11);
            }
            this.value = value;
        });
    });

    console.log('Enrollment form ready for submissions!');
});

// Print friendly format for debugging
window.getFormDataForBackend = function() {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Backend Data:', JSON.stringify(data, null, 2));
    return data;
};
