import styled from "styled-components";

import GlobalHeader from "./header";
import GlobalFooter from "./footer";

export default function GlobalLayout({ children }) {
  return (
    <>
      <GlobalHeader />
      <Container>{children}</Container>
      <GlobalFooter />
    </>
  );
}

const Container = styled.div`
  padding: 4.8rem 0 8rem 0;
  display: flex;
  flex-direction: column;
`;
