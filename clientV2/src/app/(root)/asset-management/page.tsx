"use client";
import { Loader } from "@/components/componentsV2/atoms/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AssetManagementPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/asset-management/incoming");
  }, [router]);
  return (
    <div className="w-[100%] h-[100%] items-center justify-center grid">
      <Loader text="Redirecting..." />
    </div>
  );
}
