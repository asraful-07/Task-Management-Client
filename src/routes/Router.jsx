import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register.jsx/Register";
import AddManagement from "../Pages/Management/AddManagement";
import TasksListUpdate from "../Pages/Management/TasksListUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addManagement",
        element: <AddManagement />,
      },
      {
        path: "/update/:id",
        element: <TasksListUpdate />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/job-tasks/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
