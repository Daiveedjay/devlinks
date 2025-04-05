import { CircleUserRound } from "lucide-react";
import { Button } from "../ui/button";

export const PreviewButton = ({
  handleNavigation,
}: {
  handleNavigation: (e: React.MouseEvent, path: string) => void;
}) => {
  return (
    <div className=" ml-auto">
      {/* Handle Preview Navigation */}
      <Button
        variant="outline"
        className=" w-32 !py-6 xl:w-40 flex items-center justify-center "
        onClick={(e) => handleNavigation(e, "/preview")}>
        <CircleUserRound className="h-5 text-purple-primary w-5" />
        <span>Preview</span>
      </Button>
    </div>
  );
};
