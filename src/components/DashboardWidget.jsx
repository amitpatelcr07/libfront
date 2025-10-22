import React, { useEffect, useState } from "react";
import { getStudents } from "../services/studentServices";
import StudentForm from "../components/StudentForm.jsx"; // 👈 your form
import { Link } from "react-router-dom";
import bookServices from "../services/bookServices.js";
import AnimatedBookList from "./common/AnimatedBookList.jsx";
import AnimatedStudenList from "./common/AnimatedStudenList.jsx";
const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [bookData, setBookData] = useState([]);
  const [booksIssued, setBooksIssued] = useState(0);
  const [overdueBooks, setOverdueBooks] = useState(0);
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const [showStudentForm, setShowStudentForm] = useState(false); // 👈 modal toggle

  useEffect(() => {
    // Load students from API
    getStudents()
      .then((data) => {
        console.log("Students data:aryan", data);
        setTotalStudents(data.length);
        setRecentStudents(data.slice(-3).reverse());
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  // Dummy books data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookServices.getBooks();

        setBookData(data);
        setRecentBooks(data.slice(-3).reverse());

        const issuedCount = data.filter((book) => book.isIssued).length;
        setBooksIssued(issuedCount);
        setTotalBooks(data.length);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleAddStudentClick = () => {
    setShowStudentForm(true);
  };

  const closeStudentForm = () => {
    setShowStudentForm(false);
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* Add Student Button */}
      <div className="flex justify-end gap-4">
        {/* Add Student */}
        <Link to="/studentsForm">
          <button
            onClick={handleAddStudentClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Student
          </button>
        </Link>

        {/* Add Book */}
        <Link to="/addBooks">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            + Add Books
          </button>
        </Link>
      </div>

      {/* ✅ Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500 text-sm">Total Students</h2>
          <p className="text-2xl font-bold">{totalStudents}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500 text-sm">Total Books</h2>
          <p className="text-2xl font-bold">{totalBooks}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500 text-sm">Books Issued</h2>
          <p className="text-2xl font-bold">{booksIssued}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500 text-sm">Overdue Books</h2>
          <p className="text-2xl font-bold text-red-500">{overdueBooks}</p>
        </div>
      </div>

      {/* ✅ Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-semibold mb-4">Recent Students</h3>
          {/* <ul className="space-y-2">
            {recentStudents.length === 0 ? (
              <li className="text-gray-500">No recent students found.</li>
            ) : (
              recentStudents.map((student, index) => (
                <li key={index} className="border-b pb-2 text-green-400">
                  {student.name} – Joined Recently
                </li>
              ))
            )}
          </ul> */}
          <AnimatedStudenList recengStudents={recentStudents} />
        </div>

        {/* Recent Books */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-    semibold mb-4">Recent Books</h3>
          {/* <ul className="space-y-2">
            {recentBooks.map((book, index) => (
              <li key={index} className="border-b pb-2">
                <span className="text-green-500 font-medium">
                  {book.title} – {book.isIssued ? "Issued" : "Available"}
                </span>{" "}
              </li>
            ))}
          </ul> */}
          <AnimatedBookList recentBooks={recentBooks} />
        </div>
      </div>

      {/* 🔽 Fullscreen Modal for Student Form */}
      {showStudentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full h-full max-w-4xl mx-auto p-8 rounded-md shadow-lg overflow-auto relative">
            {/* Close Button */}
            <button
              onClick={closeStudentForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>

            {/* Student Form */}
            <StudentForm onSubmit={closeStudentForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
