import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-6 md:space-y-0">
          {/* Company Info */}
          <div className="md:w-1/3">
            <h2 className="font-bold text-lg">
              Amit Patel — Software Developer
            </h2>
            <p className="text-sm mt-2 text-gray-400">
              Passionate Node.js developer specializing in building scalable web
              applications with modern JavaScript frameworks. Currently working
              at TCS and exploring innovative tech solutions for libraries and
              educational systems.
            </p>
          </div>

          {/* Projects */}
          <div className="md:w-1/3">
            <h2 className="font-bold text-lg">PROJECTS</h2>
            <ul className="mt-2 space-y-2 text-sm text-gray-400">
              <li>📚 Student Daily Tracking System</li>
              <li>💻 Library Management Dashboard</li>
              <li>⚙️ Node.js Automation Tools</li>
              <li>🌐 Portfolio Website</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="md:w-1/3">
            <h2 className="font-bold text-lg">USEFUL LINKS</h2>
            <ul className="mt-2 space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="https://github.com/amitpatelcr07"
                  className="hover:text-white"
                >
                  GitHub Profile
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/amit-patel-b944b1195/"
                  className="hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:amitpatel.dev@example.com"
                  className="hover:text-white"
                >
                  Contact Me
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="text-center md:text-left">
            <p>📍 Sec 66, New Delhi, India</p>
            <p>📧 amitpatel.dev@example.com</p>
          </div>
          <div className="text-center md:text-right mt-4 md:mt-0">
            <p>📞 +91 96956 61246</p>
            <p>📞 +91 63885 57509</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Amit Patel. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
