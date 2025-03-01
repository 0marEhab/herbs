import Footer from "@/components/website/footer/Footer";
import Section1 from "../../../components/website/home/Section1";
import Section2 from "../../../components/website/home/Section2";
import Section3 from "../../../components/website/home/Section3";
import Section4 from "../../../components/website/home/Section4";
import UserContext from "@/Contexts/UserContext";
import { useContext } from "react";

export default function Home() {
  return (
    <div>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </div>
  );
}
