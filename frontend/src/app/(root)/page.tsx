'use client'
import { HomeProvider } from "../providers/rootProviders/HomeProviders"
import HomeLayout from "../components/pages/HomePage/HomeLayout"

export default function HomePage() {
    return (
        <>
            <HomeProvider>
                <HomeLayout />
            </HomeProvider>
        </>
    )
}