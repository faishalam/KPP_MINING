'use client'
import { TypeDataAssetList, useHomeContext } from "@/providers/rootProviders/HomeProviders";
import DataTable from "react-data-table-component";
import PaginationComponent from "../../PaginationComponent";
import LoadingSkeletonTable from "../../loading/LoadingSkeletonTable";
import { columnHomePage } from "../../dataColumn/dataColumn";


export default function DataTableHome() {
    const {
        isLoadingDataAssetList,
        dataAssetList,
        pagination,
        setPagination,
        isFetchingDataAssetList
    } = useHomeContext();

    const dataWithIndex = dataAssetList?.data?.map((item, index) => ({ ...item, index }));

    const conditionalRowStyles = [
        { when: (row: TypeDataAssetList) => row.index % 2 === 0, style: { backgroundColor: '#f9f9f9' } },
        { when: (row: TypeDataAssetList) => row.index % 2 !== 0, style: { backgroundColor: '#ffffff' } },
    ];
    
    return (
        <>
            {isLoadingDataAssetList || isFetchingDataAssetList ? (
                <>
                    <LoadingSkeletonTable />
                </>
            ) : (
                <>
                    {dataAssetList?.data && dataAssetList?.data?.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">Asset Tidak Ditemukan</p>
                        </div>
                    ) : (
                        <>
                            <DataTable
                                columns={columnHomePage}
                                data={dataWithIndex || []}
                                className="w-full"
                                conditionalRowStyles={conditionalRowStyles}
                            />

                            <PaginationComponent
                                pagination={pagination}
                                setPagination={setPagination}
                                totalItems={dataAssetList?.totalItems || 0}
                                totalPages={dataAssetList?.totalPages || 0}
                                currentPage={dataAssetList?.currentPage || 0}
                            />
                        </>
                    )}
                </>
            )}
        </>
    )
}