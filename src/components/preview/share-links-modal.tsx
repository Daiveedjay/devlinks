"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/store/useUserStore";
import { X } from "lucide-react";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ShareLinksCarousel from "./share-links-carousel";

export default function ShareLinksModal({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User;
}) {
  const { user_image, username } = user;

  return (
    <div className="flex fixed min-h-screen items-center justify-center bg-gray-800 p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[90%] sm:max-w-md p-0 overflow-hidden bg-background">
          <DialogHeader className="p-4 pb-0 flex justify-between items-center">
            <DialogTitle className="text-center w-full font-medium text-foreground">
              Share Devlinks
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 h-6 w-6 rounded-full"
              onClick={() => setOpen(false)}>
              <X className="h-4 w-4 hover:text-blue-300" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>

          <div className="  mx-6 rounded-md bg-sidebar-border p-8 flex flex-col items-center">
            <Avatar className=" w-32 h-32 mb-4">
              <AvatarImage
                src={user_image}
                alt="Profile"
                height={96}
                width={96}
                className="object-cover"
                sizes="100%"
              />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
            <h2 className="text-foreground text-xl font-semibold mb-1">
              @{username}
            </h2>
          </div>

          <div className="px-6 overflow-x-auto">
            <ShareLinksCarousel username={username} />
          </div>

          <div className="p-4 border-t sm:mt-2">
            <h3 className="font-medium text-foreground text-md">
              Join {username} on Devlinks
            </h3>

            <div className="flex mt-2 gap-4">
              <Link href="/login" className="block w-full">
                {" "}
                <Button className="rounded-full flex-1 w-full py-6 dark:bg-purple-light text-background dark:text-foreground ">
                  Sign up free
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
