"use client";

import { HeroServices } from "@/services/HeroServices";
import { useState } from "react";
import { useQuery } from "react-query";

const useAssetById = (props) => {
  const [isLoadingDataAssetById, setIsLoading] = useState(false);

  const useAssetByIdFn = async () => {
    try {
      setIsLoading(true);
      const response = await HeroServices.get(`/asset/${props?.params?.id}`);

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
    queryKey: ["useAssetById", props?.params?.id],
    queryFn: useAssetByIdFn,
    enabled: !!props?.params?.id,
    keepPreviousData: true,
  });

  return { ...query, isLoadingDataAssetById };
};

export default useAssetById;
