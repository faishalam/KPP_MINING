import axios from "axios";
import { useState } from "react"
import { useMutation } from "react-query";

const useLogin = (props) => {
    const [data, setData] = useState()

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
            throw error.message
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

    return { ...mutation, data }
}

export default useLogin