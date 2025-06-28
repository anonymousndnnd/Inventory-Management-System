import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link"
import { Button } from "@/components/ui/moving-border";
function HeroSection() {
  return (
    <div
    className="h-auto md:h-[50rem] w-full rounded-md flex flex-col 
    items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0"
    >
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="p-4 relative z-10 w-full text-center" >
            <h1
            className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
            >Inventory Management System</h1>
            <p
            className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto"
            >Effortlessly track, manage, and scale your inventory in one powerful dashboard.</p>
            <div className="mt-4">
                <Link href={"/courses"}>
                    <Button borderRadius="1.75rem"
                    className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800">
                      Go To DashBoard
                    </Button>
                    
                </Link>
            </div>
        </div>
    </div>
  )
}

export default HeroSection