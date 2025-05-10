import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

const useDeleteUser = (props) => {
  const useDeleteUserFn = async (id) => {
    try {
      const response = await HeroServices.delete(`/user/${id}`);
      const { status } = response;
      if (status !== 200) return;
      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  const mutation = useMutation({
    mutationKey: ["useDeleteUser"],
    mutationFn: useDeleteUserFn,
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

export default useDeleteUser;
