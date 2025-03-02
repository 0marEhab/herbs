import summaryApi from "@/common";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

export default function Aside({ onFilterChange }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const { i18n } = useTranslation();
  const language = i18n.language;
  // State for filters
  const [localFilters, setLocalFilters] = useState({
    categoryId: "",
    minPrice: "",
    maxPrice: "",
    search: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get(summaryApi.getCategory.url, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      console.log(response.data);
      setCategory(response.data);
    };
    fetchCategory();
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle input changes for filters
  const handleInputChange = (key, value) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
    console.log(localFilters);
  };

  // Apply filters and notify the parent component
  const applyFilters = () => {
    onFilterChange({
      categoryId: localFilters.categoryId || null,
      minPrice: localFilters.minPrice || null,
      maxPrice: localFilters.maxPrice || null,
      search: localFilters.search || "",
    });
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Overlay for smaller screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="default-sidebar"
        className={`fixed top-16 left-0 z-20 w-72 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg">
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            type="button"
            className="text-gray-500 md:hidden hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              ></path>
            </svg>
          </button>

          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-2xl font-bold text-gray-800">Filters</p>
          </div>

          {/* Sidebar Content */}
          <div className="mt-4">
            {/* Category Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={localFilters.categoryId}
                onChange={(e) =>
                  handleInputChange("categoryId", e.target.value)
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Categories</option>
                {category?.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {language == "en" ? cat.englishName : cat.arabicName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={localFilters.minPrice}
                  onChange={(e) =>
                    handleInputChange("minPrice", e.target.value)
                  }
                  className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={localFilters.maxPrice}
                  onChange={(e) =>
                    handleInputChange("maxPrice", e.target.value)
                  }
                  className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Search Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                placeholder="Search products"
                value={localFilters.search}
                onChange={(e) => handleInputChange("search", e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Apply Filters Button */}
            <Button onClick={applyFilters} className="w-full ">
              Apply Filters
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
