import { useDraggable } from "@dnd-kit/core";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const TaskCard = ({ task, refetch }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  // Handle Delete Action
  const handleDelete = async (e) => {
    e.stopPropagation();
    console.log("Delete function called");

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
          `https://job-task-server-kohl.vercel.app/tasks/${task._id}`
        );
        refetch();
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting task:", error);
        Swal.fire("Error!", "Failed to delete task.", "error");
      }
    }
  };

  // Prevent drag behavior when clicking delete
  const handleDragStart = (e) => {
    if (e.target.closest("button")) {
      e.stopPropagation(); // Prevent the drag from happening when clicking the delete button
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-2xl bg-gray-800 p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
      style={style}
      onDragStart={handleDragStart} // Add this to prevent drag when clicking delete
    >
      <h3 className="font-semibold text-lg text-white">{task.title}</h3>
      <p className="mt-2 text-sm text-gray-300">{task.description}</p>
      <div className="mt-4 flex items-center space-x-4">
        <Link to={`/update/${task._id}`}>
          <button className="p-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white transition duration-200">
            <FaEdit size={16} />
          </button>
        </Link>
        <button
          onClick={(e) => handleDelete(e)}
          className="p-2 z-50 rounded-full bg-red-600 hover:bg-red-500 text-white transition duration-200"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
