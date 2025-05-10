import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

const useDeleteProgress = (props) => {
  const useDeleteProgressFn = async (id) => {
    try {
      const response = await HeroServices.delete(`/progress/${id}`);
      const { status } = response;
      if (status !== 200) return;
      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  const mutation = useMutation({
    mutationKey: ["useDeleteProgress"],
    mutationFn: useDeleteProgressFn,
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

export default useDeleteProgress;
