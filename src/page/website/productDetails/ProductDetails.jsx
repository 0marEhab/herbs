import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductDetail from "@/components/website/productDetails/ProductDetail";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Review from "@/components/website/productDetails/Review";
import axios from "axios";
import summaryApi from "@/common";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

export default function ProductDetails() {
  const [cookies] = useCookies(["accessToken"]);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const { i18n } = useTranslation();
  const language = i18n.language;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(summaryApi.getProduct.url + id, {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        });
        if (!response.data || response.data.variants.length === 0) {
          setError(true);
        } else {
          setProduct(response.data);
        }
      } catch (error) {
        setError(true);
      }
    };
    fetchProduct();
  }, [id, cookies.accessToken]);

  if (error) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-screen text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold font-body text-gray-900">
          No Product Found
        </h1>
        <p className="text-xl text-gray-600 mt-2">
          Sorry, we couldn't find a product with this name.
        </p>
        <motion.button
          className="mt-5 px-6 py-2 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-green-900"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
        >
          Go Back
        </motion.button>
      </motion.div>
    );
  }

  if (!product) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <>
      <ProductDetail product={product} language={language} />
      <div className="max-w-6xl mt-10 text-xl font-body mx-auto p-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Product description</AccordionTrigger>
            <AccordionContent>
              {language === "en"
                ? product.englishDescription
                : product.arabicDescription}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Highlight</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
              incidunt quidem nesciunt quisquam reprehenderit nostrum quasi
              ipsam saepe.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Reviews</AccordionTrigger>
            <AccordionContent>
              <Review />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
