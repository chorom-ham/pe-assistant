import styled from "styled-components";
import { Heading, Icon } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";

export default function Student({ name, isDone }) {
  return (
    <Wrapper>
      <Icon
        as={BsFillPersonFill}
        w="10rem"
        h="10rem"
        color={isDone ? "blue.600" : "gray.300"}
      />
      <Heading size="lg" mt="1">
        {name}
      </Heading>
      {isDone !== undefined && (
        <Heading size="sm" color={isDone ? "blue.600" : "red.500"}>
          {isDone ? "완료" : "미완료"}
        </Heading>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  justify-content: center;
  align-items: center;
`;
