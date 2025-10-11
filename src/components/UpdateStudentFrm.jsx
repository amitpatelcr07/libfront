import React, { useEffect, useState } from "react";
import { createStudent } from "../services/studentServices";
import { Link ,useNavigate,useParams} from "react-router-dom";
import { getStudentById,updateStudent } from "../services/studentServices"; // Import the function to get student by ID

const UpdateStudentFrm = () => {
  const [submit,setSubmit]=useState(false);
  const { id } = useParams(); // Get the student ID from the URL
  console.log("Editing student with ID:", id); // Log the ID to verify it's being captured

  
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

  useEffect(() => { 
    // Fetch the student data based on the ID and populate the form
    const fetchStudentData = async () => {
      try {
        // Assuming you have a function to get student by ID
        const studentData = await getStudentById(id); // Replace with your actual API call
        setFormData({
          name: studentData.name || "",
          email: studentData.email || "", 
          password: "", // Password is usually not fetched for security reasons
          address: studentData.address || "",
          fees: studentData.fees ? studentData.fees.toString() : "",
          status: studentData.status || "active",
          batchTime: studentData.batchTime || "",
        });
      } catch (error) {
        console.error("Error fetching student data:", error);
        alert("Failed to fetch student data.");
      }
    };

    if (id) {
      fetchStudentData();
    } else {
      console.log("No student ID provided in URL.");
    }
  }, [id]); // Run this effect when the component mounts or when the ID changes


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

    // Function to Update  existing student
    const updtStudent = async () => {
      try {
       const data= await updateStudent(id, formData); // Assuming API call
        console.log("Updated student data:", data);
        setFormData(data)
        alert("Student Updated successfully!");
        navigate("/");
        
      } catch (error) {
        console.error("Error creating student:", error);
        alert("Failed to create student.");
      }
    };

    updtStudent();
    
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

      <h2 className="text-2xl font-bold text-center mb-6">Update Student Form</h2>

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
            Update Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudentFrm;
