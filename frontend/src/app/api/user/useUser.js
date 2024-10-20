'use client'
import { useState } from "react"
import { useQuery } from "react-query";

const useUser = () => {
    const [data, setData] = useState()

    const useUserFn = async () => {
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const response = await fetch(`http://localhost:3000/user-me`, {
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
        queryKey: ['useUser'],
        queryFn: useUserFn,
        staleTime: Infinity,
        cacheTime: Infinity,
        // enabled: (localStorage.getItem("access_token")),
    })

    return { ...query, data }
}

export default useUser