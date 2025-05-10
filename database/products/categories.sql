CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE
);


INSERT INTO categories (category_name) VALUES
('Trainers'),
('Running Shoes'),
('Football Shoes'),
('Walking Boots'),
('Basketball Shoes');
