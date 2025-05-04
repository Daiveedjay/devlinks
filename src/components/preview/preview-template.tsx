"use client";

import { Link as LinkType } from "@/store/useLinkStore";
import { User } from "@/store/useUserStore";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import ShareLinksModal from "./share-links-modal";

export default function PreviewTemplate({
  user,
}: {
  user: User & { links: LinkType[] };
}) {
  const { username, bio, user_image, email, links } = user;

  const [open, setOpen] = useState(false);
  return (
    <>
      {" "}
      <div className=" bg-background">
        <div className=" p-4 sm:p-8 rounded-b-3xl bg-purple-primary dark:bg-sidebar h-[50dvh]">
          <div className="p-4 bg-white t dark:bg-background flex justify-between items-center rounded-md">
            <Link href="/">
              {" "}
              <Button
                variant="outline"
                className=" text-foreground px-6 border-2 gap-1 py-5 dark:bg-transparent dark:hover:bg-sidebar-primary ">
                Back<span className="hidden sm:inline">to Editor</span>
              </Button>
            </Link>
            <Button
              variant="default"
              className=" dark:bg-sidebar-primary dark:text-foreground dark:hover:bg-sidebar-primary/70 px-6 py-5"
              onClick={() => setOpen(true)}>
              Share page
            </Button>
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="w-full mx-4 sm:mx-0 sm:w-[350px] rounded-3xl -translate-y-40 sm:overflow-y-auto h-full sm:max-h-[560px] shadow-lg dark:shadow-2xl dark:border-2 dark:border-sidebar-accent flex flex-col p-4 sm:p-8 items-center bg-background">
            <div className=" relative w-28 rounded-full h-28 dark:outline-sidebar-border outline-4 outline-purple-primary overflow-hidden">
              <Avatar className=" w-28 h-28 mb-4">
                <AvatarImage
                  src={user_image || "/placeholder.webp"}
                  alt="Profile"
                  height={112}
                  width={112}
                  className="object-cover"
                  sizes="100%"
                />
                <AvatarFallback>{username}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="medium__header  mt-6 break-words max-w-[75%]">
                @{username}
              </h3>

              <p className="text-[14px] dark:text-primary text-gray-medium  mb-[8px]">
                {email}
              </p>
              <p className="text-[14px] dark:text-primary  text-gray-medium mb-[24px]">
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
                    className="p-4 rounded-lg bg-purple-primary w-full capitalize flex justify-between group items-center"
                    style={{
                      backgroundColor: `var(--brand-${brand}, var(--brand-default))`,
                    }}
                    key={link.order}>
                    <span> {link.Platform}</span>
                    <span className=" transform transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <ShareLinksModal open={open} setOpen={setOpen} user={user} />
    </>
  );
}
