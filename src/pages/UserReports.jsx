import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../components/ui/input";
import Button from "../components/ui/Button";
import { Trash2 } from "lucide-react";
import Spinner from "../components/ui/Spinner";

export default function UserReport() {
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("admin"))?.token;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "https://expertly-zxb1.onrender.com/api/v1/report",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const responseData = response.data; // The entire response object
        const reportsArray = responseData?.data?.reports || []; // Access the reports array safely

        setReports(reportsArray);
        setFiltered(reportsArray);
      } catch (err) {
        console.error("Failed to fetch reports", err);
        setReports([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await axios.delete(
        `https://expertly-zxb1.onrender.com/api/v1/report/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReports((prev) => prev.filter((r) => r._id !== id));
      setFiltered((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFiltered(
      reports.filter(
        (r) =>
          r.reason.toLowerCase().includes(value) ||
          r.reportedBy?.name?.toLowerCase().includes(value) ||
          r.reportedPerson?.name?.toLowerCase().includes(value)
      )
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        {" "}
        {/* Added items-center and h-full */}
        <div className="flex justify-center p-6">
          <Spinner />
        </div>
      </div>
    );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Reports</h2>
        <Input
          placeholder="Search reports..."
          value={search}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-600">No reports found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((report) => (
            <div
              key={report._id}
              className="border p-4 rounded-lg shadow-sm flex justify-between items-start"
            >
              <div>
                <p>
                  <strong>Reason:</strong> {report.reason}
                </p>
                <p>
                  <strong>Reported By:</strong> {report.reportedBy?.name}
                </p>
                <p>
                  <strong>Reported Person:</strong>{" "}
                  {report.reportedPerson?.name}
                </p>
                <p>
                  <strong>Description:</strong> {report.description || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDelete(report._id)}
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
