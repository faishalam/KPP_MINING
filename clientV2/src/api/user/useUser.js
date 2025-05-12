"use client";
import { HeroServices } from "@/services/HeroServices";
import { useState } from "react";
import { useQuery } from "react-query";

const useUser = (props) => {
  const [data, setData] = useState();

  const useUserFn = async () => {
    try {
      const response = await HeroServices.get(`/user-me`);

      const { status } = response;
      if (status !== 200) return;
      setData(response.data);
      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  const query = useQuery({
    queryKey: ["useUser"],
    queryFn: useUserFn,
    // staleTime: Infinity,
    // cacheTime: Infinity,
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
  });

  return { ...query, data };
};

export default useUser;
