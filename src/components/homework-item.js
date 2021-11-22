import Link from "next/link";
import styled from "styled-components";
import { Heading, Image, Text, useToast } from "@chakra-ui/react";

import COLORS from "src/constants/colors";

export default function HomeworkItem({
  id,
  title,
  description,
  deadline,
  image,
}) {
  const isAfterDeadline = new Date(deadline) < new Date();
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "알림",
      description: "과제가 마감되었습니다.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  if (isAfterDeadline) {
    return (
      <Wrapper onClick={showToast} isAfterDeadline={isAfterDeadline}>
        <Image
          w="30rem"
          h="20rem"
          src={image}
          alt={title}
          objectFit="contain"
          fallbackSrc="/assets/image-placeholder.png"
        />
        <Heading size="lg" mt="1rem">
          {title}
        </Heading>
        <Text fontSize="xl">{description}</Text>
      </Wrapper>
    );
  }

  return (
    <Link href="/homeworks/[id]" as={`/homeworks/${id}`} passHref>
      <A>
        <Wrapper isAfterDeadline={isAfterDeadline}>
          <Image
            w="30rem"
            h="20rem"
            src={image}
            alt={title}
            objectFit="contain"
            fallbackSrc="/assets/image-placeholder.png"
          />
          <Heading size="lg" mt="1rem">
            {title}
          </Heading>
          <Text fontSize="xl">{description}</Text>
        </Wrapper>
      </A>
    </Link>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 1rem;
  background-color: ${COLORS.blue[100]};
  border-radius: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  filter: ${({ isAfterDeadline }) =>
    isAfterDeadline ? "grayscale(70%)" : "none"};
`;

const A = styled.a``;
