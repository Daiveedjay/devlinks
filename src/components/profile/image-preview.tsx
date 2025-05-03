"use client";

import type React from "react";

import Image, { type StaticImageData } from "next/image";
import { Fullscreen, ImageMinus, Replace } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProfileImageModal from "@/components/resusables/profile-image-modal";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useUpdateUserImage } from "@/queries/user/user-image";

interface ImagePreviewProps {
  previewImage: string | StaticImageData;
  onRemove: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImagePreview({
  previewImage,
  onRemove,
  onFileChange,
}: ImagePreviewProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const user = useUserStore((store) => store.user);

  const { isPending } = useUpdateUserImage();
  return (
    <>
      <Image
        src={previewImage}
        fill
        sizes="100%"
        alt="Avatar"
        className="object-cover rounded-lg"
      />
      <div className="absolute translate-y-full bottom-0 left-0 right-0 flex items-center justify-between p-2 gap-2">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger
              asChild
              onClick={(e) => {
                if (isPending) return;
                e.preventDefault();
                setIsImageModalOpen(true);
              }}>
              <span className="hover:-translate-y-1 duration-300 transition-all p-1 text-purple-primary cursor-pointer rounded-full">
                <Fullscreen strokeWidth={1} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>View full size</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger
              asChild
              onClick={(e) => {
                if (isPending) return;
                e.preventDefault();
                onRemove();
              }}>
              <span className="hover:-translate-y-1 duration-300 transition-all p-1 text-red-error cursor-pointer rounded-full">
                <ImageMinus strokeWidth={1} />
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5}>
              <p>Remove image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger
              asChild
              onClick={(e) => {
                if (isPending) return;
                e.preventDefault();
              }}>
              <span className="hover:-translate-y-1 duration-300 transition-all p-1 text-chart-4 rounded-full relative">
                <Replace strokeWidth={1} />
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={onFileChange}
                  accept="image/*"
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Replace image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ProfileImageModal
        isOpen={isImageModalOpen}
        setIsOpen={setIsImageModalOpen}
        imageUrl={user.user_image}
        username={user.username}
      />
    </>
  );
}
