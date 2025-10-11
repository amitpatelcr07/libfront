import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Students", path: "/students" },
    { name: "Books", path: "/books" },
    { name: "Stats", path: "/stats" },
  ];

  return (
    <aside className="w-64 bg-gray-100 h-screen shadow-md p-4 -m-2">
      <h2 className="text-lg font-extrabold mb-6">Menu</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-3 py-2 rounded-md ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
