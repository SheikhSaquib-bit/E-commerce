// Hardcoded credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';
const USER_EMAIL = 'user@example.com';
const USER_PASSWORD = 'user123';

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked; // Assuming you have a remember me checkbox

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('isLoggedIn', 'true');
        if (rememberMe) {
            localStorage.setItem('rememberedUser', email);
        } else {
            localStorage.removeItem('rememberedUser');
        }
        window.location.href = 'index.html'; // Redirect to home or admin dashboard
    } else if (email === USER_EMAIL && password === USER_PASSWORD) {
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('isLoggedIn', 'true');
        if (rememberMe) {
            localStorage.setItem('rememberedUser', email);
        } else {
            localStorage.removeItem('rememberedUser');
        }
        window.location.href = 'index.html'; // Redirect to home page
    } else {
        showError('Invalid email or password.');
    }
});

// Show error message
function showError(message) {
    const errorElement = document.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        // Hide error message after some time
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 3000);
    } else {
        // If no specific error element, alert the message
        alert(message);
    }
}

// Check if user was remembered
document.addEventListener('DOMContentLoaded', () => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('email').value = rememberedUser;
        // Optionally, set focus to password or check 'remember me'
        // document.getElementById('rememberMe').checked = true;
    }

    // Remove registration-related elements if they exist in the HTML
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.style.display = 'none'; // Hide it
    }
    const toggleLink = document.querySelector('.toggle-text'); // Or whatever selector you use for the toggle link
    if (toggleLink) {
        toggleLink.style.display = 'none'; // Hide it
    }
});

// Logout functionality (can be called from a logout button)
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    // Do not remove 'rememberedUser' if you want the email to persist after logout
    window.location.href = 'login.html';
}

// Example of how to protect a route or show admin content
// This would typically be in a script tag on relevant pages or in a main script file
/*
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');

    // If trying to access a protected page and not logged in, redirect to login
    // Example: if (document.body.classList.contains('protected-page') && !isLoggedIn) {
    //     window.location.href = 'login.html';
    // }

    if (isLoggedIn && userRole === 'admin') {
        // Show admin-specific elements
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => el.style.display = 'block'); // or 'inline', 'flex', etc.
    }
});
*/ 