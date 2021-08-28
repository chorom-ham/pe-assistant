import styled from "styled-components";
import { Text } from "@chakra-ui/react";

import COLORS from "src/constants/colors";

export default function GlobalFooter() {
  return (
    <StyledFooter>
      <Text fontSize="lg" fontWeight="bold" color="gray.800" mb="0.5">
        체육 수업 도우미
      </Text>
      <Text color="gray.600" lineHeight="1.2" letterSpacing="tight">
        Developed for the Ewha Capstone Project
      </Text>
      <Text color="gray.600" lineHeight="1.2" letterSpacing="tight">
        © 2021 Hits-hike. All rights reserved.
      </Text>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  height: 8rem;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 4rem;
  background-color: ${COLORS.gray[100]};
  justify-content: center;
`;
