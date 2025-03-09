import React, { ReactNode } from "react";

export default function ErrorText({ children }: { children: ReactNode }) {
  return <div className=" text-destructive text-sm">{children}</div>;
}
