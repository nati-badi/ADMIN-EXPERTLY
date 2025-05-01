import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "../components/ui/breadcrumb";
import Spinner from "../components/ui/Spinner";
import { Card } from "../components/ui/card";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          "https://expertly-zxb1.onrender.com/api/v1/payment"
        );
        setPayments(res.data.data.payments || []);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Payments", href: "/payments" },
        ]}
      />
      <h2 className="text-2xl font-bold mt-4 mb-6">Payment Records</h2>

      {loading ? (
        <div className="flex justify-center p-6">
          <Spinner />
        </div>
      ) : payments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((p) => (
            <Card key={p._id}>
              <p className="text-sm text-gray-800">
                <strong>User:</strong> {p.user?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-800">
                <strong>Expert:</strong> {p.expert?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Amount:</strong> ${p.amount}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {new Date(p.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong>{" "}
                <span className="capitalize">{p.status}</span>
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payments;
