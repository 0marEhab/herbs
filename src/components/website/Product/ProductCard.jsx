// src/components/ProductCard.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import UserContext from "@/Contexts/UserContext"; // Import UserContext
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // Ensure Carousel components are imported
import summaryApi from "@/common";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext); // Get user data from UserContext
  const { i18n } = useTranslation();
  const language = i18n.language;
  const images = product.covers || []; // Ensure images are provided
  console.log(product);
  return (
    <div className="w-[300px] bg-white shadow-lg rounded-lg overflow-hidden pb-4 relative group duration-300">
      <Link to={`/product/${product.productId}`}>
        <div className="relative flex overflow-hidden justify-center">
          {images.length > 0 ? (
            <Carousel>
              <CarouselContent className="m-0">
                {images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="flex  h-[200px]  justify-center p-0 m-0   "
                  >
                    <img
                      src={summaryApi.domain.url + "static/images/" + image}
                      alt={`Product Image ${index + 1}`}
                      loading="lazy"
                      className=" object-cover  rounded transition-transform duration-300 hover:scale-110"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <p className="text-gray-500">No images available</p>
          )}
        </div>
        <div className="px-5 mt-4">
          <h2 className="text-xl font-semibold">
            {language == "en" ? product.englishName : product.arabicName}
          </h2>
          <p className="text-gray-600 text-md">
            Category:{" "}
            {language == "en"
              ? product?.categoryName.en
              : product?.categoryName.ar}
          </p>

          <p className="text-gray-500 my-3 flex gap-2 text-lg items-center jusc">
            {product.avgRate == 0 ? "(No reviews yet)" : product.avgRate}
            <Star size={15} />
          </p>
          <div className="text-lg font-bold mt-2">
            {product.hasDiscount ? (
              <>
                <span className="text-gray-500 line-through mr-2">
                  ${product.minPrice}
                </span>
                <span className="text-red-600">${product.discountedPrice}</span>
              </>
            ) : (
              <span>${product.minPrice}</span>
            )}
          </div>

          {/* <Button
            onClick={handleAddToCart}
            className="mt-4 flex items-center justify-center w-full"
          >
            Add to Cart
          </Button> */}
        </div>
      </Link>
    </div>
  );
}
