import { Select, Heading } from "@chakra-ui/react";
import styled from "styled-components";

import useHomeworkList from "../hooks/useHomeworkList";

export default function HomeworkSelect({ setCompletedStudents }) {
  const { isLoading, isError, data } = useHomeworkList();

  if (isLoading) {
    return <Heading>Loading...</Heading>;
  }

  if (isError || !data) {
    return <Heading>Error...</Heading>;
  }

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setCompletedStudents(e.target.value.split(","));
    }
  };

  return (
    <SelectWrapper>
      <Select placeholder="과제를 선택하세요" size="lg" onChange={handleChange}>
        {data.map((item) => (
          <option key={item.fields.id} value={item.fields.completed}>
            {item.fields.title}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
`;
