"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Ganti tema"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-muted-foreground hover:text-foreground"
    >
      {/* Both icons are rendered; CSS picks the right one so hydration stays clean. */}
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </Button>
  );
}
