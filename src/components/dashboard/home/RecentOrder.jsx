import { useDirection } from "@/hooks/useDirection";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomTable from "../../ui/CustomTable";
import { useCookies } from "react-cookie";
import UserContext from "@/Contexts/UserContext";
import axios from "axios";
import summaryApi from "@/common";

export default function RecentOrder() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const dir = useDirection();

  const { user } = useContext(UserContext);
  const [cookies] = useCookies(["accessToken"]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${summaryApi.getAllOrder.url}`, {
          headers: { Authorization: `Bearer ${cookies.accessToken}` },
        });

        // Sort orders by createdAt (latest first) and take the last 3
        const sortedOrders = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        setOrders(sortedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrder();
  }, [user]);

  const headers = [
    { label: { en: "Name", ar: "الاسم" }, key: "name" },
    { label: { en: "Phone", ar: "الهاتف" }, key: "phone" },
    { label: { en: "Total Price", ar: "السعر الإجمالي" }, key: "totalPrice" },
    { label: { en: "Order Date", ar: "تاريخ الطلب" }, key: "orderDate" },
    { label: { en: "Status", ar: "الحالة" }, key: "status" },
  ];

  const data = orders.map((order) => ({
    id: order.id,
    name: order.userName,
    phone: order.userPhoneNumber,
    totalPrice: `$${order.totalPrice}`,
    orderDate: new Date(order.createdAt).toLocaleString(
      language === "ar" ? "ar-EG" : "en-US"
    ),
    status: order.status,
  }));

  return (
    <div className="bg-white shadow rounded" dir={dir}>
      <div className="overflow-x-auto">
        <CustomTable headers={headers} data={data} language={language} />
      </div>
    </div>
  );
}
