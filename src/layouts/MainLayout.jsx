import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import AppRoutes from "../routes/AppRoutes.jsx";

const MainLayout = () => {
  const location = useLocation();

  // Hide layout on login or register pages
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {!hideLayout && <Header />}

      {/* Main Content Area with Sidebar - Add mt-16 for fixed header */}
      {!hideLayout ? (
        <div className="flex flex-1 mt-16">
          {/* Sidebar - Desktop Only, Mobile handled by Sidebar component */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar - Handled by Sidebar component with fixed positioning */}
          <div className="lg:hidden">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 bg-gray-100 p-4 sm:p-6 overflow-y-auto">
            <AppRoutes />
          </main>
        </div>
      ) : (
        // Full-screen login/register page
        <main className="flex-1 bg-gray-100 flex items-center justify-center">
          <AppRoutes />
        </main>
      )}

      {/* Footer */}
      {!hideLayout && <Footer />}
    </div>
  );
};

export default MainLayout;
