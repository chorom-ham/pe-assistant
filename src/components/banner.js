import styled from "styled-components";
import { Heading, Text } from "@chakra-ui/react";

import COLORS from "src/constants/colors";

export default function Banner() {
  return (
    <Wrapper>
      <InnerWrapper>
        <Heading>체육 수업 도우미와 함께라면</Heading>
        <Heading mb="1rem">집에서도 체육 수업을 받을 수 있어요</Heading>
        <Text fontSize="lg">
          코로나19로 인해 체육 수업을 기존과 같이 제대로 할 수 없습니다.
        </Text>
        <Text fontSize="lg">
          신체 및 정서 발달 등에 중요한 체육 수업을 코로나19시기에도
        </Text>
        <Text fontSize="lg">
          제대로 진행할 수 있도록 체육 수업 도우미가 도와드립니다.
        </Text>
      </InnerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 20rem;
  background-color: ${COLORS.blue[50]};
  padding: 0 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  background-image: url("/assets/banner.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  padding-left: 2rem;
`;
