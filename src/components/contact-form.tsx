"use client";

import { CheckCircle2Icon, Loader2Icon, SendIcon } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "success" | "error";

const initialState = { name: "", email: "", message: "" };

export function ContactForm() {
  const [fields, setFields] = useState(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const sending = status === "sending";

  function update<K extends keyof typeof initialState>(
    key: K,
    value: string,
  ) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const body = {
      name: fields.name,
      email: fields.email,
      message: fields.message,
      company: formData.get("company") ?? "",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setErrorMessage(data.error ?? "Pesan gagal dikirim. Coba lagi.");
        setStatus("error");
        return;
      }

      setFields(initialState);
      setStatus("success");
    } catch {
      setErrorMessage("Tidak bisa menghubungi server. Periksa koneksimu.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border border-border/80 bg-muted/40 p-6">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
          <CheckCircle2Icon className="size-5 text-accent" aria-hidden />
          Pesan terkirim
        </span>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Terima kasih sudah menghubungi. Saya akan membalas lewat email
          secepatnya.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setStatus("idle")}
        >
          Kirim pesan lain
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Nama</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            placeholder="Nama kamu"
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            disabled={sending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            placeholder="nama@email.com"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            disabled={sending}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Pesan</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          placeholder="Ceritakan proyek, tawaran magang, atau hal lain yang ingin didiskusikan."
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          disabled={sending}
        />
      </div>

      {/* Honeypot — disembunyikan dari manusia, sering diisi bot. */}
      <div aria-hidden className="hidden">
        <label htmlFor="contact-company">Perusahaan</label>
        <input
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && errorMessage ? (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={sending}>
          {sending ? (
            <Loader2Icon data-icon="inline-start" className="animate-spin" />
          ) : (
            <SendIcon data-icon="inline-start" />
          )}
          {sending ? "Mengirim..." : "Kirim pesan"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Pesan dikirim lewat email dan tidak disimpan di server.
        </p>
      </div>
    </form>
  );
}
