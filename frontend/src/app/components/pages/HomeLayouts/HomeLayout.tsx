import { HomeProvider } from "@/app/providers/rootProviders/HomeProviders";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebarLayout from "./MobileSidebar";
import Navbar from "./Navbar";
import React from "react";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    return (
        <>
           
        </>
    )
}