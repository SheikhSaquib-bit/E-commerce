const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a product description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a product price'],
        min: [0, 'Price cannot be negative']
    },
    image: {
        type: String,
        required: [true, 'Please provide a product image']
    },
    category: {
        type: String,
        required: [true, 'Please provide a product category'],
        enum: ['western', 'traditional', 'formal', 'casual']
    },
    size: [{
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL']
    }],
    color: [{
        type: String
    }],
    stock: {
        type: Number,
        required: [true, 'Please provide stock quantity'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    isNewArrival: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add index for search functionality
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema); 