import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import styled from "styled-components";

import { getCookie } from "src/utils/cookie";
import useStudentList from "../hooks/useStudentList";
import Student from "./student";
import HomeworkSelect from "./homework-select";

export default function CheckHomeworkList() {
  const [completedStudents, setCompletedStudents] = useState(null);
  const { isLoading, isError, data } = useStudentList();

  if (isLoading) {
    return <Heading>Loading...</Heading>;
  }

  if (!isLoading && (isError || !data)) {
    return <Heading>Error!</Heading>;
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <Heading m="0 0 1rem 1rem">
          💁‍♀️ {getCookie("name")} 선생님, 학생 과제 성취도를 한번에 확인해보세요
        </Heading>
        <HomeworkSelect setCompletedStudents={setCompletedStudents} />
        <ItemContainer>
          {data.map((item) => (
            <Student
              key={item.fields.name}
              name={item.fields.name}
              isDone={completedStudents?.includes(item.fields.id)}
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

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
