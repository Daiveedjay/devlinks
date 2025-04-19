import { defaultMotionConfig } from "@/lib/constants";
import { useDeleteLink } from "@/queries/links/deleteLinks";
import { useUpdateLink } from "@/queries/links/updateLink";
import { useLinkStore } from "@/store/useLinkStore";
import { AnimatePresence, motion } from "framer-motion";
import { Equal, Grip, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlatformSelect } from "./platform-select";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

export default function LinksContainer() {
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
    // If dropped outside the list or no destination
    if (!result.destination) return;

    const { source, destination } = result;

    // If dropped in the same position
    if (source.index === destination.index) return;

    // Create a copy of the current links array
    const newLinks = Array.from(links);
    // Remove the dragged item from the array
    const [reorderedItem] = newLinks.splice(source.index, 1);
    // Insert it at the new position
    newLinks.splice(destination.index, 0, reorderedItem);

    // Update the order property for all items and mark as dirty if order changed
    const updatedLinks = newLinks.map((link, index) => ({
      ...link,
      order: index + 1,
      dirty: link.order !== index + 1 ? true : link.dirty,
    }));

    // Update the store with new links array
    setLinks(updatedLinks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-links">
        {(provided) => (
          <ul
            className="flex-1 py-10 flex flex-col gap-10"
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {links?.map((link, index) => (
              <Draggable
                key={link.ID}
                draggableId={`draggable-${link.ID}`}
                index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`bg-gray-background p-6 border-2 rounded-[6px] ${
                      snapshot.isDragging
                        ? " border-purple-primary"
                        : " border-transparent"
                    }`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Equal />
                        <span className="font-bold">Link #{index + 1}</span>
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
                          className="mt-4 bg-purple-light text-white rounded-md overflow-hidden">
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
