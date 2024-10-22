'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';


export default function PaginationComponent({ pagination, setPagination, data }: any) {
    const totalItems = data?.totalItems || 0;
    const totalPages = data?.totalPages || 0;
    const currentPage = data?.currentPage || 1;

    const handlePageChange = (page: number) => {
        setPagination({ page, limit: pagination.limit });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    // Calculate the range of results to display
    const startResult = (currentPage - 1) * pagination.limit + 1;
    const endResult = Math.min(currentPage * pagination.limit, totalItems);

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={handlePreviousPage}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startResult}</span> to <span className="font-medium">{endResult}</span> of{' '}
                        <span className="font-medium">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <button
                            onClick={handlePreviousPage}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                        </button>

                        {currentPage > 2 && (
                            <>
                                <button
                                    onClick={() => handlePageChange(1)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === 1 ? 'bg-indigo-600 text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'} focus:outline-offset-0`}
                                >
                                    1
                                </button>
                                {currentPage > 3 && (
                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                        ...
                                    </span>
                                )}
                            </>
                        )}

                        {Array.from({ length: totalPages }, (_, index) => {
                            const pageNum = index + 1;
                            if (pageNum < currentPage - 1 || pageNum > currentPage + 1) {
                                return null; // Skip rendering these pages
                            }
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNum ? 'bg-indigo-600 text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'} focus:outline-offset-0`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {currentPage < totalPages - 1 && (
                            <>
                                {currentPage < totalPages - 2 && (
                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                        ...
                                    </span>
                                )}
                                <button
                                    onClick={() => handlePageChange(totalPages)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === totalPages ? 'bg-indigo-600 text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'} focus:outline-offset-0`}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}

                        <button
                            onClick={handleNextPage}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            disabled={currentPage === totalPages}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
