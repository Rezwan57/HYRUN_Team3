CREATE TABLE colors (
    color_id INT PRIMARY KEY AUTO_INCREMENT,
    color_name VARCHAR(50) NOT NULL UNIQUE,
    hex_code CHAR(7) NOT NULL
);



INSERT INTO colors (color_name, hex_code) VALUES
('Black', '#000000'),
('White', '#FFFFFF'),
('Red', '#FF0000'),
('Blue', '#0000FF'),
('Green', '#008000'),
('Yellow', '#FFFF00'),
('Purple', '#800080'),
('Orange', '#FFA500'),
('Pink', '#FFC0CB'),
('Brown', '#8B4513'),
('Grey', '#808080'),
('Navy', '#000080'),
('Beige', '#F5F5DC'),
('Teal', '#008080'),
('Maroon', '#800000');
