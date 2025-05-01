import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "../components/ui/breadcrumb";
import Spinner from "../components/ui/Spinner";
import { Card } from "../components/ui/card";

const Conflicts = () => {
  const [conflicts, setConflicts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConflicts = async () => {
      try {
        const res = await axios.get(
          "https://expertly-zxb1.onrender.com/api/v1/conflict"
        );
        setConflicts(res.data.data.conflicts || []);
      } catch (err) {
        console.error("Failed to fetch conflicts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConflicts();
  }, []);

  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Conflicts", href: "/conflicts" },
        ]}
      />
      <h2 className="text-2xl font-bold mt-4 mb-6">Consultation Conflicts</h2>

      {loading ? (
        <div className="flex justify-center p-6">
          <Spinner />
        </div>
      ) : conflicts.length === 0 ? (
        <p className="text-gray-500">No conflicts reported.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conflicts.map((c) => (
            <Card key={c._id}>
              <p className="text-sm text-gray-800">
                <strong>User:</strong> {c.user?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-800">
                <strong>Expert:</strong> {c.expert?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Reason:</strong> {c.reason || "No details provided"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {new Date(c.createdAt).toLocaleString()}
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

export default Conflicts;
