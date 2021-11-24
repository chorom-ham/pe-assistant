import { useRouter } from "next/router";
import styled from "styled-components";
import { Heading, Text, Button, useToast } from "@chakra-ui/react";

import ExerciseScreen from "./exercise-screen";
import useHomework from "../hooks/useHomework";
import { getCookie } from "src/utils/cookie";

export default function DoHomework() {
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
        {/* <ScoreWrapper>
          <Text color="white" fontWeight="bold" fontSize="xl">
            현재 step: {step}
          </Text>
        </ScoreWrapper>
        <ScoreWrapper>
          <Text color="white" fontWeight="bold" fontSize="xl">
            동작 수행 횟수: {count}
          </Text>
        </ScoreWrapper> */}
        <Button size="lg" colorScheme="blue" onClick={submitToTeacher}>
          선생님께 제출
        </Button>
      </TopWrapper>
      <ExerciseScreen id={2} />
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
  justify-content: space-around;
  align-items: center;
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
