import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAsset, getAssetById, updateAsset } from "../features/asset/asyncAction";
import ModalInput from "../components/elements/ModalInput";
import ButtonElement from "../components/elements/ButtonElement";
import Swal from 'sweetalert2'


export default function ModalEditAsset(props) {
    const { id } = props
    const [form, setForm] = useState({
        site: '',
        namaAsset: '',
        kodePN: '',
        nilaiAsset: '',
        quantityAsset: '',
        actionPlan: '',
        userDept: '',
        remark: '',
        areaKerja: '',
        benefit: '',
        planRealisasi: ''
    })
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const assetById = useSelector(state => state.asset.assetById)


    useEffect(() => {
        const getData = async () => {
            try {
                await dispatch(getAssetById())
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        setForm({
            site: assetById?.site,
            namaAsset: assetById?.namaAsset,
            kodePN: assetById?.kodePN,
            nilaiAsset: assetById?.nilaiAsset,
            quantityAsset: assetById?.quantityAsset,
            actionPlan: assetById?.actionPlan,
            userDept: assetById?.userDept,
            remark: assetById?.remark,
            areaKerja: assetById?.areaKerja,
            benefit: assetById?.benefit,
            planRealisasi: assetById?.planRealisasi ? new Date(assetById.planRealisasi).toISOString().split('T')[0] : ''
            // site: assetById?.site,
            // kodePN: assetById?.kodePN,
            // namaAsset: assetById?.namaAsset,
            // nilaiAsset: assetById?.nilaiAsset,
            // quantityAsset: assetById?.quantityAsset,
            // benefit: assetById?.benefit,
            // planRealisasi: assetById?.planRealisasi ? new Date(assetById.planRealisasi).toISOString().split('T')[0] : ''
        })
    }, [assetById])

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateAsset(id, form))
            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire("Saved!", "", "success");
                    
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });

            setForm({
                site: '',
                namaAsset: '',
                kodePN: '',
                nilaiAsset: '',
                quantityAsset: '',
                actionPlan: '',
                userDept: '',
                remark: '',
                areaKerja: '',
                benefit: '',
                planRealisasi: ''
            })
            setError('')
            document.getElementById('editAsset').close()
        } catch (error) {
            setError(error)
        } finally {

        }
    }



    return (
        <dialog id="editAsset" className="modal w-2/5 h-3/6 overflow-y-auto rounded-lg">
            <div className="modal-box">
                <form onSubmit={handleSubmit} className="bg-white p-6 mb-4">
                    <h1 className="text-gray-800 font-bold text-xl mb-8 border-b-2 border-black">Edit Asset!</h1>
                    {error && <p className="text-red-500 text-xs">*{error}</p>}
                    <label className="text-sm font-semibold mb-2">Site</label>
                    <div className="relative">
                        <select
                            className="w-full rounded-lg border-gray-200 text-sm shadow-sm border border-grey-200 mb-4 p-2 flex items-start"
                            name="site"
                            id="site"
                            onChange={handleChange}
                            value={form.site}
                        >
                            <option value="">{form.site}</option>
                            <option value="TMRB">TMRB</option>
                            <option value="INDE">INDE</option>
                            <option value="RANT">RANT</option>
                            <option value="AGMR">AGMR</option>
                            <option value="SJRP">SJRP</option>
                            <option value="SPRL">SPRL</option>
                            <option value="BDMA">BDMA</option>
                            <option value="SPUT">SPUT</option>
                            <option value="MASS">MASS</option>
                            <option value="PELH">PELH</option>
                            <option value="AOC">AOC</option>
                        </select>
                    </div>
                    <ModalInput
                        label="Nama Asset"
                        type="text"
                        name="namaAsset"
                        id="namaAsset"
                        onChange={handleChange}
                        value={form.namaAsset}
                    />

                    <label className="text-sm font-semibold mb-2">Kode PN</label>
                    <div className="relative">
                        <select
                            className="w-full rounded-lg border-gray-200 text-sm shadow-sm border border-grey-200 mb-4 p-2 flex items-start"
                            name="kodePN"
                            id="kodePN"
                            onChange={handleChange}
                            value={form.kodePN}
                        >
                            <option value="">{form.kodePN}</option>
                            <option value="WORKSHOP">WORKSHOP</option>
                            <option value="FIXTURE N FITTING">FIXTURE N FITTING</option>
                            <option value="BUILDING">BUILDING</option>
                            <option value="COMPUTER EQUIPMENT">COMPUTER EQUIPMENT</option>
                            <option value="SAFETY EQUIPMENT">SAFETY EQUIPMENT</option>
                            <option value="OFFICE EQUIPMENT">OFFICE EQUIPMENT</option>
                            <option value="LEASEHOLD">LEASEHOLD</option>
                            <option value="PRODUCTION EQUIPMENT">PRODUCTION EQUIPMENT</option>
                            <option value="SUPPORT EQUIPMENT">SUPPORT EQUIPMENT</option>
                            <option value="ENGINEERING EQUIPMENT">ENGINEERING EQUIPMENT</option>
                        </select>
                    </div>

                    <ModalInput
                        label="Nilai Asset"
                        type="text"
                        name="nilaiAsset"
                        id="nilaiAsset"
                        onChange={handleChange}
                        value={form.nilaiAsset}
                    />


                    <ModalInput
                        label="Quantity Asset"
                        type="number"
                        name="quantityAsset"
                        id="quantityAsset"
                        onChange={handleChange}
                        value={form.quantityAsset}
                    />

                    <label className="text-sm font-semibold mb-2">Action Plan</label>
                    <div className="relative">
                        <select
                            className="w-full rounded-lg border-gray-200 text-sm shadow-sm border border-grey-200 mb-4 p-2 flex items-start"
                            name="actionPlan"
                            id="actionPlan"
                            onChange={handleChange}
                            value={form.actionPlan}
                        >
                            <option value="">{form.actionPlan}</option>
                            <option value="HIGH PRIORITY">HIGH PRIORITY</option>
                            <option value="CLOSED">CLOSED</option>
                        </select>
                    </div>

                    <ModalInput
                        label="Remark"
                        type="text"
                        name="remark"
                        id="remark"
                        onChange={handleChange}
                        value={form.remark}
                    />

                    <ModalInput
                        label="Area Kerja"
                        type="text"
                        name="areaKerja"
                        id="areaKerja"
                        onChange={handleChange}
                        value={form.areaKerja}
                    />

                    <ModalInput
                        label="Benefit"
                        type="text"
                        name="benefit"
                        id="benefit"
                        onChange={handleChange}
                        value={form.benefit}
                    />

                    <ModalInput
                        label="Plan Realisasi"
                        type="date"
                        name="planRealisasi"
                        id="planRealisasi"
                        onChange={handleChange}
                        value={form.planRealisasi}
                    />


                    <div className="flex justify-center">
                        <ButtonElement
                            type={'submit'}
                            classname={'w-2/4 h-10 bg-green-800 text-white rounded-lg hover:bg-green-700'}
                        >
                            Edit Asset
                        </ButtonElement>

                    </div>
                </form>
            </div>
        </dialog>
    )
}