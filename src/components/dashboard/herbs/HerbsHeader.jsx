import React from "react";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

export default function HerbsHeader({
  language,
}) {
  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-md rounded-2xl">
      <h2 className="text-xl font-semibold">
        {language === "ar" ? "إضافة عشبة جديدة" : "Add New Herb"}
      </h2>
      <Link to={"/dashboard/AddProduct"}>
        <Button>Add New</Button>
      </Link>

    </div>
  );
}
