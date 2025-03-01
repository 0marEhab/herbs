import React from "react";

export default function ImagePrev({
  images,
  imagePreviews,
  onImageChange,
  onRemoveImage,
}) {
  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-[#2B3674] font-Vazirmatn font-bold">Product Images</p>
      {/* Custom File Input */}
      <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-gray-400">
        <input
          type="file"
          name="images"
          onChange={onImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          multiple
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <p className="text-gray-600">
            Drag & drop images or <span className="text-blue-500">browse</span>
          </p>
        </div>
      </div>
      {/* Image Previews */}
      <div className="flex flex-wrap gap-2">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
