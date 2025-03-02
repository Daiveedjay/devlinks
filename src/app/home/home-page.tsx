import Navbar from "@/components/nav-bar";
import React from "react";
import HomeMain from "./home-main";

export default function HomePage() {
  return (
    <div className="bg-gray-background h-[100dvh] flex flex-col gap-4">
      <Navbar />
      <HomeMain />
    </div>
  );
}
