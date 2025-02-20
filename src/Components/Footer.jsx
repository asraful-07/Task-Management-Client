import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa"; // Import React Icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        {/* Footer Content */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Task Management</h2>
          <p className="mt-2 text-gray-400">
            Stay productive and manage tasks efficiently!
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-cyan-400"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-cyan-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-cyan-400"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-cyan-400"
          >
            <FaFacebook />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-sm text-gray-500">
          <p>&copy; 2025 Task Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
