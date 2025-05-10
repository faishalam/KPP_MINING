"use client";

import { AssetManagementProvider } from "./hooks";

export default function AssetManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AssetManagementProvider>
        <div>{children}</div>
      </AssetManagementProvider>
    </>
  );
}
