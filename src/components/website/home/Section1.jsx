import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/hooks/useDirection"; // Assuming you have a hook to get the direction
import { Link } from "react-router-dom";

export default function Section1() {
  const imageRef = useRef(null);
  const { t } = useTranslation();
  const dir = useDirection();

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        // Adjust the image position based on scroll
        imageRef.current.style.transform = `translateY(${scrollY * 0.5}px)`; // Adjust the multiplier for speed
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative font-body text-white" dir={dir}>
      {/* Image container with fixed height on larger screens */}
      <div className="relative h-[400px] lg:h-[800px] w-full overflow-hidden">
        <img
          ref={imageRef}
          src="home1.webp"
          className="h-full w-full object-cover transition-transform duration-300 ease-out"
          alt="home banner"
          loading="lazy"
        />
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col justify-center p-5 lg:items-start lg:px-52">
        <h1 className="text-4xl lg:text-6xl font-bold mb-10">
          {t("section1.title")}
        </h1>
        <p className="text-lg lg:text-xl max-w-[600px] lg:px-0 mb-5">
          {t("section1.description")}
        </p>
        <Link to="/products">
          <button className="bg-white w-fit font-bold text-black px-10 py-3 hover:bg-lime-900 hover:text-white duration-300">
            {t("section1.button")}
          </button>
        </Link>
      </div>
    </div>
  );
}
