'use client'

import HomeLayout from "../../components/pages/HomePage/HomeLayout"
import { HomeProvider } from "../../providers/rootProviders/HomeProviders"

export default function HomePage() {
    return (
        <>
            <HomeProvider>
                <HomeLayout />
            </HomeProvider>
        </>
    )
}