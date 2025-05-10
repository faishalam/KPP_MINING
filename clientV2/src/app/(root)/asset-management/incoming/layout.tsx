"use client";

import { Suspense } from "react";
import { AssetManagementProvider } from "./hooks";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";

export default function AssetManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <BlockingLoader />
          </div>
        }
      >
        <AssetManagementProvider>
          <div>{children}</div>
        </AssetManagementProvider>
      </Suspense>
    </>
  );
}
