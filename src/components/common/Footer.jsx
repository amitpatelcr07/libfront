import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between mb-6">
          {/* Company Info */}
          <div className="w-1/3">
            <h2 className="font-bold text-lg">COMPANY NAME</h2>
            <p className="text-sm mt-2">
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Products */}
          <div className="w-1/3">
            <h2 className="font-bold text-lg">PRODUCTS</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>MDBootstrap</li>
              <li>MDWordPress</li>
              <li>BrandFlow</li>
              <li>Bootstrap Angular</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="w-1/3">
            <h2 className="font-bold text-lg">USEFUL LINKS</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>Your Account</li>
              <li>Become an Affiliate</li>
              <li>Shipping Rates</li>
              <li>Help</li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex justify-between items-center text-sm">
          <div>
            <p>New Delhi, NY 10012, NR</p>
            <p>info@example.com</p>
          </div>
          <div>
            <p>+ 9695661246</p>
            <p>+ 6388557509</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm">
          <p>&copy; 2021 Copyright: amitpatel.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
