"""
Bangun CV versi Word (.docx) untuk bahasa Indonesia dan Inggris.

Jalankan: python3 cv/build-docx.py
Butuh:   pip install python-docx

Sumber teks ada di CONTENT di bawah. Versi HTML-nya ada di cv/index.html
(Indonesia, versi utama) dan cv/backup-en/index-en.html (Inggris, cadangan).
Bila salah satu diubah, samakan di sini juga supaya versi Word dan PDF tidak
berbeda isi.
"""

from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

INK = RGBColor(0x1A, 0x1D, 0x23)
MUTED = RGBColor(0x55, 0x5B, 0x66)
FONT = "Arial"
CONTENT_WIDTH = Cm(18.2)  # A4 21cm - margin 14mm x2


CONTENT = {
    "id": {
        "filename": "CV_Aldi_Surya_Saputra.docx",
        "labels": {
            "summary": "Ringkasan",
            "experience": "Pengalaman",
            "projects": "Proyek",
            "skills": "Keahlian",
            "education": "Pendidikan",
            "stack": "Teknologi",
        },
        "name": "Aldi Surya Saputra",
        "role": "Mahasiswa Teknik Informatika — Full Stack Web Developer (Laravel, Next.js)",
        "contact": [
            ("Malang, Indonesia", None),
            ("0813-3555-8147", "tel:+6281335558147"),
            ("aldisuryasaputra693@gmail.com", "mailto:aldisuryasaputra693@gmail.com"),
            ("github.com/Aldiss1", "https://github.com/Aldiss1"),
            ("linkedin.com/in/aldisuryasaputra", "https://www.linkedin.com/in/aldisuryasaputra/"),
            ("aldisuryasaputra.vercel.app", "https://aldisuryasaputra.vercel.app"),
        ],
        "summary": (
            "Mahasiswa D4 Teknik Informatika Politeknik Negeri Malang yang membangun aplikasi web "
            "full stack: backend dan panel admin dengan Laravel + Filament, database "
            "MySQL/PostgreSQL, serta frontend dengan Next.js dan TypeScript. Telah mengerjakan "
            "platform pemesanan paket wisata, sistem informasi laboratorium, situs portofolio "
            "pribadi, dan aplikasi mobile Flutter dengan machine learning yang berjalan offline. "
            "Mencari magang full stack untuk berkontribusi pada produk nyata di tim profesional."
        ),
        "experience": [
            {
                "title": "Ketua Departemen Internal",
                "period": "Februari 2026 – sekarang",
                "org": (
                    "HMTI Polinema",
                    " — Himpunan Mahasiswa Teknologi Informasi, Politeknik Negeri Malang",
                ),
                "bullets": [
                    "Memimpin departemen internal Himpunan Mahasiswa Teknologi Informasi "
                    "Politeknik Negeri Malang.",
                    "Mengoordinasikan agenda, membagi tugas, dan menjaga komunikasi antar anggota.",
                ],
            },
            {
                "title": "Web Developer Intern (PKL)",
                "period": "Juli – Desember 2023",
                "org": ("Software House JV Partner", " — Praktik Kerja Lapangan SMK"),
                "bullets": [
                    "Membangun frontend website Tukan Indonesia dengan Laravel, dari awal hingga "
                    "rilis selama masa magang.",
                ],
            },
        ],
        "projects": [
            {
                "title": "Trip Web — Platform Pemesanan Paket Wisata",
                "period": "2026",
                "bullets": [
                    "Mengerjakan backend dan panel admin Laravel + Filament: destinasi, jadwal, promo, "
                    "booking, testimoni, dan ekspor laporan Excel.",
                    "Membuat command terjadwal yang otomatis membatalkan booking kedaluwarsa dan "
                    "melepas kembali kuotanya.",
                ],
                "stack": "Laravel, PHP, Filament, MySQL, Tailwind CSS",
            },
            {
                "title": "Sistem Informasi Lab Software Engineering",
                "period": "2025",
                "bullets": [
                    "Membangun panel admin (anggota, penelitian, publikasi, blog, roadmap) beserta "
                    "lapisan basis datanya.",
                    "Menulis stored procedure dan materialized view PostgreSQL agar laporan berat "
                    "tidak membebani query harian.",
                ],
                "stack": "PHP, PostgreSQL, Bootstrap, JavaScript",
                "stack_link": ("labse.web.id", "https://labse.web.id"),
            },
            {
                "title": "Portofolio Pribadi — Situs dan CV Daring",
                "period": "2026",
                "bullets": [
                    "Membangun dan men-deploy sendiri situs portofolio dengan Next.js dan "
                    "TypeScript: App Router, komponen server, animasi, dan CV yang bisa diunduh.",
                ],
                "stack": "Next.js, React, TypeScript, Tailwind CSS",
                "stack_link": ("aldisuryasaputra.vercel.app", "https://aldisuryasaputra.vercel.app"),
            },
            {
                "title": "SmartReceipt Analyzer — Aplikasi Struk Offline",
                "period": "2026",
                "bullets": [
                    "Membangun pipeline OCR → normalisasi teks → TF-IDF → Naive Bayes (15 kategori, "
                    "6.026 sampel) yang seluruhnya berjalan offline di aplikasi Flutter.",
                    "Menyusun parser struk yang memisahkan item, kuantitas, dan harga dari teks OCR "
                    "tidak rapi, plus dashboard analitik pengeluaran.",
                ],
                "stack": "Flutter, Dart, OCR, TF-IDF, Naive Bayes, SQLite",
            },
            {
                "title": "Sistem Pendaftaran Siswa Baru SMKN 2 Singosari",
                "period": "2023",
                "bullets": [
                    "Membangun aplikasi pendaftaran siswa baru secara full stack (tugas akhir SMK), "
                    "dari antarmuka hingga logika server dan basis data.",
                ],
                "stack": "Laravel, MySQL",
            },
        ],
        "skills": [
            ("Web", "PHP, HTML, CSS, JavaScript, TypeScript"),
            ("Framework", "Laravel, Filament, React, Next.js, Tailwind CSS"),
            ("Mobile", "Flutter, Dart"),
            ("Database", "MySQL, PostgreSQL, SQLite"),
            ("Perkakas", "Git, GitHub, Figma, VS Code, Postman"),
        ],
        "education": [
            {
                "title": "D4 Teknik Informatika",
                "period": "2024 – 2028 (estimasi)",
                "school": "Politeknik Negeri Malang",
                "note": "IPK 3,53 (skala 4,00), kumulatif semester 1–4",
            },
            {
                "title": "Rekayasa Perangkat Lunak",
                "period": "Lulus 2024",
                "school": "SMKN 2 Singosari",
                "note": None,
            },
        ],
    },
    "en": {
        # versi Inggris disimpan sebagai cadangan di subfolder tersendiri
        "out_dir": "backup-en",
        "filename": "CV_Aldi_Surya_Saputra_EN.docx",
        "labels": {
            "summary": "Summary",
            "experience": "Experience",
            "projects": "Projects",
            "skills": "Skills",
            "education": "Education",
            "stack": "Tech stack",
        },
        "name": "Aldi Surya Saputra",
        "role": "Informatics Engineering Student — Full Stack Web Developer (Laravel, Next.js)",
        "contact": [
            ("Malang, Indonesia", None),
            ("+62 813-3555-8147", "tel:+6281335558147"),
            ("aldisuryasaputra693@gmail.com", "mailto:aldisuryasaputra693@gmail.com"),
            ("github.com/Aldiss1", "https://github.com/Aldiss1"),
            ("linkedin.com/in/aldisuryasaputra", "https://www.linkedin.com/in/aldisuryasaputra/"),
            ("aldisuryasaputra.vercel.app", "https://aldisuryasaputra.vercel.app"),
        ],
        "summary": (
            "D4 Informatics Engineering student at Politeknik Negeri Malang (State Polytechnic of "
            "Malang) who builds full-stack web applications: backends and admin panels with Laravel "
            "+ Filament, MySQL/PostgreSQL databases, and frontends with Next.js and TypeScript. Has "
            "worked on a tour package booking platform, a laboratory information system, a personal "
            "portfolio site, and a Flutter mobile app with an on-device machine learning model. "
            "Seeking a full-stack internship to contribute to real products within a professional "
            "team."
        ),
        "experience": [
            {
                "title": "Head of Internal Department",
                "period": "February 2026 – present",
                "org": (
                    "HMTI Polinema",
                    " — Information Technology Student Association, Politeknik Negeri Malang",
                ),
                "bullets": [
                    "Led the internal department of the Information Technology Student Association "
                    "at Politeknik Negeri Malang.",
                    "Coordinated the agenda, distributed tasks, and maintained communication across "
                    "members.",
                ],
            },
            {
                "title": "Web Developer Intern (Vocational Internship)",
                "period": "July – December 2023",
                "org": ("Software House JV Partner", " — Vocational high school internship"),
                "bullets": [
                    "Built the frontend of the Tukan Indonesia website with Laravel, from scratch "
                    "through release, during the internship period.",
                ],
            },
        ],
        "projects": [
            {
                "title": "Trip Web — Tour Package Booking Platform",
                "period": "2026",
                "bullets": [
                    "Built the backend and admin panel with Laravel + Filament: destinations, "
                    "departure schedules, promos, bookings, testimonials, and Excel report exports.",
                    "Created a scheduled command that automatically cancels expired bookings and "
                    "releases their quota back to the schedule.",
                ],
                "stack": "Laravel, PHP, Filament, MySQL, Tailwind CSS",
            },
            {
                "title": "Software Engineering Lab Information System",
                "period": "2025",
                "bullets": [
                    "Built the admin panel (members, research, publications, blog, roadmap) along "
                    "with its database layer.",
                    "Wrote PostgreSQL stored procedures and materialized views so heavy reports do "
                    "not slow down daily queries.",
                ],
                "stack": "PHP, PostgreSQL, Bootstrap, JavaScript",
                "stack_link": ("labse.web.id", "https://labse.web.id"),
            },
            {
                "title": "Personal Portfolio — Website & Online CV",
                "period": "2026",
                "bullets": [
                    "Built and deployed my own portfolio site with Next.js and TypeScript: App "
                    "Router, server components, animations, and a downloadable CV.",
                ],
                "stack": "Next.js, React, TypeScript, Tailwind CSS",
                "stack_link": ("aldisuryasaputra.vercel.app", "https://aldisuryasaputra.vercel.app"),
            },
            {
                "title": "SmartReceipt Analyzer — Offline Receipt App",
                "period": "2026",
                "bullets": [
                    "Built an OCR → text normalization → TF-IDF → Naive Bayes pipeline (15 "
                    "categories, 6,026 samples) that runs entirely offline inside a Flutter app.",
                    "Wrote a receipt parser that separates items, quantities, and prices from messy "
                    "OCR text, plus a spending analytics dashboard.",
                ],
                "stack": "Flutter, Dart, OCR, TF-IDF, Naive Bayes, SQLite",
            },
            {
                "title": "New Student Admission System, SMKN 2 Singosari",
                "period": "2023",
                "bullets": [
                    "Built a full-stack new student admission application as a vocational high "
                    "school final project, from the interface through server logic and database.",
                ],
                "stack": "Laravel, MySQL",
            },
        ],
        "skills": [
            ("Web", "PHP, HTML, CSS, JavaScript, TypeScript"),
            ("Frameworks", "Laravel, Filament, React, Next.js, Tailwind CSS"),
            ("Mobile", "Flutter, Dart"),
            ("Database", "MySQL, PostgreSQL, SQLite"),
            ("Tools", "Git, GitHub, Figma, VS Code, Postman"),
        ],
        "education": [
            {
                "title": "D4 Informatics Engineering",
                "period": "2024 – 2028 (expected)",
                "school": "Politeknik Negeri Malang (State Polytechnic of Malang)",
                "note": "GPA 3.53 (out of 4.00), cumulative semesters 1–4",
            },
            {
                "title": "Software Engineering",
                "period": "Graduated 2024",
                "school": "SMKN 2 Singosari (Vocational High School)",
                "note": None,
            },
        ],
    },
}


# --- helper ---------------------------------------------------------------


def add_hyperlink(paragraph, text, url, size=Pt(8.8), color=MUTED):
    """Tambah hyperlink asli (bisa diklik) ke sebuah paragraf."""
    r_id = paragraph.part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    link = OxmlElement("w:hyperlink")
    link.set(qn("r:id"), r_id)

    run = OxmlElement("w:r")
    rpr = OxmlElement("w:rPr")

    fonts = OxmlElement("w:rFonts")
    for attr in ("w:ascii", "w:cs", "w:eastAsia", "w:hAnsi"):
        fonts.set(qn(attr), FONT)
    rpr.append(fonts)

    c = OxmlElement("w:color")
    c.set(qn("w:val"), str(color))
    rpr.append(c)

    sz = OxmlElement("w:sz")
    sz.set(qn("w:val"), str(int(size.pt * 2)))
    rpr.append(sz)

    run.append(rpr)
    t = OxmlElement("w:t")
    t.text = text
    run.append(t)
    link.append(run)
    paragraph._p.append(link)


def para(doc, *, before=0, after=0, line=None, align=None, keep=False):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    if line is not None:
        pf.line_spacing = line
    if align is not None:
        pf.alignment = align
    if keep:
        pf.keep_with_next = True
    return p


def run(p, text, *, size=9.2, bold=False, color=INK):
    r = p.add_run(text)
    r.font.name = FONT
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.color.rgb = color
    r._element.rPr.rFonts.set(qn("w:cs"), FONT)
    r._element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
    return r


def section(doc, title):
    p = para(doc, before=7, after=3, keep=True)
    run(p, title.upper(), size=10, bold=True)
    # garis bawah tipis, meniru border-bottom di versi HTML
    pbdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "6")
    bottom.set(qn("w:space"), "2")
    bottom.set(qn("w:color"), "DFE2E8")
    pbdr.append(bottom)
    p._p.get_or_add_pPr().append(pbdr)


def entry_head(doc, title, period):
    p = para(doc, before=5, after=0.5, keep=True)
    p.paragraph_format.tab_stops.add_tab_stop(CONTENT_WIDTH, WD_TAB_ALIGNMENT.RIGHT)
    run(p, title, size=10, bold=True)
    run(p, "\t" + period, size=8.6, color=MUTED)


def sub(doc, bold_text, rest):
    p = para(doc, after=1, line=1.05)
    run(p, bold_text, size=9.2, bold=True)
    run(p, rest, size=9.2, color=MUTED)


def bullet(doc, text):
    p = para(doc, after=1.2, line=1.05)
    pf = p.paragraph_format
    pf.left_indent = Cm(0.45)
    pf.first_line_indent = Cm(-0.45)
    pf.tab_stops.add_tab_stop(Cm(0.45))
    run(p, "•\t" + text, size=9.2)


def stack_line(doc, label, stack, link=None):
    p = para(doc, before=1, after=2)
    run(p, label + ": ", size=8.6, bold=True)
    run(p, stack, size=8.6, color=MUTED)
    if link:
        run(p, " — ", size=8.6, color=MUTED)
        add_hyperlink(p, link[0], link[1])


# --- dokumen --------------------------------------------------------------


def build(lang: str, out_path: Path) -> None:
    c = CONTENT[lang]
    labels = c["labels"]

    doc = Document()

    sec = doc.sections[0]
    sec.page_width, sec.page_height = Cm(21), Cm(29.7)
    sec.top_margin = sec.bottom_margin = Cm(1.0)
    sec.left_margin = sec.right_margin = Cm(1.4)

    normal = doc.styles["Normal"]
    normal.font.name = FONT
    normal.font.size = Pt(9.2)
    normal.font.color.rgb = INK
    normal.paragraph_format.space_before = Pt(0)
    normal.paragraph_format.space_after = Pt(0)

    # header
    p = para(doc, after=1, align=WD_ALIGN_PARAGRAPH.LEFT)
    run(p, c["name"], size=20, bold=True)

    p = para(doc, after=2.5)
    run(p, c["role"], size=10.5, bold=True)

    p = para(doc, after=0)
    for i, (text, url) in enumerate(c["contact"]):
        if i:
            run(p, " · ", size=8.8, color=MUTED)
        if url:
            add_hyperlink(p, text, url)
        else:
            run(p, text, size=8.8, color=MUTED)

    # garis tebal di bawah header
    pbdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "18")
    bottom.set(qn("w:space"), "4")
    bottom.set(qn("w:color"), "1A1D23")
    pbdr.append(bottom)
    p._p.get_or_add_pPr().append(pbdr)

    # ringkasan
    section(doc, labels["summary"])
    p = para(doc, after=0, line=1.15)
    run(p, c["summary"], size=9.2)

    # pendidikan — ditaruh tepat di bawah ringkasan karena pelamar magang
    section(doc, labels["education"])
    for i, edu in enumerate(c["education"]):
        p = para(doc, before=4 if i else 2, after=0.5, keep=True)
        p.paragraph_format.tab_stops.add_tab_stop(CONTENT_WIDTH, WD_TAB_ALIGNMENT.RIGHT)
        run(p, edu["title"], size=10, bold=True)
        run(p, "\t" + edu["period"], size=8.6, color=MUTED)

        p = para(doc, after=0.5)
        run(p, edu["school"], size=9.2, bold=True)

        if edu["note"]:
            p = para(doc, after=0)
            run(p, edu["note"], size=8.6, color=MUTED)

    # pengalaman
    section(doc, labels["experience"])
    for job in c["experience"]:
        entry_head(doc, job["title"], job["period"])
        sub(doc, job["org"][0], job["org"][1])
        for b in job["bullets"]:
            bullet(doc, b)

    # proyek
    section(doc, labels["projects"])
    for proj in c["projects"]:
        entry_head(doc, proj["title"], proj["period"])
        for b in proj["bullets"]:
            bullet(doc, b)
        stack_line(doc, labels["stack"], proj["stack"], proj.get("stack_link"))

    # keahlian
    section(doc, labels["skills"])
    for label, items in c["skills"]:
        p = para(doc, after=1)
        pf = p.paragraph_format
        pf.left_indent = Cm(2.9)
        pf.first_line_indent = Cm(-2.9)
        pf.tab_stops.add_tab_stop(Cm(2.9))
        run(p, label + "\t", size=9.2, bold=True)
        run(p, items, size=9.2, color=MUTED)

    doc.save(out_path)
    print(f"tersimpan: {out_path}")


if __name__ == "__main__":
    here = Path(__file__).parent
    for lang in ("id", "en"):
        out_dir = here / CONTENT[lang].get("out_dir", "")
        out_dir.mkdir(parents=True, exist_ok=True)
        build(lang, out_dir / CONTENT[lang]["filename"])
