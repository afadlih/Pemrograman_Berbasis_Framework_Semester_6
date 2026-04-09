import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

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