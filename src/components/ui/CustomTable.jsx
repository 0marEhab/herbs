import React from "react";
import { Pencil, Trash, Eye, Percent } from "lucide-react"; // Import Eye icon for "View Variants"
import { Button } from "./button";
import summaryApi from "@/common";

export default function CustomTable({ headers, data = [], language, actions }) {
  return (
    <div className="w-full overflow-x-auto">
      {/* Table for larger screens */}
      <table className="w-full text-start border-collapse hidden sm:table">
        <thead>
          <tr className="border-b bg-gray-100 w-full">
            {headers.map((header, index) => (
              <th key={index} className="p-4 text-start">
                {header.label[language]}
              </th>
            ))}
            {actions && (
              <th className="p-4 text-center">
                {language === "ar" ? "الإجراءات" : "Actions"}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              {headers.map((header, i) => {
                let value = item[header.key] || "-";

                // Handle nested objects (like `name` and `description`)
                if (typeof value === "object" && value[language]) {
                  value = value[language];
                }

                return (
                  <td key={i} className="p-4  truncate overflow-x-auto">
                    {header.key === "covers" ? ( // Check for "covers" instead of "image"
                      <img
                        src={
                          summaryApi.domain.url + "static/images/" + value[0]
                        } // Construct the full image URL
                        alt="Product"
                        className="w-16 h-16 object-cover rounded-md"
                        loading="lazy"
                      />
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
              {/* Actions */}
              <td className="py-6  flex justify-center items-center gap-2">
                {actions?.viewVariants && (
                  <Button
                    onClick={() => actions.viewVariants(item)}
                    className="hover:text-green-500"
                  >
                    <Eye /> {/* Eye icon for "View Variants" */}
                  </Button>
                )}
                {actions?.edit && (
                  <Button
                    onClick={() => actions.edit(item)}
                    className="hover:text-blue-500"
                  >
                    <Pencil />
                  </Button>
                )}
                {actions?.handleRoleClick && (
                  <Button
                    onClick={() => actions.handleRoleClick(item)}
                    className="hover:text-blue-500"
                  >
                    <Pencil />
                  </Button>
                )}
                {actions?.delete && (
                  <Button
                    onClick={() => actions.delete(item)}
                    className="hover:text-red-500"
                  >
                    <Trash />
                  </Button>
                )}
                {actions?.promotion && (
                  <Button
                    onClick={() => actions.promotion(item)}
                    className="hover:text-red-500"
                  >
                    <Percent />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile-friendly version */}
      <div className="sm:hidden flex  flex-col gap-4">
        {data.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            {headers.map((header, i) => {
              let value = item[header.key] || "-";

              if (typeof value === "object" && value[language]) {
                value = value[language];
              }

              return (
                <div
                  key={i}
                  className="flex justify-between border-b pb-2 mb-2"
                >
                  <span className="font-semibold text-gray-700">
                    {header.label[language]}:
                  </span>
                  <span className="text-gray-600">
                    {header.key === "covers" ? ( // Check for "covers" instead of "image"
                      <img
                        src={
                          summaryApi.domain.url + "static/images/" + value[0]
                        } // Construct the full image URL
                        alt="Product"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      value
                    )}
                  </span>
                </div>
              );
            })}

            <div className="flex justify-center gap-4 mt-2">
              {actions?.viewVariants && (
                <Button
                  onClick={() => actions.viewVariants(item)}
                  className="text-gray-500  hover:text-green-500"
                >
                  <Eye /> {/* Eye icon for "View Variants" */}
                </Button>
              )}
              {actions?.edit && (
                <Button
                  onClick={() => actions.edit(item)}
                  className="text-gray-500 hover:text-blue-500"
                >
                  <Pencil />
                </Button>
              )}
              {actions?.delete && (
                <Button
                  onClick={() => actions.delete(item)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
