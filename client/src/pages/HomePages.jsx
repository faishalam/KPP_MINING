import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/fragments/Sidebar";
import { getAllAsset, getAssetByUser } from "../features/asset/asyncAction";
import { useEffect } from "react";
import TableHome from "../components/fragments/TableHome"

export default function HomePages(props) {
    const { type } = props
    const dispatch = useDispatch()

    const asset = useSelector((state) => {
        if (type === "all" || type === "department") {
            return state.asset.asset;
        } else {
            return state.asset.assetByUser;
        }
    });

    useEffect(() => {
        const getData = async () => {
            try {
                if (type === "all") {
                    await dispatch(getAllAsset())
                }
                if (type === "byUser") {
                    await dispatch(getAssetByUser())
                }
            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [dispatch, type])



    return (
        <>
            <div className="w-full h-screen flex">
                <div className="w-1/5 h-screen">
                    <Sidebar />
                </div>

                <div className="w-full h-screen bg-[#f1f5f8] p-6 overflow-y-scroll">
                    <div>
                        <h1 className="text-xl font-bold mb-6">Dashboard |</h1>
                    </div>
                    <div className="flex gap-6">
                        <div className="w-1/4 h-20 bg-white rounded-md flex justify-center items-center">
                            <p className="text-sm">Total Asset : {asset?.length}</p>
                        </div>
                        <div className="w-1/4 h-20 bg-white rounded-md flex justify-center items-center">
                            <p className="text-sm">Total Nilai :Rp. {asset?.reduce((a, b) => a + b.totalNilaiAsset, 0).toLocaleString('id-ID')}</p>
                        </div>
                        <div className="w-1/4 h-20 bg-white rounded-md flex justify-center items-center">
                            <p className="text-sm">waiting : {asset?.filter((a) => a.status === "waiting").length}</p>
                        </div>
                        <div className="w-1/4 h-20 bg-white rounded-md flex justify-center items-center">
                            <p className="text-sm">approve : {asset?.filter((a) => a.status === "approved").length}</p>
                        </div>
                    </div>
                    <TableHome data={asset} type={type} />
                </div>
            </div>
        </>
    )
}