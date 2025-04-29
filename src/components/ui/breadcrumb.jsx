import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const Breadcrumb = ({ items }) => {
  return (
    <nav className="text-sm text-gray-500 flex items-center space-x-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight size={16} />}
          <Link to={item.href} className="hover:underline text-gray-700">
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};
