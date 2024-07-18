import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const MobileNav = () => {
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
            className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center"
          >
            <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
            <h1 className="text-24 font-extrabold text-white max-lg:hidden">
              GosPod
            </h1>
          </Link>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
