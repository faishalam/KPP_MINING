"use client";

import { ProgressAssetManagementProvider } from "./hooks";


export default function ProgressAssetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProgressAssetManagementProvider>
        {children}
      </ProgressAssetManagementProvider>
    </>
  );
}
