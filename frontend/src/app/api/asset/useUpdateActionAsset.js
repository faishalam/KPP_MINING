import { useMutation } from "react-query";
import axios from "axios";

const useUppdateActionAsset = (props) => {
    const useUppdateActionAssetFn = async ({ id, payload }) => {
        console.log(id, payload)
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const response = await axios.patch(`http://localhost:3000/asset-action/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            const { status } = response

            if (status !== 200) return

            return response.data;
        } catch (error) {
            throw error.response.data.message
        }
    }

    const mutation = useMutation({
        mutationKey: ['useUppdateActionAsset'],
        mutationFn: useUppdateActionAssetFn,
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

export default useUppdateActionAsset