import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import UserContext from "@/Contexts/UserContext";
import { useCookies } from "react-cookie";
import summaryApi from "@/common";
const Orders = () => {
  const { user } = useContext(UserContext);

  const [cookies] = useCookies(["accessToken"]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${summaryApi.getOrder.url}${user.id}`, {
          headers: { Authorization: `Bearer ${cookies.accessToken}` },
        });
        console.log(res.data);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrder();
  }, [user]);
  if (orders.length === 0) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        No orders found.
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        My Orders
      </h2>
      <div className="space-y-6">
        {orders?.map((order) => (
          <motion.div
            key={order?.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 border rounded-lg shadow-md bg-gray-50"
          >
            <p className="text-lg font-medium text-gray-700">
              Order ID: <span className="font-normal">{order?.id}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">Products:</p>
            <ul className="list-disc list-inside text-gray-600">
              {order?.items.map((product, index) => (
                <div key={index}>
                  <li>
                    {product.productName} {product.productItemName}
                  </li>
                  <span className="ml-4">Quantity: {product.quantity}</span>
                </div>
              ))}
            </ul>
            <p className="text-lg font-medium text-gray-700">
              Total: <span className="font-normal">${order?.totalPrice}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Status:{" "}
              <span className="font-normal text-blue-600">{order?.status}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Order Date:{" "}
              <span className="font-normal">
                {new Date(order?.createdAt).toLocaleDateString()}
              </span>
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Orders;
