import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import TasksList from "./TasksList";

const Tasks = () => {
  const { user } = useAuth();

  // Fetch tasks using React Query
  const {
    data: tasks = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axios.get(
        `https://job-task-server-kohl.vercel.app/task/${user.email}`
      );
      return Array.isArray(data) ? data : data.tasks || [];
    },
  });

  if (isLoading) return <h1 className="text-cyan-400">Loading...</h1>;
  if (error) return <h1 className="text-red-500">Error fetching tasks!</h1>;

  return (
    <div className="container mx-auto px-4 sm:px-8 bg-black text-white">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead className="bg-cyan-500 text-black">
                <tr>
                  <th className="px-5 py-3 border-b border-gray-200 text-left text-sm uppercase font-normal">
                    Title
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 text-left text-sm uppercase font-normal">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 text-left text-sm uppercase font-normal">
                    Category
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 text-left text-sm uppercase font-normal">
                    Timestamp
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 text-left text-sm uppercase font-normal">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <TasksList key={task._id} refetch={refetch} list={task} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
