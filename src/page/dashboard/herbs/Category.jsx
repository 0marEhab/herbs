import summaryApi from "@/common";
import AddCategory from "@/components/dashboard/herbs/AddCategory";
import CategoryCard from "@/components/dashboard/herbs/CategoryCard";
import CategoryHeader from "@/components/dashboard/herbs/CategoryHeader";
import AreYouSureModal from "@/components/ui/AreYouSure";
import { useToast } from "@/hooks/use-toast";
import { useDirection } from "@/hooks/useDirection";
import { useCookies } from "react-cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item for deletion
  const language = i18n.language;
  const [category, setCategory] = useState([]);
  const dir = useDirection();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get(summaryApi.getCategory.url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setCategory(response.data);
    };
    fetchCategory();
  }, []);

  function handleEdit(item) {
    navigate(`/dashboard/editCategory/${item.id}`);
  }

  function handleDelete(item) {
    setIsOpen(true);
    setSelectedItem(item);
    console.log("Deleting item:", item.id);
  }

  const handleConfirm = async () => {
    try {
      console.log(selectedItem.id);
      const response = await axios.delete(
        `${summaryApi.deleteCategory.url}/${selectedItem.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      console.log("successfully deleted");
      setCategory((prevCategory) =>
        prevCategory.filter((category) => category.id !== selectedItem.id)
      );

      toast({
        title: "Successfully deleted",
      });
    } catch (error) {
      console.error("Error deleting herb:", error);
      toast({
        title: "Error deleting herb",
        variant: "destructive",
      });
    } finally {
      setIsOpen(false);
      setSelectedItem(null);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedItem(null);
    console.log("Cancelled!");
  };

  const handlePromotions = (id) => {
    navigate(`addCategoryPromotion/${id}`);
  };
  return (
    <div
      className="p-6 overflow-hidden font-body w-full flex flex-col gap-6 bg-gray-50"
      dir={dir}
    >
      <AreYouSureModal
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <CategoryHeader language={language} />
      <div className="flex justify-center items-center gap-10 flex-wrap w-full">
        {category &&
          category?.map((item) => (
            <CategoryCard
              key={item.id}
              id={item.id}
              title={language == "en" ? item.englishName : item.arabicName}
              number={item.count}
              onEdit={() => handleEdit(item)} // Pass the entire item object
              onDelete={() => handleDelete(item)} // Pass the entire item object
              onPromotions={handlePromotions}
            />
          ))}
      </div>
    </div>
  );
}
