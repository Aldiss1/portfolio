import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-1 flex-col justify-center py-24 sm:py-32">
      <p className="text-[clamp(6rem,20vw,12rem)] font-extrabold leading-none tracking-tight text-accent stretch-display">
        404
      </p>
      <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
        Halaman tidak ditemukan.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Tautannya mungkin sudah kedaluwarsa, atau halaman ini sudah dipindahkan.
      </p>
      <div className="mt-8">
        <ButtonLink variant="outline" href="/">
          Kembali ke beranda
        </ButtonLink>
      </div>
    </div>
  );
}
