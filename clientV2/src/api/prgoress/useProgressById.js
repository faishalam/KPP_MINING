"use client";

import { HeroServices } from "@/services/HeroServices";
import { useQuery } from "react-query";

const useProgressById = (props) => {
  const useProgressByIdFn = async () => {
    try {
      const response = await HeroServices.get(`/progress/${props?.params?.id}`);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  const query = useQuery({
    queryKey: ["useProgressById", props?.params?.id],
    queryFn: useProgressByIdFn,
    enabled: Boolean(props?.params?.id),
    keepPreviousData: true,
  });

  return { ...query };
};

export default useProgressById;
