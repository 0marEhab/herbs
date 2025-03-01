import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import axios from "axios";
import summaryApi from "@/common";
import { useCookies } from "react-cookie";

export default function VariantsTable({ variants, onDelete, language }) {
  const [editingVariant, setEditingVariant] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [cookies] = useCookies(["accessToken"]);
  const handleEdit = (variant) => {
    setEditingVariant(variant);
    setNewQuantity(variant.stockQuantity);
  };

  const handleSave = async () => {
    try {
      console.log(newQuantity);
      await axios.put(
        summaryApi.editVariant.url,
        {
          variantId: editingVariant.id,
          newStockQuantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );
      setEditingVariant(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating variant stock:", error);
    }
  };

  return (
    <div>
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className="p-3">{language === "ar" ? "الخيار" : "Option"}</th>
            <th className="p-3">{language === "ar" ? "السعر" : "Price"}</th>
            <th className="p-3">
              {language === "ar" ? "الكمية المتاحة" : "Stock Quantity"}
            </th>
            <th className="p-3">
              {language === "ar" ? "الإجراءات" : "Actions"}
            </th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, index) => (
            <motion.tr
              key={index}
              className="border-b hover:bg-gray-50 transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <td className="p-3 text-center">{variant.option}</td>
              <td className="p-3 text-center">{variant.price}</td>
              <td className="p-3 text-center">{variant.stockQuantity}</td>
              <td className="p-3 flex gap-2 justify-center">
                <Button onClick={() => handleEdit(variant)}>
                  {language === "ar" ? "تعديل" : "Edit"}
                </Button>
                <Button onClick={() => onDelete(variant.id)}>
                  {language === "ar" ? "حذف" : "Delete"}
                </Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {editingVariant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {language === "ar" ? "تعديل الكمية" : "Edit Quantity"}
            </h2>
            <input
              type="number"
              className="border p-2 rounded w-full mb-4"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button onClick={() => setEditingVariant(null)}>
                {language === "ar" ? "إلغاء" : "Cancel"}
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 text-white">
                {language === "ar" ? "حفظ" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
