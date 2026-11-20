import Image from "next/image";
import { ImagePlusIcon } from "lucide-react";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProfilePhotoProps = {
  className?: string;
};

/**
 * Slot foto profil.
 *
 * Cara pakai:
 * 1. Taruh fotomu di `public/foto.webp` (rasio 4:5, minimal 800×1000).
 * 2. Set `photo: "/foto.webp"` di src/lib/site.ts.
 *
 * Selama `site.photo` masih null, komponen ini menampilkan placeholder
 * bergaris (hairline) supaya layout sudah terlihat final.
 */
export function ProfilePhoto({ className }: ProfilePhotoProps) {
  return (
    <figure className={cn("relative", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-muted/30">
        {site.photo ? (
          <Image
            src={site.photo}
            alt={site.photoAlt}
            fill
            sizes="(max-width: 1024px) 70vw, 420px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <ImagePlusIcon className="size-7 text-muted-foreground" aria-hidden />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Slot foto kamu
              </p>
              <p className="font-mono text-[0.65rem] text-muted-foreground">
                public/foto.webp
              </p>
              <p className="text-[0.7rem] text-muted-foreground">
                Rasio 4:5 · min. 800 × 1000 px
              </p>
            </div>
          </div>
        )}
      </div>
      <figcaption className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
        A. S. — Malang, 2026
      </figcaption>
    </figure>
  );
}
