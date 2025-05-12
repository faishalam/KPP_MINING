"use client";

import "../../../app/globals.css";
import { QueryProviders } from "@/components/queryProviders/QueryProvider";
import { AuthProvider } from "./hooks";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QueryProviders>
        <AuthProvider>{children}</AuthProvider>
      </QueryProviders>
    </>
  );
}
