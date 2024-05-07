import { useDispatch } from "react-redux"
import ButtonElement from "../elements/ButtonElement"
import { approveAsset, getAssetById, removeAsset } from "../../features/asset/asyncAction"
import ModalEditAsset from "../../pages/ModalEditAsset"
import Swal from 'sweetalert2'


export default function TableHome(props) {
    const { data, type, loading } = props
    const dispatch = useDispatch()

    const onHandleDelete = async (id) => {
        try {
            await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    dispatch(removeAsset(id))
                }
            });

        } catch (error) {
            console.log(error)
        }
    }

    const onHandleEdit = async (id) => {
        try {
            await dispatch(getAssetById(id))
            document.getElementById("editAsset").showModal()
        } catch (error) {
            console.log(error)
        }
    }

    const onHandleApprove = async (id) => {
        await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve this!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Approved!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                dispatch(approveAsset(id))
            }
        });

    }

    return (
        <>
           
            <div className="flex flex-col bg-white mt-10 rounded-md shadow-md p-2 overflow-auto">

                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table
                                className="min-w-full border border-neutral-200 text-start text-sm font-light text-surface border:black text-black">
                                <thead
                                    className="border-b border-neutral-200 font-medium">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4">
                                            No
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4">
                                            Nama
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4">
                                            Nilai
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4">
                                            Quantity
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4">
                                            Total Nilai
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4">
                                            Depresiasi
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4">
                                            Benefit
                                        </th>

                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4">
                                            By
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4">
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-e border-neutral-200 px-6 py-4">
                                            Realisasi
                                        </th>

                                        {
                                            type === "byUser" && (
                                                <th
                                                    scope="col"
                                                    className="border-e border-neutral-200 px-6 py-4">
                                                    Actions
                                                </th>
                                            )
                                        }

                                        {
                                            type === "department" && (
                                                <th
                                                    scope="col"
                                                    className="border-e border-neutral-200 px-6 py-4">
                                                    Actions
                                                </th>
                                            )
                                        }

                                    </tr>
                                </thead>

                                <tbody>

                                    {data?.map((item, i) => (
                                        <tr className="border-b border-neutral-200">
                                            <td
                                                className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium">
                                                {i + 1}
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                                                {item.namaAsset}
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                                                Rp. {item.nilaiAsset.toLocaleString('id-ID')}
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                                                {item.quantityAsset}
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                                                Rp. {item.totalNilaiAsset.toLocaleString('id-ID')}
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                                                {item.depresiasi}
                                            </td>
                                            <td
                                                className="whitespace-wrap border-e border-neutral-200 px-6 py-4">
                                                {item.benefit}
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 italic text-[#aaa7a7]">
                                                {item.User.username}
                                            </td>
                                            <td className={`whitespace-nowrap border-e border-neutral-200 px-6 py-4 italic ${item.status === "approved" ? "text-green-600" : "text-red-600"}`}>
                                                {item.status}
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                                                {new Date(item.planRealisasi).toISOString().split('T')[0]}
                                            </td>

                                            {
                                                type === "byUser" && (
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <ButtonElement
                                                            classname="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                                            type="button"
                                                            handleClick={() => onHandleDelete(item.id)}
                                                        >
                                                            Delete
                                                        </ButtonElement>

                                                        <ButtonElement
                                                            classname="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                            type="button"
                                                            handleClick={() => onHandleEdit(item.id)}
                                                        >
                                                            Edit
                                                        </ButtonElement>
                                                        <ModalEditAsset id={item?.id} />
                                                    </td>
                                                )
                                            }

                                            {
                                                type === "department" && (
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {item.status === "waiting" ? (
                                                            <ButtonElement
                                                                classname={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2`}
                                                                type="button"
                                                                handleClick={() => onHandleApprove(item.id)}
                                                            >
                                                                Approve
                                                            </ButtonElement>
                                                        ) : (
                                                            <ButtonElement
                                                                classname={`text-green-500 italic font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2`}
                                                                type="button"
                                                            >
                                                                Approved
                                                            </ButtonElement>
                                                        )}

                                                    </td>
                                                )
                                            }


                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-col bg-white mt-10 rounded-md p-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light text-surface text-black">
                                <thead className="border-b border-neutral-200 font-medium">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">
                                            No
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Nama
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Nilai
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Total Nilai
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Depresiasi
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Benefit
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            By
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Realisasi
                                        </th>

                                        {
                                            type === "byUser" && (
                                                <th scope="col" className="px-6 py-4">
                                                    Actions
                                                </th>
                                            )
                                        }

                                        {
                                            type === "department" && (
                                                <th scope="col" className="px-6 py-4">
                                                    Actions
                                                </th>
                                            )
                                        }

                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((item, i) => (
                                        <tr className="border-b border-neutral-200 dark:border-white/10" key={i}>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.namaAsset}</td>
                                            <td className="whitespace-nowrap px-6 py-4">Rp. {item.nilaiAsset.toLocaleString('id-ID')}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.quantityAsset}</td>
                                            <td className="whitespace-nowrap px-6 py-4">Rp. {item.totalNilaiAsset.toLocaleString('id-ID')}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.depresiasi}</td>
                                            <td className="whitespace-wrap px-6 py-4">{item.benefit}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-gray-400 italic">{item.User.username}</td>
                                            <td className={`whitespace-nowrap px-6 py-4 ${item.status === "approved" ? "text-green-600" : "text-red-600"}`}>{item.status}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{new Date(item.planRealisasi).toISOString().split('T')[0]}</td>
                                            {
                                                type === "byUser" && (
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <ButtonElement
                                                            classname="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                                            type="button"
                                                            handleClick={() => onHandleDelete(item.id)}
                                                        >
                                                            Delete
                                                        </ButtonElement>

                                                        <ButtonElement
                                                            classname="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                            type="button"
                                                            handleClick={() => onHandleEdit(item.id)}
                                                        >
                                                            Edit
                                                        </ButtonElement>
                                                        <ModalEditAsset id={item?.id} />
                                                    </td>
                                                )
                                            }

                                            {
                                                type === "department" && (
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {item.status === "waiting" ? (
                                                            <ButtonElement
                                                                classname={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2`}
                                                                type="button"
                                                                handleClick={() => onHandleApprove(item.id)}
                                                            >
                                                                Approve
                                                            </ButtonElement>
                                                        ) : (
                                                            <ButtonElement
                                                                classname={`text-green-500 italic font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2`}
                                                                type="button"
                                                            >
                                                                Approved
                                                            </ButtonElement>
                                                        )}

                                                    </td>
                                                )
                                            }
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div > */}
        </>
    )
}