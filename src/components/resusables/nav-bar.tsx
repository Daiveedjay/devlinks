"use client";

import { useLogout } from "@/queries/auth/logout";
import { useLinkStore } from "@/store/useLinkStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HamburgerMenu from "./hamburger-menu";
import { HomeLinksButton } from "./home-links-button";
import Logo from "./logo";
import { LogoutButton } from "./logout-button";
import { PreviewButton } from "./preview-button";
import { ProfileButton } from "./profile-button";
import UnsavedModal from "./unsaved-modal";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const router = useRouter();
  const { hasUnsavedChanges, revertUnsavedChanges } = useLinkStore(
    (store) => store
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  const logout = useLogout();

  // const hasUnsavedChanges = links.some(
  //   (link) =>
  //     link.isNew || link.Platform === "" || link.URL === "" || link.dirty
  // );

  // Intercept navigation
  const handleNavigation = (event: React.MouseEvent, path: string) => {
    if (hasUnsavedChanges()) {
      event.preventDefault(); // Prevent routing
      setPendingRoute(path); // Store the path
      setIsDialogOpen(true); // Show dialog
    } else {
      router.push(path); // Navigate if all links are saved
    }
  };

  // For logout: check for unsaved changes and call logout when confirmed.
  const handleLogout = (event: React.MouseEvent) => {
    if (hasUnsavedChanges()) {
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
      revertUnsavedChanges();

      router.push(pendingRoute);
    }
    setIsDialogOpen(false);
    setPendingRoute(null);
  };

  return (
    <>
      <nav className="py-4 relative bg-background px-4 sm:px-8 flex items-center">
        <div className="flex-1/3 flex justify-start">
          <Logo />
        </div>
        <div className="flex-2/3 flex justify-between">
          <div className="w-full hidden lg:flex  items-center gap-4">
            <HomeLinksButton />
            <ProfileButton handleNavigation={handleNavigation} />
            <LogoutButton handleLogout={handleLogout} />

            <PreviewButton handleNavigation={handleNavigation} />
          </div>
        </div>

        <div className="lg:hidden items-center gap-6 flex">
          <ThemeToggle />
          <HamburgerMenu />
        </div>
      </nav>

      {/* Dialog for Unsaved Changes */}
      <UnsavedModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleIgnoreAndNavigate={handleIgnoreAndNavigate}
      />
    </>
  );
}
