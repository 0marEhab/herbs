import UserContext from "@/Contexts/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["accessToken"]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookies.accessToken;

    if (!token) {
      navigate("/login");
      return;
    }

    if (user != undefined) {
      if (user?.role !== "Admin" && user?.role !== "Employee") {
        navigate("/");
      } else {
        setLoading(false);
      }
    }
  }, [navigate, user, cookies.accessToken]);

  if (loading || user === undefined) {
    return <p style={{ color: "#000" }}>Loading...</p>;
  }

  return <Outlet />;
}
