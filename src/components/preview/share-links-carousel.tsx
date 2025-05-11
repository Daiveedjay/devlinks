"use client";

import { TOAST_TIMEOUT } from "@/lib/constants";
import { CircleCheck, ShieldAlert } from "lucide-react";
import { JSX } from "react";
import { toast } from "sonner";
import CopyLink from "../icons/copy-link";
import Facebook from "../icons/facebook";
import Linkedin from "../icons/linkedin";
import Mail from "../icons/mail";
import Messenger from "../icons/messenger";
import Share from "../icons/share";
import Whatsapp from "../icons/whatsapp";
import X from "../icons/x";

type ShareOption = {
  name: string;
  icon: JSX.Element;
  onClick?: () => void;
  href?: string;
};

export default function ShareLinksCarousel({ username }: { username: string }) {
  // build your URL on the fly
  const url = `https://devlinks.info/@${username}`;

  const encoded = encodeURIComponent(url);

  const items: ShareOption[] = [
    {
      name: "Copy",
      icon: <CopyLink />,
      onClick: () => {
        navigator.clipboard
          .writeText(url)
          .then(() =>
            toast("Link copied!", {
              className: "success-toast",

              duration: TOAST_TIMEOUT,
              icon: <CircleCheck />,
            })
          )
          .catch(() =>
            toast("ICopy failed", {
              className: "error-toast ",

              duration: TOAST_TIMEOUT,
              icon: <ShieldAlert />,
            })
          );
      },
    },
    {
      name: "X",
      icon: <X />,
      href: `https://x.com/intent/tweet?url=${encoded}`,
    },
    {
      name: "Facebook",
      icon: <Facebook />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
    {
      name: "WhatsApp",
      icon: <Whatsapp />,
      href: `https://wa.me/?text=${encoded}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
    {
      name: "Messenger",
      icon: <Messenger />,
      href: `fb-messenger://share?link=${encoded}`,
    },
    {
      name: "Mail",
      icon: <Mail />,
      href: `mailto:?body=${encoded}`,
    },
    {
      name: "More",
      icon: <Share />,
      onClick: async () => {
        if (navigator.share) {
          try {
            await navigator.share({ title: document.title, url });
          } catch {
            toast("Share failed", {
              className: "error-toast",
              duration: TOAST_TIMEOUT,
              icon: <ShieldAlert />,
            });
            /* cancelled or failed */
          }
        } else {
          alert("Native share not supported");
        }
      },
    },
  ];

  return (
    <div className="sm:flex grid grid-cols-4 gap-2 sm:gap-6 pt-2 sm:pb-6">
      {items.map((opt, i) => {
        const content = (
          <div className="flex cursor-pointer flex-col items-center group gap-2">
            <div className="bg-neutral-200 flex w-8 h-8 sm:h-12 sm:w-12 items-center justify-center rounded-full">
              {opt.icon}
            </div>
            <span className="text-[12px] group-hover:text-foreground font-medium">
              {opt.name}
            </span>
          </div>
        );

        // if href, wrap in <a> so it opens in new tab automatically
        return opt.href ? (
          <a key={i} href={opt.href} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        ) : (
          <div key={i} onClick={opt.onClick}>
            {content}
          </div>
        );
      })}
      <div className="p-1" />
    </div>
  );
}
