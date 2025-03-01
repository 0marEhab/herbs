import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get categoryId from URL
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import FormInput from "@/components/ui/FormInput";
import LoadingButton from "@/components/ui/LoadingButton";
import { useCookies } from "react-cookie";
import summaryApi from "@/common";

const INITIAL_FORM_DATA = {
  id: "", // Add id to the initial state
  englishName: "", // English name
  arabicName: "", // Arabic name
};

export default function EditCategory() {
  const { categoryId } = useParams(); // Get categoryId from URL

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const [cookies, setCookies] = useCookies(["accessToken"]);

  const token = cookies.accessToken;

  // Fetch category data when the component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${summaryApi.getCategoryById.url}/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        console.log(data);
        // Transform the fetched data into the required format
        const transformedData = {
          id: data.id,
          englishName: data.englishName, // Map "en" to "englishName"
          arabicName: data.arabicName, // Map "ar" to "arabicName"
        };

        setFormData(transformedData); // Populate form with transformed data
        console.log("Fetched Data:", transformedData);
      } catch (error) {
        console.error("Error fetching category:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch category data.",
        });
      }
    };

    fetchCategory();
  }, [categoryId, token, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the formData state
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Update either `englishName` or `arabicName`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.englishName || !formData.arabicName) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");
    console.log("Submitting Data:", formData);

    try {
      const response = await axios.put(
        `${summaryApi.editCategory.url}/${categoryId}`,
        formData, // Send formData in the required format
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Success",
        description: "Category updated successfully.",
      });
      setMessage(response.data.message);
    } catch (err) {
      console.error("Error updating category:", err);
      setMessage(err.response?.data?.message || "An error occurred.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update category.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form className="p-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormInput
          label="Category Name in English"
          name="englishName" // Matches the formData structure
          value={formData.englishName || ""} // Ensure value is never undefined
          onChange={handleChange}
        />
        <FormInput
          label="Category Name in Arabic"
          name="arabicName" // Matches the formData structure
          value={formData.arabicName || ""} // Ensure value is never undefined
          onChange={handleChange}
        />

        <LoadingButton loading={loading} />
        {message && (
          <p className="text-center mt-2 text-sm text-green-500">{message}</p>
        )}
      </form>
    </div>
  );
}
