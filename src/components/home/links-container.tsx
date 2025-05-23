import { defaultMotionConfig } from "@/lib/constants";
import { useDeleteLink } from "@/queries/links/deleteLinks";
import { useUpdateLink } from "@/queries/links/updateLink";
import { useLinkStore } from "@/store/useLinkStore";
import { AnimatePresence, motion } from "framer-motion";
import { Equal, Grip, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { PlatformSelect } from "./platform-select";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

export default function LinksContainer() {
  const containerRef = useRef<HTMLUListElement>(null);
  // Scroll to bottom when new link is added

  const { links, errors, updateLink, setLinks } = useLinkStore(
    (store) => store
  );
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

  const { mutate: deleteLinkAsync } = useDeleteLink();

  const { mutate: updateLinkAsync } = useUpdateLink();

  const handleDelete = (isNew: boolean, id: number) => {
    if (isNew) {
      setLinks(links.filter((link) => link.ID !== id));
      return;
    }
    toggleDelete(id);
  };

  const handleUpdate = (id: number) => {
    const updatedLink = links.find((l) => l.ID === id);
    if (!updatedLink) return;

    updateLinkAsync({ id, link: updatedLink });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.index === destination.index) return;

    const newLinks = Array.from(links);
    const [reorderedItem] = newLinks.splice(source.index, 1);
    newLinks.splice(destination.index, 0, reorderedItem);

    // Only mark links whose order actually changed as dirty
    const updatedLinks = newLinks.map((link, index) => {
      const newOrder = index + 1;
      const originalOrder = links.find((l) => l.ID === link.ID)?.order;
      const orderChanged = originalOrder !== newOrder;

      return {
        ...link,
        order: newOrder,
        // Only mark as dirty if this specific link's order changed
        dirty: orderChanged ? true : link.dirty,
      };
    });

    setLinks(updatedLinks);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [links.length]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-links">
        {(provided) => (
          <ul
            className="flex-1 py-6 sm:py-10 flex flex-col gap-6 sm:gap-10"
            {...provided.droppableProps}
            ref={(element) => {
              provided.innerRef(element);
              // Merge the refs
              if (containerRef) {
                containerRef.current = element;
              }
            }}>
            {links?.map((link, index) => (
              <Draggable
                key={link.ID}
                draggableId={`draggable-${link.ID}`}
                index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`bg-gray-background dark:bg-sidebar sm:p-6 p-4 border-2 rounded-[6px] ${
                      snapshot.isDragging
                        ? " border-purple-primary"
                        : " border-transparent"
                    }`}>
                    <div className="flex dark:text-foreground justify-between items-center">
                      <div className="flex  items-center gap-1">
                        <Equal />
                        <span className="font-bold dark:text-foreground">
                          Link #{index + 1}
                        </span>
                      </div>
                      <div className="flex justify-center items-center gap-4">
                        <div
                          {...provided.dragHandleProps}
                          className="hover:cursor-grab active:cursor-grabbing hover:bg-purple-light p-3 rounded-md">
                          <Grip size={16} />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-red-error/20"
                          onClick={() =>
                            handleDelete(link.isNew ?? false, link.ID)
                          }>
                          <Trash2 className="text-red-error" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 w-full">
                      <PlatformSelect
                        id={link.ID}
                        onValueChange={(val) =>
                          updateLink(link.ID, { Platform: val })
                        }
                        value={link.Platform}
                        linkValue={link.URL}
                      />
                    </div>

                    {/* Delete Confirmation Bar with Smooth Animation */}
                    <AnimatePresence>
                      {linksToDelete.has(link.ID) && !link.isNew && (
                        <motion.div
                          {...defaultMotionConfig}
                          className="mt-4 bg-purple-light dark:bg-sidebar-border text-white rounded-md overflow-hidden">
                          <div className="p-4">
                            <h3 className="text-center font-bold text-gray-dark mb-4">
                              Delete this link?
                            </h3>
                            <div className="flex flex-col sm:flex-row justify-between gap-2">
                              <Button
                                variant="outline"
                                className="flex-1/3 p-3 sm:p-6"
                                onClick={() => toggleDelete(link.ID)}>
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                className="flex-2/3 p-3 sm:p-6"
                                onClick={() => deleteLinkAsync(link.ID)}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {link.dirty && !errors[link.ID] && (
                        <motion.div
                          className="flex justify-end overflow-hidden"
                          {...defaultMotionConfig}>
                          <Button
                            className="mt-0"
                            onClick={() => handleUpdate(link.ID)}>
                            Save
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
