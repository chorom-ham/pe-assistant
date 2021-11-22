import { Heading, Text } from "@chakra-ui/react";
import styled from "styled-components";

import { getCookie } from "src/utils/cookie";
import useHomeworkList from "../hooks/useHomeworkList";
import HomeworkItem from "./homework-item";

export default function HomeworkList() {
  const { isLoading, isError, data } = useHomeworkList();

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
          💁‍♀️ {getCookie("name")} 학생의 과제 목록
        </Heading>
        <ItemContainer>
          {data.map((item) => (
            <HomeworkItem
              key={item.fields.id}
              id={item.fields.id}
              title={item.fields.title}
              description={item.fields.description}
              deadline={item.fields.deadline}
              image={item.fields.image[0].thumbnails.large.url}
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

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
