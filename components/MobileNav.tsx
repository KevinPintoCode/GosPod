import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="navbar"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-black-1">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-1 pb-10 pl-4 "
          >
            <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
            <h1 className="text-24 font-extrabold text-white-1 ml-2">
              PodcAIst
            </h1>
          </Link>
          <div className="flex h-[cal(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav>
                {sidebarLinks.map(({ route, label, imgURL }) => {
                  const isActive =
                    pathname === route || pathname.startsWith(`${route}/`);
                  return (
                    <Link
                      href={route}
                      key={label}
                      className={cn(
                        "flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start",
                        {
                          "bg-nav-focus border-r-4 border-orange-1": isActive,
                        }
                      )}
                    >
                      <Image src={imgURL} alt={label} width={24} height={24} />
                      <p>{label}</p>
                    </Link>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
