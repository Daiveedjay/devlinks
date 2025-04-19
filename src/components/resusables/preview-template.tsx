import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { User } from "@/store/useUserStore";
import { Link as LinkType } from "@/store/useLinkStore";

export default function PreviewTemplate({
  user,
}: {
  user: User & { links: LinkType[] };
}) {
  const { username, bio, user_image, email, links } = user;
  return (
    <div className=" bg-gray-background">
      <div className=" p-8 rounded-b-3xl bg-purple-primary h-[50dvh]">
        <div className="p-4 bg-white flex justify-between items-center rounded-md">
          <Link href="/">
            {" "}
            <Button variant="outline" className=" px-6 py-5">
              Back to Editor
            </Button>
          </Link>
          <Button variant="default" className=" px-6 py-5">
            Share link
          </Button>
        </div>
      </div>
      <div className=" flex justify-center">
        <div className="w-[350px] rounded-3xl -translate-y-40 overflow-y-auto max-h-[560px] bg-white shadow-sm flex flex-col p-8 items-center">
          <div className=" relative w-28 rounded-full min-h-28 outline-4 outline-purple-primary overflow-hidden">
            <Image
              src={user_image === "" ? "/placeholder.webp" : user_image}
              priority
              fill
              sizes="112px"
              className=" object-cover"
              alt="Placeholder"
            />
          </div>
          <div>
            <h3 className="medium__header mt-6"> @{username || "John Doe"}</h3>

            <p className="text-[14px] text-gray-medium  mb-[8px]">{email}</p>
            <p className="text-[14px] text-gray-medium mb-[24px]">
              {bio || " No bio"}
            </p>
          </div>
          <ul className=" mt-6 w-full text-white flex flex-col gap-4">
            {links?.map((link) => {
              const brand = link.Platform?.toLowerCase() || "default";
              return (
                <Link
                  href={link.URL}
                  target="_blank"
                  className="p-4 rounded-lg bg-purple-primary w-full capitalize flex justify-between items-center"
                  style={{
                    backgroundColor: `var(--brand-${brand}, var(--brand-default))`,
                  }}
                  key={link.order}>
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
