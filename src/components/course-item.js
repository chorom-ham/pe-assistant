import styled from "styled-components";
import { Heading, Image, Text } from "@chakra-ui/react";

export default function CourseItem({ title, subtitle, image }) {
  return (
    <Wrapper>
      <Image
        w="16rem"
        src={image}
        alt={title}
        fallbackSrc="/assets/image-placeholder.png"
      />
      <Heading size="md" mt="1">
        {title}
      </Heading>
      <Text>{subtitle}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
