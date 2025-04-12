"use client";

import Spinner from "@/components/resusables/spinner";
import { Button } from "@/components/ui/button";
import { useUpdateUserImage } from "@/queries/user/user-image";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { ImageUploadOverlay } from "./image-upload-overlay";
import { ImagePreview } from "./image-preview";

export default function ProfileImageUploader() {
  const { user, updateUser } = useUserStore((store) => store);
  const [originalImage, setOriginalImage] = useState(
    user.user_image || "/placeholder.webp"
  );
  const [previewImage, setPreviewImage] = useState(
    user.user_image || "/placeholder.webp"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [unsavedChange, setUnsavedChange] = useState(false);

  const { mutate: updateImage, isPending: isSaving } = useUpdateUserImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      e.target.value = "";
      return;
    }

    setIsProcessing(true);
    setUnsavedChange(true);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewImage(result);
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!selectedFile) return;

    updateImage(selectedFile, {
      onSuccess: (response) => {
        console.log("Image response", response);
        if (!response.data) {
          toast.error(
            "Image update failed. The server did not return a valid URL. Please try again or contact support."
          );
          setPreviewImage(originalImage);
          setUnsavedChange(false);
          return;
        }

        toast.success("Image updated successfully!");
        setOriginalImage(previewImage);

        updateUser({ user_image: response.data });
        setUnsavedChange(false);
        setSelectedFile(null);
      },
      onError: (error: any) => {
        toast.error(error.message);
        setPreviewImage(originalImage);
        setUnsavedChange(false);
      },
    });
  };

  return (
    <div className="bg-gray-background mt-16 mb-8 p-8 rounded-[12px]">
      <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 lg:items-center">
        <p className="medium__text flex-1/3">Profile Picture</p>
        <div className="flex-1 lg:flex-2/3 gap-14 flex flex-col lg:flex-row items-start lg:items-center lg:gap-4">
          <div className="relative aspect-square w-full lg:max-w-[240px] border-2 rounded-lg">
            {!selectedFile ? (
              <>
                <Image
                  src={originalImage}
                  fill
                  sizes="100%"
                  alt="Avatar"
                  className="object-cover rounded-lg"
                />
                <ImageUploadOverlay onFileChange={handleFileChange} />
              </>
            ) : (
              <ImagePreview
                previewImage={previewImage}
                onRemove={() => {
                  setSelectedFile(null);
                  setUnsavedChange(false);
                }}
                onFileChange={handleFileChange}
              />
            )}
          </div>
          <p className="lg:p-8 small__text">
            Image must be below 5MB. Preferably use PNG or JPG format.
          </p>
        </div>
      </div>

      {unsavedChange && (
        <Button
          className="mt-10"
          onClick={handleSave}
          disabled={isProcessing || isSaving}>
          {isSaving && <Spinner />} Save Image
        </Button>
      )}
    </div>
  );
}
