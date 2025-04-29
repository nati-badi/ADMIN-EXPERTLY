import React from "react";

const Spinner = ({ size = 8, color = "green-600" }) => {
  return (
    <div
      className={`w-${size} h-${size} border-4 border-${color} border-t-transparent rounded-full animate-spin`}
    ></div>
  );
};

export default Spinner;
