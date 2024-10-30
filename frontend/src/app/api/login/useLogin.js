import axios from "axios";
import { useMutation } from "react-query";

const useLogin = (props) => {
    const userLoginFn = async (formLogin) => {
        try {
            const response = await axios.post(`http://localhost:3000/login`, formLogin, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

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