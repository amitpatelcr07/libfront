import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Dashboard from "../components/DashboardWidget.jsx";
import Student from "../pages/Student.jsx"; // Import Student page component
import StudentForm from "../components/StudentForm.jsx";
import UpdateStudentFrm from "../components/UpdateStudentFrm.jsx";
import BookForm from "../components/BookForm.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main layout with sidebar, header, and footer */}
      <Route path="/" element={<Dashboard />} /> {/* Dashboard at root path */}
      <Route path="/students" element={<Student />} />
      <Route path="/studentsForm" element={<StudentForm />} />
      <Route path="/students/:id" element={<UpdateStudentFrm />} />
      <Route path="/addBooks" element={<BookForm />} />
      {/* Student page at '/student' path */}
    </Routes>
  );
};

export default AppRoutes;
