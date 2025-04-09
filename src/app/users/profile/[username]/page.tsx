import { apiEndpoint } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Link as LinkType } from "@/store/useLinkStore";

export type UserProfileResponse = {
  id: number;
  username: string;
  email: string;
  bio: string;
  user_image: string;
  links: LinkType[];
};

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  // Await the params to ensure they've been resolved
  const resolvedParams = await Promise.resolve(params);
  const { username } = resolvedParams;

  const response = await fetch(`${apiEndpoint}/users/profile/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Optionally, handle errors or parse JSON here
  console.log(response, "data in profile page");

  if (!response.ok) {
    console.log(response, "response in profile page");
    // throw new Error("Failed to fetch user profile data");
  }

  const data = await response.json();

  const userData: UserProfileResponse = data.data;
  console.log(data, "data in profile page");

  const { bio, user_image, email, links } = userData;

  return (
    <div className=" bg-gray-background">
      <div className=" p-8 rounded-b-3xl bg-purple-primary h-[50dvh]"></div>
      <div className=" flex justify-center">
        <div className="w-[350px] rounded-3xl -translate-y-40 overflow-y-auto max-h-[560px] bg-white shadow-sm flex flex-col p-8 items-center">
          <div className=" relative w-28 rounded-full min-h-28 outline-4 outline-purple-primary overflow-hidden">
            <Image
              src={user_image === "" ? "/placeholder.jpg" : user_image}
              fill
              className=" object-cover"
              alt="Placeholder"
            />
          </div>
          <div>
            <h3 className="medium__header mt-6"> @{username}</h3>

            <p className="text-[14px] text-gray-medium  mb-[8px]">{email}</p>
            <p className="text-[14px] text-gray-medium mb-[24px]">{bio}</p>
          </div>
          <ul className=" mt-6 w-full text-white flex flex-col gap-4">
            {links?.map((link) => {
              const brand = link.Platform?.toLowerCase() || "default";
              return (
                <Link
                  href={link.URL}
                  target="_blank"
                  className="p-4 rounded-[6px] bg-purple-primary w-full capitalize flex justify-between items-center"
                  style={{
                    backgroundColor: `var(--brand-${brand}, var(--brand-default))`,
                  }}
                  key={link.ID}>
                  <span> {link.Platform}</span>
                  <span>
                    <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
