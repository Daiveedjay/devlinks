import { useLinkPreview } from "@/queries/links/useLinkPreview";
import Image from "next/image";
import Spinner from "../resusables/spinner";
import Link from "next/link";
import { useMemo } from "react";
import { platforms } from "@/lib/constants";

// Define the platform types
type PlatformWithAvatar = {
  value: string;
  label: string;
  icon: React.ComponentType;
  placeholder: string;
  domainAvatar: string; // This property is required for platforms with avatars
};

type PlatformWithoutAvatar = {
  value: string;
  label: string;
  icon: React.ComponentType;
  placeholder: string;
  domainAvatar?: string; // This property is optional for other platforms
};

type Platform = PlatformWithAvatar | PlatformWithoutAvatar;

// Type guard to filter platforms with domainAvatar
const isPlatformWithAvatar = (
  platform: Platform
): platform is PlatformWithAvatar => {
  return Boolean((platform as PlatformWithAvatar).domainAvatar);
};

export default function LinkPreview({ url }: { url: string }) {
  const { data: preview, isLoading, error } = useLinkPreview(url);

  const hostname = useMemo(() => {
    try {
      return preview?.image ? new URL(preview.image).hostname : null;
    } catch {
      return null;
    }
  }, [preview?.image]);

  if (!url)
    return <span className="text-sm text-red-error">No link provided</span>;

  if (isLoading)
    return (
      <div className="w-20 h-20 flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (error || !preview)
    return (
      <p className="text-sm max-w-[200px] text-red-error">
        You caught us... We can&apos;t show the preview for this link yet.
      </p>
    );

  const isAllowedImage =
    hostname &&
    platforms
      .filter(isPlatformWithAvatar) // Only platforms that have domainAvatar
      .some(
        (platform) => (platform as PlatformWithAvatar).domainAvatar === hostname
      );

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
