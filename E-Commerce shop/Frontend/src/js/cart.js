// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cart = getCart();

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="quantity-btn">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="quantity-btn">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})" class="btn">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: ${formatPrice(total)}`;
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        updateCartDisplay();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
    updateCartDisplay();
}

// Clear cart
function clearCart() {
    saveCart([]);
    updateCartDisplay();
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
}); 