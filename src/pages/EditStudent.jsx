import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../services/studentServices";
import StudentForm from "../components/StudentForm";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    fees: "",
    status: "active",
    batchTime: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const studentData = await getStudentById(id);
        setFormData({
          name: studentData.name || "",
          email: studentData.email || "",
          password: "",
          address: studentData.address || "",
          fees: studentData.fees ? studentData.fees.toString() : "",
          status: studentData.status || "active",
          batchTime: studentData.batchTime || "",
        });
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudentData();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (updatedFormData) => {
    try {
      await updateStudent(id, updatedFormData);
      alert("Student updated successfully!");
      navigate("/students");
    } catch (err) {
      console.error("Error updating student:", err);
      alert("Failed to update student.");
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Edit Student</h2>
      <StudentForm
        initialData={formData}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </div>
  );
};

export default EditStudent;
