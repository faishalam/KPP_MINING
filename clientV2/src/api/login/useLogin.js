import { AuthServices } from "@/services/AuthServices";
import { useMutation } from "react-query";

const useLogin = (props) => {
    const userLoginFn = async (formLogin) => {
        try {
            const response = await AuthServices.post(`/login`, formLogin);

            const { status } = response

            if (status !== 200) return

            return response.data;
        } catch (error) {
            throw error.response.data.message
        }
    }

    const mutation = useMutation({
        mutationKey: ['userLogin'],
        mutationFn: userLoginFn,
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

    return { ...mutation }
}

export default useLogin