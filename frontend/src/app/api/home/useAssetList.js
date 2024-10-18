import { useState } from "react"
import { useMutation, useQuery } from "react-query";

const useAssetList = (props) => {
    const [data, setData] = useState()
    console.log('masuk')

    const useAssetListFn = async () => {
        try {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) throw new Error("Access token not found")

            const searchParam = props?.params?.search ? props.params.search : '';
            const response = await fetch(`http://localhost:3000/asset/${searchParam}`, {
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
        queryKey: ['useAssetList', props?.params?.search],
        queryFn: useAssetListFn,
        staleTime: Infinity,
        cacheTime: Infinity,
        // enabled: Boolean(props?.params?.search),
    })


    return { ...query, data }
}

export default useAssetList