import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./button";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
  }, []);

  return (
    <div className="flex w-full  justify-center items-center gap-5">
      <Button onClick={() => changeLanguage("en")}>English</Button>
      <Button onClick={() => changeLanguage("ar")}>العربية</Button>
    </div>
  );
};

export default LanguageSwitcher;
