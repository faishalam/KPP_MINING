import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAsset, getAssetById, updateAsset } from "../features/asset/asyncAction";
import ModalInput from "../components/elements/ModalInput";
import ButtonElement from "../components/elements/ButtonElement";
import Swal from 'sweetalert2'


export default function ModalEditAsset(props) {
    const { id } = props
    const [form, setForm] = useState({
        namaAsset: '',
        nilaiAsset: '',
        quantityAsset: '',
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
            namaAsset: assetById?.namaAsset,
            nilaiAsset: assetById?.nilaiAsset,
            quantityAsset: assetById?.quantityAsset,
            benefit: assetById?.benefit,
            planRealisasi: assetById?.planRealisasi ? new Date(assetById.planRealisasi).toISOString().split('T')[0] : ''
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
            document.getElementById('editAsset').close()
            await Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire("Saved!", "", "success");
                    dispatch(updateAsset(id, form))
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
            
            setForm({
                namaAsset: '',
                nilaiAsset: '',
                quantityAsset: '',
                benefit: '',
                planRealisasi: ''
            })
            setError('')
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
                    <ModalInput
                        label="Nama Asset"
                        type="text"
                        name="namaAsset"
                        id="namaAsset"
                        onChange={handleChange}
                        value={form.namaAsset}
                    />

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