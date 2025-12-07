import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/authSlice.js"; // Assuming you've created this action in authSlice
const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Get authentication state from Redux

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action from Redux
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">📚 Amit E-Library Management</h1>
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

            {/* Conditionally render Login and Register if not authenticated */}
            {!isAuthenticated ? (
              <>
                <li>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:underline">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              // If authenticated, show a greeting and logout button
              <>
                <li>
                  <span className="text-white">Welcome, {user?.name}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 px-2 py-1 text-white rounded hover:bg-red-700"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
