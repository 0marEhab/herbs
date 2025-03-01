import React, { useState } from "react";

export default function AreYouSureModal({ onConfirm, onCancel ,isOpen , setIsOpen }) {
  

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsOpen(false);
  };

  return (
    <>
     
      

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0  z-40 bg-black bg-opacity-50 flex items-center justify-center p-4">
          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Are You Sure?</h2>
            <p className="text-gray-600 mb-6">
              Do you really want to perform this action?
            </p>
            {/* Modal Actions */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                No
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
