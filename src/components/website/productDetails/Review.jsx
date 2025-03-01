import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import summaryApi from "@/common";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { motion, AnimatePresence } from "framer-motion";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["accessToken"]);
  const { id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`${summaryApi.Review.url}${id}`, {
          headers: { Authorization: `Bearer ${cookies.accessToken}` },
        });
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };
    fetchReviews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${summaryApi.Review.url}${id}`,
        {
          rating,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${cookies.accessToken}` },
        }
      );
      setReviews([...reviews, data]);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review", error);
    }
    setLoading(false);
  };

  const starVariants = {
    hover: { scale: 1.2, transition: { duration: 0.2 } },
    tap: { scale: 0.9 },
  };

  const reviewVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="mx-auto p-5 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Customer Reviews
      </h2>
      <motion.form
        onSubmit={handleSubmit}
        className="mb-8 p-6 border rounded-lg shadow-md bg-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <motion.div
              key={num}
              variants={starVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaStar
                className={`cursor-pointer text-2xl ${
                  num <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(num)}
              />
            </motion.div>
          ))}
        </div>
        <textarea
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
        ></textarea>
        <motion.button
          type="submit"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-green-900 transition-colors duration-300"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <motion.div
              key={index}
              className="p-4 mb-4 border rounded-lg shadow-sm bg-white"
              variants={reviewVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <p className="font-semibold text-gray-800">{review.userName}</p>
              <div className="flex items-center mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
                <span className="ml-2 text-gray-600">
                  ({review.rating}/5) Star
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No reviews yet.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
