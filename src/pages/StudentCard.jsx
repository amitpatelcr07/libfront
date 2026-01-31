import React, { useState, useEffect } from "react";
import {
  getStudents,
  deleteStudent,
  getStudentById,
} from "../services/studentServices"; // Assuming these API functions exist
import { Link } from "react-router-dom";
import image from '../../public/image.png'
import { toast } from "react-toastify";
const PROTECTED_STUDENT_ID = "697dba3c4382d33f213a7432";

const StudentCard = () => {
  const imgurl = image; 
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(8); 
  const [editStudentId, setEditStudentId] = useState(null);

  useEffect(() => {
    getStudents()
      .then((data) => {
        console.log("Fetched students1:", data); 
        setStudents(data.reverse()); 
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
      // alert(`Failed to delete student: ${error.message}`);
      toast.error(error.message);
    }
  };

  
  const handleEdit = (studentId) => {
    
    try{
      if (studentId == PROTECTED_STUDENT_ID) {
        toast.error("This student is protected and cannot be edited.");
        return;
      } else {
        setEditStudentId(studentId);
        toast.info("Redirecting to edit page...");
      }
    }catch(error){
      toast.error("Error in editing student:"+ error.message);
    }

  };
  useEffect(() => {
    if (editStudentId) {
      
      const fetchStudentForEdit = async () => {
        try {
          // Assuming getStudentById is a function that fetches student details by ID
          const studentData = await getStudentById(editStudentId);
          console.log("Student data for editing:", studentData);
         
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
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
              {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {currentStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            ) : (
              currentStudents.map((student, index) => (
                <tr
                  key={index}
                  className="border-b bg-white hover:bg-blue-50 hover:shadow-md hover:scale-[1.01] transition-all duration-200 ease-in-out"
                >
                  {/* Image + Name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.imageUrl ? student.imageUrl : imgurl}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
                      />
                      <span className="font-medium text-gray-800">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3 text-gray-600">{student.email}</td>

                  {/* Batch Time */}
                  <td className="px-4 py-3 text-gray-600">
                    {student.batchTime}
                  </td>

                  {/* Fees */}
                  <td className="px-4 py-3 font-semibold text-gray-700">
                    ${student.fees}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        student.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 flex space-x-2">
                    {/* Edit Button */}
                    {student._id !== PROTECTED_STUDENT_ID && (
                      <Link to={`/students/${student._id}`}>
                        <button
                          onClick={() => handleEdit(student._id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>
                      </Link>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
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

export default StudentCard;
