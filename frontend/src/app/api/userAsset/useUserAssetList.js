'use client'

import axios from "axios";
import { useQuery } from "react-query";

const useUserAssetList = (props) => {
    const useUserAssetListFn = async () => {
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const response = await axios.get(`http://localhost:3000/asset/by-user`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    ...(props?.params?.search && { search: props?.params?.search }),
                    ...(props?.params?.page && { page: props?.params?.page }),
                    ...(props?.params?.limit && { limit: props?.params?.limit }),
                    ...(props?.params?.enabled && { enabled: props?.params?.enabled }),
                }
            });


            const { result, status, message } = response.data

            if (status === "error") throw new Error(message)

            return response.data;
        } catch (error) {
            throw error.message
        }
    }

    const query = useQuery({
        queryKey: ['useUserAssetList', props?.params],
        queryFn: useUserAssetListFn,
        staleTime: Infinity,
        cacheTime: Infinity,
        enabled: Boolean((props?.params?.search || !props?.params?.page) && props?.params?.page || props?.params?.limit || props?.params?.enabled),
        // enabled: Boolean((props?.params?.page && props?.params?.limit && props?.params?.search) || (props?.params?.page && props?.params?.limit && !props?.params?.search) || (props?.params?.enabled)),
    })

    return { ...query }
}

export default useUserAssetList