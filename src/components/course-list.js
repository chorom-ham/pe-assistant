import { Heading } from "@chakra-ui/react";
import styled from "styled-components";

import CourseItem from "./course-item";

export default function CourseList() {
  const TEMP = [
    {
      id: 1,
      title: "어깨 스트레칭",
      subtitle: "어깨를 유연하게 해줍니다",
      image: "/assets/shoulderStretching.png",
    },
    {
      id: 2,
      title: "몸통 스트레칭",
      subtitle: "허리를 유연하게 해줍니다",
      image: "/assets/waistStretching.png",
    },
    {
      id: 3,
      title: "다리 스트레칭(1)",
      subtitle: "무릎을 굽혀 스트레칭합니다",
      image: "/assets/legStretching.png",
    },
    {
      id: 4,
      title: "다리 스트레칭(2)",
      subtitle: "허리를 굽혀 스트레칭합니다",
      image: "/assets/legStretching2.png",
    },
    {
      id: 5,
      title: "팔굽혀펴기",
      subtitle: "근력 및 근지구력을 향상합니다",
      image: "/assets/pushup.png",
    },
    {
      id: 6,
      title: "덤벨 상체운동",
      subtitle: "기구를 사용한 근력 운동입니다",
      image: "/assets/dumbellupper.png",
    },
    {
      id: 7,
      title: "밴드 상체운동",
      subtitle: "기구를 사용한 근력 운동입니다",
      image: "/assets/bandupper.png",
    },
  ];

  return (
    <Wrapper>
      <InnerWrapper>
        <Heading size="lg" m="0 0 1rem 1rem">
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
