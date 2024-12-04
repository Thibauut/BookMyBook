from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_mysqldb import MySQL
import bcrypt
import base64
from datetime import datetime


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
            ('978-2-1234-5678-9', 'Le Petit Prince', 'Antoine de Saint-Exupéry', 1943, 'Conte', 10, 8, 'assets/le_petit_prince.jpg', 'A heartwarming tale of a young prince who travels from planet to planet, learning valuable life lessons about love, friendship, and the importance of seeing beyond the surface of things.'),
            ('978-2-9876-5432-1', '1984', 'George Orwell', 1949, 'Science', 5, 3, 'assets/george_orwell.jpg', 'A dystopian novel set in a totalitarian society where the government maintains control through surveillance, manipulation of language, and the suppression of individual thought.'),
            ('978-0-451-52493-5', 'Pride and Prejudice', 'Jane Austen', 1813, 'Romance', 15, 0, 'assets/pride_and_prejudice.jpg', 'A witty exploration of love, marriage, and social status in early 19th-century England, following the intelligent Elizabeth Bennet as she navigates societal expectations and her complex relationship with Mr. Darcy.'),
            ('978-0-06-112008-4', 'To Kill a Mockingbird', 'Harper Lee', 1960, 'Literary', 20, 15, 'assets/to_kill_a_mockingbird.jpg', 'A powerful story of racial injustice in the American South, told through the eyes of Scout Finch, as her father Atticus Finch defends a Black man falsely accused of a crime.'),
            ('978-0-7432-7356-5', 'The Da Vinci Code', 'Dan Brown', 2003, 'Thriller', 8, 5, 'assets/the_da_vinci_code.jpg', 'A fast-paced thriller following symbologist Robert Langdon as he unravels a complex mystery involving hidden codes, religious conspiracies, and ancient secrets within the art and architecture of Europe.'),
            ('978-0-316-76948-0', 'The Catcher in the Rye', 'J.D. Salinger', 1951, 'Historical', 12, 9, 'assets/the_catcher_in_the_rye.jpg', 'A groundbreaking novel about teenage alienation and angst, following Holden Caulfield as he navigates the challenges of adolescence and his struggle against the adult world\'s perceived phoniness.'),
            ('978-0-547-24779-4', 'The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 18, 14, 'assets/the_hobbit.jpg', 'An epic fantasy adventure of Bilbo Baggins, a comfort-loving hobbit who is swept into a dangerous quest to help a group of dwarves reclaim their homeland from the dragon Smaug.'),
            ('978-0-385-42164-6', 'The Alchemist', 'Paulo Coelho', 1988, 'Philosophical', 7, 4, 'assets/the_alchemist.jpg', 'A philosophical novel about a young shepherd\'s spiritual journey across the desert, seeking a mysterious treasure and learning profound life lessons about following one\'s personal legend.'),
            ('978-0-593-31196-6', 'The Silent Patient', 'Alex Michaelides', 2019, 'Psychological', 6, 3, 'assets/the_silent_patient.jpg', 'A gripping psychological thriller about a famous painter who becomes mute after allegedly murdering her husband, and the psychotherapist determined to uncover the truth.'),
            ('978-0-593-13154-3', 'Where the Crawdads Sing', 'Delia Owens', 2018, 'Literary', 9, 6, 'assets/where_the_crawdads_sing.jpg', 'A lyrical coming-of-age story that intertwines a murder mystery with the life of Kya Clark, a girl who grows up isolated in the marshlands of North Carolina.'),
            ('978-0-679-73452-3', 'One Hundred Years of Solitude', 'Gabriel García Márquez', 1967, 'Realism', 11, 8, 'assets/one_hundred_years_of_solitude.jpg', 'A landmark magical realist novel tracing multiple generations of the Buendía family in the fictional town of Macondo, exploring themes of time, destiny, and human nature.'),
            ('978-0-307-47478-4', 'The Road', 'Cormac McCarthy', 2006, 'Apocalyptic', 5, 2, 'assets/the_road.jpg', 'A bleak post-apocalyptic narrative following a father and son traveling through a devastated America, struggling to survive while maintaining their humanity.'),
            ('978-0-060-93293-5', 'Good Omens', 'Neil Gaiman & Terry Pratchett', 1990, 'Comedic', 7, 5, 'assets/good_omens.jpg', 'A comedic fantasy about an angel and a demon who have become friends over millennia and team up to prevent the apocalypse to preserve their comfortable life on Earth.'),
            ('978-0-451-47490-5', 'Dune', 'Frank Herbert', 1965, 'Science', 13, 10, 'assets/dune.jpg', 'An epic science fiction novel set in a feudal interstellar society, following Paul Atreides as he becomes embroiled in the complex politics of a desert planet crucial to the universe\'s most valuable resource.'),
            ('978-0-547-57494-7', 'The Martian', 'Andy Weir', 2011, 'Science', 8, 6, 'assets/the_martian.jpg', 'A scientifically detailed survival story about an astronaut stranded on Mars, using his ingenuity and scientific knowledge to stay alive and find a way back to Earth.'),
            ('978-0-062-31030-6', 'The Night Circus', 'Erin Morgenstern', 2011, 'Magical', 6, 4, 'assets/the_night_circus.jpg', 'A magical tale of two rival magicians who fall in love while competing in an enchanted circus that only opens at night, creating a mesmerizing world of illusion and romance.'),
            ('978-0-307-74271-5', 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 2005, 'Crime', 10, 7, 'assets/the_girl_with_the_dragon_tattoo.jpg', 'A dark thriller about a journalist and a skilled hacker who investigate a complex case of corporate corruption and serial murder in Sweden.'),
            ('978-0-593-31159-1', 'Circe', 'Madeline Miller', 2018, 'Mythological', 7, 5, 'assets/circe.jpg', 'A reimagining of the myth of Circe, the sorceress from Homer\'s Odyssey, exploring her life, magical powers, and journey of self-discovery and empowerment.'),
            ('978-0-593-13123-9', 'The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 2017, 'Historical', 9, 6, 'assets/the_seven_husbands_of_evelyn_hugo.jpg', 'A captivating novel about a Hollywood icon who reveals the secrets of her scandalous life to a young journalist, exploring fame, love, and identity.'),
            ('978-0-06-243288-8', 'The Midnight Library', 'Matt Haig', 2020, 'Speculative', 8, 21, 'assets/the_midnight_library.jpg', 'A thought-provoking story about a woman who finds herself in a library between life and death, where she can explore different versions of the life she might have lived.'),
            ('978-0-593-31159-2', 'Pachinko', 'Min Jin Lee', 2017, 'Historical', 7, 4, 'assets/pachinko.jpg', 'An epic saga following four generations of a Korean family, exploring themes of colonization, migration, and survival across decades of historical upheaval.'),
            ('978-0-06-242687-0', 'Born a Crime', 'Trevor Noah', 2016, 'Memoir', 6, 3, 'assets/born_a_crime.jpg', 'A memoir by Trevor Noah that offers a humorous and poignant look at growing up as a mixed-race child in South Africa during the apartheid era.'),
            ('978-0-385-42167-7', 'The Pillars of the Earth', 'Ken Follett', 1989, 'Historical', 12, 9, 'assets/the_pillars_of_the_earth.jpg', 'An epic historical novel set in 12th-century England, following the construction of a cathedral and the lives of the people involved in its building.'),
            ('978-0-679-73536-0', 'Norwegian Wood', 'Haruki Murakami', 1987, 'Literary', 5, 2, 'assets/norwegian_wood.jpg', 'A melancholic novel about love, loss, and nostalgia, following a young man\'s memories of a passionate relationship during his college years.'),
            ('978-0-374-28089-0', 'Wolf Hall', 'Hilary Mantel', 2009, 'Historical', 8, 5, 'assets/wolf_hall.jpg', 'A historical novel about Thomas Cromwell\'s rise to power in the court of Henry VIII, offering a nuanced portrayal of political intrigue and personal ambition.'),
            ('978-0-593-31201-8', 'The Song of Achilles', 'Madeline Miller', 2011, 'Mythological', 6, 4, 'assets/the_song_of_achilles.jpg', 'A reimagining of the myth of Achilles and Patroclus, exploring their relationship from childhood through the Trojan War, blending romance and classical mythology.'),
            ('978-0-06-234692-0', 'The Underground Railroad', 'Colson Whitehead', 2016, 'Historical', 7, 0, 'assets/the_underground_railroad.jpg', 'A powerful novel that reimagines the Underground Railroad as a literal subterranean train system, exploring the history of slavery and resistance in America.'),
            ('978-0-307-74438-2', 'The Help', 'Kathryn Stockett', 2009, 'Historical', 11, 8, 'assets/the_help.jpg', 'A novel about race relations in the American South during the 1960s, told through the perspectives of Black maids and the white women they work for.'),
            ('978-0-593-31200-1', 'Normal People', 'Sally Rooney', 2018, 'Contemporary', 9, 6, 'assets/normal_people.jpg', 'A contemporary love story exploring the complex relationship between two young people as they navigate personal growth, class differences, and emotional intimacy.'),
            ('978-0-06-243362-5', 'The Four Winds', 'Kristin Hannah', 2021, 'Historical', 8, 5, 'assets/the_four_winds.jpg', 'A historical novel set during the Dust Bowl era, following a woman\'s struggle to survive and protect her family during one of the most challenging periods in American history.'),
            ('978-0-593-13115-4', 'Klara and the Sun', 'Kazuo Ishiguro', 2021, 'Science', 6, 3, 'assets/klara_and_the_sun.jpg', 'A thought-provoking science fiction novel about an artificial being named Klara who observes human behavior and seeks to understand love and connection.'),
            ('978-0-593-31145-0', 'A Court of Thorns and Roses', 'Sarah J. Maas', 2015, 'Fantasy', 10, 7, 'assets/a_court_of_thorns_and_roses.jpg', 'A fantasy romance about a human girl who is drawn into a dangerous and magical world of faeries, exploring themes of love, sacrifice, and personal transformation.'),
            ('978-0-316-76175-0', 'The Name of the Wind', 'Patrick Rothfuss', 2007, 'Fantasy', 12, 9, 'assets/the_name_of_the_wind.jpg', 'An epic fantasy following a legendary wizard recounting his extraordinary life, blending magic, music, and a quest for knowledge.'),
            ('978-0-593-31172-6', 'The Silent Wife', 'Karin Slaughter', 2020, 'Thriller', 7, 0, 'assets/the_silent_wife.jpg', 'A psychological thriller about the complex dynamics of a marriage and the dark secrets that threaten to destroy a seemingly perfect relationship.'),
            ('978-0-593-31170-2', 'Project Hail Mary', 'Andy Weir', 2021, 'Science', 8, 5, 'assets/project_hail_mary.jpg', 'A science fiction adventure about an astronaut on a mission to save humanity, combining scientific problem-solving with emotional depth and unexpected twists.'),
            ('978-0-593-31169-6', 'The Last Thing He Told Me', 'Laura Dave', 2021, 'Mystery', 6, 3, 'assets/the_last_thing_he_told_me.jpg', 'A mystery novel about a woman searching for the truth about her husband\'s disappearance and the secrets he left behind.'),
            ('978-0-593-31167-2', 'The Invisible Life of Addie LaRue', 'V.E. Schwab', 2020, 'Fantasy', 7, 4, 'assets/the_invisible_life_of_addie_larue.jpg', 'A unique fantasy about a woman who makes a Faustian bargain to live forever but is cursed to be forgotten by everyone she meets.' ),
            ('978-0-593-31166-5', 'Mexican Gothic', 'Silvia Moreno-Garcia', 2020, 'Horror', 5, 2, 'assets/mexican_gothic.jpg', 'A gothic horror novel set in 1950s Mexico, exploring family secrets, colonialism, and supernatural forces in a decaying mansion.')
        ]

        # Loop through each book and insert data
        for book in books_data:
            isbn, title, author, publication_year, genre, total_copies, available_copies, image_path, synopsis = book
            # Read the image file as binary
            with open(image_path, "rb") as file:
                binary_data = file.read()

            # Using MySQLdb connection to insert the data
            cur = mysql.connection.cursor()

            # Use ON DUPLICATE KEY UPDATE to update existing records
            cur.execute("""
                INSERT INTO books (isbn, title, author, publication_year, genre, total_copies, available_copies, cover_image, cover_image_binary, synopsis)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE 
                    title = VALUES(title),
                    author = VALUES(author),
                    publication_year = VALUES(publication_year),
                    genre = VALUES(genre),
                    total_copies = VALUES(total_copies),
                    available_copies = VALUES(available_copies),
                    cover_image = VALUES(cover_image),
                    cover_image_binary = VALUES(cover_image_binary),
                    synopsis = VALUES(synopsis)
            """, (isbn, title, author, publication_year, genre, total_copies, available_copies, image_path, binary_data, synopsis))

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

        # Open a database cursor
        cur = mysql.connection.cursor()

        # Updated SQL query to fetch user details
        cur.execute("""
            SELECT user_id, username, password, first_name, last_name, email, registration_date 
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
                # Vérifier le mot de passe en texte brut ou avec bcrypt
                if stored_password == password.encode('utf-8'):
                    # Mot de passe en texte brut
                    return jsonify({
                        'message': 'Login successful', 
                        'user': {
                            'id': user[0], 
                            'username': user[1],
                            'first_name': user[3],
                            'last_name': user[4],
                            'email': user[5],
                            'registration_date': user[6].strftime('%Y-%m-%d %H:%M:%S')  # Format the date
                        }
                    })
                elif bcrypt.checkpw(password.encode('utf-8'), stored_password):
                    # Mot de passe haché bcrypt
                    return jsonify({
                        'message': 'Login successful', 
                        'user': {
                            'id': user[0], 
                            'username': user[1],
                            'first_name': user[3],
                            'last_name': user[4],
                            'email': user[5],
                            'registration_date': user[6].strftime('%Y-%m-%d %H:%M:%S')  # Format the date
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

        # Execute the query to get all books, including the binary data of the cover image and book id
        cur.execute("""
            SELECT book_id, isbn, title, author, publication_year, genre, total_copies, available_copies, cover_image, cover_image_binary, synopsis
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
            if book[9]:  # Check if binary data exists
                cover_image_base64 = base64.b64encode(book[9]).decode('utf-8')

            books_list.append({
                'id': book[0],  # Add book id (assuming book_id is the first column in the table)
                'isbn': book[1],
                'title': book[2],
                'author': book[3],
                'publication_year': book[4],
                'genre': book[5],
                'total_copies': book[6],
                'available_copies': book[7],
                'cover_image': book[8],  # Path or URL of the image
                'cover_image_binary': cover_image_base64,  # Base64 encoded binary image
                'synopsis': book[10]
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

@app.route('/book_loans', methods=['POST'])
def add_book_loan():
    try:
        # Get data from the POST request
        data = request.get_json()

        # Validate required fields
        user_id = data.get('user_id')
        book_id = data.get('book_id')
        loan_date = data.get('loan_date')  # Expected format: 'YYYY-MM-DD'
        due_date = data.get('due_date')    # Expected format: 'YYYY-MM-DD'

        if not user_id or not book_id or not loan_date or not due_date:
            return jsonify({'error': 'Missing required fields'}), 400

        # Convert dates to datetime objects
        loan_date = datetime.strptime(loan_date, '%Y-%m-%d')
        due_date = datetime.strptime(due_date, '%Y-%m-%d')

        # Open a database cursor
        cur = mysql.connection.cursor()

        # Check if the book exists and has available copies
        cur.execute("SELECT available_copies FROM books WHERE book_id = %s", (book_id,))
        book = cur.fetchone()

        if not book:
            return jsonify({'error': 'Book not found'}), 404
        available_copies = book[0]

        if available_copies <= 0:
            return jsonify({'error': 'No available copies of this book'}), 400

        # Check if the book is already on loan (status 'En cours')
        cur.execute("""
            SELECT loan_id FROM book_loans
            WHERE book_id = %s AND status = 'En cours'
        """, (book_id,))
        existing_loan = cur.fetchone()

        if existing_loan:
            return jsonify({'error': 'This book is already on loan'}), 400

        # Insert the new book loan into the database
        cur.execute("""
            INSERT INTO book_loans (user_id, book_id, loan_date, due_date, status)
            VALUES (%s, %s, %s, %s, 'En cours')
        """, (user_id, book_id, loan_date, due_date))

        # Decrement the available copies for the book
        cur.execute("""
            UPDATE books
            SET available_copies = available_copies - 1
            WHERE book_id = %s
        """, (book_id,))

        # Commit the transaction
        mysql.connection.commit()

        # Close the cursor
        cur.close()

        # Return a success message
        return jsonify({'message': 'Book loan added successfully'}), 201

    except Exception as e:
        print(f"Error adding book loan: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/user_book_loans/<int:user_id>', methods=['GET'])
def get_user_book_loans(user_id):
    try:
        # Open a database cursor
        cur = mysql.connection.cursor()

        # Query to get all the books borrowed by the user, including book details
        cur.execute("""
            SELECT bl.loan_id, b.book_id, b.title, b.author, bl.loan_date, bl.due_date, bl.return_date, bl.status
            FROM book_loans bl
            JOIN books b ON bl.book_id = b.book_id
            WHERE bl.user_id = %s
            ORDER BY bl.loan_date DESC
        """, (user_id,))

        # Fetch the results
        loans = cur.fetchall()

        # Check if loans exist
        if not loans:
            return jsonify({'message': 'No books found for this user'}), 404

        # Prepare the response data
        loan_data = []
        for loan in loans:
            loan_data.append({
                'loan_id': loan[0],
                'book_id': loan[1],
                'title': loan[2],
                'author': loan[3],
                'loan_date': loan[4].strftime('%Y-%m-%d'),
                'due_date': loan[5].strftime('%Y-%m-%d'),
                'return_date': loan[6].strftime('%Y-%m-%d') if loan[6] else None,
                'status': loan[7]
            })

        # Close the cursor
        cur.close()

        # Return the loan data as a JSON response
        return jsonify(loan_data), 200

    except Exception as e:
        print(f"Error retrieving user book loans: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

def insert_book_loans():
    try:
        # Open a database cursor
        cur = mysql.connection.cursor()

        # Book loan data to insert
        book_loans = [
            (1, 1, '2024-12-04', '2024-12-25', None, 'En cours'),
        ]

        # Insert each book loan into the database
        cur.executemany("""
            INSERT INTO book_loans (user_id, book_id, loan_date, due_date, return_date, status)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, book_loans)

        # Commit the transaction
        mysql.connection.commit()

        # Close the cursor
        cur.close()

        print("Book loans data inserted successfully")

    except Exception as e:
        print(f"Error inserting book loans data: {e}")


if __name__ == '__main__':
    # Insert books data into the database
    with app.app_context():
        insert_books_data()
        insert_reviews_data()
        insert_book_loans()
    # Run the Flask app
    app.run(host='localhost', port=30360)




