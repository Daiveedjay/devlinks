"use client";
import { useLogout } from "@/queries/auth/logout";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function UnauthorizedModal() {
  const isAuthorized = useAuthStore((store) => store.isUnauthorized);

  const logout = useLogout();

  return (
    <Dialog open={isAuthorized}>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle>Session Expired</DialogTitle>
          <DialogDescription>
            Your session has expired. Please log in again to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="default"
            className="w-full"
            onClick={async () => logout.mutate()}>
            Log In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
