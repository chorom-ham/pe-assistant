import { useState } from "react";
import styled from "styled-components";
import {
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";

export default function LogIn() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Wrapper>
      <Heading size="lg" mb="1rem">
        체온 시작하기
      </Heading>
      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb="1rem"
      >
        <FormLabel htmlFor="is-teacher" mb="0">
          선생님이신가요?
        </FormLabel>
        <Switch id="is-teacher" />
      </FormControl>
      <Input placeholder="아이디" mb="1rem" />
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="비밀번호"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "숨김" : "확인"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button size="lg" colorScheme="blue" mt="2rem">
        로그인
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  padding-top: 18vh;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
