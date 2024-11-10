"use client";

import { HeroServices } from "@/services/HeroServices";
import { useQuery } from "react-query";

const useUserAssetList = (props) => {
  const useUserAssetListFn = async () => {
    try {
      const response = await HeroServices.get(`/asset/by-user`, {
        params: {
          ...(props?.params?.search && { search: props?.params?.search }),
          ...(props?.params?.page && { page: props?.params?.page }),
          ...(props?.params?.limit && { limit: props?.params?.limit }),
          ...(props?.params?.enabled && { enabled: props?.params?.enabled }),
          ...(props?.params?.filter && { filter: props?.params?.filter }),
        },
      });

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  const query = useQuery({
    queryKey: ["useUserAssetList", props?.params],
    queryFn: useUserAssetListFn,
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: Boolean((props?.params?.search || !props?.params?.page) && props?.params?.page || props?.params?.limit || props?.params?.enabled ),
    // enabled: Boolean(props?.params?.filter),
  });

  return { ...query };
};

export default useUserAssetList;
