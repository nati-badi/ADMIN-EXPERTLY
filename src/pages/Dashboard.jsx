import { Card, CardContent } from "../components/ui/card";
import { MessageSquare, AlertTriangle, CreditCard } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent className="flex items-center space-x-4 p-4">
          <MessageSquare className="text-green-600" />
          <div>
            <p className="font-semibold">Consultations</p>
            <p className="text-lg text-gray-700">234,345</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center space-x-4 p-4">
          <AlertTriangle className="text-green-600" />
          <div>
            <p className="font-semibold">Conflicts</p>
            <p className="text-lg text-gray-700">56</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center space-x-4 p-4">
          <CreditCard className="text-green-600" />
          <div>
            <p className="font-semibold">Payments</p>
            <p className="text-lg text-gray-700">$1,283</p>
          </div>
        </CardContent>
      </Card>

      <div className="col-span-3">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Earnings Status</h3>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              Earnings Graph Placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
