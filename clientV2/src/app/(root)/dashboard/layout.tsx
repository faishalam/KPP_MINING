"use client";

import { DashboardProvider } from "./hooks";

export default function ProgressAssetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardProvider>
        {children}
      </DashboardProvider>
    </>
  );
}
