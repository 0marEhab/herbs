import React, { useState } from "react";
import summaryApi from "@/common";
import FormInput from "@/components/ui/FormInput";

import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";

export default function AddVariant({
  onSubmit,
  onCancel,
  formData,
  handleChange,
}) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <FormInput
        label="Option"
        name="option"
        value={formData.option || ""}
        onChange={handleChange}
      />
      <FormInput
        label="Price"
        name="price"
        value={formData.price || 0}
        onChange={handleChange}
      />
      <FormInput
        label="Stock Quantity"
        name="stockQuantity"
        value={formData.stockQuantity || 0}
        onChange={handleChange}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSubmit()} className="bg-blue-600 text-white">
          Submit
        </Button>
      </div>
    </div>
  );
}
