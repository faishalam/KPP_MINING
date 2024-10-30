export default function LoadingSkeletonChartPie() {
    return (
        <>
            <div className='w-full bg-gray-200 rounded-md shadow p-5 flex justify-center items-center h-full animate-pulse'>
                <div className="relative w-full h-96 flex flex-col justify-center items-center">
                    {/* Outer Circle Skeleton */}
                    <div className="absolute w-60 h-60 bg-gray-100 rounded-full"></div>

                    {/* Inner Sections (Sliced) */}
                    <div className="absolute w-20 h-20 bg-gray-100 rounded-full"></div>
                    <div className="absolute w-16 h-16 bg-gray-100 rounded-full"></div>
                    <div className="absolute w-24 h-24 bg-gray-100 rounded-full"></div>

                    {/* Labels Placeholder */}
                    <div className="absolute bottom-0 flex justify-around w-full mt-4">
                        <div className="w-16 h-4 bg-gray-100 rounded mt-2"></div>
                        <div className="w-16 h-4 bg-gray-100 rounded mt-2"></div>
                        <div className="w-16 h-4 bg-gray-100 rounded mt-2"></div>
                    </div>
                </div>
            </div>
        </>
    )
}