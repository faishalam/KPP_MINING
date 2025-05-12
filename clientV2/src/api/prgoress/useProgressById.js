"use client";

import { HeroServices } from "@/services/HeroServices";
import { useState } from "react";
import { useQuery } from "react-query";

const useProgressById = (props) => {
  const [isLoadingProgressById, setIsLoading] = useState(false);
  const useProgressByIdFn = async () => {
    try {
      setIsLoading(true);
      const response = await HeroServices.get(`/progress/${props?.params?.id}`);

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
    queryKey: ["useProgressById", props?.params?.id],
    queryFn: useProgressByIdFn,
    enabled: Boolean(props?.params?.id),
    keepPreviousData: true,
  });

  return { ...query, isLoadingProgressById };
};

export default useProgressById;
