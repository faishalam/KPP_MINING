import React from 'react';

export default function LoadingSkeletonChart() {
    return (
        <div className="w-full bg-gray-200 max-w-full rounded-md shadow flex flex-col justify-between items-center gap-4 p-8 px-12 animate-pulse">
            <div className="w-full">
                <div className="h-4 bg-gray-300 rounded-md w-1/3"></div> {/* Skeleton untuk title */}
            </div>

            <div className="flex justify-between w-full items-center">
                <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center"></div> {/* Skeleton untuk icon */}
                <div className="h-8 bg-gray-300 rounded-md w-20"></div> {/* Skeleton untuk total */}
            </div>
        </div>
    );
}
