import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export const LogoutButton = ({
  handleLogout,
}: {
  handleLogout: (event: React.MouseEvent) => void;
}) => {
  return (
    <div>
      {/* Handle Logout  */}
      <Button
        variant="outline"
        className=" group  dark:hover:text-foreground !py-6 w-32 xl:w-40 text-destructive !border-destructive hover:text-destructive hover:bg-destructive-foreground/20 flex items-center justify-center"
        onClick={handleLogout}>
        <LogOut className="h-5 group-hover:text-foreground text-destructive w-5 duration-200" />
        <span>Logout</span>
      </Button>
    </div>
  );
};
