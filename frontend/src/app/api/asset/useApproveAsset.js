'use client'

import axios from "axios";
import { useMutation } from "react-query";

const useApproveAsset = (props) => {
    const useApproveAssetFn = async (id) => {
        console.log(id)
        try {
            const access_token = localStorage.getItem("access_token")
            console.log(access_token)
            if (!access_token) throw new Error("Access token not found")

            const response = await axios.patch(`http://localhost:3000/asset/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            const { status } = response

            if (status !== 200) return

            return response.data;
        } catch (error) {
            throw error.message
        }
    }

    const mutation = useMutation({
        mutationKey: ['useApproveAsset'],
        mutationFn: useApproveAssetFn,
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

export default useApproveAsset