import Image from "next/image";
import { ImagePlusIcon } from "lucide-react";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProfilePhotoProps = {
  className?: string;
  /** Shows the soft glow + offset frame used in the hero. */
  decorative?: boolean;
};

/**
 * Slot foto profil.
 *
 * Cara pakai:
 * 1. Taruh fotomu di `public/foto-profil.jpg` (rasio 4:5, minimal 800×1000).
 * 2. Set `photo: "/foto-profil.jpg"` di src/lib/site.ts.
 *
 * Selama `site.photo` masih null, komponen ini menampilkan placeholder
 * bertema (ikut terang/gelap) supaya layout sudah terlihat final.
 */
export function ProfilePhoto({ className, decorative = true }: ProfilePhotoProps) {
  return (
    <div className={cn("relative", className)}>
      {decorative ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-3 -bottom-3 -z-10 size-24 rounded-2xl border border-border/60"
          />
        </>
      ) : null}

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/80 bg-muted/30">
        {site.photo ? (
          <Image
            src={site.photo}
            alt={site.photoAlt}
            fill
            sizes="(max-width: 1024px) 70vw, 360px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-6 text-center">
            <ImagePlusIcon
              className="size-7 text-muted-foreground"
              aria-hidden
            />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Slot foto kamu
              </p>
              <p className="font-mono text-[0.65rem] text-muted-foreground">
                public/foto-profil.jpg
              </p>
              <p className="text-[0.7rem] text-muted-foreground">
                Rasio 4:5 · min. 800 × 1000 px
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
