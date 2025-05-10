import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

const useUpdateCapex = (props) => {
  const useUpdateCapexFn = async ({ data }) => {
    try {
      const response = await HeroServices.patch(`/progress`, data);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  const mutation = useMutation({
    mutationKey: ["useUpdateCapex"],
    mutationFn: useUpdateCapexFn,
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

export default useUpdateCapex;
