"use client";
import "../../app/globals.css";
import { RootProvider } from "../../components/queryProviders/RootProvider";
import Navbar from "@/components/pages/RootComponents/Navbar";
import MobileSidebar from "@/components/pages/RootComponents/MobileSidebar";
import DesktopSidebar from "@/components/pages/RootComponents/DesktopSidebar";
import { RootLayoutProvider } from "./hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <RootProvider>
      <RootLayoutProvider>
        <div className="w-full max-w-full min-h-screen bg-gray-100">
          <MobileSidebar />
          <DesktopSidebar />
          <Navbar />
          <div className="lg:pl-72 w-full max-w-full">
            <main className="py-6 w-full max-w-full ">
              <div className="px-4 sm:px-6 lg:px-8 w-full">{children}</div>
            </main>
          </div>
        </div>
      </RootLayoutProvider>
    </RootProvider>
  );
}
