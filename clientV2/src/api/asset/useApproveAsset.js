"use client";

import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

const useApproveAsset = (props) => {
  const useApproveAssetFn = async (params) => {
    console.log(params)
    try {
      const response = await HeroServices.patch(`/asset`, {
        id: params?.id,
        statusApproval: params?.statusApproval,
      });

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  const mutation = useMutation({
    mutationKey: ["useApproveAsset"],
    mutationFn: useApproveAssetFn,
    onSuccess: (data) => {
      if (props?.onSuccess) {
        props.onSuccess(data);
      }
    },
    onError: (error) => {
      if (props?.onError) {
        props.onError(error);
      }
    },
  });

  return { ...mutation };
};

export default useApproveAsset;
