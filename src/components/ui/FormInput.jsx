import React from "react";

export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = true,
}) {
  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-[#2B3674] font-Vazirmatn font-bold">{label}</p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
    </div>
  );
}
