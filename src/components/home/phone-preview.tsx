"use client";

import { cn } from "@/lib/utils";
import { useFetchLinks } from "@/queries/useLinks";
import { useLinkStore } from "@/store/useLinkStore";
import { useUserStore } from "@/store/useUserStore";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import LinkPreview from "./link-preview";
// import { useLinks } from "@/queries/useLinks";

export default function PhonePreview() {
  // const [isLoading, setIsLoading] = useState(true);
  const { errors, links } = useLinkStore((store) => store);

  const { username, bio, user_image, email } = useUserStore(
    (store) => store.user
  );

  // Add useLinks hook to get the data
  const { isLoading } = useFetchLinks("1");

  console.log("Preview Links", links);

  // Check if there's an error for this link

  return (
    <div className="relative preview__component w-[280px]  h-[575px]">
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
            <Image
              src={user_image === "" ? "/placeholder.jpg" : user_image}
              alt="Profile"
              width={88}
              height={88}
              className={cn(
                "w-full h-full object-cover duration-700 ease-in-out",
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              )}
              // onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Profile Name */}
          <h1 className="text-base font-bold text-gray-dark mb-[4px]">
            @{username || "Baby boy"}
          </h1>

          {/* Profile Email */}
          <p className="text-[14px] text-gray-medium mb-[8px]">
            {email || "email@example.com"}
          </p>
          <p className="text-[14px] text-gray-medium mb-[24px]">
            {bio || " An amazing bio goes here"}
          </p>

          {/* Links */}
          <div className="w-full space-y-4">
            {links?.length > 0
              ? links?.map((link) => {
                  const brand = link.Platform?.toLowerCase() || "default";
                  const hasError = !!errors[link.ID];
                  return (
                    <HoverCard key={link.ID}>
                      <HoverCardTrigger asChild>
                        <Link
                          href={hasError ? "#" : link.URL} // Prevent navigation if there's an error
                          target={hasError ? "_self" : "_blank"}
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: `var(--brand-${brand}, var(--brand-default))`,
                          }}
                          className={` items-center justify-between text-white w-full p-4 rounded-lg font-medium text-center flex transition-colors capitalize text-[14px] ${
                            hasError ? "opacity-50 pointer-events-none" : ""
                          }`}>
                          <span> {link.Platform}</span>
                          {!hasError && link.URL !== "" ? (
                            <span>
                              <ArrowRight size={16} />
                            </span>
                          ) : null}
                        </Link>
                      </HoverCardTrigger>
                      {!hasError ? (
                        <HoverCardContent className="w-full hover:bg-purple-light">
                          <LinkPreview url={link.URL} />
                        </HoverCardContent>
                      ) : null}
                    </HoverCard>
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
