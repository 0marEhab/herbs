import React from "react";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
export default function CategoryHeader({ language }) {
  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-md rounded-2xl w-full">
      <h2 className="text-xl font-semibold">
        {language === "ar" ? "إضافة صنف جديد" : "Add New Category"}
      </h2>
      <Link to={"/dashboard/addCategory"}>
        <Button className=" text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          + {language === "ar" ? "إضافة صنف" : "Add Category"}
        </Button>
      </Link>
    </div>
  );
}
