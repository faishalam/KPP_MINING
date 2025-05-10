"use client";

import { AssetOnDepartmentProvider } from "./hooks";

export default function AssetDepartmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AssetOnDepartmentProvider>{children}</AssetOnDepartmentProvider>
    </>
  );
}
