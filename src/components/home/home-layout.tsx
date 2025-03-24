import Navbar from "@/components/resusables/nav-bar";
import PhonePreview from "./phone-preview";
import React from "react";
import { User } from "@/store/useUserStore";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock data (replace with actual data fetching)
  const mockProfile: User = {
    id: "1",
    bio: "I'm a software engineer who loves building web applications.",
    user_image: "/placeholder.jpg",
    username: "John",
    email: "john@example.com",
  };

  const mockLinks = [
    {
      ID: "1",
      title: "My Portfolio",
      URL: "https://example.com",
      Platform: "portfolio",
    },
    {
      ID: "2",
      title: "My GitHub",
      URL: "https://github.com",
      Platform: "github",
    },
    {
      ID: "3",
      title: "My LinkedIn",
      URL: "https://linkedin.com",
      Platform: "linkedin",
    },
  ];

  return (
    <div className="bg-gray-background h-[100dvh] flex flex-col gap-4">
      <Navbar />
      <div className="bg-gray-background overflow-y-auto flex-1 gap-4 flex">
        {/* Left Side: Phone Preview */}
        <div className="flex-1/3 bg-white flex justify-center items-center">
          <PhonePreview profile={mockProfile} links={mockLinks} />
        </div>

        {/* Right Side: Dynamic Content */}
        <div className="flex-2/3 bg-white overflow-y-auto p-8">{children}</div>
      </div>
    </div>
  );
}
