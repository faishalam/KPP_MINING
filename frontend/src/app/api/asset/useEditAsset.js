import { useState } from "react"
import { useMutation } from "react-query";
import axios from "axios";

const useEditAsset = (props) => {
    const useEditAssetFn = async (id, body) => {
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const response = await axios.put(`http://localhost:3000/asset/${id}`, body, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            });

            const { result, status, message } = response.data

            if (status === "error") return

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