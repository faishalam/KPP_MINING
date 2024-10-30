// src/components/LoadingSkeleton.tsx
import React from 'react';

const LoadingSkeletonTable = () => {
    return (
        <div className="animate-pulse max-w-full w-full">
            <div className="flex flex-col space-y-2">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="h-6 bg-gray-300 rounded w-1/4" /> {/* Skeleton untuk nama asset */}
                        <div className="h-6 bg-gray-300 rounded w-1/4" /> {/* Skeleton untuk kode PN */}
                        <div className="h-6 bg-gray-300 rounded w-1/4" /> {/* Skeleton untuk nilai asset */}
                        <div className="h-6 bg-gray-300 rounded w-1/4" /> {/* Skeleton untuk quantity */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSkeletonTable
