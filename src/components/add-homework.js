import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Heading, Text, Button, Input } from "@chakra-ui/react";

import COLORS from "src/constants/colors";
import { EXERCISES } from "src/constants/exercises";
import { getCookie } from "src/utils/cookie";
import ExerciseItem from "./exercise-item";
import useHomework from "../hooks/useHomework";

export default function AddHomework() {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [exerciseList, setExerciseList] = useState(null);

  const router = useRouter();
  const { addNewHomework, isMutationError } = useHomework();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleSubmit = () => {
    if (!title || !description || !deadline || !exerciseList) {
      alert("값을 먼저 입력하세요");
      return;
    }
    const newHomework = {
      records: [
        {
          fields: {
            title,
            deadline,
            description,
            image: [
              {
                url: "https://ak.picdn.net/shutterstock/videos/1032769898/thumb/1.jpg",
              },
            ],
            teacher: [getCookie("teacherAirtableId")],
            completed: "",
          },
        },
      ],
    };
    addNewHomework(newHomework);
    if (isMutationError) {
      alert("오류가 발생했습니다");
    } else {
      router.push("/check-student");
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Heading m="0 0 1rem 1rem">
          💁‍♀️ {getCookie("name")} 선생님, 운동 과제를 추가해보세요
        </Heading>
        <Row>
          <Heading size="md" wordBreak="keep-all" mr="1rem">
            제목
          </Heading>
          <Input
            placeholder="제목을 입력하세요"
            size="lg"
            mb="1rem"
            onChange={handleTitleChange}
          />
        </Row>
        <Row>
          <Heading size="md" wordBreak="keep-all" mr="1rem">
            설명
          </Heading>
          <Input
            placeholder="설명을 입력하세요"
            size="lg"
            mb="1rem"
            onChange={handleDescriptionChange}
          />
        </Row>
        <Row>
          <Heading size="md" wordBreak="keep-all" mr="1rem">
            마감기한
          </Heading>
          <Input type="date" size="lg" onChange={handleDeadlineChange} />
        </Row>
        <Row>
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
          <Button size="lg" colorScheme="blue" ml="2rem" onClick={handleSubmit}>
            과제 추가
          </Button>
        </Row>
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

const Row = styled.div`
  display: flex;
  align-items: center;
`;
