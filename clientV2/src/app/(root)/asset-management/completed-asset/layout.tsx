"use client";

import { Suspense } from "react";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";
import { AssetManagementProvider } from "../incoming/hooks";

export default function CompletedAssetLayout({
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
