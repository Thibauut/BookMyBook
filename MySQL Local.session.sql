-- Création de la base de données
DROP DATABASE IF EXISTS bookmybook;
CREATE DATABASE bookmybook;


USE bookmybook;
DROP TABLE IF EXISTS book_reviews;
DROP TABLE IF EXISTS reading_lists;
DROP TABLE IF EXISTS book_loans;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;

-- Table des utilisateurs
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des livres
CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(20) UNIQUE,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    publication_year INT,
    genre VARCHAR(50),
    total_copies INT NOT NULL,
    available_copies INT NOT NULL,
    cover_image VARCHAR(255),
    cover_image_binary LONGBLOB
);

-- Table des emprunts
CREATE TABLE book_loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    status ENUM('En cours', 'Retourné', 'En retard') DEFAULT 'En cours',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

-- Table des avis/reviews
CREATE TABLE book_reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

-- Table des listes de lecture personnelles
CREATE TABLE reading_lists (
    list_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Lu', 'À lire', 'En cours') DEFAULT 'À lire',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

-- Exemple de requêtes pour peupler la base de données
-- Insertion d'utilisateurs
INSERT INTO users (username, email, password, first_name, last_name) VALUES
('Jean', 'Jean@gmail.com', '123', 'Jean', 'Dupont'),
('marie_martin', 'marie.martin@gmail.com', 'securite456', 'Marie', 'Martin');

-- Requêtes SQL démontrant différentes opérations
-- 1. Jointure entre tables
SELECT u.username, b.title, bl.loan_date, bl.due_date
FROM book_loans bl
JOIN users u ON bl.user_id = u.user_id
JOIN books b ON bl.book_id = b.book_id;

-- 2. Fonction d'agrégation
SELECT genre, COUNT(*) as nombre_livres, AVG(total_copies) as copies_moyennes 
FROM books 
GROUP BY genre;

-- 3. Sous-requête
SELECT * FROM books 
WHERE book_id IN (SELECT book_id FROM book_loans WHERE return_date IS NULL);