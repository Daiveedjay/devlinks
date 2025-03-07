"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
              src="/placeholder.jpg"
              fill
              className=" object-cover"
              alt="Placeholder"
            />
          </div>
          <div>
            <h3 className="medium__header mt-6">Ben Wright</h3>
            <p className="small__text mt-4 text-center">ben@example.com</p>
          </div>
          <ul className=" mt-14 w-full text-white flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <li
                className="p-4 rounded-[6px] bg-purple-primary w-full"
                key={index}>
                Instagram
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
