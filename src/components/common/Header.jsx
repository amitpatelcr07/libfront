import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">📚 Library Management</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/students" className="hover:underline">
                Students
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:underline">
                Books
              </Link>
            </li>
            <li>
              <Link to="/stats" className="hover:underline">
                Stats
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
