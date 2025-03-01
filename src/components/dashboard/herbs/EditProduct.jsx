import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import FormInput from "@/components/ui/FormInput";
import LoadingButton from "@/components/ui/LoadingButton";
import ImagePrev from "@/components/ui/ImagePrev";
import summaryApi from "@/common";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

const CATEGORY_OPTIONS = [
  { id: 1, value: "electronics", label: "Electronics" },
  { id: 2, value: "fashion", label: "Fashion" },
  { id: 3, value: "home_appliances", label: "Home Appliances" },
  { id: 4, value: "sports", label: "Sports" },
  { id: 5, value: "books", label: "Books" },
];

const INITIAL_FORM_DATA = {
  ArabicName: "",
  EnglishName: "",
  CategoryId: "",
  ArabicDescription: "",
  EnglishDescription: "",
  MinPrice: "",
  covers: [],
};

export default function EditProduct() {
  const { productId } = useParams(); // Get productId from URL
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [previousImages, setPreviousImages] = useState([]); // Backend images
  const [newImages, setNewImages] = useState([]); // Uploaded images (frontend only)
  const { toast } = useToast();
  const [category, setCategory] = useState([]);
  const { i18n } = useTranslation();
  const language = i18n.language;
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${summaryApi.getProduct.url}${productId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          }
        );
        const product = response.data;
        const BASE_URL = `${summaryApi.domain.url}static/images/`;
        // Set form data with fetched product data
        setFormData({
          ArabicName: product.arabicName,
          EnglishName: product.englishName,
          CategoryId: product.categoryId,
          ArabicDescription: product.arabicDescription,
          EnglishDescription: product.englishDescription,
          MinPrice: product.minPrice,
          covers: product.covers || [],
        });

        // Set image previews for existing images (backend URLs)
        setPreviousImages(
          product.covers?.map((img) => `${BASE_URL}${img}`) || []
        );
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error fetching product",
          variant: "destructive",
        });
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "CategoryId" || name === "MinPrice" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (selectedOption) => {
    handleChange({
      target: {
        name: "CategoryId",
        value: selectedOption.id,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.ArabicName ||
      !formData.EnglishName ||
      !formData.CategoryId ||
      !formData.MinPrice
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
      formDataToSend.append("MinPrice", formData.MinPrice);

      if (formData.ArabicDescription) {
        formDataToSend.append("ArabicDescription", formData.ArabicDescription);
      }
      if (formData.EnglishDescription) {
        formDataToSend.append(
          "EnglishDescription",
          formData.EnglishDescription
        );
      }

      // Append existing image URLs (backend images)
      formData.covers.forEach((img) => {
        if (typeof img === "string") {
          formDataToSend.append("existingCovers", img);
        }
      });

      // Append new image files
      newImages.forEach((file) => {
        formDataToSend.append("covers", file);
      });

      const response = await axios.put(
        `${summaryApi.updateProduct.url}${productId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );

      toast({
        title: "Success",
        description: "Product updated successfully",
      });

      navigate("/dashboard/herbs");
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]); // Only store new images
  };

  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemovePreviousImage = async (index) => {
    const imageUrl = previousImages[index];
    const imageName = imageUrl.split("/").pop(); // Extract filename from URL
    console.log(`Removing ${imageName}`);
    try {
      await axios.delete(
        `${summaryApi.domain.url}api/Product/${productId}/Photo`,
        {
          params: {
            cover: imageName,
          },
          headers: { Authorization: `Bearer ${cookies.accessToken}` },
        }
      );

      setPreviousImages((prev) => prev.filter((_, i) => i !== index));

      toast({
        title: "Image removed successfully",
        description: "The image has been deleted.",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({ title: "Error deleting image", variant: "destructive" });
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
            value={category.find(
              (option) => option.value === formData.CategoryId
            )}
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
          name="MinPrice"
          value={formData.MinPrice}
          onChange={handleChange}
          type="number"
        />
        <div className="flex flex-wrap flex-col gap-2">
          <p>Previous Images</p>
          {previousImages.map((preview, index) => (
            <div key={index} className="relative w-fit">
              <img
                src={preview}
                alt={`Previous ${index}`}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemovePreviousImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap flex-col gap-2">
          <p>New Images</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="flex gap-2">
            {newImages.map((file, index) => (
              <div key={index} className="relative w-fit">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`New ${index}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* <ImagePrev
          covers={formData.covers}
          imagePreviews={imagePreviews}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
        /> */}
        <LoadingButton loading={loading} />
        {message && (
          <p className="text-center mt-2 text-sm text-green-500">{message}</p>
        )}
      </form>
    </div>
  );
}
