import React, { useState, useEffect } from "react";
import axios from "axios";
import HerbsHeader from "@/components/dashboard/herbs/HerbsHeader";
import HerbsSearch from "@/components/dashboard/herbs/HerbsSearch";
import HerbsList from "@/components/dashboard/herbs/HerbsTable";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/hooks/useDirection";
import summaryApi from "@/common";
import { useCookies } from "react-cookie";

export default function Herbs() {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const dir = useDirection();

  // State for pagination and data
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cookies, setCookie] = useCookies(["accessToken"]);
  // Fetch herbs data from the backend
  const fetchHerbs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(summaryApi.getAllAdminProduct.url, {
        headers: { Authorization: "Bearer " + cookies.accessToken },
        params: {
          // Ensure parameters are sent in the request
          pageNumber,
          pageSize,
          search: searchQuery,
        },
      });

      setHerbs(response.data.items);
      const totalPages = Math.ceil(response.data.totalRecords / pageSize);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching herbs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when pageNumber, pageSize, or searchQuery changes
  useEffect(() => {
    fetchHerbs();
  }, [pageNumber, pageSize, searchQuery]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPageNumber(1); // Reset to the first page when searching
  };

  // Handle pagination
  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <div
      className="p-6 overflow-hidden font-body w-full flex flex-col gap-6 bg-gray-50"
      dir={dir}
    >
      <HerbsHeader language={language} />
      <HerbsSearch
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        language={language}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <HerbsList
          herbs={herbs}
          language={language}
          pageNumber={pageNumber}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
