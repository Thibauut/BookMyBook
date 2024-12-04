import React, { createContext, useState } from 'react';
import axios from 'axios';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [data, setData] = useState({
    books: [], // Initialize with an empty array for books
    topBooks: [], // Add a state for the top books
    reviews: [], // Add a state for reviews
    error: null, // To track errors
    user: null, // To track the logged-in user
    borrowedBooks: [], // To track the books borrowed by the
  });

  // Function to fetch all books and update the state
  const fetchBooks = () => {
    axios.post('http://localhost:30360/allbooks')
      .then(response => {
        setData(prevState => ({
          ...prevState,
          books: response.data.books, // Update books in the context
          error: null,                // Clear any previous errors
        }));
      })
      .catch(error => {
        console.error("There was an error fetching the books:", error);
        setData(prevState => ({
          ...prevState,
          error: 'Failed to load books. Please try again.', // Update error in the context
        }));
      });
  };

  // Function to fetch top 4 books with the least availability
  const fetchTopBooks = () => {
    axios.get('http://localhost:30360/topbooks')
      .then(response => {
        setData(prevState => ({
          ...prevState,
          topBooks: response.data.top_books, // Update topBooks in the context
          error: null,                      // Clear any previous errors
        }));
      })
      .catch(error => {
        console.error("There was an error fetching the top books:", error);
        setData(prevState => ({
          ...prevState,
          error: 'Failed to load top books. Please try again.', // Update error in the context
        }));
      });
  };

  // Function to fetch all reviews from the backend
  const fetchReviews = () => {
    axios.get('http://localhost:30360/reviews')
      .then(response => {
        setData(prevState => ({
          ...prevState,
          reviews: response.data.reviews, // Update reviews in the context
          error: null,                    // Clear any previous errors
        }));
      })
      .catch(error => {
        console.error("There was an error fetching the reviews:", error);
        setData(prevState => ({
          ...prevState,
          error: 'Failed to load reviews. Please try again.', // Update error in the context
        }));
      });
  };

  const handleLogin = (userData) => {
    setData(prevState => ({
      ...prevState,
      user: userData,  // Store user data in the context
    }));
  };


  const getUserBorrowedBooks = async (user_id) => {
    const response = await axios.get(`http://localhost:30360/user_book_loans/${user_id}`);

      if (response.status === 200) {
        const loans = response.data; // Array of books borrowed by the user
        if (loans.length === 0) {
          Alert.alert('No Borrowed Books', 'This user has not borrowed any books.');
        } else {
          // Do something with the loans data
          console.log('Borrowed Books:', loans);

          setData(prevState => ({
            ...prevState,
            borrowedBooks: loans,  // Store borrowed books in the context
          }));
        }
      }
  };

  return (
    <MyContext.Provider value={{ data, fetchBooks, fetchTopBooks, fetchReviews, handleLogin, getUserBorrowedBooks }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
