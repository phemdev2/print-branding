import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 bg-[#0D0D0D] text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-14">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            PrintZion
          </h2>
          <p className="text-sm mt-4 leading-relaxed text-gray-400">
            Precision-crafted printing for brands that move fast.
            Clean output. Sharp colors. Zero compromises.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors duration-200"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-white transition-colors duration-200"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Contact
          </h3>
          <p className="text-sm mt-5">support@printzion.com</p>
          <p className="text-sm mt-1">+234 800 000 0000</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} PrintZion. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
