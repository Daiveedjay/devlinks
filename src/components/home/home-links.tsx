"use client";

import { Button } from "../ui/button";

// import { fetchLinks, useAddLink } from "@/queries/useLinks";
import { useAddLink } from "@/queries/useLinks";
import { useLinkStore } from "@/store/useLinkStore";
import LinksContainer from "./links-container";
import NoLinks from "./no-links";
// import { useLinks } from "@/queries/useLinks";

export default function HomeLinks() {
  const { links, addLink, errors } = useLinkStore((store) => store);
  console.log("Links", links);

  const hasErrors = Object.values(errors).some((error) => error !== null);
  const hasEmptyFields = links.some(
    (link) =>
      !link.Platform ||
      !link.URL ||
      link.Platform.trim() === "" ||
      link.URL.trim() === ""
  );

  // Check if there are any new links added
  const hasNewLinks = links.some((link) => link.isNew);

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
        {/* <Button
          variant="outline"
          className="w-full p-6"
          onClick={() => fetchLinks(setLinks)}>
          Fetch
        </Button> */}
        <Button
          variant="outline"
          className="w-full p-6"
          onClick={() => {
            addLink();
            console.log("Adding link", links);
          }}>
          Add new link
        </Button>
      </div>
      {links?.length === 0 ? <NoLinks /> : <LinksContainer />}
      {/* {links?.length > 0 && <NewLinksContainer />} */}
      <div className=" border-t-2 p-6 flex justify-end">
        <Button
          className="px-8 py-6 disabled:!cursor-not-allowed"
          variant="default"
          disabled={!hasNewLinks || hasErrors || hasEmptyFields}
          onClick={() => {
            console.log("Ha");
            addLinkAsync([...links.filter((link) => link.isNew)]);
          }}>
          Save
        </Button>
      </div>
    </div>
  );
}
