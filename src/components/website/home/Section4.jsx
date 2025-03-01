import React from "react";
import Card from "./Card";

export default function Section4() {
  return (
    <div className="mt-14 flex flex-col lg:flex-row items-center justify-center gap-5 font-body">
      <Card image="/card1.webp" />
      <Card image="/card2.webp" />
      <Card image="/card3.webp" />
    </div>
  );
}
