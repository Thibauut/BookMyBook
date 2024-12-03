import React, { createContext, useState } from 'react';
import axios from 'axios';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [data, setData] = useState({
    books: [], // Initialize with an empty array for books
    topBooks: [], // Add a state for the top books
    error: null, // To track errors
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

  return (
    <MyContext.Provider value={{ data, fetchBooks, fetchTopBooks }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
