import React from 'react';

export default function LoadingSkeletonChartBar() {
    return (
        <div className='w-full bg-gray-200 rounded-md shadow p-5 flex justify-center items-center h-full animate-pulse'>
            <div className="w-full h-96 flex flex-col justify-around items-center">
                {/* Axis Lines Skeleton */}
                <div className="w-full h-4 bg-gray-200 rounded-sm mb-2"></div>

                {/* Bars Skeleton */}
                <div className="flex justify-around w-full mt-4">
                    <div className="w-10 h-40 bg-gray-300 rounded"></div>
                    <div className="w-10 h-20 bg-gray-300 rounded"></div>
                    <div className="w-10 h-24 bg-gray-300 rounded"></div>
                </div>

                {/* X-Axis Labels Skeleton */}
                <div className="flex justify-around w-full mt-6">
                    <div className="w-10 h-4 bg-gray-200 rounded"></div>
                    <div className="w-10 h-4 bg-gray-200 rounded"></div>
                    <div className="w-10 h-4 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
}
