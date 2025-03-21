CREATE TABLE genders (
    gender_id INT PRIMARY KEY AUTO_INCREMENT,
    gender_name VARCHAR(50) NOT NULL UNIQUE
);


INSERT INTO genders (gender_name) VALUES
('Men'),
('Women'),
('Kids');
