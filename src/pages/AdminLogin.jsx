// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/authAction";
// import { useNavigate } from "react-router-dom";
// import aLogin from "../assets/aLogin.jpg";

// const AdminLogin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { error, loading, isAuthenticated } = useSelector(
//     (state) => state.auth
//   );

//   const [credentials, setCredentials] = useState({
//     email: "",
//     password: "",
//   });

//   // 🔥 Redirect after successful login
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/dashboard"); // Change to your protected route
//     }
//   }, [isAuthenticated, navigate]);

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(credentials));
//   };

//   return (
//     <div
//       className="relative flex justify-center items-center w-screen h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url(${aLogin})` }}
//     >
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       <div className="w-full max-w-sm md:max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-2xl relative z-10 transform transition-all duration-300 hover:shadow-3xl">
//         <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
//           Welcome Back
//         </h2>
//         <p className="text-center text-gray-500 mb-6 text-lg">
//           Login to Your Admin Account
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={credentials.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition"
//               placeholder="you@example.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {error && (
//             <p className="pt-2 text-red-600 bg-red-100 p-3 rounded-lg text-sm text-center font-medium border border-red-200">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 mt-4 text-white font-semibold rounded-lg shadow-md transition
//               ${
//                 loading
//                   ? "bg-indigo-400 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.01] focus:ring-4 focus:ring-indigo-500"
//               }`}
//           >
//             {loading ? "Logging In..." : "Login"}
//           </button>
//         </form>

//         <p className="mt-8 text-center text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <a
//             href="/register"
//             className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
//           >
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authAction";
import { useNavigate } from "react-router-dom";
import aLogin from "../assets/aLogin.jpg";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // State for toggling dummy credentials visibility
  const [showDummyCredentials, setShowDummyCredentials] = useState(false);

  // 🔥 Redirect after successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Change to your protected route
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  // Function to toggle the dummy credentials visibility
  const toggleCredentials = () => {
    setShowDummyCredentials((prev) => !prev);
  };

  return (
    <div
      className="relative flex justify-center items-center w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${aLogin})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="w-full max-w-sm md:max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-2xl relative z-10 transform transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6 text-lg">
          Login to Your Admin Account
        </p>

        {/* 💡 START: Dummy Credentials Hide/Show Section */}
        <div className="mb-6 border border-dashed p-3 rounded-lg bg-indigo-50/70 border-indigo-200">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-indigo-700">
              {showDummyCredentials
                ? "Hide Dummy Credentials"
                : "Testing Credentials"}
            </p>
            <button
              type="button"
              onClick={toggleCredentials}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none"
            >
              {showDummyCredentials ? "Hide" : "Show"}
            </button>
          </div>

          {/* Credentials Display (Conditional) */}
          {showDummyCredentials && (
            <div className="mt-2 space-y-1 text-sm">
              <p className="text-gray-800">
                <span className="font-medium text-gray-600">Username:</span>{" "}
                <code className="font-bold text-indigo-700">xyza@gmail.com</code>
              </p>
              <p className="text-gray-800">
                <span className="font-medium text-gray-600">Password:</span>{" "}
                <code className="font-bold text-indigo-700">12345</code>
              </p>
            </div>
          )}
        </div>
        {/* END: Dummy Credentials Hide/Show Section */}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition"
              placeholder="Enter your password"
              required
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
            className={`w-full py-3 mt-4 text-white font-semibold rounded-lg shadow-md transition
              ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.01] focus:ring-4 focus:ring-indigo-500"
              }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;