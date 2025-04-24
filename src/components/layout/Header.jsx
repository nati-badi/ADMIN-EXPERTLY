import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center mb-6 mx-8 mt-3">
      <div>
        <h2 className="text-3xl font-bold">
          Hi,{" "}
          <span className="text-green-600">
            {isSignedIn ? "Mr. Admin" : "Guest"}
          </span>
        </h2>
        <p className="text-sm text-gray-500">Good Evening</p>
      </div>
      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <>
            <img
              src="/perfect.png"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-gray-400 font-bold">Mr. Admin</span>
          </>
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
