import React from "react";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component

export default function HerbsSearch({ searchQuery, handleSearch, language }) {
  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
      <Input
        type="text"
        placeholder={
          language === "ar" ? "ابحث عن عشبة..." : "Search for a herb..."
        }
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
      />
    </div>
  );
}
