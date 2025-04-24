import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Page Content */}
        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
