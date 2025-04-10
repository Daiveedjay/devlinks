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
            <TooltipTrigger asChild>
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
            <TooltipTrigger asChild>
              <span
                className="hover:-translate-y-1 duration-300 transition-all p-1 text-red-error cursor-pointer rounded-full"
                onClick={onRemove}>
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
            <TooltipTrigger asChild>
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
    </>
  );
}
