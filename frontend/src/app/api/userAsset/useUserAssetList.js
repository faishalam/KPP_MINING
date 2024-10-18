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
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`,
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
        staleTime: Infinity,
        cacheTime: Infinity,
    })

    return { ...query, data }
}

export default useUserAssetList