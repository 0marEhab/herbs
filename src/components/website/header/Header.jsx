import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import UserContext from "@/Contexts/UserContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/hooks/useDirection";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/redux/cartSlice";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const dir = useDirection();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    if (cookies.accessToken && user?.id) {
      dispatch(
        fetchCart({ userId: user.id, accessToken: cookies.accessToken })
      );
    }
  }, [dispatch, cookies.accessToken, user?.id]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = () => {
    removeCookie("accessToken", { path: "/" });
    window.location.reload();
  };

  // Handle scroll
  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-white shadow-lg w-full z-30 fixed top-0 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link to={"/"}>
              <h1 className="text-3xl text-center font-bold text-green-800">
                {t("navbar.brand")}
              </h1>
            </Link>
          </div>

          {/* Menu button for small screens */}
          <div className="flex md:hidden">
            <Button
              onClick={toggleMenu}
              className="text-white hover:bg-primary-foreground"
            >
              <Menu size={24} />
            </Button>
          </div>

          {/* Links for desktop */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 hover:bg-slate-300 px-4 py-2 duration-200 rounded-xl"
            >
              {t("navbar.home")}
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-gray-900 hover:bg-slate-300 px-4 py-2 duration-200 rounded-xl"
            >
              {t("navbar.products")}
            </Link>
          </div>

          {/* User Dropdown, Cart, and Language Switcher */}
          <div className="hidden md:flex space-x-4 items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl"
                >
                  {user.userName} <ChevronDown size={16} className="ml-2" />
                </button>

                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg overflow-hidden"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 hover:bg-slate-300 px-4 py-2 duration-200 rounded-xl"
              >
                {t("navbar.login")}
              </Link>
            )}

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-gray-900 hover:bg-slate-300 px-4 py-2 duration-200 rounded-xl"
            >
              <ShoppingCart size={24} />
              {items?.items?.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {items?.items?.length}
                </span>
              )}
            </Link>

            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 font-Dm">
          <LanguageSwitcher />
          {user ? (
            <div className="m-4">
              <Link
                to="/profile"
                className="block w-full text-center py-2 bg-gray-200 text-gray-700 rounded-md mb-2"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-center py-2 bg-red-500 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block w-full text-center py-2 bg-blue-500 text-white rounded-md"
            >
              {t("navbar.login")}
            </Link>
          )}
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900"
            >
              {t("navbar.home")}
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900"
            >
              {t("navbar.products")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
