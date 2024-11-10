import { useMutation } from "react-query";
import { HeroServices } from "@/services/HeroServices";

const useEditAsset = (props) => {
    const useEditAssetFn = async ({ id, data }) => {
        try {
            const response = await HeroServices.put(`/asset/${id}`, data);

            const { status } = response

            if (status !== 200) return

            return response.data;
        } catch (error) {
            throw error.response.data.message
        }
    }

    const mutation = useMutation({
        mutationKey: ['useEditAsset'],
        mutationFn: useEditAssetFn,
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

export default useEditAsset