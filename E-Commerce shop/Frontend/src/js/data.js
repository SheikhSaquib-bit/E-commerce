// Product data
const products = [
    {
        id: 1,
        name: "Wireless Earbuds",
        price: 2499,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "High-quality wireless earbuds with noise cancellation and 24-hour battery life."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 4999,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Feature-rich smartwatch with health monitoring and fitness tracking."
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 1999,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Portable Bluetooth speaker with 360° sound and waterproof design."
    },
    {
        id: 4,
        name: "Wireless Mouse",
        price: 899,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Ergonomic wireless mouse with precision tracking and long battery life."
    },
    {
        id: 5,
        name: "Mechanical Keyboard",
        price: 3499,
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "RGB mechanical keyboard with customizable keys and premium switches."
    }
];

// Format price in INR
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
} 