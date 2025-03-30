"use client";

import { CircleUserRound, Link as IconLink } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useLinkStore } from "@/store/useLinkStore";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Navbar() {
  const currentPath = usePathname();
  const router = useRouter();
  const { links, cleanupEmptyLinks } = useLinkStore((store) => store);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  const hasUnsavedChanges = links.some(
    (link) => link.isNew || link.Platform === "" || link.URL === ""
  );

  // Intercept navigation
  const handleNavigation = (event: React.MouseEvent, path: string) => {
    if (hasUnsavedChanges) {
      event.preventDefault(); // Prevent routing
      setPendingRoute(path); // Store the path
      setIsDialogOpen(true); // Show dialog
    } else {
      router.push(path); // Navigate if all links are saved
    }
  };

  // Ignore warning and navigate
  const handleIgnoreAndNavigate = () => {
    if (pendingRoute) {
      router.push(pendingRoute);
      setIsDialogOpen(false);
      setPendingRoute(null);
      cleanupEmptyLinks();
    }
  };

  return (
    <>
      <nav className="py-4 bg-white px-8 flex items-center">
        <div className="flex-1/3 flex justify-start">
          <Logo />
        </div>
        <div className="flex-2/3 flex justify-between">
          <div className="w-full flex items-center gap-4">
            <Link href="/">
              <Button
                variant={currentPath === "/" ? "active" : "ghost"}
                className="w-40 flex items-center justify-center py-6">
                <IconLink
                  className={`h-5 w-5 ${
                    currentPath === "/" ? "text-purple-primary" : ""
                  }`}
                />
                <span>Links</span>
              </Button>
            </Link>
            {/* Handle Profile Navigation */}
            <Button
              variant={currentPath === "/profile" ? "active" : "ghost"}
              className="w-40 flex items-center justify-center py-6"
              onClick={(e) => handleNavigation(e, "/profile")}>
              <CircleUserRound
                className={`h-5 w-5 ${
                  currentPath === "/profile" ? "text-purple-primary" : ""
                }`}
              />
              <span>Profile</span>
            </Button>
          </div>
          <div>
            {/* Handle Preview Navigation */}
            <Button
              variant="outline"
              className="w-40 flex items-center justify-center py-6"
              onClick={(e) => handleNavigation(e, "/preview")}>
              <CircleUserRound className="h-5 text-purple-primary w-5" />
              <span>Preview</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Dialog for Unsaved Changes */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] text-black">
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved links. Do you want to stay and save, or continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Stay Here
            </Button>
            <Button variant="destructive" onClick={handleIgnoreAndNavigate}>
              Continue Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
