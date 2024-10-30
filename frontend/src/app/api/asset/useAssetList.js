'use client'

import { heroService } from "@/app/services/HeroServices";
import { useQuery } from "react-query";

const useAssetList = (props) => {
    const useAssetListFn = async () => {
        try {
            const access_token = localStorage.getItem("access_token");
            if (!access_token) throw new Error("Access token not found");

            const response = await heroService.get(`/asset`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    ...(props?.params?.search && { search: props.params.search }),
                    ...(props?.params?.page && { page: props.params.page }),
                    ...(props?.params?.limit && { limit: props.params.limit }),
                    ...(props?.params?.enabled && { enabled: props.params.enabled }),
                }
            });

            if (response.status !== 200) return;

            return response.data;
        } catch (error) {
            throw error
        }

    }

    const query = useQuery({
        queryKey: ['useAssetList', props.params],
        queryFn: useAssetListFn,
        staleTime: Infinity,
        cacheTime: Infinity,
        enabled: Boolean(props?.params?.search || props?.params?.page || props?.params?.limit || props?.params?.enabled),
    });

    return { ...query };
}

export default useAssetList;
