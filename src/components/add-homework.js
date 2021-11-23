import { useState } from "react";
import styled from "styled-components";
import { Heading, Text, Button } from "@chakra-ui/react";

import COLORS from "src/constants/colors";
import { EXERCISES } from "src/constants/exercises";
import { getCookie } from "src/utils/cookie";
import ExerciseItem from "./exercise-item";

export default function AddHomework() {
  const [exerciseList, setExerciseList] = useState(null);

  return (
    <Wrapper>
      <InnerWrapper>
        <Heading m="0 0 1rem 1rem">
          💁‍♀️ {getCookie("name")} 선생님, 운동 과제를 추가해보세요
        </Heading>
        <HomeworkContainer>
          <ExerciseListWrapper>
            {exerciseList ? (
              <ItemContainer>
                {exerciseList.map((id, index) => (
                  <Text key={id + index} fontSize="lg">
                    {EXERCISES[id]?.title} &gt;&nbsp;
                  </Text>
                ))}
              </ItemContainer>
            ) : (
              <Text fontSize="lg">아래 동작을 선택해 추가해주세요</Text>
            )}
          </ExerciseListWrapper>
          <Button size="lg" colorScheme="blue" ml="2rem">
            과제 추가
          </Button>
        </HomeworkContainer>
        <ItemContainer>
          {EXERCISES.map((item) => (
            <ExerciseItem
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              exerciseList={exerciseList}
              setExerciseList={setExerciseList}
            />
          ))}
        </ItemContainer>
      </InnerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 4rem 8rem;
  display: flex;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 1440px;
  margin-left: 1rem;
`;

const ExerciseListWrapper = styled.div`
  width: 100%;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  border: 1px solid ${COLORS.blue[500]};
  margin: 1rem 0;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const HomeworkContainer = styled.div`
  display: flex;
  align-items: center;
`;
