"use client";

import { HeroServices } from "@/services/HeroServices";
import { useQuery } from "react-query";

const useAssetById = (props) => {
  const useAssetByIdFn = async () => {
    try {
      const response = await HeroServices.get(`/asset/${props?.params?.id}`);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  const query = useQuery({
    queryKey: ["useAssetById", props?.params?.id],
    queryFn: useAssetByIdFn,
    enabled: Boolean(props?.params?.id),
    keepPreviousData: true,
  });

  return { ...query };
};

export default useAssetById;
