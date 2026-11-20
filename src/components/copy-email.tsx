"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type CopyEmailProps = {
  email: string;
};

/**
 * Alamat email besar dengan tombol salin.
 *
 * Tautan `mailto:` bergantung pada aplikasi email bawaan sistem. Di Windows
 * sering tidak ada handler `mailto:` terdaftar (aplikasi Mail sudah dihentikan
 * dan Outlook belum tentu terpasang), sehingga klik tidak melakukan apa pun.
 * Tombol salin memberi jalur yang selalu bekerja, tanpa perlu aplikasi apa pun.
 */
export function CopyEmail({ email }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API butuh secure context; ini cadangan untuk http biasa.
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }

    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
      <a
        href={`mailto:${email}`}
        className="text-2xl font-bold tracking-tight break-all underline decoration-1 underline-offset-8 transition-colors duration-150 hover:text-accent hover:decoration-accent sm:text-3xl"
      >
        {email}
      </a>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={copy}
        aria-live="polite"
      >
        {copied ? (
          <CheckIcon data-icon="inline-start" />
        ) : (
          <CopyIcon data-icon="inline-start" />
        )}
        {copied ? "Tersalin" : "Salin"}
      </Button>
    </div>
  );
}
