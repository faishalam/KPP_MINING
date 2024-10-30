import axios from "axios";
import { useMutation } from "react-query";

const useRegister = (props) => {
    const userRegisterFn = async (formRegister) => {
        try {
            const response = await axios.post(`http://localhost:3000/register`, formRegister, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

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