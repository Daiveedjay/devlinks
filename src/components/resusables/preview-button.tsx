import { CircleUserRound } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";

export const PreviewButton = ({
  handleNavigation,
}: {
  handleNavigation: (e: React.MouseEvent, path: string) => void;
}) => {
  return (
    <div className=" flex gap-6 items-center ml-auto">
      <ThemeToggle />
      {/* Handle Preview Navigation */}
      <Button
        variant="outline"
        className=" dark:text-foreground w-32 !py-6 xl:w-40 flex items-center justify-center "
        onClick={(e) => handleNavigation(e, "/preview")}>
        <CircleUserRound className="h-5 text-purple-primary dark:text-foreground w-5" />
        <span>Preview</span>
      </Button>
    </div>
  );
};
