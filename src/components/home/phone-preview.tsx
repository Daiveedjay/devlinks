"use client";

import { cn } from "@/lib/utils";
import { Link as LinkType, useLinkStore } from "@/store/useLinkStore";
import { User, useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PhonePreviewProps {
  profile: User;
  links?: LinkType[];
}

export default function PhonePreview({ profile }: PhonePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const links = useLinkStore((store) => store.links);

  const { username, bio, user_image } = useUserStore((store) => store.user);

  return (
    <div className="relative w-[280px]  h-[575px]">
      {" "}
      {/* Adjusted to 280x575 */}
      {/* Phone Frame SVG */}
      <svg
        className="absolute inset-0"
        width="280"
        height="575"
        viewBox="0 0 308 632"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "scale(0.91)" }} // Adjusted scale factor
      >
        <path
          d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z"
          stroke="#737373"
        />
        <path
          d="M12 55.5C12 30.9233 31.9233 11 56.5 11H80.5C86.8513 11 92 16.1487 92 22.5C92 30.5081 98.4919 37 106.5 37H201.5C209.508 37 216 30.5081 216 22.5C216 16.1487 221.149 11 227.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5Z"
          fill="white"
          stroke="#737373"
        />
      </svg>
      {/* Content Container */}
      <div className="absolute h-4/5  overflow-auto top-[60px] left-[11px] right-[11px] bottom-[11px] ">
        <div className="flex flex-col items-center pt-[16px] px-6">
          {/* Profile Image */}
          <div className="w-[88px] h-[88px] rounded-full overflow-hidden bg-[#EEEEEE] mb-[24px]">
            {profile?.user_image ? (
              <Image
                src={profile.user_image || "/placeholder.jpg"}
                alt="Profile"
                width={88}
                height={88}
                className={cn(
                  "w-full h-full object-cover duration-700 ease-in-out",
                  isLoading
                    ? "scale-110 blur-2xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                )}
                onLoad={() => setIsLoading(false)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 0C8.95427 0 0 8.95427 0 20C0 31.0457 8.95427 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95427 31.0457 0 20 0ZM20 8.5C24.1421 8.5 27.5 11.8579 27.5 16C27.5 20.1421 24.1421 23.5 20 23.5C15.8579 23.5 12.5 20.1421 12.5 16C12.5 11.8579 15.8579 8.5 20 8.5ZM20 35C15.2667 35 11.0765 32.7639 8.39969 29.2429C9.95969 26.5307 12.8719 24.75 16.25 24.75C16.4199 24.75 16.5899 24.7779 16.7539 24.8279C17.7959 25.1639 18.8759 25.35 20 25.35C21.1241 25.35 22.2041 25.1639 23.2461 24.8279C23.4101 24.7779 23.5801 24.75 23.75 24.75C27.1281 24.75 30.0403 26.5307 31.6003 29.2429C28.9235 32.7639 24.7333 35 20 35Z"
                    fill="#737373"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Profile Name */}
          <h1 className="text-base font-bold text-gray-dark mb-[4px]">
            @{username || "John Doe"}
          </h1>

          {/* Profile Email */}
          <p className="text-[14px] text-gray-medium mb-[8px]">
            {profile?.email || "email@example.com"}
          </p>
          <p className="text-[14px] text-gray-medium mb-[24px]">
            {bio || "email@example.com"}
          </p>

          {/* Links */}
          <div className="w-full space-y-4">
            {links.length > 0
              ? links.map((link) => {
                  const brand = link.platform?.toLowerCase() || "default";
                  return (
                    <Link
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: `var(--brand-${brand}, var(--brand-default))`,
                      }}
                      className="block text-white w-full p-4  rounded-lg font-medium text-center transition-colors capitalize text-[14px]">
                      {link.platform}
                    </Link>
                  );
                })
              : Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-[44px] bg-[#EEEEEE] rounded-lg"
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
