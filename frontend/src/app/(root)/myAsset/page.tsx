'use client'
import useUserAssetList from "@/app/api/userAsset/useUserAssetList";
import { TypeDataAssetList } from "@/app/providers/rootProviders/HomeProviders";
import DataTable from "react-data-table-component";

const columnMyAsset = [
    {
        name: 'No',
        selector: (row: TypeDataAssetList, index: number) => index + 1, // Menambahkan nomor urut
        width: '50px',
    },
    {
        name: 'Site',
        selector: (row: TypeDataAssetList) => row.site,
        sortable: true,
    },
    {
        name: 'Nama Asset',
        selector: (row: TypeDataAssetList) => row.namaAsset,
        sortable: true,
        minWidth: '200px',
    },
    {
        name: 'Kode PN',
        selector: (row: TypeDataAssetList) => row.kodePN,
        sortable: true,
        minWidth: '170px',
    },
    {
        name: 'Nilai Asset',
        selector: (row: TypeDataAssetList) => `Rp. ${row.nilaiAsset.toLocaleString('id-ID')}`,
        sortable: true,
        minWidth: '150px',
    },
    {
        name: 'Quantity',
        selector: (row: TypeDataAssetList) => row.quantityAsset,
        sortable: true,
    },
    {
        name: 'Total Nilai Asset',
        selector: (row: TypeDataAssetList) => `Rp. ${row.totalNilaiAsset.toLocaleString('id-ID')}`,
        sortable: true,
        minWidth: '150px',
    },
    {
        name: 'Action Plan',
        selector: (row: TypeDataAssetList) => row.actionPlan,
        sortable: true,
        minWidth: '150px',
    },
    {
        name: 'User Dept',
        selector: (row: TypeDataAssetList) => row.userDept,
        sortable: true,
    },
    {
        name: 'Depresiasi',
        selector: (row: TypeDataAssetList) => row.depresiasi,
        sortable: true,
    },
    {
        name: "Remark",
        selector: (row: TypeDataAssetList) => row.remark,
        sortable: true,
    },
    {
        name: "Area Kerja",
        selector: (row: TypeDataAssetList) => row.areaKerja,
        sortable: true,
    },
    {
        name: "Benefit",
        selector: (row: TypeDataAssetList) => row.benefit,
        sortable: true,
        minWidth: '150px',
        maxWidth: '200px',
        cell: (row: TypeDataAssetList) => (
            <div style={{
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                display: 'block'
            }}>
                {row.benefit}
            </div>
        ),
    },
    {
        name: "By",
        selector: (row: TypeDataAssetList) => row.User?.username,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{
                fontStyle: 'italic', // Membuat teks miring
                color: 'gray', // Mengatur warna teks menjadi abu-abu
            }}>
                {row.User?.username}
            </div>
        ),
    },
    {
        name: "Status",
        selector: (row: TypeDataAssetList) => row.status,
        sortable: true,
        cell: (row: TypeDataAssetList) => (
            <div style={{
                color: row.status === 'approved' ? 'green' : row.status === 'waiting' ? 'red' : 'black', // Mengatur warna teks berdasarkan status
            }}>
                {row.status}
            </div>
        ),
    },

    {
        name: "Plan Realisasi",
        selector: (row: TypeDataAssetList) => new Date(row.planRealisasi).toISOString().split('T')[0], // Ambil tanggal dalam format YYYY-MM-DD
        sortable: true,
        minWidth: '100px',
    },
    {
        name: "Realisasi Asset",
        selector: (row: TypeDataAssetList) => new Date(row.realisasiAsset).toISOString().split('T')[0], // Ambil tanggal dalam format YYYY-MM-DD
        sortable: true,
        minWidth: '100px',
    },
    {
        name: "Keterangan",
        selector: (row: TypeDataAssetList) => row.remark,
        sortable: true,
        minWidth: '150px',
    },
];

export default function MyAssetPage() {
    const { dataAssetList, isLoadingDataAssetList } = useUserAssetList();

    return (
        <>
            <DataTable
                columns={columnMyAsset}
                data={dataAssetList || []}
                progressPending={isLoadingDataAssetList}
                pagination
                paginationPerPage={12}
            />
        </>
    )
}