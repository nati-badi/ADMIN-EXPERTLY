import { Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

import Consultations from "./pages/Consultations";
import Professionals from "./pages/Professionals";
import Payments from "./pages/Payments";
import Conflicts from "./pages/Conflicts";
import Analytics from "./pages/Analytics";

const routes = () => [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "settings", element: <Settings /> },
      { path: "consultations", element: <Consultations /> },
      { path: "professionals", element: <Professionals /> },
      { path: "payments", element: <Payments /> },
      { path: "conflicts", element: <Conflicts /> },
      { path: "analytics", element: <Analytics /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
