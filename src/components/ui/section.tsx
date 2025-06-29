import * as React from "react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full px-4 sm:px-6 lg:px-8", className)} {...props}>
      {children}
    </section>
  );
}