import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const cardVariants = {
  offscreen: {
    x: 40, // Start slightly below the viewport
    opacity: 0, // Start invisible
  },
  onscreen: {
    x: 0, // Move to its original position
    opacity: 1, // Fade in
    transition: {
      type: "spring", // Add a spring effect
      bounce: 0.4, // Bounce effect
      duration: 0.8, // Animation duration
    },
  },
};

export default function Card({ image }) {
  const { t } = useTranslation();
  return (
    <motion.div
      className="flex flex-col gap-4 border-x-4 items-center justify-center w-full lg:w-[600px]"
      initial="offscreen" // Initial state
      whileInView="onscreen" // Animate when in view
      viewport={{ once: true, amount: 0.5 }} // Trigger animation once, when 50% of the card is visible
      variants={cardVariants} // Animation variants
    >
      <div className="overflow-hidden relative group">
        <img
          src={image}
          alt="img"
          className="w-full h-auto lg:w-[500px] lg:h-[650px] object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center p-5 w-full lg:w-[400px]">
        <p className="text-center">up to 15% off</p>
        <p className="text-center">Tea infused Chocolate</p>
        <p className="text-center">
          Creating the world's best tea chocolate required not only the best
          tea, but also the best chocolate.
        </p>

        <Link to="/products">
          {" "}
          <button className="bg-white w-fit font-bold text-black border border-black px-7 py-2 hover:bg-lime-900 hover:text-white duration-300">
            {t("section1.button")}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
