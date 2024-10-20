import { BsCashCoin } from "react-icons/bs";
import { CiNoWaitingSign } from "react-icons/ci";
import { FcAcceptDatabase } from "react-icons/fc";
import { RiFileReduceLine } from "react-icons/ri";
import { useHomeContext } from "../providers/rootProviders/HomeProviders";

export default function ChartAssets() {
    const {
        dataAssetList
    } = useHomeContext();

    console.log(dataAssetList)
    return (
        <>
            <div className="w-full p-4 bg-white rounded flex justify-center items-center shadow">
                <RiFileReduceLine className="text-4xl mr-2" />
                <p className="text-sm">Total Asset : {dataAssetList?.totalItems}</p>
            </div>
            <div className="w-full p-4 bg-white rounded flex justify-center items-center shadow">
                <BsCashCoin className="text-4xl mr-4" fill="green" />
                <div className="flex flex-col">
                    <p className="text-sm">Total Nilai</p>
                    <p className="text-sm">Rp. {dataAssetList?.data?.reduce((a, b) => a + b.totalNilaiAsset, 0).toLocaleString('id-ID')}</p>
                </div>
            </div>
            <div className="w-full p-4 bg-white rounded flex justify-center items-center shadow">
                <CiNoWaitingSign className="text-4xl mr-2" fill="red" />
                <p className="text-sm">Waiting : {dataAssetList?.data?.filter((a) => a.status === "waiting").length}</p>
            </div>
            <div className="w-full p-4 bg-white rounded flex justify-center items-center shadow">
                <FcAcceptDatabase
                    className="text-4xl mr-2" />
                <p className="text-sm">Approve : {dataAssetList?.data?.filter((a) => a.status === "approved").length}</p>
            </div>
        </>
    )
}