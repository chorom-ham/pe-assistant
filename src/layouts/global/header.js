import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Heading, Button } from "@chakra-ui/react";

import COLORS from "src/constants/colors";
import { getCookie } from "src/utils/cookie";
import { removeCookie } from "../../utils/cookie";

export default function GlobalHeader() {
  const router = useRouter();
  const { pathname } = router;

  const logout = () => {
    removeCookie("teacher");
    removeCookie("name");
    removeCookie("id");
    router.push("/");
  };

  return (
    <StyledHeader>
      <InnerWrapper>
        <Link href="/" passHref>
          <A>
            <Heading as="h1" size="lg" color="white">
              체온: 체육 온라인
            </Heading>
          </A>
        </Link>
        {pathname !== "/" && getCookie("id") && (
          <Button pos="absolute" right="0" onClick={logout}>
            로그아웃
          </Button>
        )}
      </InnerWrapper>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  height: 4.8rem;
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8rem;
  background-color: ${COLORS.blue[500]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 6px 0px;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  position: relative;
`;

const A = styled.a``;
