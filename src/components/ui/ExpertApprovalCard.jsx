import React, { useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ExpertApprovalCard = ({ expert, onApprove, onReject }) => {
  const [loadingAction, setLoadingAction] = useState(null);
  const { setAdmin } = useAuth();

  const handleAction = async (action) => {
    setLoadingAction(action);
    const updatedAdmin =
      action === "approve"
        ? await onApprove(expert._id)
        : await onReject(expert._id);
    if (updatedAdmin) {
      setAdmin(updatedAdmin);
      localStorage.setItem("admin", JSON.stringify(updatedAdmin));
    }
    setLoadingAction(null);
  };

  const documents = [];
  if (expert.cv) documents.push({ name: "CV", url: expert.cv });
  if (expert.license?.startsWith("http"))
    documents.push({ name: "License", url: expert.license });

  const statusStyle = {
    Approved: "bg-green-100 text-green-700",
    Declined: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={expert.profilePicture || "/user.png"}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {expert.firstName} {expert.lastName}
          </h3>
          <p className="text-sm text-gray-500">{expert.email}</p>
          <p className="text-sm text-gray-500">📞 {expert.phoneNumber}</p>
          <p className="text-sm text-gray-500">
            🧠 {expert.yearsOfExperience || 0} yrs experience
          </p>
          <span
            className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              statusStyle[expert.status] || statusStyle["Pending"]
            }`}
          >
            {expert.status}
          </span>
        </div>
      </div>

      {/* Documents Section */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Documents</p>
        <ul className="space-y-1">
          {documents.length > 0 ? (
            documents.map((doc, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-md border text-sm"
              >
                <span className="text-gray-700">{doc.name}</span>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  View
                </a>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-400">No documents uploaded.</li>
          )}
        </ul>
      </div>

      {/* Actions Section */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => handleAction("decline")}
          disabled={loadingAction !== null}
          className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm disabled:opacity-50"
        >
          <XCircle className="w-4 h-4" />
          {loadingAction === "decline" ? "Declining..." : "Decline"}
        </button>
        <button
          onClick={() => handleAction("approve")}
          disabled={loadingAction !== null}
          className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm disabled:opacity-50"
        >
          <CheckCircle className="w-4 h-4" />
          {loadingAction === "approve" ? "Approving..." : "Approve"}
        </button>
      </div>
    </div>
  );
};

export default ExpertApprovalCard;
