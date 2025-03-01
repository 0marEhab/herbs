import Header from "../../dashboard/header/Header";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBar from "./SideBar";
export default function Layout() {
  return (
    <>
      <Header />
      <SidebarProvider>
        <SideBar />
        <Outlet />
        <SidebarTrigger />
      </SidebarProvider>
    </>
  );
}
