import React, { useEffect, useLayoutEffect, useState } from "react";
import Select from "react-select";
import FormInput from "@/components/ui/FormInput";
import LoadingButton from "@/components/ui/LoadingButton";
import ImagePrev from "@/components/ui/ImagePrev";
import summaryApi from "@/common";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

const INITIAL_FORM_DATA = {
  ArabicName: "",
  EnglishName: "",
  CategoryId: "",
  ArabicDescription: "",
  EnglishDescription: "",
  minPrice: "",
  Covers: [],
};

export default function AddProduct() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const { toast } = useToast();
  const [category, setCategory] = useState([]);
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const { i18n } = useTranslation();
  const language = i18n.language;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 20 * 1024 * 1024; // 20MB
    const maxImages = 5;

    // Filter valid images
    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Only JPEG , PNG and webp images are allowed.",
        });

        return false;
      }
      if (file.size > maxSize) {
        toast({
          variant: "destructive",
          title: "Each image must be smaller than 20MB.",
        });

        return false;
      }
      return true;
    });

    // Check total images count
    if (formData.Covers.length + validFiles.length > maxImages) {
      toast({
        variant: "destructive",
        title: "you cant add more than 5 images",
      });

      return;
    }

    setFormData((prev) => ({
      ...prev,
      Covers: [...prev.Covers, ...validFiles],
    }));
    setImagePreviews([
      ...imagePreviews,
      ...validFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(summaryApi.getCategory.url, {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        });

        const formattedCategories = response.data.map((cat) => ({
          value: cat.id,
          label: language == "en" ? cat.englishName : cat.arabicName,
        }));

        setCategory(formattedCategories);
      } catch (error) {
        toast.error("Failed to fetch categories");
        console.error(error);
      }
    };
    fetchCategory();
  }, [language]);

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      Covers: prev.Covers.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "CategoryId" || name === "minPrice" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      CategoryId: selectedOption.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.ArabicName ||
      !formData.EnglishName ||
      !formData.CategoryId ||
      !formData.minPrice
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append("ArabicName", formData.ArabicName);
      formDataToSend.append("EnglishName", formData.EnglishName);
      formDataToSend.append("CategoryId", formData.CategoryId);
      formDataToSend.append("minPrice", formData.minPrice);

      // Append optional fields if they exist
      if (formData.ArabicDescription) {
        formDataToSend.append("ArabicDescription", formData.ArabicDescription);
      }
      if (formData.EnglishDescription) {
        formDataToSend.append(
          "EnglishDescription",
          formData.EnglishDescription
        );
      }

      // Append files
      formData.Covers.forEach((file) => {
        formDataToSend.append("Covers", file);
      });
      console.log(formDataToSend.get("CategoryId"));
      const response = await axios.post(
        `${summaryApi.addProduct.url}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + cookies.accessToken,
          },
        }
      );
      toast({
        title: "Congratulations",
        description: "product added successfully",
      });
      setMessage(response.data.message);
      setFormData(INITIAL_FORM_DATA);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form className="p-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormInput
          label="Product Name with English"
          name="EnglishName"
          value={formData.EnglishName}
          onChange={handleChange}
        />
        <FormInput
          label="Product Name with Arabic"
          name="ArabicName"
          value={formData.ArabicName}
          onChange={handleChange}
        />
        <div className="w-full flex flex-col gap-3">
          <p className="text-[#2B3674] font-bold">Category</p>
          <Select
            options={category}
            onChange={handleCategoryChange}
            placeholder="Select a Category"
            className="text-black"
          />
        </div>
        <FormInput
          label="Description with English"
          name="EnglishDescription"
          value={formData.EnglishDescription}
          onChange={handleChange}
          type="textarea"
        />
        <FormInput
          label="Description with Arabic"
          name="ArabicDescription"
          value={formData.ArabicDescription}
          onChange={handleChange}
          type="textarea"
        />
        <FormInput
          label="Min Price"
          name="minPrice"
          value={formData.minPrice}
          onChange={handleChange}
          type="number"
        />
        <ImagePrev
          covers={formData.Covers}
          imagePreviews={imagePreviews}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
        />
        <LoadingButton loading={loading} />
        {message && (
          <p className="text-center mt-2 text-sm text-green-500">{message}</p>
        )}
      </form>
    </div>
  );
}
