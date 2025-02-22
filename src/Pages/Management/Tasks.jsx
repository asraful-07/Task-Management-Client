import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import TasksColumn from "./TasksColumn";
import { DndContext } from "@dnd-kit/core";

const column = [
  { category: "To-Do" },
  { category: "In Progress" },
  { category: "Done" },
];

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  // Fetch tasks using React Query
  const { isLoading, refetch, error } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axios.get(
        `https://job-task-server-kohl.vercel.app/tasks/user/${user.email}`
      );
      setTasks(data);
      return data;
    },
  });

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const updateCategory = over.id;

    if (taskId && updateCategory) {
      try {
        await axios.patch(
          `https://job-task-server-kohl.vercel.app/tasks/update-category-order/${taskId}`,
          { category: updateCategory }
        );
        refetch(); // Refetch tasks to update the UI
      } catch (error) {
        console.error("Error updating task category:", error);
      }
    }

    // setTasks(() =>
    //   tasks.map((task) =>
    //     task.id === taskId
    //       ? {
    //           ...task,
    //           category: updateCategory,
    //         }
    //       : task
    //   )
    // );
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <DndContext onDragEnd={handleDragEnd}>
          {column?.map((column) => {
            return (
              <TasksColumn
                key={column.category}
                column={column}
                tasks={tasks?.filter(
                  (task) => task.category === column.category
                )}
                refetch={refetch}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
};

export default Tasks;
