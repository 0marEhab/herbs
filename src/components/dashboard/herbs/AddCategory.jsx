import React, { useState } from "react";
import { Button } from "../../ui/button";
import summaryApi from "@/common";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import FormInput from "@/components/ui/FormInput";
import LoadingButton from "@/components/ui/LoadingButton";
import { useCookies } from "react-cookie";
const INITIAL_FORM_DATA = {
  arabicName: "",
  englishName: "",
};
export default function AddCategory({ language }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const [cookies, setCookies] = useCookies(["accessToken"]);

  const token = cookies.accessToken;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.arabicName || !formData.englishName) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append("arabicName", formData.arabicName);
      formDataToSend.append("englishName", formData.englishName);

      const response = await axios.post(
        `${summaryApi.AddCategory.url}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "success",
        description: "Category added successfully",
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
          label="Category Name with English"
          name="englishName"
          value={formData.englishName}
          onChange={handleChange}
        />
        <FormInput
          label="Category Name with Arabic"
          name="arabicName"
          value={formData.arabicName}
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
