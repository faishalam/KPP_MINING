import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

const useUpdateProgress = (props) => {
  const useUpdateProgressFn = async ({ id, data }) => {
    try {
      const response = await HeroServices.put(`/progress/${id}`, data);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  const mutation = useMutation({
    mutationKey: ["useUpdateProgress"],
    mutationFn: useUpdateProgressFn,
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

export default useUpdateProgress;
