# Dokumentasi Ujian Akhir Semester
## Fitur-Fitur Next.js Pages Router

**Nama:** Ahmad Fadlih Wahyu Sardana  
**NIM:** 2341720069  
**Program Studi:** TI 3F  
**Mata Kuliah:** Pemrograman Berbasis Framework  

---

## Daftar Isi

1. [Pages & Layout](#1-pages--layout)
2. [Navigation (Link)](#2-navigation-link)
3. [Styling](#3-styling)
4. [Custom Error Page](#4-custom-error-page)
5. [API Routes](#5-api-routes)
6. [Dynamic Routing](#6-dynamic-routing)

---

## 1. Pages & Layout

### Konsep

Next.js Pages Router menggunakan sistem berbasis file (file-based routing). Setiap file di dalam folder `src/pages/` secara otomatis menjadi sebuah route (URL). Jadi, cukup dengan membuat file di folder yang tepat, routing akan terbentuk tanpa konfigurasi tambahan. Selain itu, ada dua file spesial — `_app.tsx` dan `_document.tsx` — yang berfungsi sebagai pembungkus global dan template HTML dari seluruh aplikasi.

Pola ini membuat struktur proyek sangat mudah dibaca: ingin tahu ada halaman apa saja? Cukup lihat isi folder `src/pages/`.

### File yang Digunakan

| File | Path Lengkap |
|------|-------------|
| Wrapper global | `my-app/src/pages/_app.tsx` |
| Template HTML | `my-app/src/pages/_document.tsx` |
| Home page | `my-app/src/pages/index.tsx` |
| Halaman About | `my-app/src/pages/about/index.tsx` |
| Layout pembungkus | `my-app/src/components/layouts/Appshell/index.tsx` |
| Komponen Navbar | `my-app/src/components/layouts/Navbar/index.tsx` |

### Struktur Folder Pages

```
src/pages/
├── _app.tsx          ← wrapper global seluruh halaman
├── _document.tsx     ← template HTML dasar
├── 404.tsx           ← halaman error 404 kustom
├── index.tsx         ← home page (route "/")
├── about/
│   └── index.tsx     ← route "/about"
├── admin/
├── api/              ← API routes (bukan halaman)
├── auth/
├── blog/
├── category/
├── editor/
├── produk/
│   ├── index.tsx     ← route "/produk"
│   ├── [produk].tsx  ← route "/produk/:id" (dynamic)
│   ├── server.tsx    ← route "/produk/server"
│   └── static.tsx    ← route "/produk/static"
├── profile/
├── setting/
├── shop/
└── user/
```

### Cuplikan Kode

#### `src/pages/_app.tsx` (baris 1–18)

```tsx
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import Appshell from '@/components/layouts/Appshell';
import { SessionProvider } from "next-auth/react";

type AppPropsWithSession = AppProps<{
  session?: Session | null;
}>;

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithSession) {
  return (
    <SessionProvider session={session}>
      <Appshell>
        <Component {...pageProps} />
      </Appshell>
    </SessionProvider>
  );
}
```

**Penjelasan baris per baris:**

- **Baris 1–3** — Mengimpor tipe `AppProps` dari Next.js, tipe `Session` dari NextAuth, dan komponen `Appshell` sebagai layout pembungkus.
- **Baris 4** — Mengimpor `SessionProvider` dari NextAuth agar seluruh halaman bisa mengakses data sesi login pengguna.
- **Baris 6–8** — Mendefinisikan tipe khusus `AppPropsWithSession` yang memperluas `AppProps` dengan menambahkan properti `session` opsional.
- **Baris 10** — Fungsi `App` ini adalah entry point utama. Setiap kali pengguna berpindah halaman, `Component` berubah menjadi halaman tujuan, sedangkan `pageProps` berisi data yang sudah di-fetch.
- **Baris 12** — `SessionProvider` membungkus seluruh aplikasi agar hook `useSession()` bisa dipakai di halaman mana saja.
- **Baris 13–15** — `Appshell` adalah layout yang selalu muncul di setiap halaman (berisi Navbar), dan `Component` adalah isi halaman yang aktif saat itu.

#### `src/pages/_document.tsx` (baris 1–13)

```tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="id">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

**Penjelasan baris per baris:**

- **Baris 1** — Mengimpor komponen bawaan Next.js khusus untuk `_document.tsx`. Komponen ini tidak tersedia di file lain.
- **Baris 5** — `<Html lang="id">` menetapkan bahwa bahasa dokumen HTML adalah Indonesia (`id`), penting untuk aksesibilitas dan SEO.
- **Baris 6** — `<Head />` adalah tempat menaruh meta tag, link font, atau stylesheet global yang perlu diletakkan di `<head>` HTML.
- **Baris 8** — `<Main />` adalah tempat di mana seluruh konten halaman Next.js akan dirender.
- **Baris 9** — `<NextScript />` menyisipkan script JavaScript yang dibutuhkan Next.js untuk hidration (proses menghidupkan HTML statis menjadi React interaktif).

#### `src/components/layouts/Appshell/index.tsx` (baris 1–19)

```tsx
import { useRouter } from "next/router";
import Navbar from "../Navbar";

type AppShellProps = {
    children: React.ReactNode;
};

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();
    return (
        <main>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
        </main>
    );
};
```

**Penjelasan baris per baris:**

- **Baris 1** — `useRouter()` digunakan untuk mendapatkan informasi route yang sedang aktif.
- **Baris 8** — Array `disableNavbar` berisi daftar pathname yang tidak menampilkan Navbar (halaman login, register, dan 404 memiliki desain tersendiri).
- **Baris 12** — `pathname` diambil dari router — ini adalah path URL yang sedang aktif, misalnya `/produk` atau `/auth/login`.
- **Baris 15** — Kondisi: jika `pathname` **tidak** ada dalam `disableNavbar`, maka render `<Navbar />`. Ini adalah teknik conditional rendering.
- **Baris 16** — `{children}` adalah konten halaman aktif yang diteruskan dari `_app.tsx`.

### Kesimpulan

`_app.tsx` bertindak sebagai "selimut" yang membungkus seluruh aplikasi dengan `SessionProvider` (untuk autentikasi) dan `Appshell` (untuk layout). `_document.tsx` mengatur struktur HTML dasar termasuk atribut `lang`. `Appshell` secara cerdas menyembunyikan Navbar di halaman-halaman tertentu menggunakan deteksi `pathname`. Sistem ini memungkinkan konsistensi UI di seluruh aplikasi tanpa menulis ulang Navbar di setiap halaman.

---

## 2. Navigation (Link)

### Konsep

Di Next.js, ada dua cara utama untuk navigasi: menggunakan komponen `<Link>` dari `next/link` untuk navigasi deklaratif di JSX, dan menggunakan `useRouter()` dari `next/router` untuk navigasi programatik (dari dalam logika JavaScript). Keduanya melakukan *client-side navigation*, artinya perpindahan halaman terjadi tanpa full reload browser — pengalaman pengguna menjadi jauh lebih cepat.

Di repository ini, implementasinya tidak sepenuhnya konsisten: sebagian menggunakan `window.location.href` (navigasi HTML biasa) dan sebagian menggunakan `Link` atau `useRouter`.

### File yang Digunakan

| Penggunaan | File |
|-----------|------|
| `window.location.href` ke `/about` | `my-app/src/pages/index.tsx` |
| `window.location.href` ke `/` | `my-app/src/pages/about/index.tsx` |
| `<Link>` ke home | `my-app/src/pages/404.tsx` |
| `useRouter` untuk deteksi path | `my-app/src/components/layouts/Appshell/index.tsx` |

### Cuplikan Kode

#### Navigasi di `src/pages/index.tsx` (baris 8–18)

```tsx
export default function Home() {
  return (
    <div>
      <head>
        <title>Praktikum Next.js Pages Router</title>
      </head>
      <h1> Praktikum Next.Js Pages Router</h1><br />
      <p>Mahasiswa D4 Pengembangan Web</p>
      <button className="btn btn-primary" onClick={() => window.location.href = "/about"}>About Me</button>
    </div>
  );
}
```

**Penjelasan:**

- **Baris 16** — Tombol "About Me" menggunakan event `onClick` dengan `window.location.href = "/about"`. Ini adalah navigasi biasa berbasis browser, bukan navigasi Next.js. Ini menyebabkan full page reload, sehingga tidak memanfaatkan kecepatan client-side navigation Next.js.
- **Catatan kekurangan (navigasi):** Idealnya menggunakan `<Link href="/about">` atau `router.push("/about")` dari `useRouter` agar perpindahan halaman lebih cepat dan tanpa reload.
- **Catatan kekurangan (metadata):** Tag `<head>` (huruf kecil, HTML biasa) di baris 11 sebaiknya diganti dengan `<Head>` dari `next/head` agar metadata title diproses dengan benar oleh Next.js di semua mode rendering.

#### Navigasi `<Link>` di `src/pages/404.tsx` (baris 1–17)

```tsx
import styles from "@/styles/404.module.scss";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <img src="/404pict.png" alt="404" className={styles.error__image}/>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
      <Link href="/" className={styles.error__btn}>
        Kembali ke Home
      </Link>
    </div>
  );
};
```

**Penjelasan baris per baris:**

- **Baris 2** — Mengimpor komponen `Link` dari `next/link`. Ini adalah cara yang benar untuk navigasi di Next.js.
- **Baris 10–12** — `<Link href="/">` merender sebuah tag `<a>` yang ketika diklik akan menavigasi ke halaman home (`/`) menggunakan client-side navigation. Properti `className` digunakan untuk memberi styling dari CSS Module.

#### `useRouter` di `src/components/layouts/Appshell/index.tsx`

```tsx
import { useRouter } from "next/router";

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();
    return (
        <main>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
        </main>
    );
};
```

**Penjelasan:**

- **`useRouter()`** — Hook ini memberikan akses ke objek router. Di sini digunakan untuk mengambil `pathname` (path URL aktif).
- **`pathname`** — Berisi nilai seperti `/produk`, `/auth/login`, dll. Digunakan untuk logika kondisional menampilkan/menyembunyikan Navbar.
- Ini adalah penggunaan `useRouter` untuk membaca state routing, bukan untuk melakukan navigasi.

### Kesimpulan

Repository ini menunjukkan dua pola navigasi: `<Link>` (digunakan dengan benar di `404.tsx`) dan `window.location.href` (digunakan di `index.tsx` dan `about/index.tsx`). Penggunaan `window.location.href` adalah pendekatan yang kurang optimal karena menyebabkan full page reload dan tidak memanfaatkan keunggulan Next.js. `useRouter` digunakan secara efektif di `Appshell` untuk membaca pathname dan mengontrol visibilitas Navbar secara dinamis.

---

## 3. Styling

### Konsep

Repository ini menggunakan kombinasi tiga pendekatan styling: **CSS Modules** (file `.module.css` dan `.module.scss`) untuk styling terisolasi per komponen, **Tailwind CSS** untuk utility-first styling, dan **SCSS** untuk mendefinisikan variabel warna global. CSS Modules memastikan nama kelas tidak bertabrakan antar komponen karena Next.js secara otomatis menambahkan hash unik pada nama kelas.

### File yang Digunakan

| File | Path Lengkap | Tipe |
|------|-------------|------|
| Global styles | `my-app/src/styles/globals.css` | Global CSS + Tailwind |
| Variabel warna | `my-app/src/styles/colors.scss` | SCSS variabel |
| Error page styles | `my-app/src/styles/404.module.scss` | SCSS Module |
| Home styles | `my-app/src/styles/Home.module.css` | CSS Module |
| Navbar styles | `my-app/src/components/layouts/Navbar/navbar.module.css` | CSS Module |
| Produk list styles | `my-app/src/pages/produk/product.module.scss` | SCSS Module |
| Produk detail styles | `my-app/src/pages/produk/product-detail.module.scss` | CSS Module |
| Tailwind config | `my-app/tailwind.config.js` | Konfigurasi Tailwind |

### Cuplikan Kode

#### `src/styles/globals.css` (baris 1–24)

```css
/* @tailwind base; */
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html, body {
  max-width: 100vw;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

.big {
  font-size: 1.5rem;
}
```

**Penjelasan baris per baris:**

- **Baris 1** — Direktif `@tailwind base` dikomentari. Artinya reset CSS bawaan Tailwind tidak digunakan, mungkin karena bertabrakan dengan styling kustom yang ada.
- **Baris 2–3** — Mengaktifkan `@tailwind components` dan `@tailwind utilities`, sehingga kelas seperti `btn-primary`, `flex`, `p-4`, dll. dapat digunakan.
- **Baris 5–9** — Reset CSS sederhana: semua elemen menggunakan `box-sizing: border-box`, dan padding/margin di-reset ke 0.
- **Baris 16–18** — Link (`<a>`) tidak memiliki dekorasi teks dan mewarisi warna dari elemen induknya.

#### `src/styles/colors.scss` (baris 1–7)

```scss
$schema: (
  color-primary: #3498db,
  color-secondary: #2ecc71,
  color-accent: #e74c3c,
  color-background: #ecf0f1,
  color-text: #2c3e50
);
```

**Penjelasan:**

- File ini mendefinisikan skema warna sebagai SCSS map dengan nama `$schema`. Ini adalah praktik baik untuk menyimpan palet warna di satu tempat.
- **Catatan kekurangan:** Variabel ini tampaknya tidak digunakan oleh komponen manapun di proyek ini (tidak ada `@use` atau `map.get($schema, ...)` yang terdeteksi), sehingga hanya berfungsi sebagai definisi tanpa implementasi.

#### `src/styles/404.module.scss` (baris 1–37)

```scss
.error {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  &__btn {
    margin-top: 1.5rem;
    padding: 0.6rem 1.5rem;
    background-color: #0070f3;
    color: #fff;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0051a8;
    }
  }

  &__image {
    width: 300px;
  }
}
```

**Penjelasan:**

- `.error` — Class utama untuk container halaman error. Menggunakan `flexbox` agar konten berada di tengah layar secara vertikal dan horizontal.
- `h1` — Nested selector (fitur SCSS): style untuk `<h1>` di dalam `.error` langsung dapat ditulis di sini.
- `&__btn` — Notasi BEM (Block Element Modifier). `&` mengacu pada `.error`, jadi ini setara dengan `.error__btn`. Digunakan untuk tombol kembali ke home.
- `&__image` — Mengatur lebar gambar 404 menjadi 300px.

#### `src/components/layouts/Navbar/navbar.module.css` (baris 1–20, ringkasan)

```css
.navbar {
  width: 100%;
  height: 70px;
  padding: 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}
```

**Penjelasan:**

- `.navbar` — Class utama untuk elemen Navbar. Navbar memiliki tinggi 70px, padding kiri-kanan 60px.
- `background: linear-gradient(135deg, ...)` — Memberikan efek gradien diagonal dari warna gelap (`#0f172a`) ke sedikit lebih terang (`#1e293b`), menciptakan tampilan modern.
- `border-bottom-*-radius: 16px` — Memberi sudut melengkung di pojok bawah kiri dan kanan Navbar, sehingga terlihat "mengapung".

#### `tailwind.config.js` (baris 1–13)

```js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Penjelasan:**

- `content` — Memberitahu Tailwind file mana yang harus di-scan untuk mencari kelas Tailwind yang digunakan. Ini untuk fitur *tree-shaking* — hanya kelas yang benar-benar dipakai yang akan disertakan dalam CSS final.
- `theme.extend: {}` — Tidak ada customisasi tema tambahan, artinya hanya menggunakan nilai default Tailwind.
- Penggunaan Tailwind di `index.tsx`: `className="btn btn-primary"` dan `className="btn btn-secondary"` — ini adalah kelas dari Tailwind components.

### Kesimpulan

Proyek ini memiliki sistem styling berlapis: `globals.css` untuk reset dan direktif Tailwind, `colors.scss` untuk palet warna global (meski belum dipakai), CSS/SCSS Modules untuk styling per komponen yang terisolasi (Navbar, produk, 404), dan Tailwind utility classes untuk styling cepat di komponen tertentu. SCSS Modules dengan sintaks BEM (`&__element`) digunakan secara konsisten di beberapa komponen, memberikan struktur kelas yang rapi dan mudah dibaca.

---

## 4. Custom Error Page

### Konsep

Next.js mendukung pembuatan halaman error kustom. Cukup dengan membuat file bernama `404.tsx` di folder `src/pages/`, Next.js akan otomatis menggunakannya setiap kali ada request ke URL yang tidak terdaftar sebagai route. Ini jauh lebih baik dari halaman 404 default Next.js yang sangat polos.

### File yang Digunakan

| File | Path Lengkap |
|------|-------------|
| Halaman 404 | `my-app/src/pages/404.tsx` |
| Styling 404 | `my-app/src/styles/404.module.scss` |
| Gambar error | `my-app/public/404pict.png` |

### Cuplikan Kode

#### `src/pages/404.tsx` (baris 1–20)

```tsx
import styles from "@/styles/404.module.scss";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className={styles.error}>
        <head>
            <title>404 - Halaman Tidak Ditemukan</title>
        </head>
        <img src="/404pict.png" alt="404" className={styles.error__image}/>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
      <Link href="/" className={styles.error__btn}>
        Kembali ke Home
      </Link>
    </div>
    );
};

export default Custom404;
```

**Penjelasan baris per baris:**

- **Baris 1** — Mengimpor CSS Module dari `404.module.scss`. Objek `styles` berisi nama kelas yang sudah di-hash oleh Next.js (misalnya `styles.error` menjadi `error__abc123`).
- **Baris 2** — Mengimpor `Link` dari `next/link` untuk navigasi kembali ke home tanpa reload.
- **Baris 6** — Container utama dengan `className={styles.error}` yang mengatur tampilan fullscreen centered (lihat di bagian Styling).
- **Baris 7–9** — Tag `<head>` (huruf kecil) di dalam komponen untuk mengatur judul tab browser. **Ini adalah kekurangan implementasi** — Next.js menyediakan komponen `<Head>` dari `next/head` yang seharusnya digunakan:
  ```tsx
  import Head from "next/head";
  // ...
  <Head>
    <title>404 - Halaman Tidak Ditemukan</title>
  </Head>
  ```
  Penggunaan `<Head>` (kapital) dari `next/head` memastikan metadata (title, meta tag) diproses oleh Next.js dengan benar, termasuk saat SSR dan saat navigasi client-side.
- **Baris 10** — Menampilkan gambar `/404pict.png`. Gambar ini disimpan di folder `public/` sehingga bisa diakses langsung via URL.
- **Baris 11–12** — Judul dan deskripsi error.
- **Baris 13–15** — `<Link href="/">` adalah tombol untuk kembali ke home, memanfaatkan client-side navigation Next.js. Berbeda dengan halaman `index.tsx` yang menggunakan `window.location.href`, di sini implementasinya sudah benar menggunakan `Link`.

#### `src/styles/404.module.scss` — Styling Terkait

```scss
.error {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
```

- `width: 100vw; height: 100vh` — Halaman 404 memenuhi seluruh viewport (layar penuh).
- `display: flex; flex-direction: column; justify-content: center; align-items: center` — Semua konten (gambar, judul, deskripsi, tombol) ditumpuk secara vertikal dan berada tepat di tengah layar.

### Kesimpulan

Implementasi custom 404 page di repository ini sudah cukup lengkap: ada gambar ilustrasi (`404pict.png`), judul yang informatif, pesan deskripsi, dan tombol `<Link>` untuk kembali ke home. Styling-nya rapi menggunakan SCSS Module dengan Flexbox. Satu catatan kecil: penggunaan `<head>` (huruf kecil, HTML biasa) di dalam komponen sebaiknya diganti dengan komponen `<Head>` dari `next/head`:

```tsx
import Head from "next/head";
// ...
<Head>
  <title>404 - Halaman Tidak Ditemukan</title>
</Head>
```

Komponen `<Head>` dari `next/head` diproses secara khusus oleh Next.js — ia menyuntikkan metadata ke `<head>` HTML dengan benar, termasuk saat SSR dan saat navigasi client-side (di mana full reload tidak terjadi). Dengan `<head>` biasa, title mungkin tidak terupdate saat navigasi client-side.

---

## 5. API Routes

### Konsep

API Routes di Next.js memungkinkan pembuatan backend API langsung di dalam proyek frontend, tanpa perlu server terpisah. Setiap file di dalam `src/pages/api/` secara otomatis menjadi endpoint API yang dapat dipanggil via HTTP. File-file ini berjalan di sisi server (Node.js), sehingga aman untuk mengakses database, environment variables, dan logika sensitif lainnya.

Setiap handler menerima dua parameter: `req` (request — berisi method, query, body) dan `res` (response — digunakan untuk mengirim balik data).

### File yang Digunakan

| File | Path Lengkap | Fungsi |
|------|-------------|--------|
| Hello endpoint | `my-app/src/pages/api/hello.ts` | Contoh sederhana |
| Produk endpoint | `my-app/src/pages/api/produk.ts` | Fetch semua produk |
| Catch-all produk | `my-app/src/pages/api/[[...produk]].ts` | Fetch semua / by ID |
| Register endpoint | `my-app/src/pages/api/register.ts` | Registrasi user |
| Revalidate endpoint | `my-app/src/pages/api/revalidate.ts` | ISR revalidation |
| NextAuth handler | `my-app/src/pages/api/auth/[...nextauth].ts` | Autentikasi |
| Firebase service | `my-app/src/utils/db/servicefirebase.ts` | Koneksi Firestore |

### Cuplikan Kode

#### `src/pages/api/hello.ts` — Endpoint Sederhana

```typescript
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  alamat: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe", alamat: "Jl. Merdeka No. 123" });
}
```

**Penjelasan:**

- `NextApiRequest` dan `NextApiResponse` adalah tipe dari Next.js untuk parameter handler API.
- `type Data` mendefinisikan tipe respons JSON yang akan dikirim.
- `res.status(200).json(...)` — Mengirim respons HTTP 200 (OK) dengan data JSON berisi `name` dan `alamat`.
- Endpoint ini dapat diakses di `GET /api/hello` dan selalu mengembalikan data statis yang sama.

#### `src/pages/api/produk.ts` — Endpoint dengan Firebase dan Cache Control

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveProducts } from "../../utils/db/servicefirebase";

interface Product {
  [key: string]: string | number | boolean | null;
}

type Data = {
  status: boolean;
  status_code: number;
  data: Product[];
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const data = await retrieveProducts("products");

  res.status(200).json({
    status: true,
    status_code: 200,
    data,
  });
}
```

**Penjelasan baris per baris:**

- **Baris 3** — Mengimpor fungsi `retrieveProducts` dari Firebase service — ini yang akan membaca data dari Firestore.
- **Baris 15** — `_req` (dengan underscore) berarti parameter request tidak digunakan dalam fungsi ini — konvensi TypeScript untuk parameter yang sengaja tidak dipakai.
- **Baris 17–20** — Header `Cache-Control` dan `Pragma` diset untuk memastikan data produk selalu diambil fresh dari database, tidak dari cache browser atau CDN. Ini penting karena data produk bisa berubah kapan saja.
- **Baris 22** — `await retrieveProducts("products")` — Memanggil fungsi async untuk mengambil semua data dari koleksi `products` di Firestore.
- **Baris 24–28** — Mengirim respons dengan format standar: `status` (boolean), `status_code` (angka HTTP), dan `data` (array produk).

#### `src/pages/api/[[...produk]].ts` — Catch-All Dynamic API Route

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataById, retrieveProducts } from "../../utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if(req.query.produk![1]){
    const data = await retrieveDataById("products", req.query.produk![1]);
    res.status(200).json({status: true, status_code: 200, data});
    return;
  } else {
    const data = await retrieveProducts("products");
    res.status(200).json({
      status: true,
      status_code: 200,
      data: data,
    });
  }
}
```

**Penjelasan baris per baris:**

- **Nama file `[[...produk]].ts`** — Notasi `[[...]]` (double brackets) berarti *optional catch-all route*. Ini menangani SEMUA path di bawah `/api/`, termasuk `/api/` sendiri (tanpa segment tambahan).
- **Baris 14** — `req.query.produk` adalah array yang berisi segmen URL. Untuk URL `/api/products/abc123`, nilainya adalah `["products", "abc123"]`. Indeks `[1]` mengambil `abc123` sebagai ID produk.
- **Baris 14–17** — Jika ada ID produk di URL, fetch data produk tunggal menggunakan `retrieveDataById`.
- **Baris 18–24** — Jika tidak ada ID, fetch semua produk menggunakan `retrieveProducts`.
- Dengan satu file ini, endpoint `/api/` dan `/api/[anything]/[id]` ditangani sekaligus.

#### `src/pages/api/register.ts` — Endpoint Registrasi

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/utils/db/servicefirebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const result = await signUp(req.body);
    if (result.status === "success") {
      res.status(200).json({ name: result.message, alamat: "" });
    } else {
      res.status(400).json({ name: result.message, alamat: "" });
    }
  } else {
    res.status(405).json({ name: "Method Not Allowed", alamat: "" });
  }
}
```

**Penjelasan:**

- **`req.method === "POST"`** — Mengecek apakah request adalah POST. Endpoint ini hanya menerima metode POST (untuk mengirim data registrasi).
- **`req.body`** — Berisi data yang dikirim client (email, password, nama lengkap).
- **`signUp(req.body)`** — Memanggil fungsi registrasi di Firebase service yang akan menyimpan user baru ke Firestore.
- Jika berhasil → status 200. Jika gagal (misalnya email sudah ada) → status 400. Jika bukan POST → status 405 (Method Not Allowed).

#### `src/pages/api/revalidate.ts` — ISR Revalidation

```typescript
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    if (req.query.token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({
      revalidated: false,
      message: "Gagal! Token security tidak valid atau tidak ditemukan.",
    });
  }

  if (req.query.data === "produk") {
    try {
      await res.revalidate("/produk/static");
      return res.status(200).json({ revalidated: true });
    } catch (error) {
      res.status(500).send({ revalidated: false, message: "Error occurred while revalidating." });
    }
  }
}
```

**Penjelasan:**

- **`process.env.REVALIDATE_TOKEN`** — Token rahasia dari environment variable. Digunakan sebagai proteksi agar tidak sembarang orang bisa men-trigger revalidation.
- **`req.query.token !== process.env.REVALIDATE_TOKEN`** — Validasi keamanan: jika token tidak cocok, tolak request dengan status 401 (Unauthorized).
- **`res.revalidate("/produk/static")`** — Ini adalah fitur ISR (Incremental Static Regeneration) Next.js: memaksa regenerasi halaman `/produk/static` yang di-build secara statis, tanpa harus rebuild seluruh aplikasi.

### Kesimpulan

API Routes di repository ini mencakup berbagai use case: endpoint sederhana (`hello.ts`), fetch data dari Firebase dengan cache control (`produk.ts`), catch-all route yang fleksibel (`[[...produk]].ts`), endpoint registrasi dengan validasi metode HTTP (`register.ts`), dan revalidation endpoint untuk ISR (`revalidate.ts`). Semua menggunakan TypeScript dengan tipe `NextApiRequest` dan `NextApiResponse`. Koneksi ke Firebase Firestore dipusatkan di satu file `servicefirebase.ts` sehingga mudah dimaintain.

---

## 6. Dynamic Routing

### Konsep

Dynamic Routing di Next.js memungkinkan pembuatan halaman dengan URL yang berubah-ubah sesuai data. Misalnya, daripada membuat file `produk-1.tsx`, `produk-2.tsx`, dst., cukup buat satu file `[produk].tsx` — tanda kurung siku menandakan segmen URL dinamis. Next.js akan menangkap nilai dari URL tersebut dan meneruskannya ke halaman sebagai parameter.

Ada dua cara mengambil data untuk halaman dinamis: **SSR** (Server-Side Rendering) dengan `getServerSideProps` yang merender setiap request, atau **SSG** (Static Site Generation) dengan `getStaticPaths` + `getStaticProps` yang merender saat build time.

### File yang Digunakan

| File | Path Lengkap | Fungsi |
|------|-------------|--------|
| Dynamic page frontend | `my-app/src/pages/produk/[produk].tsx` | Halaman detail produk |
| Catch-all API route | `my-app/src/pages/api/[[...produk]].ts` | API produk dinamis |
| Detail view | `my-app/src/views/DetailProduct/` | Tampilan detail produk |
| Firebase service | `my-app/src/utils/db/servicefirebase.ts` | Fungsi `retrieveDataByID` |

### Cuplikan Kode

#### `src/pages/produk/[produk].tsx` — Halaman Dynamic Product

```tsx
import DetailProduk from "@/views/DetailProduct";
import { ProductType } from "@/types/product.type";
import { retrieveDataByID, retrieveProducts } from "@/utils/db/servicefirebase";

const HalamanProduk = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <DetailProduk product={product} />
    </div>
  );
};

export default HalamanProduk;

// SSR (dikomentari)
// export async function getServerSideProps({params}: { params: { produk: string } }) {
//   const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
//   const response = await res.json();
//   return{ props:{ product: response.data } };
// }

export async function getStaticPaths() {
  const products = (await retrieveProducts("products")) as ProductType[];
  const paths = products.map((product) => ({
    params: { produk: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { produk: string } }) {
  const product = (await retrieveDataByID(
    "products",
    params?.produk,
  )) as ProductType | null;

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}
```

**Penjelasan baris per baris:**

- **Baris 5** — `HalamanProduk` menerima `product` sebagai prop yang sudah berisi data produk lengkap. Data ini di-inject oleh `getStaticProps`.
- **Baris 7–8** — Komponen `DetailProduk` merender tampilan detail produk berdasarkan data yang diterima.
- **Baris 16–24 (dikomentari)** — Ini adalah versi SSR yang dikomentari. Jika aktif, setiap kali halaman diakses, Next.js akan fetch data dari API. Ini dianotasi untuk dokumentasi alternatif implementasi.
- **Baris 21–31 (`getStaticPaths`)** — Fungsi ini dipanggil saat build time. Ia mengambil semua produk dari Firebase, lalu membuat daftar semua path yang harus di-generate (misalnya `/produk/abc123`, `/produk/def456`, dst.).
- **Baris 26–29** — `paths` adalah array objek dengan format `{ params: { produk: "id-produk" } }`. Nama key `produk` harus sama dengan nama file `[produk].tsx`.
- **Baris 30** — `fallback: false` berarti jika ada request ke path yang tidak ada di `paths`, langsung tampilkan halaman 404. Tidak ada on-demand generation.
- **Baris 33–49 (`getStaticProps`)** — Fungsi ini dipanggil untuk setiap path dari `getStaticPaths`. `params.produk` berisi ID produk dari URL.
- **Baris 34–36** — `retrieveDataByID("products", params.produk)` mengambil satu produk berdasarkan ID dari Firestore.
- **Baris 38–41** — Jika produk tidak ditemukan (`null`), return `{ notFound: true }` yang akan otomatis menampilkan halaman 404.
- **Baris 43–47** — Jika produk ada, return `{ props: { product } }` sehingga komponen `HalamanProduk` menerima data ini sebagai prop.

#### `src/utils/db/servicefirebase.ts` — Fungsi `retrieveDataById`

```typescript
export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

// Backward-compatible alias (some pages still import `retrieveDataByID`)
export const retrieveDataByID = retrieveDataById;
```

**Penjelasan:**

- **`doc(db, collectionName, id)`** — Membuat referensi ke dokumen spesifik di Firestore dengan path `collectionName/id`.
- **`getDoc(snapshot)`** — Mengambil data dokumen dari Firestore secara async.
- **`snapshot.data()`** — Mengambil data dari snapshot. Jika dokumen tidak ada, ini mengembalikan `undefined`.
- **`retrieveDataByID`** — Alias yang dibuat untuk kompatibilitas mundur: beberapa file mengimpor dengan huruf kapital `ID` dan sebagian lain dengan huruf kecil `Id`.

#### `src/pages/api/[[...produk]].ts` — Dynamic API Route

```typescript
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if(req.query.produk![1]){
    const data = await retrieveDataById("products", req.query.produk![1]);
    res.status(200).json({status: true, status_code: 200, data});
    return;
  } else {
    const data = await retrieveProducts("products");
    res.status(200).json({ status: true, status_code: 200, data: data });
  }
}
```

**Penjelasan:**

- **`req.query.produk`** — Untuk file `[[...produk]].ts`, Next.js secara otomatis mengisi `req.query.produk` dengan array segmen URL. Untuk `/api/products/abc123` nilainya `["products", "abc123"]`.
- **`req.query.produk![1]`** — Tanda `!` adalah TypeScript non-null assertion (menjamin tidak null). Indeks `[1]` mengambil segmen kedua (ID produk).
- **Logika percabangan** — Jika ada ID di URL → fetch produk tunggal. Jika tidak → fetch semua produk. Satu endpoint untuk dua use case.

### Kesimpulan

Dynamic Routing di repository ini diimplementasikan dengan pendekatan SSG (Static Site Generation): `getStaticPaths` mengambil semua ID produk saat build, kemudian `getStaticProps` meng-generate halaman HTML statis untuk setiap produk. Hasilnya adalah halaman yang sangat cepat karena sudah di-render sebelumnya. Alternatif SSR menggunakan `getServerSideProps` sudah ditulis tetapi dikomentari, menunjukkan bahwa developer sempat mempertimbangkan keduanya. Di sisi API, file `[[...produk]].ts` menggunakan catch-all route untuk menangani request dengan atau tanpa ID produk dalam satu handler.

---

## Ringkasan Keseluruhan

| Fitur | Implementasi | Status |
|-------|-------------|--------|
| Pages & Layout | `_app.tsx` + `_document.tsx` + `Appshell` | ✅ Lengkap |
| Navigation | `Link` di 404, `useRouter` di Appshell | ⚠️ `index.tsx` masih pakai `window.location.href` |
| Styling | CSS Modules + SCSS + Tailwind | ✅ Lengkap, `colors.scss` belum dipakai |
| Custom Error Page | `404.tsx` + gambar + styling | ✅ Lengkap |
| API Routes | 5 endpoint + NextAuth | ✅ Lengkap dan bervariasi |
| Dynamic Routing | `[produk].tsx` + SSG + catch-all API | ✅ Lengkap dengan fallback |

Repository ini adalah implementasi Next.js Pages Router yang cukup komprehensif, mencakup hampir semua fitur utama framework: routing berbasis file, layout global, API routes, autentikasi dengan NextAuth, koneksi Firebase, dan rendering strategy yang beragam (CSR, SSG, SSR). Kekurangan utama yang tercatat adalah inkonsistensi penggunaan navigasi (`window.location.href` vs `<Link>`) dan variabel SCSS yang didefinisikan tapi tidak digunakan.
