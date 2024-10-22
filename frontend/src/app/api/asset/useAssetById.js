'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const useAssetById = (props) => {
    const [data, setData] = useState()

    const useAssetByIdFn = async () => {
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const response = await axios.get(`http://localhost:3000/asset/${props?.params?.id}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                }
            })

            const { result, status, message } = response.data

            if (status === "error") throw new Error(message)

            // setData(response.data)

            return response.data;
        } catch (error) {
            throw error.message
        }
    }

    const query = useQuery({
        queryKey: ['useAssetById', props?.params?.id],
        queryFn: useAssetByIdFn,
        enabled: Boolean(props?.params?.id),
        keepPreviousData: true,
    })


    return { ...query }
}

export default useAssetById