import axios from "axios";

const BASE_URL = "https://libback-eh51.onrender.com/api/books";
// const BASE_URL = "http://localhost:7000/api/books";

// Get all books  
 const getBooks = async () => {
  try {   ;
    const response = await axios.get(`${BASE_URL}/getAllBooks`);   
    return response.data; // returns book data
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error; // Optionally, throw the error to handle it in the calling component
  }     
};  

// Create a new book
 const createBook = async (bookData) => {
  try { 
    const response = await axios.post(`${BASE_URL}/addBook`, bookData);
    return response.data; // returns created book data
  } catch (error) {
    console.error("Error creating book:", error);
    throw error; // Optionally, throw the error to handle it in the calling component
  }
};  


const bookServices = {
  getBooks,
  createBook,
};  

export default bookServices;  