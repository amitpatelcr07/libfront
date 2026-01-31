import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: "🏠" },
    { name: "Students", path: "/students", icon: "👨‍🎓" },
    { name: "Books", path: "/books", icon: "📚" },
    { name: "Stats", path: "/stats", icon: "📊" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-40 bg-blue-600 text-white p-2 rounded-md"
      >
        {isMobileOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-16"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`h-screen bg-gray-900 text-white shadow-lg transition-all duration-300 flex-shrink-0 ${
          isCollapsed ? "w-20" : "w-64"
        } 
        lg:relative lg:translate-x-0 lg:top-0 lg:z-auto
        fixed top-16 left-0 z-35
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header with Collapse Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          {!isCollapsed && (
            <h2 className="text-lg font-extrabold">Admin Panel</h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block text-gray-400 hover:text-white transition-colors text-xl"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>

        {/* Menu Items */}
        <ul className="space-y-2 p-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer - Collapse Info */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 right-4 text-xs text-gray-500 text-center">
            <p className="hidden lg:block">💡 Click ← to collapse</p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
