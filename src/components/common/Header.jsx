import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/authSlice.js";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false); // Close menu after logout
  };

  return (
    <header className="bg-blue-600 text-white shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">📚 Amit E-Library Mgmt</h1>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex">
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
              <>
                <li>
                  <span className="text-white">Welcome, {user?.name}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 px-2 py-1 text-white rounded hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Navigation - Mobile */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-16 left-0 right-0 bg-blue-700 shadow-lg">
            <ul className="flex flex-col space-y-4 p-4">
              <li>
                <Link
                  to="/"
                  className="hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/students"
                  className="hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Students
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/stats"
                  className="hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stats
                </Link>
              </li>

              {!isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="hover:underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="hover:underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span className="text-white">Welcome, {user?.name}</span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 px-4 py-2 text-white rounded hover:bg-red-700 transition w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
