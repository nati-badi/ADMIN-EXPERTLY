import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/ui/Spinner";

const UserDetail = () => {
  const { userType, id } = useParams();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://expertly-zxb1.onrender.com/api/v1/${userType}/${id}`
        );
        const data =
          userType === "client" ? res.data.data.client : res.data.data.expert;
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "https://expertly-zxb1.onrender.com/api/v1/appointment"
        );
        const allAppointments = res.data.data.appointments;

        // Filter based on user role
        const filtered = allAppointments.filter((appt) =>
          userType === "client" ? appt.client === id : appt.expert === id
        );

        setAppointments(filtered);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchAppointments();
  }, [userType, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-600 mt-8">
        User not found or failed to load.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
      >
        ← Back
      </button>

      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user.profilePicture || "/user.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-green-600 capitalize font-semibold">
              {user.status || "N/A"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Phone Number</p>
            <p className="text-gray-800 font-medium">
              {user.phoneNumber || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Role</p>
            <p className="text-gray-800 font-medium capitalize">{userType}</p>
          </div>
          {userType === "expert" && (
            <>
              <div>
                <p className="text-gray-500">Title</p>
                <p className="text-gray-800 font-medium">
                  {user.title || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Specialization</p>
                <p className="text-gray-800 font-medium">
                  {user.specialization || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Category</p>
                <p className="text-gray-800 font-medium">
                  {user.category?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">CV</p>
                <a
                  href={user.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View CV
                </a>
              </div>
              <div>
                <p className="text-gray-500">License</p>
                <a
                  href={user.license}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View License
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Appointments Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Appointments
        </h3>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Date
                  </th>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Time Slot
                  </th>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Status
                  </th>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Payment
                  </th>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt._id} className="border-t">
                    <td className="p-3">
                      {new Date(appt.appointmentDate).toLocaleDateString()}
                    </td>
                    <td className="p-3">{appt.selectedTimeSlot}</td>
                    <td className="p-3 capitalize">{appt.status}</td>
                    <td className="p-3">{appt.paymentStatus}</td>
                    <td className="p-3">${appt.amountToPay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
