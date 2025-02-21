import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const TasksListUpdate = () => {
  const list = useLoaderData();
  const navigate = useNavigate();
  const { _id, title, description, category, timestamp } = list;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title || "",
      description: description || "",
      category: category || "To-Do",
    },
  });

  const onSubmit = (data) => {
    const taskData = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    axios
      .put(`http://localhost:5000/task-edit/${_id}`, taskData)
      .then((response) => {
        console.log("Task updated successfully:", response.data);
        toast.success("Task updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        toast.error("Failed to update task.");
      });
  };

  return (
    <div className="p-6 my-12 max-w-md mx-auto bg-gray-800 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-400 text-center">
        Update Task
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Input Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Task Title:
          </label>
          <input
            type="text"
            placeholder="Enter task title..."
            {...register("title", {
              required: "Title is required.",
              maxLength: {
                value: 50,
                message: "Title cannot exceed 50 characters.",
              },
            })}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description Input Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Task Description (Optional):
          </label>
          <textarea
            placeholder="Enter task description..."
            {...register("description", {
              maxLength: {
                value: 200,
                message: "Description cannot exceed 200 characters.",
              },
            })}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Category Select Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Category:
          </label>
          <select
            {...register("category", { required: "Please select a category." })}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-cyan-400 text-black px-4 py-2 rounded font-semibold hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TasksListUpdate;
