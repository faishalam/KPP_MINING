'use client'

import { useState } from "react"
import { useQuery } from "react-query";

const useUserAssetList = () => {
    const [data, setData] = useState()

    const useUserAssetListFn = async () => {
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const response = await fetch(`http://localhost:3000/asset/by-user`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json()

            setData(data);
            return data;
        } catch (error) {
            throw error.message
        }
    }

    const query = useQuery({
        queryKey: ['useUserAssetList'],
        queryFn: useUserAssetListFn,
    })

    return { ...query, data }
}

export default useUserAssetList