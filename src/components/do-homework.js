import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Heading, Text, Button, useToast } from "@chakra-ui/react";

import COLORS from "src/constants/colors";
import { EXERCISES } from "../constants/exercises";
import ExerciseScreen from "./exercise-screen";
import useHomework from "../hooks/useHomework";
import { getCookie } from "src/utils/cookie";

export default function DoHomework() {
  const [exercise, setExercise] = useState(0); // current exercise 단계 (index)
  const [nowCount, setNowCount] = useState(null); // 현재 횟수

  const toast = useToast();
  const router = useRouter();

  const { isLoading, isError, homeworkItem, updateHomework } = useHomework();

  const submitToTeacher = () => {
    if (isLoading) return;
    if (
      homeworkItem[0].fields.completed &&
      homeworkItem[0].fields.completed !== ""
    ) {
      const updatedHomework = {
        records: [
          {
            id: homeworkItem[0].id,
            fields: {
              title: homeworkItem[0].fields.title,
              exercise: homeworkItem[0].fields.exercise,
              deadline: homeworkItem[0].fields.deadline,
              description: homeworkItem[0].fields.description,
              image: [
                {
                  id: homeworkItem[0].fields.image[0].id,
                },
              ],
              teacher: homeworkItem[0].fields.teacher,
              completed:
                homeworkItem[0].fields.completed + "," + getCookie("id"),
            },
          },
        ],
      };
      updateHomework(updatedHomework);
    } else {
      const updatedHomework = {
        records: [
          {
            id: homeworkItem[0].id,
            fields: {
              title: homeworkItem[0].fields.title,
              exercise: homeworkItem[0].fields.exercise,
              deadline: homeworkItem[0].fields.deadline,
              description: homeworkItem[0].fields.description,
              image: [
                {
                  id: homeworkItem[0].fields.image[0].id,
                },
              ],
              teacher: homeworkItem[0].fields.teacher,
              completed: getCookie("id"),
            },
          },
        ],
      };
      updateHomework(updatedHomework);
    }
    toast({
      title: "제출 완료",
      status: "success",
      isClosable: true,
      position: "top",
    });
    router.push("/homeworks");
  };

  if (isLoading) {
    return <Heading>Loading...</Heading>;
  }

  if (!isLoading && (isError || !homeworkItem)) {
    return <Heading>Error!</Heading>;
  }

  return (
    <Wrapper>
      <TopWrapper>
        <Row>
          <ScoreWrapper>
            <Text color="white" fontWeight="bold" fontSize="xl">
              동작 수행 횟수: {nowCount} / {EXERCISES[exercise].shouldDoCount}
            </Text>
          </ScoreWrapper>
          <Button
            disabled={nowCount < EXERCISES[exercise].shouldDoCount}
            size="lg"
            colorScheme="blue"
            onClick={() => {
              if (
                exercise ===
                homeworkItem[0].fields.exercise.split(",").length - 1
              ) {
                submitToTeacher();
              } else {
                setExercise(exercise + 1);
                setNowCount(0);
              }
            }}
          >
            {exercise === homeworkItem[0].fields.exercise.split(",").length - 1
              ? "제출하기"
              : "다음 동작"}
          </Button>
        </Row>
        <ExerciseListWrapper>
          <ItemContainer>
            {homeworkItem[0].fields.exercise.split(",").map((id, index) => (
              <Text
                key={id + index}
                fontSize="lg"
                fontColor={index === exercise && "blue.500"}
                fontWeight={index === exercise && "bold"}
              >
                {EXERCISES[id]?.title} &gt;&nbsp;
              </Text>
            ))}
          </ItemContainer>
        </ExerciseListWrapper>
      </TopWrapper>
      <ExerciseScreen
        id={homeworkItem[0].fields.exercise.split(",")[exercise]}
        setNowCount={setNowCount}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const ScoreWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00c6ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0072ff,
    #00c6ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #0072ff,
    #00c6ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
