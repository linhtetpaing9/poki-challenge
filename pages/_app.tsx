import React from "react";
import "../styles/globals.less";
import ClientLayout from "../components/layout/Client";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ClientLayout>
      <Component {...pageProps} />
    </ClientLayout>
  );
}

export default MyApp;
