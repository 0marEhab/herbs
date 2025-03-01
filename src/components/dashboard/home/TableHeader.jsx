import React from "react";

import { useTranslation } from "react-i18next";

import { useDirection } from "@/hooks/useDirection";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
export default function TableHeader() {
  const { t } = useTranslation(); // Initialize useTranslation
  const dir = useDirection();

  return (
    <header className="mb-6 flex justify-between items-center" dir={dir}>
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-semibold">{t("recentOrders")}</h1>
      </div>
      <div className="md:space-x-4 flex flex-col md:flex-row justify-center items-center">
        <Link to="/dashboard/orders">
          <Button>{t("show")}</Button>
        </Link>
      </div>
    </header>
  );
}
