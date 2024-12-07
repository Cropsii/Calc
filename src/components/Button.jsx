import React from "react";

export default function Button({ num, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        num !== 0
          ? `bg-[#2a2a2c] text-2xl rounded-full text-center aspect-square ${className}`
          : `bg-[#2a2a2c] text-2xl  rounded-full text-center  ${className}`
      }
    >
      {num}
    </button>
  );
}