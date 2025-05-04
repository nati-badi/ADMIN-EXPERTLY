import React from "react";
import classNames from "classnames";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={classNames(
        "border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
        className
      )}
      {...props}
    />
  );
};

export default Input;
