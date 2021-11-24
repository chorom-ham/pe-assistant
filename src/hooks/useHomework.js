import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { getCookie } from "src/utils/cookie";
import { base } from "./api";

export default function useHomework() {
  const queryClient = useQueryClient();
  const key = "homework";

  const router = useRouter();
  const { id } = router.query;

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

  const getHomeworkItem = () =>
    base()
      .get(`/homework?filterByFormula={id}='${id}'`)
      .then((res) => res.data.records);

  const homeworkItemQuery = useQuery([key, id], getHomeworkItem, {
    enabled: !!id,
  });

  const refresh = () => {
    queryClient.invalidateQueries(key);
  };

  const createMutation = useMutation(
    (newHomework) => base().post(`/homework`, newHomework),
    {
      onSuccess: () => {
        refresh();
      },
    }
  );

  const updateHomework = useMutation(
    (homework) =>
      base().patch(`/homework`, JSON.stringify(homework), {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: () => {
        refresh();
      },
    }
  );

  return {
    isLoading: homeworkListQuery.isLoading || homeworkItemQuery.isLoading,
    isError: homeworkListQuery.isError || homeworkItemQuery.isError,
    data: homeworkListQuery.isSuccess ? homeworkListQuery.data : null,
    addNewHomework: createMutation.mutate,
    isMutationError: createMutation.isError,
    homeworkItem: homeworkItemQuery.isSuccess ? homeworkItemQuery.data : null,
    updateHomework: updateHomework.mutate,
  };
}
