import React from "react";
import { Button } from "../../ui/button";

export default function EmployeeTable({ data = [] }) {
  return (
    <div className="bg-white shadow rounded">
      {/* Table Wrapper for Horizontal Scrolling */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse sm:table hidden">
          <thead>
            <tr className="border-b">
              <th className="p-4">Name</th>
              <th className="p-4">email</th>
              <th className="p-4 text-center">tasks</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item?.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-medium">{item?.userName}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="w-[200px] truncate overflow-x-auto">
                    {item?.email}
                  </p>
                </td>
                <td className="p-4">
                  <p className="text-center overflow-x-auto">{item?.phone}</p>
                </td>

                <td className="p-4">
                  <Button className="text-gray-300 hover:text-blue-500">
                    Edit
                  </Button>
                  <Button className="text-gray-300 hover:text-red-500 ml-4">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Stacked Layout for Small Screens */}
        <div className="sm:hidden block">
          {data?.map((item) => (
            <div
              key={item?.id}
              className="border-b p-4 flex flex-col space-y-2 bg-white hover:bg-gray-50"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">
                    <span>Name: </span>
                    {item?.name}
                  </p>
                </div>
                <div>
                  <button className="text-gray-500 hover:text-blue-500">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-gray-500 hover:text-red-500 ml-4">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <p className="w-[200px] truncate overflow-x-auto">
                  <span>Email:</span> {item?.email}
                </p>
              </div>
              <div className="flex items-center">
                <p className="w-[200px] truncate overflow-x-auto">
                  <span>tasks:</span> {item?.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
