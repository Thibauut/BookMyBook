from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_mysqldb import MySQL
import bcrypt
import base64


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.secret_key = 'root'  # Replace with a strong secret key

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'azerty123'
app.config['MYSQL_DB'] = 'bookmybook'
mysql = MySQL(app)


# Function to insert books data into the MySQL database

def insert_books_data():
    try:
        # List of books and their corresponding image paths
        books_data = [
            ('978-2-1234-5678-9', 'Le Petit Prince', 'Antoine de Saint-Exupéry', 1943, 'Conte', 10, 8, 'assets/le_petit_prince.jpg'),
            ('978-2-9876-5432-1', '1984', 'George Orwell', 1949, 'Science', 5, 3, 'assets/george_orwell.jpg'),
            ('978-0-451-52493-5', 'Pride and Prejudice', 'Jane Austen', 1813, 'Romance', 15, 0, 'assets/pride_and_prejudice.jpg'),
            ('978-0-06-112008-4', 'To Kill a Mockingbird', 'Harper Lee', 1960, 'Literary', 20, 15, 'assets/to_kill_a_mockingbird.jpg'),
            ('978-0-7432-7356-5', 'The Da Vinci Code', 'Dan Brown', 2003, 'Thriller', 8, 5, 'assets/the_da_vinci_code.jpg'),
            ('978-0-316-76948-0', 'The Catcher in the Rye', 'J.D. Salinger', 1951, 'Historical', 12, 9, 'assets/the_catcher_in_the_rye.jpg'),
            ('978-0-547-24779-4', 'The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 18, 14, 'assets/the_hobbit.jpg'),
            ('978-0-385-42164-6', 'The Alchemist', 'Paulo Coelho', 1988, 'Philosophical', 7, 4, 'assets/the_alchemist.jpg'),
            ('978-0-593-31196-6', 'The Silent Patient', 'Alex Michaelides', 2019, 'Psychological', 6, 3, 'assets/the_silent_patient.jpg'),
            ('978-0-593-13154-3', 'Where the Crawdads Sing', 'Delia Owens', 2018, 'Literary', 9, 6, 'assets/where_the_crawdads_sing.jpg'),
            ('978-0-679-73452-3', 'One Hundred Years of Solitude', 'Gabriel García Márquez', 1967, 'Realism', 11, 8, 'assets/one_hundred_years_of_solitude.jpg'),
            ('978-0-307-47478-4', 'The Road', 'Cormac McCarthy', 2006, 'Apocalyptic', 5, 2, 'assets/the_road.jpg'),
            ('978-0-060-93293-5', 'Good Omens', 'Neil Gaiman & Terry Pratchett', 1990, 'Comedic', 7, 5, 'assets/good_omens.jpg'),
            ('978-0-451-47490-5', 'Dune', 'Frank Herbert', 1965, 'Science', 13, 10, 'assets/dune.jpg'),
            ('978-0-547-57494-7', 'The Martian', 'Andy Weir', 2011, 'Science', 8, 6, 'assets/the_martian.jpg'),
            ('978-0-062-31030-6', 'The Night Circus', 'Erin Morgenstern', 2011, 'Magical', 6, 4, 'assets/the_night_circus.jpg'),
            ('978-0-307-74271-5', 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 2005, 'Crime', 10, 7, 'assets/the_girl_with_the_dragon_tattoo.jpg'),
            ('978-0-593-31159-1', 'Circe', 'Madeline Miller', 2018, 'Mythological', 7, 5, 'assets/circe.jpg'),
            ('978-0-593-13123-9', 'The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 2017, 'Historical', 9, 6, 'assets/the_seven_husbands_of_evelyn_hugo.jpg'),
            ('978-0-06-243288-8', 'The Midnight Library', 'Matt Haig', 2020, 'Speculative', 8, 21, 'assets/the_midnight_library.jpg'),
            ('978-0-593-31159-2', 'Pachinko', 'Min Jin Lee', 2017, 'Historical', 7, 4, 'assets/pachinko.jpg'),
            ('978-0-06-242687-0', 'Born a Crime', 'Trevor Noah', 2016, 'Memoir', 6, 3, 'assets/born_a_crime.jpg'),
            ('978-0-385-42167-7', 'The Pillars of the Earth', 'Ken Follett', 1989, 'Historical', 12, 9, 'assets/the_pillars_of_the_earth.jpg'),
            ('978-0-679-73536-0', 'Norwegian Wood', 'Haruki Murakami', 1987, 'Literary', 5, 2, 'assets/norwegian_wood.jpg'),
            ('978-0-374-28089-0', 'Wolf Hall', 'Hilary Mantel', 2009, 'Historical', 8, 5, 'assets/wolf_hall.jpg'),
            ('978-0-593-31201-8', 'The Song of Achilles', 'Madeline Miller', 2011, 'Mythological', 6, 4, 'assets/the_song_of_achilles.jpg'),
            ('978-0-06-234692-0', 'The Underground Railroad', 'Colson Whitehead', 2016, 'Historical', 7, 0, 'assets/the_underground_railroad.jpg'),
            ('978-0-307-74438-2', 'The Help', 'Kathryn Stockett', 2009, 'Historical', 11, 8, 'assets/the_help.jpg'),
            ('978-0-593-31200-1', 'Normal People', 'Sally Rooney', 2018, 'Contemporary', 9, 6, 'assets/normal_people.jpg'),
            ('978-0-06-243362-5', 'The Four Winds', 'Kristin Hannah', 2021, 'Historical', 8, 5, 'assets/the_four_winds.jpg'),
            ('978-0-593-13115-4', 'Klara and the Sun', 'Kazuo Ishiguro', 2021, 'Science', 6, 3, 'assets/klara_and_the_sun.jpg'),
            ('978-0-593-31145-0', 'A Court of Thorns and Roses', 'Sarah J. Maas', 2015, 'Fantasy', 10, 7, 'assets/a_court_of_thorns_and_roses.jpg'),
            ('978-0-316-76175-0', 'The Name of the Wind', 'Patrick Rothfuss', 2007, 'Fantasy', 12, 9, 'assets/the_name_of_the_wind.jpg'),
            ('978-0-593-31172-6', 'The Silent Wife', 'Karin Slaughter', 2020, 'Thriller', 7, 0, 'assets/the_silent_wife.jpg'),
            ('978-0-593-31170-2', 'Project Hail Mary', 'Andy Weir', 2021, 'Science', 8, 5, 'assets/project_hail_mary.jpg'),
            ('978-0-593-31169-6', 'The Last Thing He Told Me', 'Laura Dave', 2021, 'Mystery', 6, 3, 'assets/the_last_thing_he_told_me.jpg'),
            ('978-0-593-31167-2', 'The Invisible Life of Addie LaRue', 'V.E. Schwab', 2020, 'Fantasy', 7, 4, 'assets/the_invisible_life_of_addie_larue.jpg'),
            ('978-0-593-31166-5', 'Mexican Gothic', 'Silvia Moreno-Garcia', 2020, 'Horror', 5, 2, 'assets/mexican_gothic.jpg')
        ]


        # Loop through each book and insert data
        for book in books_data:
            isbn, title, author, publication_year, genre, total_copies, available_copies, image_path = book
            # Read the image file as binary
            with open(image_path, "rb") as file:
                binary_data = file.read()

            # Using MySQLdb connection to insert the data
            cur = mysql.connection.cursor()

            # Use ON DUPLICATE KEY UPDATE to update existing records
            cur.execute("""
                INSERT INTO books (isbn, title, author, publication_year, genre, total_copies, available_copies, cover_image, cover_image_binary)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE 
                    title = VALUES(title),
                    author = VALUES(author),
                    publication_year = VALUES(publication_year),
                    genre = VALUES(genre),
                    total_copies = VALUES(total_copies),
                    available_copies = VALUES(available_copies),
                    cover_image = VALUES(cover_image),
                    cover_image_binary = VALUES(cover_image_binary)
            """, (isbn, title, author, publication_year, genre, total_copies, available_copies, image_path, binary_data))

            # Commit after each insert to avoid large transactions
            mysql.connection.commit()

        print("Books data inserted successfully")

    except Exception as e:
        print(f"Error inserting books data: {e}")

@app.route('/login', methods=['POST'])

def login():
    try:
        data = request.json
        print("Données reçues:", data)

        email = data.get('email')
        password = data.get('password')

        cur = mysql.connection.cursor()

        cur.execute("""
            SELECT user_id, username, password 
            FROM users 
            WHERE email = %s
        """, (email,))

        user = cur.fetchone()
        cur.close()
        if user:
            stored_password = user[2]
            # Convertir le mot de passe en bytes si nécessaire
            if isinstance(stored_password, str):
                stored_password = stored_password.encode('utf-8')
            # Vérification du mot de passe
            try:
                # Essayez différentes méthodes de vérification
                if stored_password == password.encode('utf-8'):
                    # Mot de passe en texte brut
                    return jsonify({
                        'message': 'Login successful', 
                        'user': {
                            'id': user[0], 
                            'username': user[1],
                            'email': email
                        }
                    })
                elif bcrypt.checkpw(password.encode('utf-8'), stored_password):
                    # Mot de passe haché bcrypt
                    return jsonify({
                        'message': 'Login successful', 
                        'user': {
                            'id': user[0], 
                            'username': user[1],
                            'email': email
                        }
                    })
                else:
                    return jsonify({'error': 'Invalid email or password'}), 401
            except Exception as verify_error:
                print(f"Password verification error: {verify_error}")
                return jsonify({'error': 'Password verification failed'}), 500
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout successful'})

@app.route('/allbooks', methods=['POST'])
def get_all_books():
    try:
        # Open a database cursor
        cur = mysql.connection.cursor()

        # Execute the query to get all books, including the binary data of the cover image
        cur.execute("""
            SELECT isbn, title, author, publication_year, genre, total_copies, available_copies, cover_image, cover_image_binary
            FROM books
        """)

        # Fetch all the rows
        books = cur.fetchall()

        # Close the cursor
        cur.close()

        # Format the books data into a list of dictionaries
        books_list = []
        for book in books:
            # Convert the binary image data to a base64 string if it exists
            cover_image_base64 = None
            if book[8]:  # Check if binary data exists
                cover_image_base64 = base64.b64encode(book[8]).decode('utf-8')

            books_list.append({
                'isbn': book[0],
                'title': book[1],
                'author': book[2],
                'publication_year': book[3],
                'genre': book[4],
                'total_copies': book[5],
                'available_copies': book[6],
                'cover_image': book[7],  # Path or URL of the image
                'cover_image_binary': cover_image_base64  # Base64 encoded binary image
            })

        # Return the books as JSON response
        return jsonify({'books': books_list})

    except Exception as e:
        print(f"Error retrieving books: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/topbooks', methods=['GET'])
def get_top_books():
    try:
        # Open a database cursor
        cur = mysql.connection.cursor()

        # Execute the query to get the books with the least availability
        cur.execute("""
            SELECT isbn, title, author, publication_year, genre, total_copies, available_copies, cover_image, cover_image_binary
            FROM books
            ORDER BY available_copies ASC
            LIMIT 7
        """)

        # Fetch the top 4 books
        books = cur.fetchall()

        # Close the cursor
        cur.close()

        # Format the books data into a list of dictionaries
        books_list = []
        for book in books:
            # Convert the binary image data to a base64 string if it exists
            cover_image_base64 = None
            if book[8]:  # Check if binary data exists
                cover_image_base64 = base64.b64encode(book[8]).decode('utf-8')

            books_list.append({
                'isbn': book[0],
                'title': book[1],
                'author': book[2],
                'publication_year': book[3],
                'genre': book[4],
                'total_copies': book[5],
                'available_copies': book[6],
                'cover_image': book[7],  # Path or URL of the image
                'cover_image_binary': cover_image_base64  # Base64 encoded binary image
            })

        # Return the top 4 books as a JSON response
        return jsonify({'top_books': books_list})

    except Exception as e:
        print(f"Error retrieving top books: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

def insert_reviews_data():
    try:
        # Open a database cursor
        cur = mysql.connection.cursor()

        # Insert review data
        reviews = [
            (1, 1, 5, 'An amazing and timeless story about love and friendship.'),
            (2, 14, 4, 'A chilling portrayal of totalitarianism and surveillance, very thought-provoking.'),
            (1, 19, 3, 'An interesting read, though the plot was a bit slow at times.'),
            (2, 5, 5, 'A masterpiece that deals with racism, justice, and compassion. Highly recommended!'),
            (1, 8, 4, 'A thrilling and fast-paced mystery, kept me hooked from start to finish.'),
            (2, 3, 5, 'A brilliant coming-of-age novel with deep emotional resonance.'),
            (1, 25, 4, 'A fantastic fantasy adventure, though the pacing was a bit uneven at times.'),
            (2, 37, 4, 'An inspirational book'),
            (1, 26, 2, 'Not my favorite, but still an interesting story about psychological tension.'),
            (2, 10, 5, 'A beautifully written and emotional novel.')
        ]
        # Insert each review into the database
        cur.executemany("""
            INSERT INTO book_reviews (user_id, book_id, rating, review_text)
            VALUES (%s, %s, %s, %s)
        """, reviews)

        # Commit the transaction
        mysql.connection.commit()

        # Close the cursor
        cur.close()

        print("Reviews data inserted successfully")

    except Exception as e:
        print(f"Error inserting reviews data: {e}")

@app.route('/reviews', methods=['GET'])
def get_reviews():
    try:
        # Open a database cursor
        cur = mysql.connection.cursor()

        # Execute the query to get all reviews along with book_id
        cur.execute("""
            SELECT br.review_id, u.username, b.title, br.book_id, br.rating, br.review_text, br.review_date
            FROM book_reviews br
            JOIN users u ON br.user_id = u.user_id
            JOIN books b ON br.book_id = b.book_id
        """)

        # Fetch all the rows
        reviews = cur.fetchall()

        # Close the cursor
        cur.close()

        # Format the reviews data into a list of dictionaries
        reviews_list = []
        for review in reviews:
            reviews_list.append({
                'review_id': review[0],
                'username': review[1],
                'book_title': review[2],
                'book_id': review[3],  # Include book_id in the response
                'rating': review[4],
                'review_text': review[5],
                'review_date': review[6].strftime('%Y-%m-%d %H:%M:%S')  # Format date if needed
            })

        # Return the reviews as JSON response
        return jsonify({'reviews': reviews_list})

    except Exception as e:
        print(f"Error retrieving reviews: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500



if __name__ == '__main__':
    # Insert books data into the database
    with app.app_context():
        insert_books_data()
        insert_reviews_data()
    # Run the Flask app
    app.run(host='localhost', port=30360)


