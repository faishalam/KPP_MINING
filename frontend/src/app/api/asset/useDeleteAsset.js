import { useMutation } from "react-query";
import axios from "axios";

const useDeleteAsset = (props) => {
    const useDeleteAssetFn = async (id) => {
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const response = await axios.delete(`http://localhost:3000/asset/${id}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
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
        mutationKey: ['useDeleteAsset'],
        mutationFn: useDeleteAssetFn,
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

export default useDeleteAsset