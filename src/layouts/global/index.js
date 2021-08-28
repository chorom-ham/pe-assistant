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
  margin-top: 4.8rem;
  display: flex;
  flex-direction: column;
`;
