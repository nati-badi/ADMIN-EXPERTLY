import {
  LayoutDashboard,
  MessageCircle,
  Briefcase,
  Users,
  DollarSign,
  ShieldAlert,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { isSignedIn } = useAuth();

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <img
        src="/expertly.jpg"
        alt="Expertly Logo"
        className="w-full h-20 mb-8 object-contain cursor-pointer"
      />
      <nav className="space-y-4 text-lg font-medium text-gray-700 pl-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-3 font-semibold cursor-pointer ${
              isActive ? "text-green-600" : "hover:text-green-600"
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/consultations"
          className={({ isActive }) =>
            `flex items-center space-x-3 cursor-pointer ${
              isActive ? "text-green-600" : "hover:text-green-600"
            }`
          }
        >
          <MessageCircle className="w-5 h-5" />
          <span>Consultations</span>
        </NavLink>

        <NavLink
          to="/professionals"
          className={({ isActive }) =>
            `flex items-center space-x-3 cursor-pointer ${
              isActive ? "text-green-600" : "hover:text-green-600"
            }`
          }
        >
          <Briefcase className="w-5 h-5" />
          <span>Professionals</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center space-x-3 cursor-pointer ${
              isActive ? "text-green-600" : "hover:text-green-600"
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/payments"
          className={({ isActive }) =>
            `flex items-center space-x-3 cursor-pointer ${
              isActive ? "text-green-600" : "hover:text-green-600"
            }`
          }
        >
          <DollarSign className="w-5 h-5" />
          <span>Payments</span>
        </NavLink>

        <NavLink
          to="/conflicts"
          className={({ isActive }) =>
            `flex items-center space-x-3 cursor-pointer ${
              isActive ? "text-green-600" : "hover:text-green-600"
            }`
          }
        >
          <ShieldAlert className="w-5 h-5" />
          <span>Conflicts</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center space-x-3 cursor-pointer ${
              isActive ? "text-green-600" : "hover:text-green-600"
            }`
          }
        >
          <BarChart2 className="w-5 h-5" />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center space-x-3 cursor-pointer ${
              isActive ? "text-green-600" : "hover:text-green-600"
            }`
          }
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>

        <hr className="border-t border-gray-300 my-4" />

        {isSignedIn ? (
          <button className="flex items-center space-x-3 text-red-500 hover:text-red-700 cursor-pointer">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        ) : null}
      </nav>
    </aside>
  );
}
