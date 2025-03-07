"use client";

import {
  Check,
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  Twitch,
  Code2,
  Globe,
  Dribbble,
  Framer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";
import { useState } from "react";

const platforms = [
  {
    value: "github",
    label: "GitHub",
    icon: Github,
    placeholder: "https://github.com/username",
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: Twitter,
    placeholder: "https://twitter.com/username",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    placeholder: "https://linkedin.com/in/username",
  },
  {
    value: "facebook",
    label: "Facebook",
    icon: Facebook,
    placeholder: "https://facebook.com/username",
  },
  {
    value: "youtube",
    label: "YouTube",
    icon: Youtube,
    placeholder: "https://youtube.com/c/channelname",
  },
  {
    value: "dribbble",
    label: "Dribbble Portfolio",
    icon: Dribbble,
    placeholder: "https://dribbble.com/username",
  },
  {
    value: "twitch",
    label: "Twitch",
    icon: Twitch,
    placeholder: "https://twitch.tv/username",
  },
  {
    value: "devto",
    label: "Dev.to",
    icon: Code2,
    placeholder: "https://dev.to/username",
  },
  {
    value: "website",
    label: "Personal Website",
    icon: Globe,
    placeholder: "https://yoursite.com",
  },

  {
    value: "framer",
    label: "Design Portfolio",
    icon: Framer,
    placeholder: "https://framer.com/username",
  },
];

interface PlatformSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  linkValue?: string;
  onLinkChange?: (value: string) => void;
  error?: string;
}

export function PlatformSelect({
  value,
  onValueChange,
  linkValue = "",
  onLinkChange,
  error,
}: PlatformSelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  const selectedPlatform = platforms.find(
    (platform) => platform.value === selectedValue
  );

  const handleSelect = (currentValue: string) => {
    setSelectedValue(currentValue);
    onValueChange?.(currentValue);
    setOpen(false);
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
                  {platforms.map((platform) => (
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
          onChange={(e) => onLinkChange?.(e.target.value)}
          placeholder={selectedPlatform?.placeholder || "Enter your link"}
          className={cn(
            "h-12 border-gray-light focus:border-purple-primary focus:ring-2 focus:ring-purple-light",
            error &&
              "border-red-error focus:border-red-error focus:ring-red-100"
          )}
        />
      </div>
      {error && <p className="text-sm text-red-error mt-1">{error}</p>}
    </div>
  );
}
