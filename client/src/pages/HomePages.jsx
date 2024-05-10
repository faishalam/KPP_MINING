import { RiFileReduceLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { CiNoWaitingSign } from "react-icons/ci";
import { FcAcceptDatabase } from "react-icons/fc";
import { TEChart } from "tw-elements-react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/fragments/Sidebar";
import { getAllAsset, getAssetByUser } from "../features/asset/asyncAction";
import { useEffect, useState } from "react";
import TableHome from "../components/fragments/TableHome"

export default function HomePages(props) {
    const { type } = props
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const asset = useSelector((state) => {
        if (type === "all" || type === "department") {
            return state.asset.asset;
        } else {
            return state.asset.assetByUser;
        }
    });

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            setTimeout(async () => {
                try {
                    if (type === "all") {
                        await dispatch(getAllAsset())
                    }
                    if (type === "byUser") {
                        await dispatch(getAssetByUser())
                    }
                    setIsLoading(false)
                } catch (error) {
                    setError(error)
                }
            }, 500)
            
        }
        getData()
    }, [dispatch, type])

    console.log(isLoading)


    const totalAssets = asset?.length || 0;

    const waitingCount = asset?.filter((a) => a.status === "waiting").length;
    const approveCount = asset?.filter((a) => a.status === "approved").length;

    const waitingPercentage = (waitingCount / totalAssets) * 100;
    const approvePercentage = (approveCount / totalAssets) * 100;

    return (
        <>
            <div className="w-full h-screen flex">
                <div className="w-1/5 h-screen">
                    <Sidebar />
                </div>

                <div className="w-full h-screen bg-[#f1f5f8] p-6 overflow-y-scroll">
                    {
                        isLoading && (
                            <div className="w-full h-screen flex justify-center items-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700"></div>
                            </div>
                        )
                    }
                    {/* {
                        error && (
                            <div className="w-full h-screen flex justify-center items-center">
                                <p>{error}</p>
                            </div>
                        )
                    } */}
                    <div>
                        {
                            type === "byUser" ? (
                                <h1 className="text-xl font-bold mb-6">Your Asset |</h1>
                            ) : (

                                <h1 className="text-xl font-bold mb-6">Dashboard |</h1>
                            )
                        }
                    </div>
                    <div className="flex gap-6">
                        <div className="w-1/5 h-20 bg-white rounded-md flex justify-center items-center shadow-md">
                            <RiFileReduceLine className="text-4xl mr-2" />
                            <p className="text-sm">Total Asset : {asset?.length}</p>
                        </div>
                        <div className="w-1/5 h-20 bg-white rounded-md flex justify-center items-center shadow-md">
                            <BsCashCoin className="text-4xl mr-4" fill="green" />
                            <div className="flex flex-col">
                                <p className="text-sm">Total Nilai</p>
                                <p className="text-sm">Rp. {asset?.reduce((a, b) => a + b.totalNilaiAsset, 0).toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                        <div className="w-1/5 h-20 bg-white rounded-md flex justify-center items-center shadow-md">
                            <CiNoWaitingSign className="text-4xl mr-2" fill="red" />
                            <p className="text-sm">Waiting : {asset?.filter((a) => a.status === "waiting").length}</p>
                        </div>
                        <div className="w-1/5 h-20 bg-white rounded-md flex justify-center items-center shadow-md">
                            <FcAcceptDatabase
                                className="text-4xl mr-2" />
                            <p className="text-sm">Approve : {asset?.filter((a) => a.status === "approved").length}</p>
                        </div>

                        <div className="w-1/5 h-20 bg-white rounded-md flex justify-center items-center shadow-md p-2">
                            <div className="w-full h-full ">
                                <TEChart
                                    type="pie"
                                    data={{
                                        labels: ["Waiting", "Approved"],
                                        datasets: [
                                            {
                                                label: "Status",
                                                data: [waitingPercentage, approvePercentage],
                                                backgroundColor: [
                                                    "rgba(255, 99, 132, 0.5)",
                                                    "rgba(77, 182, 172, 0.5)",
                                                ],
                                            },
                                        ],
                                    }}
                                    options={{
                                        plugins: {
                                            legend: {
                                                position: "right", // Atur posisi label di samping chart
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: (context) => {
                                                        let label = context.label || "";
                                                        if (label) {
                                                            label += ": ";
                                                        }
                                                        if (context.parsed) {
                                                            label += context.parsed.toFixed(2) + "%";
                                                        }
                                                        return label;
                                                    },
                                                },
                                            },
                                        },
                                        maintainAspectRatio: false, // Memastikan chart tidak mempertahankan rasio aspek
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                    }}
                                    className="w-full h-10"
                                />
                            </div>
                        </div>

                    </div>
                    <TableHome data={asset} type={type} loading={isLoading} />
                </div>
            </div >
        </>
    )
}