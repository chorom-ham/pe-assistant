import { useQuery } from "react-query";

import { getCookie } from "src/utils/cookie";
import { base } from "./api";

export default function useHomeworkList() {
  const key = "homeworkList";

  const getHomeworkList = () =>
    base()
      .get(
        `/homework?filterByFormula={teacherId}='${getCookie(
          "teacher"
        )}'&sort%5B0%5D%5Bfield%5D=deadline&sort%5B0%5D%5Bdirection%5D=desc`
      )
      .then((res) => res.data.records);

  const homeworkListQuery = useQuery(key, getHomeworkList, {
    enabled: !!getCookie("teacher"),
  });

  return {
    isLoading: homeworkListQuery.isLoading,
    isError: homeworkListQuery.isError,
    data: homeworkListQuery.isSuccess ? homeworkListQuery.data : null,
  };
}
