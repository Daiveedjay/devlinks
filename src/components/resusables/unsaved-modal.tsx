import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function UnsavedModal({
  isDialogOpen,
  setIsDialogOpen,
  handleIgnoreAndNavigate,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleIgnoreAndNavigate: () => void;
}) {
  return (
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
  );
}
