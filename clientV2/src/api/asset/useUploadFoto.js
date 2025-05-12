"use client";

import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

const useUploadFoto = (props) => {
  const useUploadFotoFn = async (form) => {
    try {
      const response = await HeroServices.patch(`/asset/${form.id}/foto`, {
        data: form.data,
      });

      if (response.status !== 200) throw new Error("Upload failed");

      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  const mutation = useMutation({
    mutationKey: ["useUploadFoto"],
    mutationFn: useUploadFotoFn,
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

export default useUploadFoto;
