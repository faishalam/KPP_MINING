'use client'
import { HomeProvider } from "../providers/rootProviders/HomeProviders"
import HomeLayout from "../components/pages/HomePage/HomeLayout"
import Link from "next/link"

export default function HomePage() {
    return (
        <>
            <HomeProvider>
                <HomeLayout />
            </HomeProvider>
        </>
    )
}