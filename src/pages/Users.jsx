import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  // State variables
  const [userType, setUserType] = useState("client"); // singular
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // const baseUrl = import.meta.env.BaseUrl;

  // console.log(baseUrl);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://expertly-zxb1.onrender.com/api/v1/${userType}`
      );

      console.log("Response:", response.data); // this time you will see JSON.

      const data = response.data;

      if (userType === "client") {
        setUsers(data.data.clients || []);
      } else if (userType === "expert") {
        setUsers(data.data.experts || []);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userType]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://expertly-zxb1.onrender.com/api/v1/${userType}/${id}`
      );
      fetchUsers(); // refresh list
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-4 md:space-y-0">
        <div className="flex space-x-4">
          <button
            onClick={() => setUserType("client")}
            className={`px-4 py-2 rounded-md ${
              userType === "client"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Clients
          </button>
          <button
            onClick={() => setUserType("expert")}
            className={`px-4 py-2 rounded-md ${
              userType === "expert"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Experts
          </button>
        </div>

        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow-md">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading users...</div>
        ) : (
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="p-4">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4 capitalize">{user.status || "N/A"}</td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No {userType}s found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
