import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Left Side - Title */}
      <h1 className="text-2xl font-bold">Task Management</h1>

      {/* Right Side - Login Button */}
      <Link to="/login">
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
