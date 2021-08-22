import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import styled from "styled-components";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    styles: {
      global: {
        baseStyle: { boxSizing: "border-box" },
        body: { minWidth: "768px", margin: 0 },
      },
    },
  });

  return (
    <>
      <Head>
        <title>체육 수업 지원</title>
        <link rel="shortcut icon" href="favicon.ico"></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        ></meta>
      </Head>
      <ChakraProvider theme={theme}>
        <Main>
          <Component {...pageProps} />
        </Main>
      </ChakraProvider>
    </>
  );
}

export default MyApp;

const Main = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
`;
