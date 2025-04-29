import React from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { useAuth } from "../context/AuthContext";
import { Breadcrumb } from "../components/ui/breadcrumb";

const AdminProfile = () => {
  const { admin } = useAuth();

  if (!admin) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[40vh]">
        <svg
          className="animate-spin h-8 w-8 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile", href: "/profile" },
        ]}
      />

      <div className="mt-6 bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Admin Profile
        </h2>

        <div className="space-y-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Full Name</span>
            <span className="font-medium text-gray-800">
              {admin.firstName} {admin.lastName}
            </span>
          </div>
          <hr className="text-green-600" />

          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-800">{admin.email}</span>
          </div>
          <hr className="text-green-600" />

          <div className="flex justify-between">
            <span className="text-gray-500">Phone Number</span>
            <span className="font-medium text-gray-800">
              {admin.phoneNumber}
            </span>
          </div>
          <hr className="text-green-600" />

          <div className="flex justify-between">
            <span className="text-gray-500">Role</span>
            <span className="font-medium text-gray-800 capitalize">
              {admin.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
