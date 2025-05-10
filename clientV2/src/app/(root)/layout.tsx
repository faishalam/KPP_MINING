"use client";
import RootLayoutComponents from "@/components/layout/RootLayoutComponents";
import "../../app/globals.css";
import { RootProvider } from "../../components/queryProviders/RootProvider";
import { RootLayoutProvider } from "@/providers/rootProviders/RootLayoutProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootProvider>
      <RootLayoutProvider>
        <RootLayoutComponents>{children}</RootLayoutComponents>
      </RootLayoutProvider>
    </RootProvider>
  );
}
