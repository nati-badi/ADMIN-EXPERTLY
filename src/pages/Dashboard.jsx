import React from "react";
import { Card, CardContent } from "../components/ui/card";
import {
  MessageSquare,
  AlertTriangle,
  CreditCard,
  Bell,
  Calendar,
  DollarSign,
  UserX,
  LayoutDashboard,
  MessageCircle,
  Users,
  ShieldAlert,
  BarChart2,
  Settings,
  LogOut,
  Briefcase,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <img
          src="/expertly.jpg"
          alt="Expertly Logo"
          className="w-full h-20 mb-8 object-contain"
        />
        <nav className="space-y-4 text-lg font-medium text-gray-700 pl-2">
          <button className="flex items-center space-x-3 hover:text-green-600">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-3 hover:text-green-600">
            <MessageCircle className="w-5 h-5" />
            <span>Consultations</span>
          </button>
          <button className="flex items-center space-x-3 hover:text-green-600">
            <Briefcase className="w-5 h-5" />
            <span>Professionals</span>
          </button>
          <button className="flex items-center space-x-3 hover:text-green-600">
            <Users className="w-5 h-5" />
            <span>Users</span>
          </button>
          <button className="flex items-center space-x-3 hover:text-green-600">
            <DollarSign className="w-5 h-5" />
            <span>Payments</span>
          </button>
          <button className="flex items-center space-x-3 hover:text-green-600">
            <ShieldAlert className="w-5 h-5" />
            <span>Conflicts</span>
          </button>
          <button className="flex items-center space-x-3 hover:text-green-600">
            <BarChart2 className="w-5 h-5" />
            <span>Analytics</span>
          </button>
          <button className="flex items-center space-x-3 hover:text-green-600">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className="flex items-center space-x-3 hover:text-green-600">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </button>
          <button className="flex items-center space-x-3 text-red-500 hover:text-red-700">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              Hi, <span className="text-green-600">Mr. Admin</span>
            </h2>
            <p className="text-sm text-gray-500">Good Evening</p>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src="/perfect.png"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>Mr. Admin</span>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center space-x-4 p-4">
              <MessageSquare className="text-green-600" />
              <div>
                <p className="font-semibold">Consultations</p>
                <p className="text-lg text-gray-700">234,345</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-4 p-4">
              <AlertTriangle className="text-green-600" />
              <div>
                <p className="font-semibold">Conflicts</p>
                <p className="text-lg text-gray-700">56</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-4 p-4">
              <CreditCard className="text-green-600" />
              <div>
                <p className="font-semibold">Payments</p>
                <p className="text-lg text-gray-700">$1,283</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Graph Placeholder */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Earnings Status</h3>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400"></div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
