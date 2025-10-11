import React, { useState } from "react";
import { createStudent } from "../services/studentServices";
import { Link ,useNavigate} from "react-router-dom";
const StudentForm = () => {
  const [submit,setSubmit]=useState(false);
 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    fees: "",
    status: "active",
    batchTime: "",
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     setSubmit(true);
    const finalData = {
      ...formData,
      fees: parseFloat(formData.fees),
    };

    // Function to add a new student
    const AddStudent = async () => {
      try {
        await createStudent(finalData); // Assuming API call
        navigate("/");
        alert("Student created successfully!");
      } catch (error) {
        console.error("Error creating student:", error);
        alert("Failed to create student.");
      }
    };

    AddStudent();
    
    // Optionally reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      address: "",
      fees: "",
      status: "active",
      batchTime: "",
    });
    
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl bg-white shadow-md rounded-md">
      <Link to={"/"}>
        <button className="mb-4 text-blue-600 hover:underline font-semibold">
          &larr; Back
        </button>
      </Link>

      <h2 className="text-2xl font-bold text-center mb-6">Student Form</h2>

      <form className="space-y-6">
        {/* Name and Email */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="md:w-1/2">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="md:w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Password and Address */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="md:w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="md:w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Fees and Status */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="md:w-1/2">
            <label className="block text-gray-700 font-medium mb-1">Fees</label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="md:w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Batch Time and Submit */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-end">
          <div className="md:w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Batch Time
            </label>
            <select
              name="batchTime"
              value={formData.batchTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Batch Time</option>
              <option value="9 AM - 12 PM">9 AM - 12 PM</option>
              <option value="12 PM - 3 PM">12 PM - 3 PM</option>
              <option value="3 PM - 6 PM">3 PM - 6 PM</option>
              <option value="6 PM - 9 PM">6 PM - 9 PM</option>
            </select>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="md:w-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
