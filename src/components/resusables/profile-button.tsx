import { CircleUserRound } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export const ProfileButton = ({
  handleNavigation,
}: {
  handleNavigation: (e: React.MouseEvent, path: string) => void;
}) => {
  const currentPath = usePathname();
  return (
    <Button
      variant={currentPath === "/profile" ? "active" : "ghost"}
      className={` w-32 group  dark:text-foreground  xl:w-40 flex items-center  justify-center !py-6 ${
        currentPath !== "/profile" && "dark:hover:text-sidebar-primary"
      }`}
      onClick={(e) => handleNavigation(e, "/profile")}>
      <CircleUserRound
        className={`h-5 w-5 ${
          currentPath === "/profile"
            ? "text-purple-primary dark:text-foreground"
            : ""
        }`}
      />
      <span>Profile</span>
    </Button>
  );
};
