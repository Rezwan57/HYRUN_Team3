CREATE TABLE products (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    category_id INT(11) NOT NULL,
    gender_id INT(11) NOT NULL,
    brand_id INT(11) DEFAULT NULL,
    buying_price DECIMAL(10,2) NOT NULL,
    selling_price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(11) NOT NULL DEFAULT 0,
    image_url VARCHAR(500) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (gender_id) REFERENCES genders(id) ON DELETE CASCADE,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL
);



ALTER TABLE order_items
ADD CONSTRAINT product_id
  FOREIGN KEY (product_id) REFERENCES products(id);



INSERT INTO products (name, description, category_id, gender_id, brand_id, selling_price, stock_quantity, image_url) VALUES
('Air Max 270', 'Experience unparalleled comfort with the Air Max 270. Designed for all-day wear, these breathable and lightweight sneakers provide maximum cushioning for your feet, making them perfect for both casual outings and active days.', 1, 1, 1, 88.99, 10, '/assets/FW/1.png'),

('Yeezy Boost 350', 'The Yeezy Boost 350 combines futuristic design with premium comfort. Featuring a modern silhouette and advanced cushioning, these sneakers are a perfect blend of style and functionality, ideal for any wardrobe.', 1, 1, 2, 55.00, 10, '/assets/FW/2.png'),

('Nike Dunk Low', 'A timeless classic, the Nike Dunk Low delivers a versatile style that suits any outfit. With a durable design and comfortable fit, these sneakers are a must-have for sneaker enthusiasts and casual wearers alike.', 2, 2, 1, 85.00, 10, '/assets/FW/3.png'),

('Adidas Ultraboost', 'Engineered for runners, the Adidas Ultraboost offers revolutionary performance with unmatched cushioning and energy return. Whether for long runs or everyday use, these sneakers redefine comfort and support.', 3, 3, 3, 75.00, 10, '/assets/FW/4.png'),

('Adidas Ultraboost', 'Engineered for runners, the Adidas Ultraboost offers revolutionary performance with unmatched cushioning and energy return. Whether for long runs or everyday use, these sneakers redefine comfort and support.', 2, 2, 3, 75.00, 10, '/assets/FW/4.png');
