"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

export function ImageUploader() {
  const { updateUser, user } = useUserStore((store) => store);
  const [image, setImage] = useState<string | StaticImageData>(
    user.user_image || "/placeholder.jpg"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload completion
    setTimeout(() => {
      setIsUploading(false);
      clearInterval(interval);
    }, 2000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("Image must be less than 5MB");
      e.target.value = ""; // Reset input
      return;
    }

    handleUploadStart();

    try {
      // Create a local preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          // After "upload" completes, set the image
          setTimeout(() => {
            setImage(result);
            updateUser({ user_image: result });
          }, 2000);
        }
      };
      reader.readAsDataURL(file);

      console.log("Uploading image:", file);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-full aspect-square max-w-[240px]  rounded-md overflow-hidden">
      <Image
        src={image}
        sizes="100%"
        fill
        className=" object-cover"
        alt="Avatar"
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center cursor-pointer"
        whileHover={{ opacity: 0.8 }}
        onClick={handleButtonClick}>
        <ImageIcon className="w-10 h-10 text-white mb-2" />
        <span className="text-white font-medium">Change Image</span>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </motion.div>

      {/* Upload Progress Overlay */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="w-4/5 mb-4">
              <ProgressBar progress={uploadProgress} />
            </div>
            <span className="text-white text-sm">Uploading...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-white"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "easeInOut" }}
      />
    </div>
  );
}
