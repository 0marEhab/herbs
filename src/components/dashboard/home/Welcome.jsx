import { useContext } from "react";
import UserContext from "../../../Contexts/UserContext";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/hooks/useDirection";
export default function Welcome() {
  const { t } = useTranslation(); // Initialize useTranslation
  const { user } = useContext(UserContext);
  const dir = useDirection();
  return (
    <div className="p-10 flex flex-col gap-3  border-b" dir={dir}>
      <h1 className="text-black  font-bold text-4xl">
        {t("welcomeBack")} <span className="text-green-600">{user?.userName}</span>
      </h1>
      <p className="text-gray-500 text-lg">{t("homeDescription")}</p>
    </div>
  );
}
