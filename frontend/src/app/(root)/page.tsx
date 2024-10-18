import DataTableHome from "../components/pages/HomePage/DataTableHome";
import { HomeProvider } from "../providers/rootProviders/HomeProviders";

export default function HomePage() {
    return (
        <>
            <HomeProvider>
                <div className="mx-auto max-w-full bg-white h-full p-1 rounded-md">
                    <DataTableHome />
                </div>
            </HomeProvider>
        </>
    )
}