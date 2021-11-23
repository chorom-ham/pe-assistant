import { useQuery, useMutation, useQueryClient } from "react-query";

import { getCookie } from "src/utils/cookie";
import { base } from "./api";

export default function useHomework() {
  const queryClient = useQueryClient();
  const key = "homework";

  const getHomeworkList = () =>
    base()
      .get(
        `/homework?filterByFormula={teacherId}='${
          getCookie("isTeacher") ? getCookie("id") : getCookie("teacher")
        }'&sort%5B0%5D%5Bfield%5D=deadline&sort%5B0%5D%5Bdirection%5D=desc`
      )
      .then((res) => res.data.records);

  const homeworkListQuery = useQuery(key, getHomeworkList, {
    enabled: !!getCookie("teacher") || !!getCookie("isTeacher"),
  });

  const createMutation = useMutation(
    (homeworkList) => base().post(`/homework`, homeworkList),
    {
      onSuccess: () => {
        refresh();
      },
    }
  );

  return {
    isLoading: homeworkListQuery.isLoading,
    isError: homeworkListQuery.isError,
    data: homeworkListQuery.isSuccess ? homeworkListQuery.data : null,
    addNewHomework: createMutation.mutate,
    isMutationError: createMutation.isError,
  };
}
