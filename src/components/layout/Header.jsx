import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import GreetingWithTime from "../ui/GreatingWithTime";

export default function Header() {
  const { isSignedIn, admin } = useAuth();
  const navigate = useNavigate();

  // Assume this state would be fetched or managed via context/API
  const [hasNewNotification, setHasNewNotification] = useState(true);

  return (
    <header className="flex justify-between items-center mx-8 mt-3">
      <div>
        <h2 className="text-3xl font-bold">
          Hi,{" "}
          <span className="text-green-600">
            {isSignedIn && admin?.firstName ? admin.firstName : "Guest"}
          </span>
        </h2>
        <GreetingWithTime />
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        {isSignedIn && (
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/notifications")}
          >
            <FiBell className="text-2xl text-gray-600 hover:text-green-600 transition" />
            {hasNewNotification && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
            )}
          </div>
        )}

        {/* Profile Section */}
        {isSignedIn ? (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img
              src="/user.png"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-gray-400 font-bold">
              {admin?.firstName ? `${admin.firstName}` : ""}
            </span>
          </div>
        ) : (
          <div className="space-x-4">
            <button
              className="text-green-700 border border-green-600 hover:bg-green-50 hover:text-green-800 transition-colors px-4 py-2 rounded-md cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
            <button
              className="bg-green-600 text-white hover:bg-green-700 hover:shadow-md transition-all px-4 py-2 rounded-md cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
