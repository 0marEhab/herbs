import React, { useContext, useEffect, useState } from "react";
import RecentOrder from "../../../components/dashboard/home/RecentOrder";
import Welcome from "../../../components/dashboard/home/Welcome";
import TableHeader from "../../../components/dashboard/home/TableHeader";
import Card from "@/components/dashboard/home/Card";
import { useTranslation } from "react-i18next";
import summaryApi from "@/common";
import { useCookies } from "react-cookie";
import axios from "axios";
import UserContext from "@/Contexts/UserContext";

export default function Home() {
  const { user } = useContext(UserContext);
  const [cookies] = useCookies(["accessToken"]);
  const [statistics, setStatistics] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(summaryApi.statistics.url, {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        });
        console.log(response.data);
        setStatistics(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const { t } = useTranslation();
  console.log(statistics);

  return (
    <div className="overflow-hidden font-body w-full flex flex-col gap-10">
      {/* Welcome Section */}
      <Welcome />

      {/* Cards Section */}
      <div className="bg-gray-50 p-6 flex lg:flex-row flex-col gap-10 items-center justify-center">
        <Card
          Title={t("dashboardHome.totalHerbs")}
          number={statistics?.totalProducts}
          color={"text-green-800"}
        />
        <Card
          Title={t("dashboardHome.totalUsers")}
          number={statistics?.totalUsers}
          color={"text-blue-600"}
        />
        <Card
          Title={t("dashboardHome.totalOrders")}
          number={statistics?.totalOrders}
          color={"text-orange-500"}
        />
        {user?.role == "Admin" && (
          <Card
            Title={t("dashboardHome.totalRevenue")}
            number={statistics?.totalRevenue}
            color={"text-green-600"}
          />
        )}
      </div>

      {/* Recent Orders Section */}
      <div className="m-4">
        <div className="bg-gray-50 p-6">
          <TableHeader />
          <RecentOrder />
        </div>
      </div>
    </div>
  );
}
