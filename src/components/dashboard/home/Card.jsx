import React from "react";
import { Sprout } from "lucide-react";

export default function Card({ Title, number, icon, color }) {
  return (
    <div className="p-6 bg-white hover:shadow-lg duration-300 shadow-md rounded-2xl w-64 flex flex-col items-center gap-4 border border-gray-200">
      {/* Title & Icon Section */}
      <div className="flex items-center gap-3">
        <p className={`font-body font-semibold text-xl text-gray-800 ${color}`}>
          {Title}
        </p>
        <Sprout className={`size-7 ${color}`} />
      </div>

      {/* Number Section */}
      <p className={`font-bold text-4xl  ${color}`}>{number}</p>
    </div>
  );
}
