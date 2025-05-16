// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const errorMsg = document.querySelector('.error-message');

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        window.location.href = 'index.html'; // or admin dashboard if you have one
    } else {
        errorMsg.textContent = 'Invalid admin credentials.';
        errorMsg.style.display = 'block';
        setTimeout(() => errorMsg.style.display = 'none', 3000);
    }
}); 