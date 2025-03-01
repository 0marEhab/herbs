import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useDirection() {
  const { i18n } = useTranslation();
  const [dir, setDir] = useState(i18n.language === "en" ? "ltr" : "rtl");

  useEffect(() => {
    setDir(i18n.language === "en" ? "ltr" : "rtl");
  }, [i18n.language]);

  return dir;
}
