CREATE TABLE brands (
    brand_id INT PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(100) NOT NULL UNIQUE
);


INSERT INTO brands (brand_name) VALUES
('Nike'),
('Adidas'),
('Puma'),
('Reebok'),
('New Balance'),
('Fila');
