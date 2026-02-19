import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/dist/client/link'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
return (
<div>
  <h1>Praktikum Next.js Pages Router</h1> <br />
  <p>Mahasiswa D4 Pengembangan Web</p>
  <br />
  <Link href="/about">Go to About Page</Link>
</div>


)
}