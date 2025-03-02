import React, { useContext, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Heart } from "lucide-react"; // Import icons
import { Button } from "@/components/ui/button";
import summaryApi from "@/common";
import { useDispatch } from "react-redux";
import UserContext from "@/Contexts/UserContext";
import { addToCart, fetchCart } from "@/redux/cartSlice";
import { useCookies } from "react-cookie";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail({ product, language }) {
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const [cookies, setCookies] = useCookies(["accessToken"]);
  console.log(product);
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    console.log(selectedVariant);
  };

  const handleAddToCart = (variantId) => {
    if (user?.id) {
      dispatch(
        addToCart({
          userId: user.id,
          quantity: 1,
          variantId: selectedVariant.id,
          accessToken: cookies.accessToken,
        })
      ).then(() => {
        dispatch(
          fetchCart({ userId: user.id, accessToken: cookies.accessToken })
        );
      });
    } else {
      toast({
        variant: "destructive",
        title: "Please log in to add items to the cart.",
      });
    }
  };

  return (
    <div className="max-w-6xl mt-10 font-body mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
      {/* Image Section */}
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="m-0">
            {product.covers.map((image, index) => (
              <CarouselItem key={index} className="pl-0 m-0">
                <img
                  src={summaryApi.domain.url + "static/images/" + image}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-[250px] sm:h-[300px] md:h-[500px] object-cover rounded-md"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Product Info Section */}
      <div className="space-y-4 sm:space-y-6 font-body">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          {language === "en" ? product.englishName : product.arabicName}
        </h1>

        <div className="flex flex-wrap items-center space-x-2 text-lg sm:text-xl">
          <p>
            Category:{" "}
            {language === "en"
              ? product.categoryName.en
              : product.categoryName.ar}
          </p>
        </div>

        {/* Availability */}
        <p className="font-semibold text-gray-800">
          Availability:{" "}
          {selectedVariant?.stockQuantity === 0
            ? "Out of Stock"
            : `${selectedVariant?.stockQuantity} in stock`}
        </p>

        <p className="text-gray-600 text-sm sm:text-base">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500 text-lg sm:text-xl">★</span>
          <span className="text-gray-500 text-sm sm:text-lg">
            {product?.avgRate == 0
              ? "No reviews yet"
              : "(" + product.avgRate + "/" + 5 + ") " + "Average Reviews"}
          </span>
        </div>

        {/* Variant Options */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {product.variants.map((variant, index) => (
            <button
              key={index}
              className={`w-full sm:w-[150px] h-12 rounded-xl border-2 ${
                selectedVariant.option === variant.option
                  ? "border-gray-500"
                  : "border-gray-300"
              } hover:border-gray-500 transition-all`}
              onClick={() => handleVariantChange(variant)}
            >
              {variant.option}
            </button>
          ))}
        </div>

        {/* Price */}
        <div className="flex font-bold items-center space-x-2 text-lg sm:text-xl">
          <p>Price:</p>
          {product.hasDiscount ? (
            <>
              <span className="text-gray-500 line-through mr-2">
                ${selectedVariant ? selectedVariant?.price : product.minPrice}
              </span>
              <span className="text-red-600">
                $
                {selectedVariant
                  ? selectedVariant?.discountPrice
                  : product.discountedPrice}
              </span>
            </>
          ) : (
            <span>
              ${selectedVariant ? selectedVariant?.price : product.minPrice}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={() => handleAddToCart(selectedVariant.id)}
            disabled={selectedVariant.stockQuantity === 0}
            className="w-full sm:w-auto"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
