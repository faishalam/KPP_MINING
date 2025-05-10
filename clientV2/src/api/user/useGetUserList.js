"use client";

import { HeroServices } from "@/services/HeroServices";
import { useQuery } from "react-query";

const useUserList = (props) => {
  const useUserListFn = async () => {
    try {
      const response = await HeroServices.get(`/user`, {
        params: {
          ...(props?.params?.search && { search: props.params.search }),
          ...(props?.params?.page && { page: props.params.page }),
          ...(props?.params?.limit && { limit: props.params.limit }),
          ...(props?.params?.enabled && { enabled: props.params.enabled }),
        },
      });

      if (response.status !== 200) return;

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const query = useQuery({
    queryKey: ["useUserList", props.params],
    queryFn: useUserListFn,
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: Boolean(
      props?.params?.search ||
        props?.params?.page ||
        props?.params?.limit ||
        props?.params?.enabled
    ),
  });

  return { ...query };
};

export default useUserList;
