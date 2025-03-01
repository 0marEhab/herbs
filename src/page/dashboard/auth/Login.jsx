import React from "react";

import LoginForm from "../../../components/dashboard/auth/LoginForm";
import logo from "../../../../public/a'shaby.png";

export default function Login() {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <LoginForm />
      {/* Right Section: Promotional Content */}
      <div className="hidden lg:flex flex-col justify-center items-center w-full lg:w-1/2 bg-teal-50">
        <h2 className="text-3xl font-bold text-teal-800 mb-4">Healing Herbs</h2>
        <p className="text-gray-600 text-center mb-6 px-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <img src={logo} alt="a'shaby" className="  mt-8" />
      </div>
    </div>
  );
}
