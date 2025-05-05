import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import { MessageSquare, AlertTriangle, CreditCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Spinner from "../components/ui/Spinner";

export default function Dashboard() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/signin");
    }
  }, [isSignedIn, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, paymentsRes] = await Promise.all([
          axios.get("https://expertly-zxb1.onrender.com/api/v1/appointment"),
          axios.get("https://expertly-zxb1.onrender.com/api/v1/payment"),
        ]);

        setAppointments(appointmentsRes.data.data.appointments || []);
        setPayments(paymentsRes.data.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    if (isSignedIn) {
      fetchData();
    }
  }, [isSignedIn]);

  // Calculations
  const activeAppointments = appointments.length;
  const totalPayments = payments.length;
  const totalEarnings = payments.reduce(
    (sum, p) => sum + (p.amountPaid || 0),
    0
  );

  // Prepare data for earnings chart
  const earningsChartData = payments.map((p) => ({
    date: new Date(p.paymentDate).toLocaleDateString(),
    earnings: p.amountPaid,
  }));

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="flex items-center space-x-4 p-4">
                <MessageSquare className="text-green-600" />
                <div>
                  <p className="font-semibold">Appointments</p>
                  <p className="text-lg text-gray-700">{activeAppointments}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center space-x-4 p-4">
                <CreditCard className="text-green-600" />
                <div>
                  <p className="font-semibold">Payments</p>
                  <p className="text-lg text-gray-700">{totalPayments}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center space-x-4 p-4">
                <AlertTriangle className="text-green-600" />
                <div>
                  <p className="font-semibold">Total Earnings</p>
                  <p className="text-lg text-gray-700">${totalEarnings}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Earnings Over Time</h3>
            {earningsChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earningsChartData}>
                  <CartesianGrid stroke="#e5e7eb" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">No earnings data available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
