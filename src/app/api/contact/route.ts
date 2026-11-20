import { NextResponse } from "next/server";
import { Resend } from "resend";

import { site } from "@/lib/site";

const SUBJECT_PREFIX = "[Portfolio]";
const MAX_NAME = 80;
const MAX_EMAIL = 160;
const MAX_MESSAGE = 4000;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Honeypot: field tersembunyi yang hanya diisi bot. */
  company?: unknown;
};

function asTrimmedString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Membuang karakter HTML agar isi pesan tidak bisa disisipi markup. */
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY belum diset.");
    return NextResponse.json(
      { error: "Layanan email belum dikonfigurasi." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Format permintaan tidak valid." }, { status: 400 });
  }

  // Bot biasanya mengisi semua field, termasuk honeypot.
  if (asTrimmedString(payload.company, MAX_NAME)) {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(payload.name, MAX_NAME);
  const email = asTrimmedString(payload.email, MAX_EMAIL);
  const message = asTrimmedString(payload.message, MAX_MESSAGE);

  if (name.length < 2) {
    return NextResponse.json({ error: "Nama minimal 2 karakter." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Alamat email tidak valid." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Pesan minimal 10 karakter." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    // replyTo memungkinkan kamu langsung membalas ke pengirim.
    replyTo: email,
    subject: `${SUBJECT_PREFIX} Pesan dari ${name}`,
    text: `Nama: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6">
        <p><strong>Nama:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Pesan gagal dikirim. Coba lagi sebentar lagi." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
