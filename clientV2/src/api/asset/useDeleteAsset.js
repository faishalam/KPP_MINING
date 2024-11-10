import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

const useDeleteAsset = (props) => {
  const useDeleteAssetFn = async (id) => {
    try {
      const response = await HeroServices.delete(`/asset/${id}`);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  const mutation = useMutation({
    mutationKey: ["useDeleteAsset"],
    mutationFn: useDeleteAssetFn,
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

export default useDeleteAsset;
