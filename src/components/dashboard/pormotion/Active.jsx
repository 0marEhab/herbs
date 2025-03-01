import { useEffect, useState } from "react";
import axios from "axios";
import summaryApi from "@/common";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
const ActivePromotions = () => {
  const [productPromotions, setProductPromotions] = useState([]);
  const [categoryPromotions, setCategoryPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["accessToken"]);
  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(`${summaryApi.activePromotion.url}`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      const products = response.data.filter(
        (promo) => promo.type === "Product"
      );

      const categories = response.data.filter(
        (promo) => promo.type === "Category"
      );
      setProductPromotions(products);
      setCategoryPromotions(categories);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePromotion = async (type, id) => {
    const endpoint =
      type === "Product"
        ? `${summaryApi.deleteProductPormotion.url}${id}`
        : `${summaryApi.deleteCategoryPormotion.url}${id}`;
    try {
      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${cookies.accessToken}` },
      });

      if (type === "Product") {
        setProductPromotions((prevPromotions) =>
          prevPromotions.filter((promo) => promo.id !== id)
        );
      } else {
        setCategoryPromotions((prevPromotions) =>
          prevPromotions.filter((promo) => promo.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Active Promotions</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mt-4">Product Promotions</h2>
          {productPromotions.length === 0 ? (
            <p className="text-center">No active product promotions.</p>
          ) : (
            <ul className="grid grid-cols-1  gap-4">
              {productPromotions.map((promo) => (
                <motion.li
                  key={promo.id}
                  className="p-4 border rounded-lg w-full shadow-md bg-white flex flex-col justify-between items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div>
                    <p className="text-lg font-semibold">{promo.productName}</p>
                    <p className="text-sm text-gray-600">
                      Discount: {promo.discountPercentage}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Start: {new Date(promo.startDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      End: {new Date(promo.endDate).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deletePromotion("Product", promo.id)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </motion.li>
              ))}
            </ul>
          )}

          <h2 className="text-xl font-semibold mt-8">Category Promotions</h2>
          {categoryPromotions.length === 0 ? (
            <p className="text-center">No active category promotions.</p>
          ) : (
            <ul className="grid grid-cols-1  gap-4">
              {categoryPromotions.map((promo) => (
                <motion.li
                  key={promo.id}
                  className="p-4 border rounded-lg shadow-md bg-white flex flex-col justify-between items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div>
                    <p className="text-lg font-semibold">
                      {promo.categoryName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Discount: {promo.discountPercentage}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Start: {new Date(promo.startDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      End: {new Date(promo.endDate).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deletePromotion("Category", promo.id)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ActivePromotions;
