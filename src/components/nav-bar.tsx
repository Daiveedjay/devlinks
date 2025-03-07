import { CircleUserRound, Link as IconLink } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import { Button } from "./ui/button";
import { cookies } from "next/headers";
export default async function Navbar() {
  // Read the pathname from cookies
  const cookieStore = await cookies();
  const currentPath = cookieStore.get("currentPath")?.value || "/";

  return (
    <nav className="py-4 bg-white px-8 flex items-center  ">
      <div className=" flex-1/3  flex justify-start">
        <Logo />
      </div>
      <div className=" flex-2/3 flex justify-between ">
        <div className="w-full flex items-center gap-4">
          <Link href="/">
            <Button
              variant={currentPath === "/" ? "active" : "ghost"}
              className="w-40   flex items-center justify-center py-6 ">
              <IconLink
                className={`h-5  w-5 ${
                  currentPath === "/" ? "text-purple-primary" : ""
                }`}
              />
              <span>Links</span>
            </Button>
          </Link>
          <Link href="profile">
            <Button
              variant={currentPath === "/profile" ? "active" : "ghost"}
              className="w-40     flex items-center justify-center py-6 ">
              <CircleUserRound className="h-5  w-5 " />
              <span>Profile</span>
            </Button>
          </Link>
        </div>
        <div>
          {" "}
          <Link href="preview">
            <Button
              variant="outline"
              className="w-40   flex items-center justify-center py-6 ">
              <CircleUserRound className="h-5 text-purple-primary w-5 " />
              <span>Preview</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
