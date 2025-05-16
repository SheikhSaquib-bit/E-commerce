// Product data
let products = [];

// Fetch products from the database
fetch('get_products.php')
    .then(response => response.json())
    .then(data => {
        products = data;
        // Trigger product display after fetching data
        if (typeof displayProducts === 'function') {
            displayProducts();
        }
    })
    .catch(error => console.error('Error fetching products:', error));

// Format price in INR
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
} 