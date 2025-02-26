CREATE TABLE product_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    image LONGBLOB,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);
