import { useMutation } from "react-query";
import axios from "axios";

const useAddAsset = (props) => {
    const useAddAssetFn = async (body) => {
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const response = await axios.post(`http://localhost:3000/asset`, body, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
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
        mutationKey: ['useAddAsset'],
        mutationFn: useAddAssetFn,
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

export default useAddAsset