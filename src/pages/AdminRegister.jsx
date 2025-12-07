import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authAction";
import backImg from "../assets/backImg.jpg";

const AdminRegister = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering with credentials:", credentials);
    dispatch(registerUser(credentials));
  };

  return (
    <div
      className="relative flex justify-center items-center w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backImg})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div
        className="w-full max-w-sm md:max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-2xl relative z-10 
                   transform transition-all duration-300 hover:shadow-3xl"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Welcome to the Platform
        </h2>
        <p className="text-center text-gray-500 mb-6 text-lg">
          Create Your Admin Account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-400"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-400"
              placeholder="Min 8 characters"
              required
              minLength="5"
            />
          </div>

          {error && (
            <p className="pt-2 text-red-600 bg-red-100 p-3 rounded-lg text-sm text-center font-medium border border-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out transform 
                        ${
                          loading
                            ? "bg-indigo-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                        }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition duration-150"
          >
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
