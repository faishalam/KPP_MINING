import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAsset } from "../features/asset/asyncAction";
import ModalInput from "../components/elements/ModalInput";
import ButtonElement from "../components/elements/ButtonElement";

export default function ModalAddAsset() {
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

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addAsset(form))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your asset has been upload",
                showConfirmButton: false,
                timer: 1500
            });
            setForm({
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
            document.getElementById('addAsset').close()
        } catch (error) {
            setError(error)
        }
    }


    return (
        <dialog id="addAsset" className="modal w-2/5 h-3/6 overflow-y-auto rounded-lg">
            <div className="modal-box">
                <form onSubmit={handleSubmit} className="bg-white p-6 mb-4">
                    <h1 className="text-gray-800 font-bold text-xl mb-8 border-b-2 border-black">Add Asset!</h1>
                    {error && <p className="text-red-500 text-xs">*{error}</p>}

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
                            <option value="">Select Kode PN</option>
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
                            <option value="">Select Action Plan</option>
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
                            Add Asset
                        </ButtonElement>

                    </div>
                </form>
            </div>
        </dialog>
    )
}