import summaryApi from "@/common";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../public/a'shaby.png";
import { useCookies } from "react-cookie";
import UserContext from "@/Contexts/UserContext";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies] = useCookies(["user", "accessToken"]);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Frontend validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(summaryApi.login.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is OK (status code 2xx)
      if (!response.ok) {
        // Handle non-JSON responses (e.g., plain text errors)
        const errorText = await response.text();
        throw new Error(errorText || "Invalid email or password");
      }

      // Parse the response as JSON
      const result = await response.json();

      console.log("Login successful!", result);

      // Update cookies
      setCookies("accessToken", result.token, { path: "/" });
      setCookies("user", result, { path: "/" });

      // Update UserContext
      setUser(result);

      // Navigate to home page
      navigate("/");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 lg:px-16 py-8 bg-white">
      <div className="mb-6">
        <img src={logo} alt="logo" className="w-[200px]" />
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Sign in to your account</h1>
        <p className="text-gray-500 text-sm mt-2">
          Please enter your email to continue your journey
        </p>
      </div>
      <form className="w-full max-w-sm space-y-4" onSubmit={handleLogin}>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">
            {error}
          </div>
        )}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md font-medium text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 transition"
          }`}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link to="/login" className="text-green-600">
          Register
        </Link>
      </p>
    </div>
  );
}
