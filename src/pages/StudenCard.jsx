import React, { useState, useEffect } from "react";
import {
  getStudents,
  deleteStudent,
  getStudentById,
} from "../services/studentServices"; // Assuming these API functions exist
import { Link } from "react-router-dom";

const StudenCard = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(8); // Show 8 students per page
  const [editStudentId, setEditStudentId] = useState(null);

  useEffect(() => {
    getStudents()
      .then((data) => {
        setStudents(data); // Set the fetched data to the state
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  // Calculate the current students to display
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(students.length / studentsPerPage);

  // Delete student
  const handleDelete = async (studentId) => {
    try {
      await deleteStudent(studentId); // Assuming deleteStudent API function
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentId)
      );
      alert("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  // Edit student (redirect to an edit page or open a modal)
  const handleEdit = (studentId) => {
    // You can implement an edit logic here, like opening a modal or navigating to an edit page
    setEditStudentId(studentId);
    alert(`Edit student with ID: ${studentId}`);

  };
  useEffect(() => {
    if (editStudentId) {
      // Logic to navigate to edit page or open modal can be added here
      const fetchStudentForEdit = async () => {
        try {
          // Assuming getStudentById is a function that fetches student details by ID
          const studentData = await getStudentById(editStudentId);
          console.log("Student data for editing:", studentData);
          // You can set this data to a state to pre-fill an edit form
        } catch (error) {
          console.error("Error fetching student for edit:", error);
        }
      };
      fetchStudentForEdit();
    } else {
      console.log("No student selected for editing.");
    }
  }, [editStudentId]); 

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Student List</h2>

      {/* Table for displaying student data */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-gray-600">Batch Time</th>
              <th className="px-4 py-2 text-left text-gray-600">Fees</th>
              <th className="px-4 py-2 text-left text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-gray-600">
                Actions
              </th>{" "}
              {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {currentStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            ) : (
              currentStudents.map((student, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">{student.batchTime}</td>
                  <td className="px-4 py-2">${student.fees}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        student.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    {/* Edit Button */}
                    <Link to={`/students/${student._id}`}>
                      <button
                        onClick={() => handleEdit(student._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </Link>
                    {/* Delete Button */}
                    <Link to={"/"}>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="mx-4 text-lg">{`${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudenCard;
