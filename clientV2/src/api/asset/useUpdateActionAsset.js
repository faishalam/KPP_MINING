import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

const useUppdateActionAsset = (props) => {
  const useUppdateActionAssetFn = async ({ id, payload }) => {
    console.log(id, payload);
    try {
      const response = await HeroServices.patch(`/asset-action/${id}`, payload);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  const mutation = useMutation({
    mutationKey: ["useUppdateActionAsset"],
    mutationFn: useUppdateActionAssetFn,
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

export default useUppdateActionAsset;
