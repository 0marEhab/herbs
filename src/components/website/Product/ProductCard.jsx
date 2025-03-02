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
              ? product?.categoryName?.en
              : product?.categoryName.ar}
          </p>

          <div className="flex items-center gap-2 my-3">
            {product.avgRate > 0 ? (
              <>
                <span className="text-lg font-semibold text-yellow-500">
                  {product.avgRate.toFixed(1)}
                </span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < Math.round(product.avgRate)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </>
            ) : (
              <span className="text-gray-500 text-sm">(No reviews yet)</span>
            )}
          </div>
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
