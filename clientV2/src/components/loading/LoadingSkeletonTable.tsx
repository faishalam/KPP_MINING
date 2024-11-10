import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

const LoadingSkeletonTable: React.FC = () => {
   
    return (
        <div className="max-w-full w-full bg-gray-200 rounded-md shadow h-[720px] animate-pulse border border-dashed border-gray-400 overflow-hidden">
            <div className="h-full flex flex-col items-center justify-center">
                <LoadingSpinner />
                <span className="text-gray-500">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSkeletonTable;
