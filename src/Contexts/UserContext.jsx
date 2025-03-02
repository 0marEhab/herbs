import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import summaryApi from "../common";
import { useCookies } from "react-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [cookies, setCookies] = useCookies(["accessToken", "user"]);

  const clearUserData = () => {
    setCookies("user", undefined, { path: "/" });
    setCookies("accessToken", undefined, { path: "/" });
    setUser(null);
    setAccessToken(null);
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(summaryApi.user.url, {
        headers: { Authorization: `Bearer ${cookies.accessToken}` },
      });
      setUser(res.data);
    } catch (error) {
      console.log("you no longer have access");
      clearUserData();
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = cookies.accessToken;
      const storedUser = cookies.user;

      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setUser(storedUser);
        fetchUser(storedToken);
      } else {
        console.log("redirecting to login");
        setUser(null);
        setCookies(null);
      }
    };
    initAuth();
  }, [cookies.accessToken]);

  return (
    <UserContext.Provider value={{ user, setUser, accessToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
