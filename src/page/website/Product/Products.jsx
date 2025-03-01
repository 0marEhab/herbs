import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import ProductCard from "@/components/website/Product/ProductCard";
import summaryApi from "@/common";
import { useCookies } from "react-cookie";

export default function Products() {
  const [products, setProducts] = useState([]); // State to store products
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: 10,
    categoryId: null,
    minPrice: null,
    maxPrice: null,
    search: "",
  });
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [totalRecords, setTotalRecords] = useState(0); // Total number of products

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      // Construct query parameters from filters
      const queryParams = new URLSearchParams({
        pageNumber: filters.pageNumber,
        pageSize: filters.pageSize,
        ...(filters.categoryId && { categoryId: filters.categoryId }),
        ...(filters.minPrice && { minPrice: filters.minPrice }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
        ...(filters.search && { search: filters.search }),
      }).toString();

      const url = `${summaryApi.getAllProduct.url}?${queryParams}`;

      // Fetch data from the API
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });

      const data = await response.json();
      setProducts(data.items); // Update products
      setTotalRecords(data.totalRecords); // Update total records
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  // Handle pagination
  const handlePageChange = (newPageNumber) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      pageNumber: newPageNumber,
    }));
  };

  // Handle filter changes from Aside component
  const handleFilterChange = (newFilters) => {
    console.log(newFilters);
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      pageNumber: 1, // Reset to the first page when filters change
    }));
  };

  return (
    <div>
      {/* Aside component for filters */}
      <Aside onFilterChange={handleFilterChange} />

      {/* Main content */}
      <div className="p-4 sm:ml-72">
        <h1 className="text-3xl border-b-2 p-4 shadow-sm font-bold">
          Products
        </h1>

        {/* Product List */}
        <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({
            length: Math.ceil(totalRecords / filters.pageSize),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-4 py-2 border ${
                filters.pageNumber === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              } rounded-md`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
