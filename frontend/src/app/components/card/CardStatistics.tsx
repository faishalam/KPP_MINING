import LoadingSkeletonChart from "../loading/LoadingSkeletonChart"

interface CardStatisticsProps {
    title: string
    icon: JSX.Element
    total: string | undefined
    loading: boolean
}

export default function CardStatistics({ title, icon, total, loading }: CardStatisticsProps) {
    return (
        <>
            {loading ? (
                <LoadingSkeletonChart />
            ) : (
                <div className="w-full bg-white max-w-full rounded-md shadow flex flex-col justify-between items-center gap-4 p-8 px-12">
                    <div className="w-full">
                        <p className="text-md text-gray-500 font-medium">{title}</p>
                    </div>

                    <div className="flex justify-between w-full items-center">
                        <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full">
                            {icon}
                        </div>
                        <p className="text-4xl font-semibold text-[#195c50]">{total}</p>
                    </div>
                </div>
            )}

        </>
    )
}