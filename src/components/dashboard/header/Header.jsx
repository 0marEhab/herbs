import React, { useContext } from "react";
import { Button } from "../../ui/button";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiInbox } from "react-icons/fi";
import UserContext from "../../../Contexts/UserContext";
import summaryApi from "../../../common";
import LanguageSwitcher from "../../ui/LanguageSwitcher";
import { Link } from "react-router-dom";
export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="border-gray-300 border-b">
      <nav className="flex justify-end items-end px-4 py-3">
        <ul className="flex gap-4 justify-center items-center">
          <Link to={"/"}>
            <Button>Home</Button>
          </Link>
          <li>
            <LanguageSwitcher className=" flex items-center w-full justify-center" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
