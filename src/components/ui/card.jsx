import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow p-4 flex flex-col h-full ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}
