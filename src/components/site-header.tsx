"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { SiteClock } from "@/components/site-clock";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-border bg-background"
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${site.name} — beranda`}
        >
          <span className="grid size-7 place-items-center bg-accent text-[0.7rem] font-semibold text-accent-foreground">
            {site.initials}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.12em]">
            {site.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Navigasi utama"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {item.label}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden lg:block">
            <SiteClock />
          </span>

          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              className="inline-flex size-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground md:hidden"
              aria-label="Buka menu"
            >
              <MenuIcon className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-l border-border">
              <SheetHeader>
                <SheetTitle className="font-mono text-xs uppercase tracking-[0.12em]">
                  {site.name}
                </SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-col px-4"
                aria-label="Navigasi seluler"
              >
                {nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={<Link href={item.href} />}
                    className="border-b border-border py-3 text-left font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-accent"
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
