import React, { useState, useEffect } from "react";
import { Breadcrumb } from "../components/ui/breadcrumb";
import { Card } from "../components/ui/card";

const Preferences = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);

  // Load preferences
  useEffect(() => {
    const savedPrefs = JSON.parse(localStorage.getItem("expertly-preferences"));
    if (savedPrefs) {
      setDarkMode(savedPrefs.darkMode ?? false);
      setLanguage(savedPrefs.language ?? "en");
      setNotifications(savedPrefs.notifications ?? true);
    }
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem(
      "expertly-preferences",
      JSON.stringify({ darkMode, language, notifications })
    );
  }, [darkMode, language, notifications]);

  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
          { label: "Preferences", href: "/preferences" },
        ]}
      />

      <h2 className="text-2xl font-bold mt-4 mb-6">System Preferences</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">Dark Mode</h4>
              <p className="text-sm text-gray-500">Toggle system dark theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-200  rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white  after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">Notifications</h4>
              <p className="text-sm text-gray-500">Email & system alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-gray-200  rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white  after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="am">አማርኛ</option>
              <option value="or">አፋን ኦሮሞ</option>
            </select>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Preferences;
