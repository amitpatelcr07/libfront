import React from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../services/studentServices";
import StudentForm from "../components/StudentForm";

const AddStudent = () => {
  const navigate = useNavigate();

  const initialData = {
    name: "",
    email: "",
    password: "",
    address: "",
    fees: "",
    status: "active",
    batchTime: "",
  };

  const handleSubmit = async (formData) => {
    try {
      // Create FormData for multipart/form-data
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("address", formData.address);
      form.append("fees", formData.fees);
      form.append("status", formData.status);
      form.append("batchTime", formData.batchTime);

      const response = await createStudent(form);
      console.log("Student created:", response);
      alert("Student added successfully!");
      navigate("/students");
    } catch (error) {
      console.error("Error creating student:", error);
      alert(
        "Failed to add student: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Add New Student</h2>
      <StudentForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isEditing={false}
      />
    </div>
  );
};

export default AddStudent;
