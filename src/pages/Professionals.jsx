import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb } from "../components/ui/breadcrumb";
import Spinner from "../components/ui/Spinner";
import ExpertApprovalCard from "../components/ui/ExpertApprovalCard";

const Professionals = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get(
          "https://expertly-zxb1.onrender.com/api/v1/expert?status=pending"
        );
        setExperts(response.data.data.experts || []);
      } catch (error) {
        console.error("Failed to fetch expert requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  const handleApproval = async (id, approve = true) => {
    try {
      // You’ll later replace this with your actual approve/reject logic
      console.log(approve ? "Approving" : "Rejecting", id);
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Professionals", href: "/professionals" },
        ]}
      />

      <h2 className="text-2xl font-bold mt-4 mb-6 text-gray-700">
        Expert Approval Requests
      </h2>

      {loading ? (
        <div className="flex justify-center p-6">
          <Spinner />
        </div>
      ) : (
        <div className="h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
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
  );
};

export default Professionals;
