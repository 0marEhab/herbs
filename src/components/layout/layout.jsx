import Footer from "../website/footer/Footer";
import Header from "../website/header/Header";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Header />
      <div className="overflow-hidden mt-16 ">
        <Outlet />
      </div>
    </>
  );
}
