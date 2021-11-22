import { useQuery } from "react-query";

import { getCookie } from "src/utils/cookie";
import { base } from "./api";

export default function useStudentList() {
  const key = "studentList";

  const getStudentList = () =>
    base()
      .get(`/student?filterByFormula={teacherId}='${getCookie("id")}'`)
      .then((res) => res.data.records);

  const studentListQuery = useQuery(key, getStudentList, {
    enabled: !!getCookie("id"),
  });

  return {
    isLoading: studentListQuery.isLoading,
    isError: studentListQuery.isError,
    data: studentListQuery.isSuccess ? studentListQuery.data : null,
  };
}
