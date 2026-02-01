import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import AppRoutes from "../routes/AppRoutes.jsx";

const MainLayout = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Hide layout on login or register pages OR if not authenticated
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    !isAuthenticated;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header - Only show if authenticated and not on auth pages */}
      {!hideLayout && <Header />}

      {/* Main Content Area */}
      {!hideLayout ? (
        <>
          {/* With Sidebar and Header */}
          <div className="flex flex-1 mt-16">
            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block">
              <Sidebar />
            </div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden">
              <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-4 sm:p-6 overflow-y-auto">
              <AppRoutes />
            </main>
          </div>

          {/* Footer */}
          <Footer />
        </>
      ) : (
        // Full-screen login/register page (no header, sidebar, footer)
        <main className="flex-1 flex items-center justify-center bg-gray-100">
          <AppRoutes />
        </main>
      )}
    </div>
  );
};

export default MainLayout;