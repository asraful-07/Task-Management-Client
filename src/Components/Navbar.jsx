import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);

  const defaultAvatar = "path_to_default_avatar_image";

  return (
    <div className="bg-gray-900 text-white p-4">
      <nav className="flex justify-between items-center container mx-auto">
        {/* Left Side - Title */}
        <h1 className="text-2xl font-bold">Task Management</h1>

        {/* Right Side - Login or User Info */}
        {user ? (
          <div className="flex items-center space-x-4">
            <img
              src={user?.photoURL || defaultAvatar}
              alt="User"
              className="h-12 w-12 rounded-full border-2 border-cyan-600"
              id="lg-tooltip"
            />
            <Tooltip
              className="z-10"
              anchorSelect="#lg-tooltip"
              content={user?.displayName || "User"}
            />
            <button
              onClick={handleLogout}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded">
              Login
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
