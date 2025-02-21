import React from "react";
import { Link } from "react-router-dom";
import Tasks from "./Tasks";

const ManagementHome = () => {
  return (
    <div className="container mx-auto my-24">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <div>
          <Link
            to="/addManagement"
            className="btn bg-cyan-800 hover:bg-cyan-400 text-lg font-bold text-white"
          >
            Add Management
          </Link>
        </div>
      </div>
      <div>
        <Tasks />
      </div>
    </div>
  );
};

export default ManagementHome;
