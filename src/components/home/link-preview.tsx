import { useLinkPreview } from "@/queries/useLinkPreview";
import Image from "next/image";
import Spinner from "../resusables/spinner";
import Link from "next/link";

export default function LinkPreview({ url }: { url: string }) {
  const { data: preview, isLoading, error } = useLinkPreview(url);

  console.log("preview", preview);

  if (!url || url === "")
    return (
      <span className=" text-sm font-semibold text-red-error">
        No link provided
      </span>
    );

  if (isLoading) return;
  <div
    role="status"
    className="min-w-64 min-h-64 flex items-center justify-center">
    <Spinner />
  </div>;

  if (error)
    return <p className="text-sm text-red-error">Failed to load preview</p>;
  if (!preview) return null;

  return (
    <Link
      href={url}
      target="_blank"
      className="p-2  block border rounded-lg w-64 bg-white shadow-md">
      {preview.image && (
        <Image
          width={100}
          height={100}
          src={preview.image}
          alt={preview.title}
          className="w-full h-32 object-cover rounded"
        />
      )}
      <h4 className="font-semibold text-sm mt-2">{preview.title}</h4>
      <p className="text-xs text-gray-500">{preview.description}</p>
    </Link>
  );
}
