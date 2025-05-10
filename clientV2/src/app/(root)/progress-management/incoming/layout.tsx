"use client";

import { Suspense } from "react";
import { ProgressAssetManagementProvider } from "./hooks";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";

export default function ProgressAssetLayout({
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
        <ProgressAssetManagementProvider>
          {children}
        </ProgressAssetManagementProvider>
      </Suspense>
    </>
  );
}
