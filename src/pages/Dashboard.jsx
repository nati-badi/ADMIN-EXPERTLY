import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import { MessageSquare, AlertTriangle, CreditCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { isSignedIn } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    consultations: null,
    conflicts: null,
    payments: null,
    earnings: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("/api/admin/dashboard");
        setDashboardData(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    if (isSignedIn) {
      fetchDashboardData();
    }
  }, [isSignedIn]);

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent className="flex items-center space-x-4 p-4">
          <MessageSquare className="text-green-600" />
          <div>
            <p className="font-semibold">Consultations</p>
            <p className="text-lg text-gray-700">
              {isSignedIn ? dashboardData.consultations ?? "Loading..." : "0"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center space-x-4 p-4">
          <AlertTriangle className="text-green-600" />
          <div>
            <p className="font-semibold">Conflicts</p>
            <p className="text-lg text-gray-700">
              {isSignedIn ? dashboardData.conflicts ?? "Loading..." : "0"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center space-x-4 p-4">
          <CreditCard className="text-green-600" />
          <div>
            <p className="font-semibold">Payments</p>
            <p className="text-lg text-gray-700">
              {isSignedIn ? `${dashboardData.payments ?? "Loading..."}` : "0"}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="col-span-3">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Earnings Status</h3>
            {isSignedIn ? (
              dashboardData.earnings ? (
                <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                  Earnings Graph Placeholder
                </div>
              ) : (
                <p>Loading earnings...</p>
              )
            ) : (
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                <p>Please sign in to view earnings graph.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
