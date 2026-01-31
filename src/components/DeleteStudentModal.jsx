import React from "react";
import { deleteStudent, getStudents } from "../services/studentServices";

const DeleteStudentModal = ({
  isOpen,
  studentId,
  onClose,
  onDeleteSuccess,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteStudent(studentId);
      onDeleteSuccess();
      onClose();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          ⚠️ Confirm Delete
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this student? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStudentModal;
