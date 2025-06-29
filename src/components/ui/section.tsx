import * as React from "react";
import { cn } from "@/lib/utils"; // utility to merge class names

interface SectionProps extends React.HTMLAttributes<HTMLElement> {}

export function Section(props: SectionProps) {
  const { className, children, ...rest } = props;

  return (
    <section className={cn("w-full px-4 sm:px-6 lg:px-8", className)} {...rest}>
      {children}
    </section>
  );
}
