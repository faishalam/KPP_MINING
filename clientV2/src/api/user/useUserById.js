"use client";

import { HeroServices } from "@/services/HeroServices";
import { useState } from "react";
import { useQuery } from "react-query";

const useUserById = (props) => {
  const [isLoadingUserById, setIsLoading] = useState(false);
  const useUserByIdFn = async () => {
    try {
      setIsLoading(true);
      const response = await HeroServices.get(`/user/${props?.params?.id}`);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      setIsLoading(false);
      throw error.message;
    } finally {
      setIsLoading(false);
    }
  };

  const query = useQuery({
    queryKey: ["useUserById", props?.params?.id],
    queryFn: useUserByIdFn,
    enabled: Boolean(props?.params?.id),
    keepPreviousData: true,
  });

  return { ...query, isLoadingUserById };
};

export default useUserById;
