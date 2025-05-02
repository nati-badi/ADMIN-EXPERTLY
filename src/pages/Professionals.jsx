import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb } from "../components/ui/breadcrumb";
import Spinner from "../components/ui/Spinner";
import ExpertApprovalCard from "../components/ui/ExpertApprovalCard";

const Professionals = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await axios.get(
        "https://expertly-zxb1.onrender.com/api/v1/expert"
      );
      setExperts(response.data.data.experts || []);
    } catch (error) {
      console.error("Failed to fetch expert requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredExperts = experts.filter((expert) =>
    statusFilter === "All" ? true : expert.status === statusFilter
  );

  const handleApproval = async (id, approve = true) => {
    try {
      const response = await axios.patch(
        `https://expertly-zxb1.onrender.com/api/v1/expert/ChangeStatus/${id}`,
        {
          status: approve ? "Approved" : "Declined",
        }
      );

      console.log("Response:", response.data);
      fetchExperts();
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      <div className="p-6 h-full flex flex-col">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Professionals", href: "/professionals" },
          ]}
        />

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mt-4 mb-6 text-gray-700">
            Expert Approval Requests
          </h2>

          <select
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center p-6">
            <Spinner />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2">
            {" "}
            {/* Added max-h and overflow-y-auto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredExperts.map((expert) => (
                <ExpertApprovalCard
                  key={expert._id}
                  expert={expert}
                  onApprove={(id) => handleApproval(id, true)}
                  onReject={(id) => handleApproval(id, false)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Professionals;
