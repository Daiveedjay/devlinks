import React from "react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { CircleUserRound, Link } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="py-4 bg-white px-8 flex items-center  ">
      <div className=" flex-1/3  flex justify-start">
        <Logo />
      </div>
      <div className=" flex-2/3 flex justify-between ">
        <div className="w-full flex items-center gap-4">
          <Button
            variant="active"
            className="w-40 text-purple-primary  flex items-center justify-center py-6 ">
            <Link className="h-5 text-purple-primary w-5 " />
            <span>Links</span>
          </Button>
          <Button
            variant="ghost"
            className="w-40 text-gray-medium    flex items-center justify-center py-6 ">
            <CircleUserRound className="h-5  w-5 " />
            <span>Profile</span>
          </Button>
        </div>
        <div>
          {" "}
          <Button
            variant="outline"
            className="w-40   flex items-center justify-center py-6 ">
            <CircleUserRound className="h-5 text-purple-primary w-5 " />
            <span>Preview</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
