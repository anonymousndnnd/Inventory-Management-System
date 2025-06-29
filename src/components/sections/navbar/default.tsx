"use client"
import { Menu } from "lucide-react";
import { ReactNode } from "react";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Cookies from "js-cookie"
import axios from "axios";
import toast from "react-hot-toast";

import LaunchUI from "../../logos/launch-ui";
import { Button, type ButtonProps } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  
  logo = <LaunchUI />,
  name = "Inventra",
  homeUrl = "/",
  mobileLinks = [
    { text: "Getting Started", href: "/signup" },
    { text: "Dashboard", href: "/profile" },
    { text: "Documentation", href: "/documentation" },
  ],
  
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const router = useRouter();
  
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = Cookies.get("token");
      setIsLoggedIn(!!token);
    };

    // Check immediately
    checkAuthStatus();

    // Set up an interval to check periodically (optional)
    const intervalId = setInterval(checkAuthStatus, 5000); // Check every 5 seconds

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  const onLogout=async()=>{
      try {
        //setLoading jab tak true rahegas button disable rahega 
        
        const response=await axios.get("/api/users/logout")
        toast.success("LoggedOut Successfully");
        console.log("Logout success",response.data)
        // yaha router mein push karne se home route toh same rehta hai bss postfix mein jo hai wo change ho jaata hai 
        router.push("/")
      } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to logout";
          toast.error(errorMessage);
          console.error("Logout Failed:", error);
        }
      
    }
    
  return (
    
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <a
              href={homeUrl}
              className="flex items-center gap-2 text-xl font-bold"
            >
              {logo}
              {name}
            </a>
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarLeft>
          <NavbarRight>
            {isLoggedIn ? (
              <>
                <Button variant="destructive" onClick={onLogout}>
                  Logout
                </Button>
                <Button variant="default" asChild>
                  <Link href="/profile">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <a href="/login">Sign in</a>
                </Button>
                <Button variant="default" asChild>
                  <a href="/signup">Get Started</a>
                </Button>
              </>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
  <SheetHeader>
    <SheetTitle className="text-xl font-semibold text-gray-800">Menu</SheetTitle>
  </SheetHeader>

  <nav className="grid gap-6 text-lg font-medium mt-4">
    <a
      href={homeUrl}
      className="flex items-center gap-2 text-xl font-bold"
    >
      <span>{name}</span>
    </a>
    {mobileLinks.map((link, index) => (
      <a
        key={index}
        href={link.href}
        className="text-muted-foreground hover:text-foreground"
      >
        {link.text}
      </a>
    ))}
  </nav>
</SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
