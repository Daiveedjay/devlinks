"use client";

import { Equal, Grip, Trash2 } from "lucide-react";
import GetStarted from "../icons/get-started";
import { Button } from "../ui/button";

// import { fetchLinks, useAddLink } from "@/queries/useLinks";
import { useLinkStore } from "@/store/useLinkStore";
import { PlatformSelect } from "./platform-select";
import { fetchLinks, useAddLink, useDeleteLink } from "@/queries/useLinks";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import { useLinks } from "@/queries/useLinks";

export default function HomeLinks() {
  const { links, addLink, errors, previewLinks, setPreviewLinks } =
    useLinkStore((store) => store);
  console.log("Links", links);

  const hasErrors = Object.values(errors).some((error) => error !== null);
  const hasEmptyFields = links.some(
    (link) =>
      !link.Platform ||
      !link.URL ||
      link.Platform.trim() === "" ||
      link.URL.trim() === ""
  );

  // const { addLink: addLinkAsync, fetchLinksAPI } = useLinks();
  const { mutate: addLinkAsync } = useAddLink("1");

  return (
    <div className="flex flex-col">
      <div className=" mb-6">
        <h2 className="medium__header mb-2">Customize your links</h2>
        <p className="medium__text mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button
          variant="outline"
          className="w-full p-6"
          onClick={() => fetchLinks(setPreviewLinks)}>
          Fetch
        </Button>
        <Button variant="outline" className="w-full p-6" onClick={addLink}>
          Add new link
        </Button>
      </div>
      {previewLinks?.length === 0 ? <NoLinks /> : <LinksContainer />}
      {links?.length > 0 && <NewLinksContainer />}
      <div className=" border-t-2 p-6 flex justify-end">
        <Button
          className="px-8 py-6 disabled:!cursor-not-allowed"
          variant="default"
          disabled={hasErrors || hasEmptyFields}
          onClick={() => addLinkAsync([...links])}>
          Save
        </Button>
      </div>
    </div>
  );
}

const NoLinks = () => {
  return (
    <div className="  flex-1 justify-center py-20 gap-6 flex items-center flex-col  ">
      {" "}
      <div>
        <GetStarted />
      </div>
      <div className=" flex flex-col justify-center items-center text-center w-3/5 ">
        <h3 className="medium__header mb-6">Let&apos;s get you started</h3>
        <p className="medium__text">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We&apos;`re here to help you
          share your profiles with everyone!
        </p>
      </div>
    </div>
  );
};

const LinksContainer = () => {
  const { previewLinks } = useLinkStore((store) => store);
  const [linksToDelete, setLinksToDelete] = useState(new Set<number>());

  // Toggle delete confirmation for a specific link
  const toggleDelete = (id: number) => {
    setLinksToDelete((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const { mutate: deleteLinkAsync } = useDeleteLink("1");

  return (
    <ul className="flex-1 py-10 flex flex-col gap-10">
      {previewLinks?.map((link, index) => (
        <li key={link.ID} className="bg-gray-background p-6 rounded-[6px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Equal />
              <span className="font-bold">Link #{index + 1}</span>
            </div>
            <div className="flex justify-center items-center gap-4">
              <div className="hover:cursor-grab hover:bg-purple-light p-3 rounded-md">
                <Grip size={16} />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-red-error/20"
                onClick={() => toggleDelete(link.ID)}>
                <Trash2 className="text-red-error" />
              </Button>
            </div>
          </div>

          <div className="mt-4 w-full">
            <PlatformSelect
              id={link.ID}
              value={link.Platform}
              linkValue={link.URL}
            />
          </div>

          {/* Delete Confirmation Bar with Smooth Animation */}
          <AnimatePresence>
            {linksToDelete.has(link.ID) && (
              <motion.div
                className="mt-4 bg-purple-secondary text-white rounded-md overflow-hidden"
                initial={{ maxHeight: 0, margin: 0 }}
                animate={{
                  maxHeight: 150,
                  marginTop: 16,
                }}
                exit={{
                  maxHeight: 0,
                  marginTop: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0.0, 0.2, 1], // Cubic bezier
                }}>
                <div className="p-4">
                  <h3 className="text-center font-bold text-gray-dark mb-4">
                    Delete this link?
                  </h3>
                  <div className="flex justify-between gap-2">
                    <Button
                      variant="outline"
                      className="flex-1/3 p-6"
                      onClick={() => toggleDelete(link.ID)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-2/3 p-6"
                      onClick={() => deleteLinkAsync(link.ID)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
};

const NewLinksContainer = () => {
  const { links, updateLink, removeLink, previewLinks } = useLinkStore(
    (store) => store
  );

  return (
    <ul className="flex-1 border-4 rounded-sm  border-purple-secondary py-10 flex flex-col gap-10">
      {links?.map((link, index) => (
        <li key={link.ID} className=" bg-gray-background p-6 rounded-[6px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Equal />
              <span className="font-bold">
                Link #{previewLinks.length + index + 1}
              </span>
            </div>
            <div className=" flex justify-center items-center gap-4">
              <div className="hover:cursor-grab hover:bg-purple-light p-3 rounded-md">
                <Grip size={16} />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className=" hover:bg-red-error/20"
                onClick={() => removeLink(link.ID)}>
                <Trash2 className=" text-red-error" />
              </Button>
            </div>
          </div>

          <div className="mt-4 w-full">
            <PlatformSelect
              id={link.ID}
              value={link.Platform}
              onValueChange={(val) => updateLink(link.ID, { Platform: val })}
              linkValue={link.URL}
              onLinkChange={(val) => updateLink(link.ID, { URL: val })}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
