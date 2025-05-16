// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store token
            localStorage.setItem('token', data.token);
            // Redirect to home page
            window.location.href = '/';
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
    }
});

// Handle register form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store token
            localStorage.setItem('token', data.token);
            // Redirect to home page
            window.location.href = '/';
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
    }
});

// Show error message
function showError(message) {
    const errorElement = document.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Toggle between login and register forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleText = document.querySelector('.toggle-text');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        toggleText.textContent = "Don't have an account? Register";
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        toggleText.textContent = 'Already have an account? Login';
    }
} 