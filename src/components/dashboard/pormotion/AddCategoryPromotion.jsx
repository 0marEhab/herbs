import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";
import summaryApi from "@/common";
export default function AddCategoryPromotion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["accessToken"]);

  const [formData, setFormData] = useState({
    categoryId: id || "",
    discountPercentage: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      const res = await axios.post(
        summaryApi.addCategoryPormotion.url,
        formattedData,
        {
          headers: { Authorization: `Bearer ${cookies.accessToken}` },
        }
      );

      console.log(res);
      navigate("/dashboard/activePormotions");
    } catch (error) {
      console.error("Error adding promotion:", error);
    }
  };

  return (
    <div className=" w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Add Category Promotion
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Category ID</label>
          <input
            type="text"
            name="CategoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            readOnly
          />
        </div>
        <div>
          <label className="block font-semibold">Discount Percentage</label>
          <input
            type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Start Date</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full p-2  text-white rounded-md hover:bg-green-900 transition"
        >
          Add Promotion
        </Button>
      </form>
    </div>
  );
}
