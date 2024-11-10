import { AuthServices } from "@/services/AuthServices";
import { useMutation } from "react-query";

const useRegister = (props) => {
    const userRegisterFn = async (formRegister) => {
        try {
            const response = await AuthServices.post(`/register`, formRegister);

            const { status } = response

            if (status !== 200) return

            return response.data;
        } catch (error) {
            throw error.response.data.message
        }
    }

    const mutation = useMutation({
        mutationKey: ['userRegister'],
        mutationFn: userRegisterFn,
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

export default useRegister