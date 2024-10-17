import { useState } from "react"
import { useMutation } from "react-query";

const useRegister = (props) => {
    const [data, setData] = useState()

    const userRegisterFn = async (formRegister) => {
        try {
            const response = await fetch(`http://localhost:3000/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formRegister),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json()

            setData(data);
            return data;
        } catch (error) {
            throw error.message
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

    return { ...mutation, data }
}

export default useRegister