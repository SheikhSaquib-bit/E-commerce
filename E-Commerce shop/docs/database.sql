-- Create database
CREATE DATABASE IF NOT EXISTS nxtgs_db;
USE nxtgs_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample products
INSERT INTO products (name, price, description, image_url, stock) VALUES
('Wireless Earbuds', 2499.00, 'High-quality wireless earbuds with noise cancellation and 24-hour battery life.', 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46', 50),
('Smart Watch', 4999.00, 'Feature-rich smartwatch with health monitoring and fitness tracking.', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a', 30),
('Bluetooth Speaker', 1999.00, 'Portable Bluetooth speaker with 360° sound and waterproof design.', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1', 40),
('Wireless Mouse', 899.00, 'Ergonomic wireless mouse with precision tracking and long battery life.', 'https://images.unsplash.com/photo-1527814050087-3793815479db', 100),
('Mechanical Keyboard', 3499.00, 'RGB mechanical keyboard with customizable keys and premium switches.', 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef', 25),
('Power Bank', 1499.00, '20000mAh power bank with fast charging and multiple ports.', 'https://images.unsplash.com/photo-1609592424823-0a0b0c0c0c0c', 75),
('USB-C Hub', 1299.00, '7-in-1 USB-C hub with HDMI, USB, and SD card slots.', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', 60),
('Wireless Charger', 999.00, 'Fast wireless charger compatible with all Qi-enabled devices.', 'https://images.unsplash.com/photo-1618577608401-189f8e7f7736', 45),
('Gaming Headset', 2999.00, '7.1 surround sound gaming headset with noise-cancelling microphone.', 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb', 35),
('Webcam', 2499.00, '1080p HD webcam with built-in microphone and privacy cover.', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', 40),
('External SSD', 4999.00, '1TB external SSD with USB 3.1 and transfer speeds up to 550MB/s.', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', 20),
('Tablet Stand', 799.00, 'Adjustable tablet stand with multiple viewing angles and foldable design.', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', 80); 