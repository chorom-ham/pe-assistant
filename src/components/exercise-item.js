import styled from "styled-components";
import { Heading, Image, Text } from "@chakra-ui/react";

export default function ExerciseItem({
  id,
  title,
  subtitle,
  image,
  exerciseList,
  setExerciseList,
}) {
  const handleClick = () => {
    if (exerciseList === null) {
      setExerciseList([id]);
    } else {
      setExerciseList([...exerciseList, id]);
    }
  };

  return (
    <Wrapper onClick={handleClick}>
      <Image
        w="16rem"
        h="9rem"
        src={image}
        alt={title}
        objectFit="contain"
        border="1px solid #e6e6e6"
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
  margin: 1.5rem 1rem;
`;
