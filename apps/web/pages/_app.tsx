import { NextUIProvider } from "@nextui-org/react";
import { logEvent, getAnalytics } from "firebase/analytics";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import Header from "../components/Header";
import { app } from "../libs/firebase/initFirebase";
import theme from "../nextUI/theme";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const analytics = getAnalytics(app);
    logEvent(analytics, "screen_view");
  }, []);

  return (
    <NextUIProvider theme={theme}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
  );
}

export default MyApp;
