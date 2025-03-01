import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import UserContext from "@/Contexts/UserContext";
import { useCookies } from "react-cookie";
import summaryApi from "@/common";

export default function Orders() {
  const { user } = useContext(UserContext);
  const [cookies] = useCookies(["accessToken"]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${summaryApi.getAllOrder.url}`, {
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

  const updateOrderStatus = async (orderID, newStatus) => {
    try {
      await axios.put(
        `${summaryApi.changeStatus.url}?orderId=${orderID}&newStatus=${newStatus}`,
        {}, // Empty request body
        {
          headers: { Authorization: `Bearer ${cookies.accessToken}` },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderID ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Admin Orders
      </h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 border rounded-lg shadow-md bg-gray-50"
          >
            <p className="text-lg font-medium text-gray-700">
              Order ID: <span className="font-normal">{order.id}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Phone Number:{" "}
              <span className="font-normal">{order?.userPhoneNumber}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">Products:</p>
            <ul className="list-disc list-inside text-gray-600">
              {order.items.map((product, index) => (
                <div key={index}>
                  <li>
                    {product.productName} {product.productItemName}
                  </li>
                  <p className="ml-10">Quantity: {product.quantity}</p>
                </div>
              ))}
            </ul>
            <p className="text-lg font-medium text-gray-700">
              Order Date:{" "}
              <span className="font-normal">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Shipping Address:{" "}
              <span className="font-normal">{order.shipping_Address}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Total: <span className="font-normal">${order.totalPrice}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              User: <span className="font-normal">{order.userName}</span>
            </p>

            <p className="text-lg font-medium text-gray-700">
              Status:{" "}
              <span
                className={
                  order.status === "Pending"
                    ? "text-red-600"
                    : order.status === "Confirmed"
                    ? "text-green-600"
                    : "text-gray-600"
                }
              >
                {order.status}
              </span>
            </p>

            {order.status === "Pending" && (
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => updateOrderStatus(order.id, "Delivered")}
                  className="px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
                >
                  Confirm Order
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, "Canceled")}
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
                >
                  Decline Order
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
