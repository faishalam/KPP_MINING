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
import Image from "next/image";

type ModalViewPhotoProps = {
  openModalView: {
    show: boolean;
    data: string;
  };
  setOpenModalView: (newOpen: { show: boolean; data: string }) => void;
};

export default function ModalViewPhoto({
  openModalView,
  setOpenModalView,
}: ModalViewPhotoProps) {
  const { isLoadingDataAssetById } = useAssetManagement();
  return (
    <Dialog
      open={openModalView.show}
      onClose={() => setOpenModalView({ ...openModalView, show: false })}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed max-w-full inset-0 z-10 w-screen overflow-y-auto">
        {isLoadingDataAssetById && <BlockingLoader />}
        <div className="flex max-w-full min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in max-w-2xl w-full data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <Image
              src={openModalView.data}
              width={500}
              height={500}
              alt="Foto Asset"
              className="w-full h-full"
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
