import AddCategory from "@/components/dashboard/herbs/AddCategory";
import Review from "@/components/website/productDetails/Review";

const urlDomain = "http://localhost:3000";
const summaryApi = {
  domain: {
    url: "https://ashaabe.runasp.net/",
  },
  login: {
    url: `https://ashaabe.runasp.net/api/Auth/login`,
  },
  register: {
    url: `https://ashaabe.runasp.net/api/Auth/register`,
  },
  refresh: {
    url: "https://ashaabe.runasp.net/api/Auth/refreshToken",
  },
  user: {
    url: "https://ashaabe.runasp.net/api/Auth/myProfile",
  },
  users: {
    url: `https://ashaabe.runasp.net/api/Auth/users`,
  },
  changeRole: {
    url: "https://ashaabe.runasp.net/api/Auth/changeRole",
  },
  addProduct: {
    url: "https://ashaabe.runasp.net/api/Product",
  },
  getAllProduct: {
    url: "https://ashaabe.runasp.net/api/Product",
  },
  getAllAdminProduct: {
    url: "https://ashaabe.runasp.net/api/Product/all-products",
  },
  getProduct: {
    url: "https://ashaabe.runasp.net/api/Product/",
  },
  deleteProduct: {
    url: "https://ashaabe.runasp.net/api/Product/",
  },
  updateProduct: {
    url: "https://ashaabe.runasp.net/api/Product/",
  },
  AddVariant: {
    url: "https://ashaabe.runasp.net/api/ProductItem",
  },
  editVariant: {
    url: "https://ashaabe.runasp.net/api/ProductItem/update-variant-stock",
  },
  deleteVariant: {
    url: "https://ashaabe.runasp.net/api/ProductItem/",
  },
  getCategory: {
    url: "https://ashaabe.runasp.net/api/Category",
  },
  getCategoryById: {
    url: "https://ashaabe.runasp.net/api/Category/by-id",
  },
  AddCategory: {
    url: "https://ashaabe.runasp.net/api/Category",
  },
  editCategory: {
    url: "https://ashaabe.runasp.net/api/Category",
  },
  deleteCategory: {
    url: "https://ashaabe.runasp.net/api/Category",
  },
  addToCart: {
    url: "https://ashaabe.runasp.net/api/ShoppingCart/${userId}/add-item",
  },
  getCart: {
    url: "https://ashaabe.runasp.net/api/ShoppingCart",
  },
  deleteCart: {
    url: "https://ashaabe.runasp.net/api/ShoppingCart",
  },
  quantity: {
    url: "https://ashaabe.runasp.net/api/ShoppingCart/",
  },
  Review: {
    url: "https://ashaabe.runasp.net/api/reviews/",
  },
  activePromotion: {
    url: "https://ashaabe.runasp.net/api/promotions/active",
  },
  deleteProductPormotion: {
    url: "https://ashaabe.runasp.net/api/promotions/Product_Promotion/",
  },
  deleteCategoryPormotion: {
    url: "https://ashaabe.runasp.net/api/promotions/Category_Promotion/",
  },
  addProductPormotion: {
    url: "https://ashaabe.runasp.net/api/promotions/product",
  },
  addCategoryPormotion: {
    url: "https://ashaabe.runasp.net/api/promotions/category",
  },
  getOrder: {
    url: "https://ashaabe.runasp.net/api/Order/user/",
  },
  getAllOrder: {
    url: "https://ashaabe.runasp.net/api/Order/all",
  },
  createOrder: {
    url: "https://ashaabe.runasp.net/api/Order/create",
  },
  changeStatus: {
    url: "https://ashaabe.runasp.net/api/Order/change-status",
  },
  address: {
    url: "https://ashaabe.runasp.net/api/user-addresses",
  },
  statistics: {
    url: "https://ashaabe.runasp.net/api/Statistics/dashboard-stats",
  },
};

export default summaryApi;
