import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import useAssetManagement from "../hooks";
import ButtonSubmit from "@/components/button/ButtonSubmit";
import CInputImage from "@/components/componentsV2/atoms/input-file/image";
import { Controller } from "react-hook-form";
import { useMemo, useState } from "react";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";
import ModalViewPhoto from "./ModalVIewPhoto";

export default function ModalUploader() {
  const {
    openModalFoto,
    setOpenModalFoto,
    onSubmitFoto,
    isLoadingUploadFoto,
    control,
    handleSubmit,
    dataAssetById,
    mode,
  } = useAssetManagement();
  const title = useMemo(() => {
    if (mode === "view") return "View Photo";
    if (mode === "edit") return "Edit Photo";
  }, [mode]);
  const [openModalView, setOpenModalView] = useState<{
    show: boolean;
    data: string;
  }>();
  return (
    <Dialog
      open={openModalFoto}
      onClose={setOpenModalFoto}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed max-w-full inset-0 z-10 w-screen overflow-y-auto">
        {isLoadingUploadFoto && <BlockingLoader />}
        <div className="flex max-w-full min-h-full items-center justify-center px-10">
          <DialogPanel
            transition
            className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in max-w-2xl w-full data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="mt-3 sm:mt-5 p-4">
              <DialogTitle
                as="h3"
                className="text-base font-semibold leading-6 text-gray-900"
              >
                {title}
              </DialogTitle>
              <div className="flex flex-col gap-3 mt-4">
                <form onSubmit={handleSubmit(onSubmitFoto)}>
                  <div className="w-full flex flex-col sm:grid grid-cols-2 gap-2 sm:gap-x-7 sm:gap-y-3 px-4 py-2">
                    <div
                      onClick={() =>
                        setOpenModalView({
                          show: true,
                          data: dataAssetById?.fotoAsset?.base64,
                        })
                      }
                    >
                      <Controller
                        name="fotoAsset"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <CInputImage
                            id="foto-asset"
                            file={value}
                            label="Foto Asset"
                            disabled={mode === "view"}
                            description="Maksimal 5MB. PNG/JPEG. Rekomendasi ukuran 200x200."
                            className="w-full"
                            onChange={(file) => {
                              onChange(file);
                            }}
                          />
                        )}
                      />
                    </div>
                    <div
                      onClick={() =>
                        setOpenModalView({
                          show: true,
                          data: dataAssetById?.fotoTandaTerima?.base64,
                        })
                      }
                    >
                      <Controller
                        name="fotoTandaTerima"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <CInputImage
                            id="foto-tanda-terima"
                            file={value}
                            disabled={mode === "view"}
                            label="Foto Tanda Terima"
                            description="Maksimal 5MB. PNG/JPEG. Rekomendasi ukuran 200x200."
                            className="w-full"
                            onChange={(file) => {
                              onChange(file);
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  {mode === "view" ? (
                    <div className="mt-5 sm:mt-6 p-4">
                      <ButtonSubmit
                        type={"button"}
                        classname={
                          "w-full max-w-full text-sm rounded-md bg-white hover:bg-gray-50 text-black border p-2"
                        }
                        btnText="Cancel"
                        onClick={() => setOpenModalFoto(false)}
                      />
                    </div>
                  ) : (
                    <div className="mt-5 sm:mt-6 p-4">
                      <ButtonSubmit
                        type={"submit"}
                        classname="inline-flex w-full justify-center rounded-md bg-[#154940] hover:bg-[#0e342d] text-white px-3 py-2 text-sm font-semibold shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        btnText="Save Foto"
                      />
                    </div>
                  )}
                </form>
              </div>
            </div>
            {openModalView?.show && (
              <ModalViewPhoto
                openModalView={openModalView}
                setOpenModalView={setOpenModalView}
              />
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
