import {
  LayoutDashboard,
  Briefcase,
  Users,
  DollarSign,
  ShieldAlert,
  StarIcon,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  UserRoundPen,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../ui/Spinner";

export default function Sidebar() {
  const { isSignedIn, setAdmin } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const admin = JSON.parse(localStorage.getItem("admin"));
      const token = admin?.token;

      await axios.post(
        "https://expertly-zxb1.onrender.com/api/v1/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.clear();
      setAdmin(null);
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  const menuItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      to: "/professionals",
      icon: <Briefcase className="w-5 h-5" />,
      label: "Professionals",
    },
    { to: "/users", icon: <Users className="w-5 h-5" />, label: "Users" },
    {
      to: "/payments",
      icon: <DollarSign className="w-5 h-5" />,
      label: "Payments",
    },
    {
      to: "/notifications",
      icon: <ShieldAlert className="w-5 h-5" />,
      label: "Notifications",
    },
    { to: "/rating", icon: <StarIcon className="w-5 h-5" />, label: "Ratings" },
    {
      to: "/reports",
      icon: <FileText className="w-5 h-5" />,
      label: "Reports",
    },
    {
      to: "/user-reports",
      icon: <UserRoundPen className="w-5 h-5" />,
      label: "User Reports",
    },
    {
      to: "/settings",
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
    },
  ];

  return (
    <aside
      className={`h-full bg-white shadow-md p-4 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="self-end text-gray-500 hover:text-green-600 transition durations-900 cursor-pointer"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Logo */}
      {!collapsed && (
        <img
          src="/expertly.jpg"
          alt="Expertly Logo"
          className="w-full h-20 mb-5 object-contain cursor-pointer"
        />
      )}

      {/* Navigation */}
      <nav className="space-y-4 text-lg font-medium text-gray-700">
        {menuItems.map(({ to, icon, label }) => (
          <NavLink
            to={to}
            key={label}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-2 py-2 rounded-md transition ${
                isActive ? "text-green-600" : "hover:text-green-600"
              }`
            }
            title={collapsed ? label : undefined}
          >
            {icon}
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}

        <hr className="border-t border-gray-300 my-4" />

        {/* Logout */}
        {isSignedIn && (
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`flex items-center space-x-2 px-2 py-2 rounded-md transition ${
              loggingOut ? "text-gray-400" : "text-red-500 hover:text-red-700"
            }`}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed &&
              (loggingOut ? (
                <Spinner size={5} className="w-4 h-4 animate-spin" />
              ) : (
                <span>Logout</span>
              ))}
          </button>
        )}
      </nav>
    </aside>
  );
}
