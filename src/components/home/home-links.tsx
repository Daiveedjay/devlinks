"use client";

import { Button } from "../ui/button";

import { useAuthCallback } from "@/queries/auth/oauth";
import { useAddLink } from "@/queries/links/addLinks";
import { useLinkStore } from "@/store/useLinkStore";
import { useEffect } from "react";
import Spinner from "../resusables/spinner";
import { Skeleton } from "../ui/skeleton";
import LinksContainer from "./links-container";
import NoLinks from "./no-links";

export default function HomeLinks() {
  const { mutate } = useAuthCallback();

  useEffect(() => {
    // When the component mounts, trigger the mutation to handle authentication
    mutate();
  }, [mutate]);

  const { links, addLink, errors } = useLinkStore((store) => store);

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
  const { mutate: addLinkAsync, isPending } = useAddLink();
  const { isPending: isAuthPending } = useAuthCallback();

  return (
    <div className="flex  flex-col">
      <div className=" mb-6">
        <h2 className="medium__header mb-2">Customize your links</h2>
        <p className="medium__text mb-6 sm:mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        {/* <Button
          variant="outline"
          className="w-full p-6"
          onClick={() => console.log("Clicked links state", links)}>
          Fetch
        </Button> */}
        <Button variant="outline" className="w-full p-6" onClick={addLink}>
          Add new link
        </Button>
      </div>
      {links?.length === 0 ? <NoLinks /> : <LinksContainer />}

      {isAuthPending &&
        Array.from({ length: 3 }).map((_, index) => {
          return (
            <Skeleton key={index} className="mb-4 h-16 rounded-lg w-full" />
          );
        })}

      {links.length > 0 && (
        <div className=" border-t-2 p-6 flex justify-end">
          <Button
            className="px-8 w-28 py-6 disabled:!cursor-not-allowed"
            variant="default"
            disabled={!hasNewLinks || hasErrors || hasEmptyFields || isPending}
            onClick={() => {
              addLinkAsync([
                ...links
                  .filter((link) => link.isNew)
                  .map(({ ID, Platform, URL, order }) => ({
                    ID,
                    Platform,
                    URL,
                    order,
                  })),
              ]);
            }}>
            {isPending && <Spinner />} Save
          </Button>
        </div>
      )}
    </div>
  );
}
