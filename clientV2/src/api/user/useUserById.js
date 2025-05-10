"use client";

import { HeroServices } from "@/services/HeroServices";
import { useQuery } from "react-query";

const useUserById = (props) => {
  const useUserByIdFn = async () => {
    try {
      const response = await HeroServices.get(`/user/${props?.params?.id}`);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  const query = useQuery({
    queryKey: ["useUserById", props?.params?.id],
    queryFn: useUserByIdFn,
    enabled: Boolean(props?.params?.id),
    keepPreviousData: true,
  });

  return { ...query };
};

export default useUserById;
