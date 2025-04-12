"use client";

import { Button } from "@/components/ui/button";
import { HAMBURGER_VARIANTS } from "@/lib/constants";
import { useClickOutside } from "@/lib/hooks";
import { useLogout } from "@/queries/auth/logout";
import { useLinkStore } from "@/store/useLinkStore";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CircleUserRound, LinkIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import UnsavedModal from "./unsaved-modal";

export default function HamburgerMenu() {
  const [active, setActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const currentPath = usePathname();
  const router = useRouter();
  const { links, cleanupEmptyLinks, setLinks } = useLinkStore((store) => store);
  const logout = useLogout();

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

  // For logout: check for unsaved changes and call logout when confirmed.
  const handleLogout = (event: React.MouseEvent) => {
    if (hasUnsavedChanges) {
      event.preventDefault();
      setPendingRoute("/logout");
      setIsDialogOpen(true);
    } else {
      logout.mutate();
    }
  };

  // Called when the user confirms to ignore unsaved changes.
  const handleIgnoreAndNavigate = () => {
    if (pendingRoute === "/logout") {
      logout.mutate();
    } else if (pendingRoute) {
      setLinks(links.filter((link) => link.isNew === false));
      router.push(pendingRoute);
    }
    setIsDialogOpen(false);
    setPendingRoute(null);
    cleanupEmptyLinks();
  };

  useClickOutside(buttonRef, () => setActive(false));

  return (
    <>
      <div className="relative">
        <MotionConfig
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}>
          <motion.button
            ref={buttonRef}
            initial={false}
            animate={active ? "open" : "closed"}
            onClick={() => setActive((pv) => !pv)}
            className="relative h-[50px] w-[50px] rounded-full transition-colors cursor-pointer hover:bg-white/20 z-50">
            <motion.span
              variants={HAMBURGER_VARIANTS.top}
              className="absolute h-1 w-10 bg-purple-primary rounded-sm"
              style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
            />
            <motion.span
              variants={HAMBURGER_VARIANTS.middle}
              className="absolute h-1 w-10 bg-purple-primary rounded-sm"
              style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
            />
            <motion.span
              variants={HAMBURGER_VARIANTS.bottom}
              className="absolute h-1 w-5 bg-purple-primary rounded-sm"
              style={{
                x: "-50%",
                y: "50%",
                bottom: "35%",
                left: "calc(50% + 10px)",
              }}
            />
          </motion.button>
        </MotionConfig>
        {/* Mobile Menu Popup */}

        <AnimatePresence>
          {active && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-[60px] right-0 w-56 bg-white rounded-lg  
shadow-lg h-60 border border-gray-200 overflow-hidden z-40 ${
                !active && "hidden"
              }`}>
              <div className="flex flex-col h-full p-2  ">
                {/* Navigation Links Group */}
                <div className="flex flex-col flex-1 gap-2">
                  <Link href="/" onClick={() => setActive(false)}>
                    <Button
                      variant={currentPath === "/" ? "active" : "ghost"}
                      className="w-full flex items-center justify-start gap-3 py-3 px-4 mb-1">
                      <LinkIcon
                        className={`h-5 w-5 ${
                          currentPath === "/" ? "text-purple-primary" : ""
                        }`}
                      />
                      <span>Links</span>
                    </Button>
                  </Link>

                  <Button
                    variant={currentPath === "/profile" ? "active" : "ghost"}
                    className="w-full flex items-center justify-start gap-3 py-3 px-4 mb-1"
                    onClick={(e) => handleNavigation(e, "/profile")}>
                    <CircleUserRound
                      className={`h-5 w-5 ${
                        currentPath === "/profile" ? "text-purple-primary" : ""
                      }`}
                    />
                    <span>Profile</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full py-3 px-4 flex items-center justify-start gap-3"
                    onClick={(e) => handleNavigation(e, "/preview")}>
                    <CircleUserRound className="h-5 text-purple-primary w-5" />
                    <span>Preview</span>
                  </Button>
                </div>

                {/* Logout Button */}
                <div className="mt-auto  pt-2">
                  <Button
                    variant="outline"
                    className="w-full py-3 px-4 text-destructive !border-destructive hover:text-destructive hover:bg-destructive-foreground/20 flex items-center justify-start gap-3"
                    onClick={handleLogout}>
                    <LogOut className="h-5 text-destructive w-5" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <UnsavedModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleIgnoreAndNavigate={handleIgnoreAndNavigate}
      />
    </>
  );
}
