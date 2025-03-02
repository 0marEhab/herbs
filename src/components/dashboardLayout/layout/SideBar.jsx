import { GalleryVerticalEnd, SquareTerminal } from "lucide-react";
import { NavMain } from "@/components/shadcnNavbar/nav-main";

import { NavUser } from "@/components/shadcnNavbar/nav-user";
import { TeamSwitcher } from "@/components/shadcnNavbar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useContext } from "react";
import UserContext from "../../../Contexts/UserContext";
import summaryApi from "../../../common";

// This is sample data.

export default function SideBar({ ...props }) {
  const { user } = useContext(UserContext);
  const data = {
    user: {
      name: "A'Shaby DashBoard",

      avatar: `${summaryApi.domain.url}/${user?.profilePic}`,
    },
    teams: [
      {
        name: "A'Shaby DashBoard",
        logo: GalleryVerticalEnd,
      },
    ],
    navMain: [
      {
        title: "Home",
        url: "/dashboard/",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Home",
            url: "/dashboard/",
          },
        ],
      },
      {
        title: "Herbs",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Products",
            url: "/dashboard/Herbs",
          },
          {
            title: "categories",
            url: "/dashboard/categories",
          },
        ],
      },
      // {
      //   title: "Gallery",
      //   url: "/gallery",
      //   icon: SquareTerminal,
      //   isActive: true,
      //   items: [
      //     {
      //       title: "gallery",
      //       url: "/gallery",
      //     },
      //   ],
      // },
      ...[
        {
          title: "employee list",
          url: "/dashboard/employee",
          icon: SquareTerminal,
          isActive: true,
          items: [
            {
              title: "list",
              url: "/dashboard/employee",
            },
          ],
        },
      ],
      {
        title: "Orders",
        url: "/dashboard/employee",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "orders",
            url: "/dashboard/orders",
          },
        ],
      },
      {
        title: "Pormotions",
        url: "/dashboard/employee",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "active Pormotions",
            url: "/dashboard/activePormotions",
          },
        ],
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent >
        <NavMain  items={data.navMain} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
