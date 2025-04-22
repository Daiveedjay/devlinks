import { Link as IconLink } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
export const HomeLinksButton = () => {
  const currentPath = usePathname();
  return (
    <Link href="/">
      <Button
        variant={currentPath === "/" ? "active" : "ghost"}
        className=" dark:text-foreground w-32 xl:w-40 flex items-center justify-center !py-6">
        <IconLink
          className={`h-5 w-5 ${
            currentPath === "/"
              ? "dark:text-foreground text-purple-primary"
              : ""
          }`}
        />
        <span>Links</span>
      </Button>
    </Link>
  );
};
