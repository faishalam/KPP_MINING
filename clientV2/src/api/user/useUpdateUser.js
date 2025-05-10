import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

const useUpdateUser = (props) => {
  const userUpdateFn = async ({ id, data }) => {
    try {
      const response = await HeroServices.put(`/user/${id}`, data);

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  const mutation = useMutation({
    mutationKey: ["userUpdate"],
    mutationFn: userUpdateFn,
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

export default useUpdateUser;
