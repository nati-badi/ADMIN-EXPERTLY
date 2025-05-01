import React, { useState } from "react";
import { Eye } from "lucide-react";

const ExpertApprovalCard = ({ expert, onApprove, onReject }) => {
  const documents = expert.cv ? [{ name: "CV", url: expert.cv }] : [];
  const [loadingAction, setLoadingAction] = useState(null); // "approve" | "decline"

  const handleClick = async (action) => {
    setLoadingAction(action);
    await (action === "approve" ? onApprove(expert._id) : onReject(expert._id));
    setLoadingAction(null);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col gap-4 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={expert.profilePicture || "/default-profile.png"}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {expert.firstName} {expert.lastName}
          </h3>
          <p className="text-sm text-gray-600">{expert.email}</p>
          <p className="text-sm text-gray-600">📞 {expert.phoneNumber}</p>
        </div>
      </div>

      {/* Documents */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-1">
          Uploaded Documents:
        </p>
        <ul className="space-y-2">
          {documents.length > 0 ? (
            documents.map((doc, i) => (
              <li
                key={i}
                className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded-md border"
              >
                <span className="text-gray-700">
                  {doc.name || `Document ${i + 1}`}
                </span>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </a>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">No documents uploaded.</li>
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={() => handleClick("decline")}
          disabled={loadingAction !== null}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {loadingAction === "decline" ? "Declining..." : "Decline"}
        </button>
        <button
          onClick={() => handleClick("approve")}
          disabled={loadingAction !== null}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loadingAction === "approve" ? "Approving..." : "Approve"}
        </button>
      </div>
    </div>
  );
};

export default ExpertApprovalCard;
