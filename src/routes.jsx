import { Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Professionals from "./pages/Professionals";
import Payments from "./pages/Payments";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import AdminProfile from "./pages/AdminProfile";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Preferences from "./pages/Preferences";
import UserDetail from "./pages/UserDetail";

const routes = () => [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "settings", element: <Settings /> },
      { path: "professionals", element: <Professionals /> },
      { path: "payments", element: <Payments /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "preferences", element: <Preferences /> },
      { path: "notifications", element: <Notifications /> },
      { path: "user-detail/:userType/:id", element: <UserDetail /> },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
