import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteStudent } from "../services/studentServices";

const DeleteStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performDelete = async () => {
      try {
        setIsDeleting(true);
        await deleteStudent(id);
        alert("Student deleted successfully!");
        navigate("/students");
      } catch (err) {
        console.error("Error deleting student:", err);
        setError("Failed to delete student");
        navigate("/students");
      } finally {
        setIsDeleting(false);
      }
    };

    performDelete();
  }, [id, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isDeleting && (
        <div className="text-center">
          <div className="spinner border-4 border-blue-600 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          <p className="mt-4 text-gray-600">Deleting student...</p>
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default DeleteStudent;
