import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  IconButton,
  Heading,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import COLORS from "src/constants/colors";
import { getCookie, removeCookie } from "src/utils/cookie";

export default function GlobalHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { pathname } = router;

  const logout = () => {
    removeCookie("teacher");
    removeCookie("name");
    removeCookie("id");
    removeCookie("isTeacher");
    router.push("/");
  };

  const DrawerMenu = (
    <Drawer
      size="md"
      placement="left"
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Heading size="lg">메뉴 선택</Heading>
        </DrawerHeader>
        <DrawerBody display="flex" flexDirection="column">
          <Link href="/check-homework" passHref>
            <A>
              <Text fontSize="xl" fontWeight="medium">
                과제 성취도 확인
              </Text>
            </A>
          </Link>
          <Link href="/add-homework" passHref>
            <A>
              <Text fontSize="xl" fontWeight="medium">
                과제 추가
              </Text>
            </A>
          </Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  return (
    <>
      {DrawerMenu}
      <StyledHeader>
        <InnerWrapper>
          {pathname !== "/" && getCookie("isTeacher") && (
            <IconButton
              icon={<HamburgerIcon />}
              pos="absolute"
              left="0"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
          <Heading as="h1" size="lg" color="white">
            체온: 체육 온라인
          </Heading>
          {pathname !== "/" && getCookie("id") && (
            <Button pos="absolute" right="0" onClick={logout}>
              로그아웃
            </Button>
          )}
        </InnerWrapper>
      </StyledHeader>
    </>
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

const A = styled.a`
  padding: 1rem 0.5rem;
  border-bottom: 1px solid ${COLORS.gray[200]};
`;
