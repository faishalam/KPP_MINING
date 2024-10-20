'use client'

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react"
import { useMutation, useQuery } from "react-query";

const useAssetList = (props) => {
    const [data, setData] = useState()
    console.log(props?.params?.search)
    const useAssetListFn = async () => {
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const response = await axios.get(`http://localhost:3000/asset`, {
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
            })


            const { result, status, message } = response.data

            if (status === "error") throw new Error(message)

            setData(response.data)
            return response.data;
        } catch (error) {
            throw error.message
        }
    }

    const query = useQuery({
        queryKey: ['useAssetList', props.params],
        queryFn: useAssetListFn,
        staleTime: Infinity,
        cacheTime: Infinity,
        enabled: Boolean(!props?.params?.search || props?.params?.page || props?.params?.limit || props?.params?.enabled),
    })


    return { ...query }
}

export default useAssetList