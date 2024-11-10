"use client";

import { AuthProviders } from "@/providers/authProviders/AuthProviders";
import "../../app/globals.css";
import AuthLayoutComponents from "@/components/layout/AuthLayoutComponents";
import { QueryProviders } from "@/components/queryProviders/QueryProvider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthLayoutComponents>
        <QueryProviders>
          <AuthProviders>{children}</AuthProviders>
        </QueryProviders>
      </AuthLayoutComponents>
    </>
  );
}
