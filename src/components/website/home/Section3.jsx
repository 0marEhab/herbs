import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "../Product/ProductCard";
import ProductCardSkeleton from "../Product/ProductCardSkeleton"; // Import the skeleton component
import { useTranslation } from "react-i18next";
import { useDirection } from "@/hooks/useDirection"; // Assuming you have a hook to get the direction
import summaryApi from "@/common";

export default function Section3() {
  const { t } = useTranslation();
  const dir = useDirection();

  // State to store products
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams({
        pageNumber: 1,
        pageSize: 8,
      }).toString();
      const url = `${summaryApi.getBestSellerProduct.url}?${queryParams}`;

      const response = await fetch(url);
      const data = await response.json();

      setProducts(data.items || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className="mt-10 flex flex-col items-center justify-center gap-5 font-body"
      dir={dir}
    >
      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-bold text-3xl"
      >
        {t("section3.title")}
      </motion.p>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-gray-600 text-xl"
      >
        {t("section3.subtitle")}
      </motion.p>

      {/* Product Cards or "Coming Soon" Message */}
      <motion.div
        className="flex justify-center items-start gap-4 flex-col lg:flex-row flex-wrap lg:w-[1300px]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {isLoading ? (
          // Show loading skeletons
          Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              <ProductCardSkeleton />
            </motion.div>
          ))
        ) : products.length < 8 ? (
          // Show "Coming Soon" if there are not enough products
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl text-gray-500 font-medium"
          >
            {t("section3.comingSoon") || "Coming Soon"}
          </motion.p>
        ) : (
          // Render products if there are at least 8
          products.map((product, index) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
