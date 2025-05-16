document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // Remove any existing auth/admin links
    const oldAuth = navLinks.querySelector('.nav-auth');
    if (oldAuth) oldAuth.remove();
    const oldAdmin = navLinks.querySelector('.nav-admin');
    if (oldAdmin) oldAdmin.remove();

    // Get login state
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');

    // Add Admin Dashboard link if admin
    if (isLoggedIn && userRole === 'admin') {
        const adminLi = document.createElement('li');
        adminLi.className = 'nav-admin';
        const adminLink = document.createElement('a');
        adminLink.href = 'admin-login.html'; // Or admin-dashboard.html if you have one
        adminLink.textContent = 'Admin Dashboard';
        adminLi.appendChild(adminLink);
        navLinks.appendChild(adminLi);
    }

    // Add Login/Logout link
    const authLi = document.createElement('li');
    authLi.className = 'nav-auth';
    const authLink = document.createElement('a');
    if (isLoggedIn) {
        authLink.href = '#';
        authLink.textContent = 'Logout';
        authLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userRole');
            window.location.reload();
        });
    } else {
        authLink.href = 'login.html';
        authLink.textContent = 'Login';
    }
    authLi.appendChild(authLink);
    navLinks.appendChild(authLi);
}); 