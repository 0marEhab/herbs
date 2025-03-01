import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
export default function AddEmployee({
  handleChange,
  handleSubmit,
  loading,
  message,
  formData,
}) {
  return (
    <Dialog>
      <DialogTrigger className="text-white gap-2 bg-green-500 md:px-4 py-2 w-[120px]   rounded hover:bg-green-600">
        + Add New
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Employee</DialogTitle>
          <DialogDescription>
            <form className="p-5 flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col gap-3">
                <p className="text-[#2B3674] font-Vazirmatn font-bold">
                  Employee Name
                </p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="w-full flex flex-col gap-3">
                <p className="text-[#2B3674] font-Vazirmatn font-bold">Email</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="w-full flex flex-col gap-3">
                <p className="text-[#2B3674] font-Vazirmatn font-bold">
                  Password
                </p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    <span className="ml-2">Loading...</span>
                  </div>
                ) : (
                  "Add"
                )}
              </Button>
              {message && (
                <p className="text-center mt-2 text-sm text-green-500">
                  {message}
                </p>
              )}
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
