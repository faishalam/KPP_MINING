"use client";

import { Suspense } from "react";
import { UserManagementProvider } from "./hooks";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";

export default function UserManagementLayout({
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
        <UserManagementProvider>{children}</UserManagementProvider>
      </Suspense>
    </>
  );
}
