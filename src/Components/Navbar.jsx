import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Left Side - Title */}
      <h1 className="text-2xl font-bold">Task Management</h1>

      {/* Right Side - Login Button */}
      <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </nav>
  );
};

export default Navbar;
