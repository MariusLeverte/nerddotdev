import { NextUIProvider } from "@nextui-org/react";
import { logEvent, getAnalytics } from "firebase/analytics";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import Header from "../components/Header";
import { FirebaseAuthProvider } from "../libs/firebase/FirebaseAuthProvider";
import { app } from "../libs/firebase/initFirebase";
import theme from "../nextUI/theme";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") return;

    const analytics = getAnalytics(app);
    logEvent(analytics, "screen_view");
  }, []);

  return (
    <FirebaseAuthProvider>
      <NextUIProvider theme={theme}>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </FirebaseAuthProvider>
  );
}

export default MyApp;
