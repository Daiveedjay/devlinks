"use client";

import { Equal, Trash2 } from "lucide-react";
import GetStarted from "../icons/get-started";
import { Button } from "../ui/button";

import { useLinkStore } from "@/store/useLinkStore";
import { PlatformSelect } from "./platform-select";

export default function HomeLinks() {
  const { links, addLink, errors } = useLinkStore((store) => store);
  const hasErrors = Object.values(errors).some((error) => error !== null);

  return (
    <div className="flex flex-col">
      <div className=" mb-6">
        <h2 className="medium__header mb-2">Customize your links</h2>
        <p className="medium__text mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button variant="outline" className="w-full p-6" onClick={addLink}>
          Add new link
          {/* <Spinner /> */}
        </Button>
      </div>
      {links.length === 0 ? <NoLinks /> : <LinksContainer />}
      <div className=" border-t-2 p-6 flex justify-end">
        <Button className="px-8 py-6" variant="default" disabled={hasErrors}>
          Save
        </Button>
      </div>
    </div>
  );
}

const NoLinks = () => {
  return (
    <div className=" flex-1 justify-center py-20 gap-6 flex items-center flex-col  ">
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
  const { links, updateLink, removeLink } = useLinkStore((store) => store);
  return (
    <ul className="flex-1 py-10 flex flex-col gap-10">
      {links.map((link, index) => (
        <li key={link.id} className="bg-gray-background p-6 rounded-[6px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Equal />
              <span className="font-bold">Link #{index + 1}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeLink(link.id)}>
              <Trash2 className=" text-red-error" />
            </Button>
          </div>

          <div className="mt-4 w-full">
            <PlatformSelect
              id={link.id}
              value={link.platform}
              onValueChange={(val) => updateLink(link.id, { platform: val })}
              linkValue={link.url}
              onLinkChange={(val) => updateLink(link.id, { url: val })}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
