"use client";
import PreviewTemplate from "@/components/preview/preview-template";
import { useLinkStore } from "@/store/useLinkStore";
import { useUserStore } from "@/store/useUserStore";

export default function Page() {
  const links = useLinkStore((store) => store.links);

  const user = useUserStore((store) => store.user);
  return <PreviewTemplate user={{ ...user, links }} />;
}
