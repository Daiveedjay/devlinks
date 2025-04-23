import Navbar from "@/components/resusables/nav-bar";
import React from "react";
import PhonePreview from "./phone-preview";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background dark:bg-sidebar-border  h-[100dvh] flex flex-col gap-4">
      <Navbar />
      <div className="bg-background dark:bg-sidebar-border overflow-y-auto flex-1 gap-4 flex">
        {/* Left Side: Phone Preview */}
        <div className="flex-1/3 bg-background  justify-center items-center hidden md:flex">
          <PhonePreview />
        </div>

        {/* Right Side: Dynamic Content */}
        <div className="flex-2/3 bg-background overflow-y-auto p-4 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
