"use client";
import { Button } from "@/components/ui/button";
import { useLinkStore } from "@/store/useLinkStore";
import { useUserStore } from "@/store/useUserStore";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const links = useLinkStore((store) => store.links);
  console.log("Links", links);
  const { username, bio, user_image, email } = useUserStore(
    (store) => store.user
  );
  return (
    <div className=" bg-gray-background">
      <div className=" p-8 rounded-b-3xl bg-purple-primary h-[50dvh]">
        <div className="p-4 bg-white flex justify-between items-center rounded-md">
          <Link href="profile">
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
              src={user_image === "" ? "/placeholder.jpg" : user_image}
              fill
              className=" object-cover"
              alt="Placeholder"
            />
          </div>
          <div>
            <h3 className="medium__header mt-6"> @{username || "John Doe"}</h3>

            <p className="text-[14px] text-gray-medium text-center mb-[8px]">
              {email || "email@example.com"}
            </p>
            <p className="text-[14px] text-gray-medium mb-[24px]">
              {bio || " An amazing bio goes here"}
            </p>
          </div>
          <ul className=" mt-14 w-full text-white flex flex-col gap-4">
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
