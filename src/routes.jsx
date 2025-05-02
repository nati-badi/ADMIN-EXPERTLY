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
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import AdminProfile from "./pages/AdminProfile";
import EditProfile from "./pages/Editprofile";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import it

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
      { path: "consultations", element: <Consultations /> },
      { path: "professionals", element: <Professionals /> },
      { path: "payments", element: <Payments /> },
      { path: "conflicts", element: <Conflicts /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "edit-profile", element: <EditProfile /> },
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
