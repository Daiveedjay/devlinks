import { useLinkPreview } from "@/queries/useLinkPreview";
import Image from "next/image";
import Spinner from "../resusables/spinner";
import Link from "next/link";
import { useMemo } from "react";
import { platforms } from "@/lib/constants";

export default function LinkPreview({ url }: { url: string }) {
  const { data: preview, isLoading, error } = useLinkPreview(url);

  // Extract hostname to check if it's allowed
  const hostname = useMemo(() => {
    try {
      return new URL(preview?.image).hostname;
    } catch {
      return null;
    }
  }, [preview?.image]);

  console.log("loading", isLoading);
  console.log("preview", error);

  if (!url || url === "")
    return <span className="text-sm text-red-error">No link provided</span>;

  if (isLoading)
    return (
      <div className="w-20 h-20 flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (error || !preview)
    return (
      <p className="text-sm text-red-error">
        Failed to load preview, check the link you inputted
      </p>
    );

  // Only allow images from configured domains
  const isAllowedImage =
    hostname &&
    platforms
      .map((platform) => platform.domainAvatar)
      .filter(Boolean) // Remove undefined values (like website platform)
      .includes(hostname);

  return (
    <Link
      href={url}
      target="_blank"
      className="p-2 block border rounded-lg w-64 bg-white shadow-md">
      {isAllowedImage ? (
        <Image
          width={100}
          height={100}
          src={preview.image}
          alt={preview.title}
          className="w-full h-32 object-cover rounded"
        />
      ) : (
        <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
          Can&apos;t display preview image
        </div>
      )}
      <h4 className="font-semibold text-sm mt-2">{preview.title}</h4>
      <p className="text-xs text-gray-500">{preview.description}</p>
    </Link>
  );
}
