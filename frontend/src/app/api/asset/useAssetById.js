'use client'

import { heroService } from "@/app/services/HeroServices";
import { useQuery } from "react-query";

const useAssetById = (props) => {
    const useAssetByIdFn = async () => {
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const response = await heroService.get(`/asset/${props?.params?.id}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                }
            })

            const { status } = response

            if (status !== 200) return

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