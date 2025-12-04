import { useState } from "react";
import AdminLoginPage from "./AdminLoginPage";
export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Amit E-Library Management
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 font-semibold border-b-2 ${
              isLogin ? "border-blue-600 text-blue-600" : "text-gray-500"
            }`}
          >
            Admin Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 font-semibold border-b-2 ${
              !isLogin ? "border-blue-600 text-blue-600" : "text-gray-500"
            }`}
          >
            User Registration
          </button>
        </div>

        {/* Form */}
        {isLogin ? (
          <AdminLoginPage />
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Create password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
