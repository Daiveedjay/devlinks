"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { platforms } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLinkStore } from "@/store/useLinkStore";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";

interface PlatformSelectProps {
  value?: string;
  id: number;
  onValueChange?: (value: string) => void;
  linkValue?: string;
  onLinkChange?: (value: string) => void;
  error?: string;
}

export function PlatformSelect({
  value,
  onValueChange,
  id,
  linkValue = "",
  onLinkChange,
  error,
}: PlatformSelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const { updateLink, errors } = useLinkStore((store) => store);

  const selectedPlatform = platforms.find(
    (platform) => platform.value === selectedValue
  );

  const handleSelect = (currentValue: string) => {
    setSelectedValue(currentValue);
    onValueChange?.(currentValue);
    setOpen(false);
  };

  const validateLink = (URL: string) => {
    updateLink(id, { URL }); // Update the link with the new URL
  };

  return (
    <div className="space-y-4">
      <div className=" w-full">
        {" "}
        <Label className="small__text pb-2 font-normal">Platform</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full text-gray-dark justify-between  border-gray-light hover:border-purple-primary focus:border-purple-primary focus:ring-2 focus:ring-purple-light h-12 px-4">
              {selectedPlatform ? (
                <div className="flex items-center gap-3">
                  <selectedPlatform.icon className="h-5 w-5" />
                  <span>{selectedPlatform.label}</span>
                </div>
              ) : (
                "Select a platform"
              )}
              <ChevronDown
                className={cn(
                  "ml-2 h-5 w-5 shrink-0 text-purple-light transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search platform..." />
              <CommandList>
                <CommandEmpty>No platform found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-auto">
                  {platforms?.map((platform) => (
                    <CommandItem
                      key={platform.value}
                      value={platform.value}
                      onSelect={handleSelect}
                      className="flex  items-center gap-3 px-4 py-3 cursor-pointer">
                      <platform.icon className="h-5 w-5 shrink-0" />
                      {platform.label}
                      {selectedValue === platform.value && (
                        <Check className="ml-auto h-4 w-4 text-purple-light" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label className="pb-2 font-normal">Link</Label>
        <Input
          type="url"
          value={linkValue}
          onChange={(e) => {
            onLinkChange?.(e.target.value);
            validateLink(e.target.value); // Run validation as user types
          }}
          placeholder={selectedPlatform?.placeholder || "Enter your link"}
          onBlur={() => validateLink(linkValue)}
          disabled={!selectedPlatform}
          className={cn(
            "h-12 font-medium !text-gray-dark border-gray-light focus:border-purple-primary focus:ring-2 focus:ring-purple-light",
            error &&
              "border-red-error focus:border-red-error focus:ring-red-100"
          )}
        />
      </div>
      {errors[id] && (
        <p className="text-sm text-red-error mt-1">{errors[id]}</p>
      )}
    </div>
  );
}
