import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import bookServices from "../services/bookServices";
const BookForm = () => {
  const negivate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "Other",
    totalCopies: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      
     
      const data = await bookServices.createBook(book);
      setMessage("✅ Book added successfully!");
      setBook({ title: "", author: "", category: "Other", totalCopies: "" });
      console.log("Book added:", data);
      negivate("/");
    } catch (err) {
      console.error("Error:", err.message);
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-xl shadow-md text-center">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Add New Book
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={book.author}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <select
          name="category"
          value={book.category}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Education">Education</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          name="totalCopies"
          placeholder="Total Copies"
          value={book.totalCopies}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Book
        </button>
      </form>
      {message && <p className="mt-4 font-bold">{message}</p>}
    </div>
  );
};

export default BookForm;
