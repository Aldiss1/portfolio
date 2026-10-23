import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Halaman tidak ditemukan.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Tautannya mungkin sudah kedaluwarsa, atau halaman ini sudah dipindahkan.
      </p>
      <ButtonLink className="mt-8" href="/">
        Kembali ke beranda
      </ButtonLink>
    </div>
  );
}
