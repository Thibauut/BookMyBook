import React, { createContext, useState } from 'react';
import axios from 'axios';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [data, setData] = useState({
    books: [],  // Initialize with an empty array for books
    error: null, // To track errors
  });

  // Function to fetch books and update the state
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

  return (
    <MyContext.Provider value={{ data, fetchBooks }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
