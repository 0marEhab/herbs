import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import summaryApi from "@/common";
import { useCookies } from "react-cookie";
import AddressList from "./AddressList";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["accessToken"]);
  useEffect(() => {
    axios
      .get(summaryApi.user.url, {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
        },
      })
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  if (!user) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600">Loading...</p>
    );
  }

  return (
    <motion.div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Profile
      </h2>
      <div className="space-y-3">
        <p className="text-lg font-medium text-gray-700">
          Username: <span className="font-normal">{user.userName}</span>
        </p>
        <p className="text-lg font-medium text-gray-700">
          Email: <span className="font-normal">{user.email}</span>
        </p>
        <p className="text-lg font-medium text-gray-700">
          Phone: <span className="font-normal">{user.phone}</span>
        </p>
      </div>
      <motion.button
        className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg text-lg font-medium shadow-md hover:bg-green-900 transition"
        onClick={() => navigate("/orders")}
      >
        View Orders
      </motion.button>

      {/* Address List Component */}
      <AddressList />
    </motion.div>
  );
};

export default Profile;
