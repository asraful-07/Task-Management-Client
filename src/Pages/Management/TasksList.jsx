import axios from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TasksList = ({ list, refetch }) => {
  const { _id, title, description, category, timestamp } = list;

  // Handle Delete Action
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://job-task-server-kohl.vercel.app/tasks/${_id}`
        );
        refetch();
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting task:", error);
        Swal.fire("Error!", "Failed to delete task.", "error");
      }
    }
  };

  return (
    <tr className="hover:bg-cyan-700 transition-colors">
      <td className="px-5 py-5 border-b border-gray-200 bg-black text-white">
        {title}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-black text-white">
        {description}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-black text-white">
        {category}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-black text-white">
        {new Date(timestamp).toLocaleString()}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-black text-white">
        <div className="flex items-center space-x-4">
          <Link to={`/update/${_id}`}>
            <button className="text-cyan-400 hover:text-cyan-600">
              <FaEdit size={18} />
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TasksList;
