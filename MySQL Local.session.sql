-- Création de la base de données
DROP DATABASE IF EXISTS bookmybook;
CREATE DATABASE bookmybook;

USE bookmybook;

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

-- Insertion de livres
-- INSERT INTO books (isbn, title, author, publication_year, genre, total_copies, available_copies, cover_image)
-- VALUES
-- ('978-2-1234-5678-9', 'Le Petit Prince', 'Antoine de Saint-Exupéry', 1943, 'Conte', 10, 8, 'assets/le_petit_prince.jpg'),
-- ('978-2-9876-5432-1', '1984', 'George Orwell', 1949, 'Science', 5, 3, 'assets/george_orwell.jpg'),
-- ('978-0-451-52493-5', 'Pride and Prejudice', 'Jane Austen', 1813, 'Romance', 15, 0, 'assets/pride_and_prejudice.jpg'),
-- ('978-0-06-112008-4', 'To Kill a Mockingbird', 'Harper Lee', 1960, 'Literary', 20, 15, 'assets/to_kill_a_mockingbird.jpg'),
-- ('978-0-7432-7356-5', 'The Da Vinci Code', 'Dan Brown', 2003, 'Thriller', 8, 5, 'assets/the_da_vinci_code.jpg'),
-- ('978-0-316-76948-0', 'The Catcher in the Rye', 'J.D. Salinger', 1951, 'Historical', 12, 9, 'assets/the_catcher_in_the_rye.jpg'),
-- ('978-0-547-24779-4', 'The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 18, 14, 'assets/the_hobbit.jpg'),
-- ('978-0-385-42164-6', 'The Alchemist', 'Paulo Coelho', 1988, 'Philosophical', 7, 4, 'assets/the_alchemist.jpg'),
-- ('978-0-593-31196-6', 'The Silent Patient', 'Alex Michaelides', 2019, 'Psychological', 6, 3, 'assets/the_silent_patient.jpg'),
-- ('978-0-593-13154-3', 'Where the Crawdads Sing', 'Delia Owens', 2018, 'Literary', 9, 6, 'assets/where_the_crawdads_sing.jpg'),
-- ('978-0-679-73452-3', 'One Hundred Years of Solitude', 'Gabriel García Márquez', 1967, 'Realism', 11, 8, 'assets/one_hundred_years_of_solitude.jpg'),
-- ('978-0-307-47478-4', 'The Road', 'Cormac McCarthy', 2006, 'Apocalyptic', 5, 2, 'assets/the_road.jpg'),
-- ('978-0-060-93293-5', 'Good Omens', 'Neil Gaiman & Terry Pratchett', 1990, 'Comedic', 7, 5, 'assets/good_omens.jpg'),
-- ('978-0-451-47490-5', 'Dune', 'Frank Herbert', 1965, 'Science', 13, 10, 'assets/dune.jpg'),
-- ('978-0-547-57494-7', 'The Martian', 'Andy Weir', 2011, 'Science', 8, 6, 'assets/the_martian.jpg'),
-- ('978-0-062-31030-6', 'The Night Circus', 'Erin Morgenstern', 2011, 'Magical', 6, 4, 'assets/the_night_circus.jpg'),
-- ('978-0-307-74271-5', 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 2005, 'Crime', 10, 7, 'assets/the_girl_with_the_dragon_tattoo.jpg'),
-- ('978-0-593-31159-1', 'Circe', 'Madeline Miller', 2018, 'Mythological', 7, 5, 'assets/circe.jpg'),
-- ('978-0-593-13123-9', 'The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 2017, 'Historical', 9, 6, 'assets/the_seven_husbands_of_evelyn_hugo.jpg'),
-- ('978-0-06-243288-8', 'The Midnight Library', 'Matt Haig', 2020, 'Speculative', 8, 0, 'assets/the_midnight_library.jpg'),
-- ('978-0-593-31159-2', 'Pachinko', 'Min Jin Lee', 2017, 'Historical', 7, 4, 'assets/pachinko.jpg'),
-- ('978-0-06-242687-0', 'Born a Crime', 'Trevor Noah', 2016, 'Memoir', 6, 3, 'assets/born_a_crime.jpg'),
-- ('978-0-385-42167-7', 'The Pillars of the Earth', 'Ken Follett', 1989, 'Historical', 12, 9, 'assets/the_pillars_of_the_earth.jpg'),
-- ('978-0-679-73536-0', 'Norwegian Wood', 'Haruki Murakami', 1987, 'Literary', 5, 2, 'assets/norwegian_wood.jpg'),
-- ('978-0-374-28089-0', 'Wolf Hall', 'Hilary Mantel', 2009, 'Historical', 8, 5, 'assets/wolf_hall.jpg'),
-- ('978-0-593-31201-8', 'The Song of Achilles', 'Madeline Miller', 2011, 'Mythological', 6, 4, 'assets/the_song_of_achilles.jpg'),
-- ('978-0-06-234692-0', 'The Underground Railroad', 'Colson Whitehead', 2016, 'Historical', 7, 0, 'assets/the_underground_railroad.jpg'),
-- ('978-0-307-74438-2', 'The Help', 'Kathryn Stockett', 2009, 'Historical', 11, 8, 'assets/the_help.jpg'),
-- ('978-0-593-31200-1', 'Normal People', 'Sally Rooney', 2018, 'Contemporary', 9, 6, 'assets/normal_people.jpg'),
-- ('978-0-06-243362-5', 'The Four Winds', 'Kristin Hannah', 2021, 'Historical', 8, 5, 'assets/the_four_winds.jpg'),
-- ('978-0-593-13115-4', 'Klara and the Sun', 'Kazuo Ishiguro', 2021, 'Science', 6, 3, 'assets/klara_and_the_sun.jpg'),
-- ('978-0-593-31145-0', 'A Court of Thorns and Roses', 'Sarah J. Maas', 2015, 'Fantasy', 10, 7, 'assets/a_court_of_thorns_and_roses.jpg'),
-- ('978-0-316-76175-0', 'The Name of the Wind', 'Patrick Rothfuss', 2007, 'Fantasy', 12, 9, 'assets/the_name_of_the_wind.jpg'),
-- ('978-0-593-31172-6', 'The Silent Wife', 'Karin Slaughter', 2020, 'Thriller', 7, 0, 'assets/the_silent_wife.jpg'),
-- ('978-0-593-31170-2', 'Project Hail Mary', 'Andy Weir', 2021, 'Science', 8, 5, 'assets/project_hail_mary.jpg'),
-- ('978-0-593-31169-6', 'The Last Thing He Told Me', 'Laura Dave', 2021, 'Mystery', 6, 3, 'assets/the_last_thing_he_told_me.jpg'),
-- ('978-0-593-31167-2', 'The Invisible Life of Addie LaRue', 'V.E. Schwab', 2020, 'Fantasy', 7, 4, 'assets/the_invisible_life_of_addie_larue.jpg'),
-- ('978-0-593-31166-5', 'Mexican Gothic', 'Silvia Moreno-Garcia', 2020, 'Horror', 5, 2, 'assets/mexican_gothic.jpg');

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