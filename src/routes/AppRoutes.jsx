// import React from "react";
// import { Routes, Route } from "react-router-dom"; // Import Routes and Route
// import Dashboard from "../components/DashboardWidget.jsx";
// import Student from "../pages/Student.jsx"; // Import Student page component
// import StudentForm from "../components/StudentForm.jsx";
// import UpdateStudentFrm from "../components/UpdateStudentFrm.jsx";
// import BookForm from "../components/BookForm.jsx";
// import AdminLogin from "../pages/AdminLogin.jsx"; // Import Login page component
// import AdminRegister from "../pages/AdminRegister.jsx"; // Import Register page component 
// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Main layout with sidebar, header, and footer */}
//       <Route path="/register" element={<AdminRegister />} /> {/* Register page at '/register' path */}
//       <Route path="/login" element={<AdminLogin />} /> {/* Login page at '/login' path */}  
//       <Route path="/" element={<Dashboard />} /> {/* Dashboard at root path */}
//       <Route path="/students" element={<Student />} />
//       <Route path="/studentsForm" element={<StudentForm />} />
//       <Route path="/students/:id" element={<UpdateStudentFrm />} />
//       <Route path="/addBooks" element={<BookForm />} />
//       {/* Student page at '/student' path */}
//     </Routes>
//   );
// };

// export default AppRoutes;


import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Dashboard from "../components/DashboardWidget.jsx";
import Student from "../pages/Student.jsx";
import StudentForm from "../components/StudentForm.jsx";
import UpdateStudentFrm from "../components/UpdateStudentFrm.jsx";
import BookForm from "../components/BookForm.jsx";
import AdminLogin from "../pages/AdminLogin.jsx";
import AdminRegister from "../pages/AdminRegister.jsx";
// import ProtectedRoute from "../components/ProtectedRoute.jsx"; // ✅ Import ProtectedRoute
// import SessionManager from "../components/SessionManager.jsx"; // ✅ Import SessionManager
import SessionManager from "./SessionManager.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      {/* ✅ Global session watcher (auto logout after 30 minutes) */}
      <SessionManager />

      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          }
        />

        <Route
          path="/studentsForm"
          element={
            <ProtectedRoute>
              <StudentForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students/:id"
          element={
            <ProtectedRoute>
              <UpdateStudentFrm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addBooks"
          element={
            <ProtectedRoute>
              <BookForm />
            </ProtectedRoute>
          }
        />

        {/* Optional: fallback route */}
        <Route
          path="*"
          element={isAuthenticated ? <Dashboard /> : <AdminLogin />}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
