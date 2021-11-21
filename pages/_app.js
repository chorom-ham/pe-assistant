import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import * as tfjs from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    styles: {
      global: {
        baseStyle: {
          boxSizing: "border-box",
        },
        body: {
          fontFamily: "Noto Sans KR, sans-serif",
          minWidth: "768px",
          margin: 0,
        },
      },
    },
  });

  return (
    <>
      <Head>
        <title>체온: 체육 온라인</title>
        <link rel="shortcut icon" href="favicon.ico"></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        ></meta>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Main>
            <Component {...pageProps} />
          </Main>
        </ChakraProvider>
      </QueryClientProvider>
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
