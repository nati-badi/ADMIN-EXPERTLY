import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "../components/ui/breadcrumb";
import Spinner from "../components/ui/Spinner";
import { Card } from "../components/ui/card";

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const res = await axios.get(
          "https://expertly-zxb1.onrender.com/api/v1/consultation"
        );
        setConsultations(res.data.data.consultations || []);
      } catch (err) {
        console.error("Failed to fetch consultations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Consultations", href: "/consultations" },
        ]}
      />
      <h2 className="text-2xl font-bold mt-4 mb-6">Consultation Records</h2>

      {loading ? (
        <div className="flex justify-center p-6">
          <Spinner />
        </div>
      ) : consultations.length === 0 ? (
        <p className="text-gray-500">No consultations found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {consultations.map((c) => (
            <Card key={c._id}>
              <p className="text-sm text-gray-800">
                <strong>User:</strong> {c.user?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-800">
                <strong>Expert:</strong> {c.expert?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Scheduled At:</strong>{" "}
                {new Date(c.scheduledAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong>{" "}
                <span className="capitalize">{c.status}</span>
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Consultations;
