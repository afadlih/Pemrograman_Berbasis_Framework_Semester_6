import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/layouts/navbar";
import Appshell from '@/components/layouts/Appshell';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Appshell>
      <Component {...pageProps} />
    </Appshell>
  );
}
