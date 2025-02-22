import React from "react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

const TasksColumn = ({ column, tasks, refetch }) => {
  const { setNodeRef } = useDroppable({
    id: column.category,
  });

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.category}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks?.map((task) => {
          return <TaskCard key={task._id} task={task} refetch={refetch} />;
        })}
      </div>
    </div>
  );
};

export default TasksColumn;
