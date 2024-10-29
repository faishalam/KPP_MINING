'use client'
import axios from "axios";
import { useState } from "react"
import { useQuery } from "react-query";

const useUser = (props) => {
    const [data, setData] = useState()

    const useUserFn = async () => {
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const response = await axios.get(`http://localhost:3000/user-me`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            const { status } = response
            if (status !== 200) return
            setData(response.data)
            return response.data
        } catch (error) {
            throw error.message
        }
    }

    const query = useQuery({
        queryKey: ['useUser'],
        queryFn: useUserFn,
        staleTime: Infinity,
        cacheTime: Infinity,
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
    })

    return { ...query, data }
}

export default useUser