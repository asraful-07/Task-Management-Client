import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const AddManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  // Mutation to add a task
  const mutation = useMutation({
    mutationFn: async (newTask) => {
      return await axios.post("http://localhost:5000/tasks", newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Task Added Successfully!");
      reset();
      navigate("/");
    },
    onError: (error) => {
      toast.error("Failed to add task. Please try again.");
      console.error("Error adding task:", error);
    },
  });

  const onSubmit = (data) => {
    const taskData = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    mutation.mutate(taskData);
  };

  return (
    <div className="p-6 my-12 max-w-md mx-auto bg-gray-800 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-400 text-center">
        Add New Task
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* User Name Input Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Your Name:
          </label>
          <input
            readOnly
            defaultValue={user?.displayName}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            type="text"
            placeholder="Your Name"
            {...register("name", { required: "Name is required." })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* User Email Input Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Your Email:
          </label>
          <input
            readOnly
            defaultValue={user?.email}
            className="w-full px-3 py-2 rounded bg-gray-800 text-gray-400 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            type="email"
            placeholder="Your email"
            {...register("email", { required: true })}
          />
        </div>

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
            <option value="">Select Category</option>
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
          disabled={mutation.isLoading}
          className="w-full bg-cyan-400 text-black px-4 py-2 rounded font-semibold hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          {mutation.isLoading ? "Adding Task..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddManagement;
