"use client";

import { ModalWarningInfoProvider } from "@/components/componentsV2/atoms/modal-warning";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return <ModalWarningInfoProvider>{children}</ModalWarningInfoProvider>;
}
