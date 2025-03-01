import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout/layout/layout";
import Home from "./page/website/home/Home"; // Main website home page
import DashboardHome from "./page/dashboard/home/Home"; // Dashboard Home
import Login from "./page/dashboard/auth/Login";
import { UserProvider } from "./Contexts/UserContext";
import ProtectedRoute from "./components/dashboardLayout/layout/ProtectedRoute";
import Employee from "./page/dashboard/employee/Employee";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Herbs from "./page/dashboard/herbs/Herbs";
import Category from "./page/dashboard/herbs/category";
import NotFound from "./page/NotFound";

// website
import Layout from "./components/layout/layout";
import Products from "./page/website/Product/Products";
import ProductDetails from "./page/website/productDetails/productDetails";
import Cart from "./page/website/Cart/Cart";
import AddProduct from "./components/dashboard/herbs/AddProduct";
import { Toaster } from "@/components/ui/toaster";
import EditProduct from "./components/dashboard/herbs/EditProduct";
import AddCategory from "./components/dashboard/herbs/AddCategory";
import EditCategory from "./components/dashboard/herbs/EditCategory";
import { Cookies, CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Profile from "./page/website/profile/Profile";
import Order from "./page/website/profile/Order";
import Orders from "./page/dashboard/orders/Orders";
import Active from "./components/dashboard/pormotion/Active";
import AddProductPromotion from "./components/dashboard/pormotion/AddProductPromotion";
import AddCategoryPromotion from "./components/dashboard/pormotion/AddCategoryPromotion";
import Register from "./page/dashboard/auth/Register";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/products", element: <Products /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "profile", element: <Profile /> },
        { path: "orders", element: <Order /> },

        { path: "/cart", element: <Cart /> },
      ],
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            { index: true, element: <DashboardHome /> },

            { path: "herbs", element: <Herbs /> },
            { path: "addProduct", element: <AddProduct /> },
            {
              path: "herbs/edit-product/:productId",
              element: <EditProduct />,
            },
            { path: "categories", element: <Category /> },
            { path: "addCategory", element: <AddCategory /> },
            { path: "editCategory/:categoryId", element: <EditCategory /> },
            { path: "employee", element: <Employee /> },
            { path: "orders", element: <Orders /> },
            { path: "activePormotions", element: <Active /> },
            {
              path: "Herbs/addProductPromotion/:id",
              element: <AddProductPromotion />,
            },
            {
              path: "categories/addCategoryPromotion/:id",
              element: <AddCategoryPromotion />,
            },
          ],
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <I18nextProvider i18n={i18n}>
      <CookiesProvider>
        <UserProvider>
          <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster />
          </Provider>
        </UserProvider>
      </CookiesProvider>
    </I18nextProvider>
  );
}
