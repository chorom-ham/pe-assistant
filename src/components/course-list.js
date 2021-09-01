import { Heading } from "@chakra-ui/react";
import styled from "styled-components";

import CourseItem from "./course-item";

export default function CourseList() {
  const TEMP = [
    {
      id: 1,
      title: "동작 제목 예시입니다",
      subtitle: "동작 설명 예시입니다",
      image: "temp",
    },
    {
      id: 2,
      title: "동작 제목 예시입니다",
      subtitle: "동작 설명 예시입니다",
      image: "temp",
    },
    {
      id: 3,
      title: "동작 제목 예시입니다",
      subtitle: "동작 설명 예시입니다",
      image: "temp",
    },
    {
      id: 4,
      title: "동작 제목 예시입니다",
      subtitle: "동작 설명 예시입니다",
      image: "temp",
    },
  ];

  return (
    <Wrapper>
      <InnerWrapper>
        <Heading size="lg" ml="1rem">
          💁‍♀️ 배울 동작을 선택해보세요
        </Heading>
        <ItemContainer>
          {TEMP.map((item) => (
            <CourseItem
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
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
