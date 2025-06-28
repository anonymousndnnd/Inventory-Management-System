import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import LaunchUI from "../../logos/launch-ui";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";
import { ModeToggle } from "../../ui/mode-toggle";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = <LaunchUI />,
  name = "Launch UI",
  columns = [
    {
      title: "Product",
      links: [
        { text: "Changelog", href: "https://www.launchuicomponents.com/" },
        { text: "Documentation", href: "?documentation" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "/about" },
        { text: "Careers", href: "/" },
        { text: "Blog", href: "/" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "Discord", href: "/" },
        { text: "Twitter", href: "/" },
        { text: "Github", href: "/" },
      ],
    },
  ],
  copyright = "© 2025 Mikołaj Dobrucki. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "/" },
    { text: "Terms of Service", href: "/" },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
     <footer className={cn("bg-background w-full px-4 py-10 border-t border-border", className)}>
  <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8">
    <Footer className="space-y-12">
      {/* Main Footer Content */}
      <FooterContent className="grid gap-8 md:grid-cols-4 sm:grid-cols-2 w-full">
        {/* Logo Column */}
        <FooterColumn className="space-y-3">
          <div className="flex items-center gap-2">
            {logo}
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Your go-to solution for modern inventory management.
          </p>
        </FooterColumn>

        {/* Links Columns */}
        {columns.map((column, index) => (
          <FooterColumn key={index} className="space-y-2">
            <h3 className="text-md font-semibold">{column.title}</h3>
            <div className="flex flex-col gap-1">
              {column.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.href}
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </FooterColumn>
        ))}
      </FooterContent>

      {/* Bottom Footer */}
      <FooterBottom className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border pt-6 w-full">
        <div className="text-sm text-muted-foreground text-center sm:text-left">
          {copyright}
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 text-sm text-muted-foreground">
          {policies.map((policy, index) => (
            <a
              key={index}
              href={policy.href}
              className="hover:text-foreground transition-colors"
            >
              {policy.text}
            </a>
          ))}
          {showModeToggle && <ModeToggle />}
        </div>
      </FooterBottom>
    </Footer>
  </div>
</footer>
  );
}
