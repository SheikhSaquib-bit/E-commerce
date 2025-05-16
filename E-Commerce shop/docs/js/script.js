// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Update cart count
function updateCartCount() {
    const cart = getCart();
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Display products
function displayProducts() {
    const productGrids = document.querySelectorAll('.product-grid');
    productGrids.forEach(grid => {
        grid.innerHTML = '';
        products.forEach(product => {
            const productCard = createProductCard(product);
            grid.appendChild(productCard);
        });
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
        </div>
    `;
    return card;
}

// Start countdown timer
function startCountdown() {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;

    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    function updateCountdown() {
        const now = new Date();
        const timeLeft = endTime - now;

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = 'Sale Ended';
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Add to cart
function addToCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    startCountdown();
}); 