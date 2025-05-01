import React, { useEffect, useState } from "react";
import ExpertApprovalCard from "./ExpertApprovalCard";
import axios from "axios";

const PendingExperts = () => {
  const [experts, setExperts] = useState([]);

  const fetchExperts = async () => {
    try {
      const response = await axios.get(
        "https://expertly-zxb1.onrender.com/api/v1/expert?status=Pending"
      );
      const rawExperts = response.data.data.experts;

      const formatted = rawExperts.map((expert) => ({
        ...expert,
        documents: expert.cv ? [{ name: "CV", url: expert.cv }] : [],
      }));

      setExperts(formatted);
    } catch (error) {
      console.error("Failed to fetch experts:", error);
    }
  };
  useEffect(() => {
    fetchExperts();
  }, []);

  const updateExpertStatus = async (id, status) => {
    try {
      const response = await axios.patch(
        `https://expertly-zxb1.onrender.com/api/v1/expert/ChangeStatus/${id}`,
        { status }
      );

      if (response.data.status === "success") {
        await fetchExperts(); // 👈 refresh full list
      } else {
        console.warn("Unexpected response from server:", response.data);
      }
    } catch (error) {
      console.error(
        `Failed to update status to ${status}:`,
        error.response?.data || error.message
      );
    }
  };

  const handleApprove = (id) => updateExpertStatus(id, "Approved");
  const handleReject = (id) => updateExpertStatus(id, "Declined");

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {experts.map((expert) => (
        <ExpertApprovalCard
          key={expert._id}
          expert={expert}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ))}
    </div>
  );
};

export default PendingExperts;
