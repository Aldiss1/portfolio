"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — beranda`}
        >
          <span className="grid size-8 place-items-center rounded-lg bg-foreground text-[0.7rem] font-semibold tracking-wide text-background transition-transform duration-300 group-hover:-rotate-6">
            {site.initials}
          </span>
          <span className="text-sm font-medium tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
              aria-label="Buka menu"
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>{site.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Navigasi seluler">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-2 py-2.5 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
