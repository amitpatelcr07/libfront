import React, { useState } from "react";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import AppRoutes from "../routes/AppRoutes.jsx";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-gray-800 text-white p-4 flex-1 justify-between items-center">
        <h2 className="text-lg text-pink">Menu</h2>
        <button
          onClick={toggleSidebar}
          className="focus:outline-none p-2 border border-gray-600 rounded"
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 relative">
        {/* Sidebar */}
        <div
          className={` text-white  p-4 flex-shrink-0 transform 
                      transition-transform duration-300 lg:translate-x-0
                      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                      fixed lg:static top-0 left-0 h-full z-50`}
        >
          <Sidebar />
        </div>

        {/* Overlay (for mobile when sidebar is open) */}
        {isSidebarOpen && (
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-4 sm:p-6 overflow-y-auto">
          <AppRoutes />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
