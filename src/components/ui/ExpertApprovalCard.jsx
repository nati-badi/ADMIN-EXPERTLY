import React from "react";

const ExpertApprovalCard = ({ expert, onApprove, onReject }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          {expert.firstName} {expert.lastName}
        </h3>
        <p className="text-gray-600 text-sm mb-2">{expert.email}</p>

        <p className="text-sm text-gray-700 mb-1">
          <strong>Phone:</strong> {expert.phoneNumber}
        </p>

        <p className="text-sm font-medium text-gray-700">Documents:</p>
        <ul className="list-disc list-inside text-sm text-blue-600">
          {expert.documents?.length ? (
            expert.documents.map((doc, i) => (
              <li key={i}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {doc.name || `Document ${i + 1}`}
                </a>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No documents uploaded.</li>
          )}
        </ul>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => onApprove(expert._id)}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 cursor-pointer"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(expert._id)}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 cursor-pointer"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ExpertApprovalCard;
