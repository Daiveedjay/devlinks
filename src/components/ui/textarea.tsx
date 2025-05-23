import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground  border-2  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md  bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-purple-primary focus:shadow-[0px_0px_5px_3.5px_var(--purple-light),0px_0px_5px_3.5px_var(--purple-light)]",
        "dark:focus:shadow-none dark:border-muted-foreground dark:bg-transparent dark:text-foreground dark:placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
