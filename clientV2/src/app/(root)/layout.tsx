"use client";
import RootLayoutComponents from "@/components/layout/RootLayoutComponents";
import "../../app/globals.css";
import { RootProvider } from "../../components/queryProviders/RootProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootProvider>
      <RootLayoutComponents>{children}</RootLayoutComponents>
    </RootProvider>
  );
}
