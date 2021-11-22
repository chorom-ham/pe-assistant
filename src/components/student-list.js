import { Heading } from "@chakra-ui/react";
import styled from "styled-components";

import { getCookie } from "src/utils/cookie";
import useStudentList from "../hooks/useStudentList";
import Student from "./student";

export default function StudentList() {
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
          💁‍♀️ {getCookie("name")} 선생님의 학생 목록
        </Heading>
        <ItemContainer>
          {data.map((item) => (
            <Student key={item.fields.name} name={item.fields.name} />
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

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
