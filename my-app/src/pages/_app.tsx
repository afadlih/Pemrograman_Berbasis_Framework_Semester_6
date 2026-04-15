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