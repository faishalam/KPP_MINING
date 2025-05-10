import { HeroServices } from "@/services/HeroServices";
import { useMutation } from "react-query";

const useAddProgress = (props) => {
    const useAddProgressFn = async (form) => {
        try {
            const response = await HeroServices.post(`/progress`, form);

            const { status } = response

            if (status !== 200) return

            return response.data;
        } catch (error) {
            throw error.response.data.message
        }
    }

    const mutation = useMutation({
        mutationKey: ['useAddProgress'],
        mutationFn: useAddProgressFn,
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

export default useAddProgress