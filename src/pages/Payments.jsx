import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "../components/ui/breadcrumb";
import Spinner from "../components/ui/Spinner";
import { Card } from "../components/ui/card";
import Input from "../components/ui/input";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsRes, clientsRes, expertsRes] = await Promise.all([
          axios.get("https://expertly-zxb1.onrender.com/api/v1/payment"),
          axios.get("https://expertly-zxb1.onrender.com/api/v1/client"),
          axios.get("https://expertly-zxb1.onrender.com/api/v1/expert"),
        ]);

        setPayments(paymentsRes.data.data || []);
        console.log("Payment", paymentsRes.data.data);
        setClients(clientsRes.data.data?.clients || []);
        console.log("Client", clientsRes.data.data?.clients);
        setExperts(expertsRes.data.data?.experts || []);
        console.log("Expert", expertsRes.data.data?.experts);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserDetails = (userId, userType) => {
    const list = userType === "client" ? clients : experts;
    return list.find((user) => user._id === userId);
  };

  const filteredPayments = payments.filter((p) => {
    const client = getUserDetails(p.client, "client");
    const expert = getUserDetails(p.expert, "expert");

    const clientName = `${client?.firstName || ""} ${
      client?.lastName || ""
    }`.toLowerCase();
    const expertName = `${expert?.firstName || ""} ${
      expert?.lastName || ""
    }`.toLowerCase();
    console.log(expertName);
    const reference = p.paymentReference?.toLowerCase() || "";

    return (
      clientName.includes(searchTerm.toLowerCase()) ||
      expertName.includes(searchTerm.toLowerCase()) ||
      reference.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Payments", href: "/payments" },
        ]}
      />
      <div className="flex justify-between items-center mt-4 mb-6">
        <h2 className="text-2xl font-bold">Payment Records</h2>
        <Input
          type="text"
          placeholder="Search by client, reference, or status"
          className="w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center p-6">
          <Spinner />
        </div>
      ) : filteredPayments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPayments.map((p) => {
            const client = getUserDetails(p.client, "client");
            const expert = getUserDetails(p.expert, "expert");

            return (
              <Card
                key={p._id}
                className="p-4 shadow hover:shadow-lg transition"
              >
                <div className="mb-2 text-sm text-gray-500">
                  Payment ID: {p._id.slice(-6)}
                </div>

                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src={client?.profilePicture || "/user.png"}
                    alt="Client"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {client
                        ? `${client.firstName} ${client.lastName}`
                        : "Unknown"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={expert?.profilePicture || "/user.png"}
                    alt="Expert"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {expert
                        ? `${expert.firstName} ${expert.lastName}`
                        : "Unknown"}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-800 mb-1">
                  💳 <strong>Amount:</strong> ${p.amountPaid}
                </p>
                <p className="text-sm text-gray-800 mb-1">
                  📅 <strong>Date:</strong>{" "}
                  {new Date(p.paymentDate || p.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-800 mb-2">
                  🔖 <strong>Reference:</strong>{" "}
                  <span className="text-gray-600">{p.paymentReference}</span>
                </p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    p.paymentStatus === "success"
                      ? "bg-green-100 text-green-700"
                      : p.paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {p.paymentStatus}
                </span>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Payments;
