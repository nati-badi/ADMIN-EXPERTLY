import React, { useState } from "react";
import { Breadcrumb } from "../components/ui/breadcrumb";
import { Card } from "../components/ui/card";

const dummyNotifications = [
  { id: 1, type: "System", message: "New user registered", time: "2h ago" },
  {
    id: 2,
    type: "Consultation",
    message: "New consultation scheduled",
    time: "1d ago",
  },
  { id: 3, type: "Payment", message: "Payment completed", time: "3d ago" },
  {
    id: 4,
    type: "System",
    message: "Server backup successful",
    time: "4d ago",
  },
];

const Notification = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [filter, setFilter] = useState("All");

  const filteredNotifications =
    filter === "All"
      ? dummyNotifications
      : dummyNotifications.filter((n) => n.type === filter);

  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
          { label: "Notification", href: "/notification" },
        ]}
      />

      <h2 className="text-2xl font-bold mt-4 mb-6">Notification Settings</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Get alerts via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={emailNotif}
                onChange={() => setEmailNotif(!emailNotif)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">Push Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Receive real-time alerts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={pushNotif}
                onChange={() => setPushNotif(!pushNotif)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>
        </Card>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recent Notifications</h3>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm dark:bg-background dark:border-gray-700"
          >
            <option value="All">All</option>
            <option value="System">System</option>
            <option value="Consultation">Consultation</option>
            <option value="Payment">Payment</option>
          </select>
        </div>

        <div className="bg-card border rounded-md divide-y">
          {filteredNotifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              No notifications found.
            </p>
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n.id}
                className="group flex items-center justify-between px-4 py-3 hover:bg-muted transition-all"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                  />
                  <div>
                    <p className="font-medium text-sm">{n.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {n.type} · {n.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm disabled:opacity-50">
                    Archive
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm disabled:opacity-50">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
