import React from "react";
import { Breadcrumb } from "../components/ui/breadcrumb";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
        ]}
      />

      <h2 className="text-2xl font-bold mt-4 mb-6">Settings</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
          <p className="text-sm text-gray-600">
            Update name, email, or password.
          </p>
          <button
            onClick={() => {
              navigate("/edit-profile");
            }}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
          >
            Edit Profile
          </button>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">System Preferences</h3>
          <p className="text-sm text-gray-600">
            Toggle dark mode, language, or notification preferences.
          </p>
          <button
            onClick={() => navigate("/preferences")}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
          >
            Adjust Preferences
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
