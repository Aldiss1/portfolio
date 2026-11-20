"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("id-ID", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * Jam lokal Malang (WIB). Dirender kosong di server agar tidak ada
 * hydration mismatch, lalu diisi setelah mount.
 */
export function SiteClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
      Malang — {time ?? "--:--"} WIB
    </span>
  );
}
