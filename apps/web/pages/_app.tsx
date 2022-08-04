import "../styles/globals.css";

import { logEvent, getAnalytics } from "firebase/analytics";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import Header from "../components/Header/Header";
import { FirebaseAuthProvider } from "../libs/firebase/FirebaseAuthProvider";
import { app } from "../libs/firebase/initFirebase";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") return;

    const analytics = getAnalytics(app);
    logEvent(analytics, "screen_view");
  }, []);

  return (
    <FirebaseAuthProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </FirebaseAuthProvider>
  );
}

export default MyApp;
