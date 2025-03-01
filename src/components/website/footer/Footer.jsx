import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mt-20 mx-auto py-10 px-5 grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-gray-700">
        {/* Brand Section */}
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500 text-2xl">🌿</span>
            <h3 className="text-2xl font-semibold">GINTEA</h3>
          </div>
          <p className="mt-3 text-gray-400 text-sm">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint.
          </p>
          {/* Social Media */}
          <h4 className="mt-5 font-semibold">FOLLOW US</h4>
          <div className="flex space-x-3 mt-2">
            <Link
              to="#"
              className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>

            <Link
              to="#"
              className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <i className="fab fa-twitter"></i>
            </Link>
            <Link
              to="#"
              className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <i className="fab fa-instagram"></i>
            </Link>
            <Link
              to="#"
              className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <i className="fab fa-youtube"></i>
            </Link>
          </div>
        </div>

        {/* Customer Service Section */}
        <div>
          <h4 className="font-semibold mb-3">CUSTOMER</h4>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>
              <Link
                to="#"
                className="hover:text-green-500 transition-colors duration-200"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-green-500 transition-colors duration-200"
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-green-500 transition-colors duration-200"
              >
                Track My Order
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-green-500 transition-colors duration-200"
              >
                Return Policy
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-green-500 transition-colors duration-200"
              >
                Gift Cards
              </Link>
            </li>
          </ul>
        </div>

        {/* About Us Section */}
        <div>
          <h4 className="font-semibold mb-3">ABOUT US</h4>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>
              <Link
                to="#"
                className="hover:text-green-500 transition-colors duration-200"
              >
                Company Info
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-green-500 transition-colors duration-200"
              >
                Press Releases
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-green-500 transition-colors duration-200"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-green-500 transition-colors duration-200"
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-green-500 transition-colors duration-200"
              >
                Investor Relations
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="font-semibold mb-3">GET IN TOUCH</h4>
          <p className="text-gray-400 text-sm">
            2972 Westheimer Rd. Santa Ana, Illinois 85486
          </p>
          <p className="text-green-400 font-semibold mt-2">
            📞 (084) 123 - 456 88
          </p>
          <p className="text-gray-400 text-sm">contact@example.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
