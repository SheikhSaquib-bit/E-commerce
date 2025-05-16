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

// Store products in localStorage for admin changes (in-memory for demo)
function getStoredProducts() {
    return JSON.parse(localStorage.getItem('products')) || products.slice();
}
function setStoredProducts(newProducts) {
    localStorage.setItem('products', JSON.stringify(newProducts));
}

// Display products (with admin features)
function displayProducts() {
    const productGrids = document.querySelectorAll('.product-grid');
    const isAdmin = localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('userRole') === 'admin';
    const productList = getStoredProducts();
    productGrids.forEach(grid => {
        grid.innerHTML = '';
        productList.forEach(product => {
            const productCard = createProductCard(product, isAdmin);
            grid.appendChild(productCard);
        });
        // If admin, add the Add Product button/form
        if (isAdmin) {
            let adminForm = document.getElementById('admin-product-form');
            if (!adminForm) {
                adminForm = document.createElement('form');
                adminForm.id = 'admin-product-form';
                adminForm.innerHTML = `
                    <h3>Add Product</h3>
                    <input type="text" id="admin-product-name" placeholder="Name" required>
                    <input type="number" id="admin-product-price" placeholder="Price" required>
                    <input type="text" id="admin-product-image" placeholder="Image URL" required>
                    <input type="text" id="admin-product-description" placeholder="Description" required>
                    <button type="submit" class="btn">Add Product</button>
                `;
                adminForm.style.margin = '2rem 0';
                grid.parentElement.insertBefore(adminForm, grid);
                adminForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const name = document.getElementById('admin-product-name').value;
                    const price = parseFloat(document.getElementById('admin-product-price').value);
                    const image = document.getElementById('admin-product-image').value;
                    const description = document.getElementById('admin-product-description').value;
                    const newProduct = {
                        id: Date.now(),
                        name,
                        price,
                        image,
                        description
                    };
                    productList.push(newProduct);
                    setStoredProducts(productList);
                    displayProducts();
                });
            }
        }
    });
}

// Create product card (with admin controls)
function createProductCard(product, isAdmin) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
            ${isAdmin ? `
                <button onclick="editProduct(${product.id})" class="btn" style="background:#ffc107;color:#333;margin-left:5px;">Edit</button>
                <button onclick="deleteProduct(${product.id})" class="btn" style="background:#dc3545;margin-left:5px;">Delete</button>
            ` : ''}
        </div>
    `;
    return card;
}

// Edit product (admin)
window.editProduct = function(productId) {
    const productList = getStoredProducts();
    const product = productList.find(p => p.id === productId);
    if (!product) return;
    // Fill the admin form with product data
    document.getElementById('admin-product-name').value = product.name;
    document.getElementById('admin-product-price').value = product.price;
    document.getElementById('admin-product-image').value = product.image;
    document.getElementById('admin-product-description').value = product.description;
    // Change form submit to update
    const adminForm = document.getElementById('admin-product-form');
    adminForm.querySelector('button[type="submit"]').textContent = 'Update Product';
    adminForm.onsubmit = function(e) {
        e.preventDefault();
        product.name = document.getElementById('admin-product-name').value;
        product.price = parseFloat(document.getElementById('admin-product-price').value);
        product.image = document.getElementById('admin-product-image').value;
        product.description = document.getElementById('admin-product-description').value;
        setStoredProducts(productList);
        displayProducts();
        // Reset form
        adminForm.reset();
        adminForm.querySelector('button[type="submit"]').textContent = 'Add Product';
        adminForm.onsubmit = defaultAddProduct;
    };
};

// Default add product handler
function defaultAddProduct(e) {
    e.preventDefault();
    const productList = getStoredProducts();
    const name = document.getElementById('admin-product-name').value;
    const price = parseFloat(document.getElementById('admin-product-price').value);
    const image = document.getElementById('admin-product-image').value;
    const description = document.getElementById('admin-product-description').value;
    const newProduct = {
        id: Date.now(),
        name,
        price,
        image,
        description
    };
    productList.push(newProduct);
    setStoredProducts(productList);
    displayProducts();
}

// Delete product (admin)
window.deleteProduct = function(productId) {
    let productList = getStoredProducts();
    productList = productList.filter(p => p.id !== productId);
    setStoredProducts(productList);
    displayProducts();
};

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