import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

const useAddAsset = (props) => {
  const useAddAssetFn = async (body) => {
    try {
      const response = await HeroServices.post(`/asset`, body);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  const mutation = useMutation({
    mutationKey: ["useAddAsset"],
    mutationFn: useAddAssetFn,
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

export default useAddAsset;
