// src/services/studentServices.js
import axios from "axios";

// const BASE_URL = "https://libback-eh51.onrender.com/api/students";      // for live producton
const BASE_URL = "http://localhost:7000/api/students";                     // for local development

// Get all students
export const getStudents = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // returns student data
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error; // Optionally, throw the error to handle it in the calling component
  }
};

// Get a single student by ID
export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data; // returns a single student's data
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

// Create a new student
export const createStudent = async (studentData) => {
  try {
    console.log("studentData in service:", studentData);
    const response = await axios.post(BASE_URL, studentData, {
      headers: {
        "Content-Type": "multipart/form-data", // optional; axios can detect automatically
      },
    });
    return response.data; // returns the created student's data
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

// Update an existing student
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, studentData);
    console.log("Update response data:", response.data);
    return response.data; // returns updated student data
  } catch (error) {
    const message = error.response?.data?.message || "Update failed";

    throw new Error(message);
  }
};



export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data; 
  } catch (error) {
    
    const message = error.response?.data?.message || "Delete failed";

   
    throw new Error(message);
  }
};
