import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import theme from "../nextUI/theme";

function MyApp({ Component, pageProps }: AppProps) {
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
