import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ProfileImageModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  imageUrl: string;
  username?: string;
}

export default function ProfileImageModal({
  isOpen,
  setIsOpen,
  imageUrl,
  username,
}: ProfileImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] flex flex-col items-center p-4">
        <DialogHeader>
          <DialogTitle>
            {username ? `${username}'s Profile` : "Profile Image"}
          </DialogTitle>
        </DialogHeader>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.webp"}
            alt="Profile picture"
            fill
            className="object-cover"
            sizes="(max-width: 600px) 100vw, 600px"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
