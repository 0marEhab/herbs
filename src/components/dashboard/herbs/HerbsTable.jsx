import React, { useState } from "react";
import CustomTable from "../../ui/CustomTable";
import VariantsModal from "./VariantsModal";
import AreYouSureModal from "@/components/ui/AreYouSure";
import axios from "axios";
import summaryApi from "@/common";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function HerbsList({
  herbs: initialHerbs = [],
  language,
  pageNumber,
  totalPages,
  onPageChange,
}) {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [selectedHerb, setSelectedHerb] = useState(null);
  const [item, setItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [herbs, setHerbs] = useState(initialHerbs);
  const { toast } = useToast();

  const headers = [
    {
      label: { en: "English Name", ar: "الاسم بالإنجليزية" },
      key: "englishName",
    },
    { label: { en: "Arabic Name", ar: "الاسم بالعربية" }, key: "arabicName" },
    { label: { en: "Category Name", ar: "اسم التصنيف" }, key: "categoryName" },
    { label: { en: "Min Price", ar: "أقل سعر" }, key: "minPrice" },
    { label: { en: "Image", ar: "الصورة" }, key: "covers" },
    { label: { en: "Variants", ar: "الكميات" }, key: "variants" },
  ];

  const formattedHerbs = herbs.map((herb) => ({
    ...herb,
    variants: `${herb.variants.length} variants`,
  }));

  const handleViewVariants = (herb) => {
    setSelectedHerb(herbs.find((h) => h.productId === herb.productId));
    setIsModalOpen(true);
  };

  const updateVariants = (productId, newVariants) => {
    setHerbs((prevHerbs) =>
      prevHerbs.map((herb) =>
        herb.productId === productId ? { ...herb, variants: newVariants } : herb
      )
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHerb(null);
  };

  const handleEditVariant = (variant) => {
    console.log("Editing variant:", variant);
  };

  const handleDeleteVariant = async (variant) => {
    console.log("Deleting variant:", variant);
    try {
      const response = await axios.delete(
        `${summaryApi.deleteVariant.url}${variant}`,
        {
          headers: { Authorization: "Bearer " + cookies.accessToken },
        }
      );

      window.location.reload();
      setHerbs((prevHerbs) =>
        prevHerbs.filter((herb) => herb.productId !== item.productId)
      );

      toast({
        title: "deleted Successfully ",
      });
    } catch (error) {
      console.error("Error deleting variant:", error);
      toast({
        title: "Error deleting variant",
        variant: "destructive",
      });
    }
  };

  function handleEdit(item) {
    navigate(`edit-product/${item.productId}`);
  }

  function handlePromotion(item) {
    navigate(`addProductPromotion/${item.productId}`);
  }

  function handleDelete(item) {
    setIsOpen(true);
    setItem(item);
    console.log("Deleting item:", item);
  }

  const handleConfirm = async () => {
    try {
      const response = await axios.delete(
        `${summaryApi.deleteProduct.url} ${item.productId}`,
        {
          headers: { Authorization: "Bearer " + cookies.accessToken },
        }
      );

      console.log(response);
      console.log("successfully deleted");
      setHerbs((prevHerbs) =>
        prevHerbs.filter((herb) => herb.productId !== item.productId)
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
    }
  };

  const handleCancel = () => {
    console.log("Cancelled!");
  };

  return (
    <div className="flex flex-col gap-3">
      <AreYouSureModal
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <h2 className="text-2xl font-bold">
        {language === "ar" ? "جميع الأعشاب" : "All Herbs"}
      </h2>
      <CustomTable
        headers={headers}
        data={formattedHerbs}
        language={language}
        actions={{
          viewVariants: handleViewVariants,
          edit: handleEdit,
          delete: handleDelete,
          promotion: handlePromotion,
        }}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {pageNumber} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {isModalOpen && selectedHerb && (
        <VariantsModal
          variants={selectedHerb.variants}
          onUpdateVariants={updateVariants}
          productId={selectedHerb.productId}
          onClose={handleCloseModal}
          onEdit={handleEditVariant}
          onDelete={handleDeleteVariant}
          language={language}
        />
      )}
    </div>
  );
}
