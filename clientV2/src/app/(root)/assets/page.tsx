'use client'

import HomeLayout from "../../../components/pages/HomePageComponents/HomeLayout"
import { HomeProvider } from "../../../providers/rootProviders/HomeProviders"

export default function HomePage() {
    return (
        <>
            <HomeProvider>
                <HomeLayout />
            </HomeProvider>
        </>
    )
}