"use client";

import { Button } from "@mui/material";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/navigation";
import { CAutoComplete, CInput } from "@/components/componentsV2/atoms";
import DataGrid from "@/components/componentsV2/molecules/datagrid";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";
import useAssetManagement from "../hooks";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import { TextArea } from "@/components/componentsV2/atoms/Input-text-area";
import CInputDate from "@/components/componentsV2/atoms/input-date";
import ButtonSubmit from "@/components/button/ButtonSubmit";
import moment from "moment";
import ModalUploader from "../components/ModalUploader";
import useRootLayoutContext from "@/app/(root)/hooks";

export default function HomePage() {
  const router = useRouter();
  const {
    handleCancel,
    handleSubmit,
    onValidSubmit,
    onInvalidSubmit,
    kodePNOptions,
    control,
    isLoadingAddAsset,
    isLoadingDataAssetById,
    actionPlan,
    mode,
    isLoadingEditAsset,
    id,
    progressListColumnDef,
    dataAssetById,
    openModalFoto,
    setOpenModalFoto,
  } = useAssetManagement();
  const { role } = useRootLayoutContext();
  const title = useMemo(() => {
    if (mode === "view") return "View Asset";
    if (mode === "add") return "Add Asset";
    if (mode === "edit") return "Edit Asset";
  }, [mode]);
  return (
    <>
      {isLoadingDataAssetById || isLoadingAddAsset || isLoadingEditAsset ? (
        <BlockingLoader />
      ) : (
        <div className="w-full h-full no-scrollbar">
          <div
            id="master-user-form-header"
            className="flex items-center gap-2 h-[50px] justify-between"
          >
            <div className="flex gap-2 justify-center items-center">
              <div
                onClick={() => router.back()}
                className="max-w-[40px] w-full bg-[#154940] hover:bg-[#0e342d] rounded flex justify-center items-center p-2"
              >
                <BackIcon className="text-white" />
              </div>

              <div className="font-bold">{title}</div>
            </div>
            <div className="flex items-center gap-2">
              {mode === "view" &&
                dataAssetById?.progress?.length == 0 &&
                role === "super_admin" && (
                  <div>
                    <Button
                      onClick={() => {
                        router.push(
                          `/progress-management/incoming/${id}?mode=add`
                        );
                      }}
                      className="flex gap-2 text-white !bg-[#154940] hover:!bg-[#0e342d] !rounded-md h-[40px]"
                    >
                      <span className="text-white text-[10px] sm:text-sm">
                        Add Progress
                      </span>
                    </Button>
                  </div>
                )}
              {mode === "edit" && role === "user_admin" && (
                <div>
                  <Button
                    onClick={() => {
                      setOpenModalFoto(!openModalFoto);
                    }}
                    className="flex gap-2 text-white !bg-[#154940] hover:!bg-[#0e342d] !rounded-md h-[40px]"
                  >
                    <span className="text-white text-[10px] sm:text-sm">
                      Add Photo
                    </span>
                  </Button>
                </div>
              )}
              {mode === "view" &&
                (dataAssetById?.fotoAsset ||
                  dataAssetById?.fotoTandaTerima) && (
                  <div>
                    <Button
                      onClick={() => {
                        setOpenModalFoto(!openModalFoto);
                      }}
                      className="flex gap-2 text-white !bg-[#154940] hover:!bg-[#0e342d] !rounded-md h-[40px]"
                    >
                      <span className="text-white text-[10px] sm:text-sm">
                        View Photo
                      </span>
                    </Button>
                  </div>
                )}
            </div>
          </div>
          <div className="w-full h-full bg-white sm:max-h-[calc(100vh-390px)] overflow-auto p-4 shadow-md rounded-sm mt-5">
            <form onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}>
              <div className="w-full flex flex-col sm:grid grid-cols-2 gap-2 sm:gap-x-7 sm:gap-y-3 px-4 py-2">
                <Controller
                  name="assetNumber"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      label="Asset Number*"
                      className="w-full"
                      disabled
                      placeholder="ASN-XXXXX"
                      {...field}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="namaAsset"
                  control={control}
                  rules={{
                    required: "Nama Asset is required",
                  }}
                  render={({ field }) => (
                    <CInput
                      label="Nama Asset*"
                      disabled={mode === "view" || role === "user_admin"}
                      className="w-full"
                      placeholder="Enter nama asset"
                      {...field}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="kodePN"
                  control={control}
                  rules={{
                    required: "Kode PN is required",
                  }}
                  render={({ field }) => (
                    <CAutoComplete
                      label="Kode PN*"
                      className="w-full"
                      disabled={mode === "view" || role === "user_admin"}
                      options={kodePNOptions ?? []}
                      getOptionLabel={(option) => option.label ?? ""}
                      placeholder="Select role"
                      value={
                        kodePNOptions.find(
                          (opt) => opt.value === field.value
                        ) || null
                      }
                      onChange={(_, newValue) => {
                        field.onChange(newValue?.value || "");
                      }}
                    />
                  )}
                />
                <Controller
                  name="nilaiAsset"
                  control={control}
                  rules={{
                    required: "Nilai Asset is required",
                  }}
                  render={({ field }) => {
                    const formatCurrency = (value: string) => {
                      const numericValue = value.replace(/\D/g, "");
                      return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    };
                    const handleChange = (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      field.onChange(rawValue);
                    };
                    return (
                      <CInput
                        label="Nilai Asset*"
                        disabled={mode === "view" || role === "user_admin"}
                        className="w-full"
                        value={formatCurrency(field.value?.toString() || "")}
                        placeholder="Enter total project"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    );
                  }}
                />
                <Controller
                  name="quantityAsset"
                  control={control}
                  rules={{
                    required: "Quantity is required",
                  }}
                  render={({ field }) => (
                    <CInput
                      label="Quantity*"
                      disabled={mode === "view" || role === "user_admin"}
                      type="number"
                      className="w-full"
                      placeholder="Enter quantity asset"
                      {...field}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="actionPlan"
                  control={control}
                  rules={{
                    required: "Action plan is required",
                  }}
                  render={({ field }) => (
                    <CAutoComplete
                      label="Action Plan*"
                      className="w-full"
                      disabled={mode === "view" || role === "user_admin"}
                      options={actionPlan ?? []}
                      getOptionLabel={(option) => option.label ?? ""}
                      placeholder="Select role"
                      value={
                        actionPlan.find((opt) => opt.value === field.value) ||
                        null
                      }
                      onChange={(_, newValue) => {
                        field.onChange(newValue?.value || "");
                      }}
                    />
                  )}
                />
                <Controller
                  name="planRealisasi"
                  control={control}
                  rules={{
                    required: "Plan Realisasi is required",
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <CInputDate
                      label="Plan Realisasi*"
                      disabled={mode === "view" || role === "user_admin"}
                      type="date"
                      className="!w-full"
                      value={moment(value).format("YYYY-MM-DD")}
                      onChange={onChange}
                      inputRef={ref}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="areaKerja"
                  control={control}
                  rules={{
                    required: "Area Kerja is required",
                  }}
                  render={({ field }) => (
                    <CInput
                      label="Area Kerja*"
                      disabled={mode === "view" || role === "user_admin"}
                      className="w-full"
                      placeholder="Enter area kerja"
                      {...field}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="benefit"
                  control={control}
                  rules={{
                    required: "Benefit is required",
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <TextArea
                      label="Benefit*"
                      disabled={mode === "view" || role === "user_admin"}
                      className="!w-full"
                      placeholder="Enter benefit"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="remark"
                  control={control}
                  rules={{
                    required: "Remarks is required",
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <TextArea
                      label="Remarks*"
                      disabled={mode === "view" || role === "user_admin"}
                      className="!w-full"
                      placeholder="Enter remarks"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                      autoComplete="off"
                    />
                  )}
                />
              </div>

              <div className="mt-2 px-4">
                <div className="flex gap-2 w-full max-w-full justify-end">
                  <ButtonSubmit
                    type={"button"}
                    classname={
                      "w-[100px] max-w-full text-sm rounded-md bg-white hover:bg-gray-50 text-black border p-2"
                    }
                    btnText="Cancel"
                    onClick={handleCancel}
                  />
                  {mode !== "view" && role === "user" && (
                    <ButtonSubmit
                      type={"submit"}
                      classname={
                        "w-[100px] max-w-full rounded-md text-sm bg-[#154940] hover:bg-[#0e342d] text-white p-2"
                      }
                      btnText="Save"
                    />
                  )}
                </div>
              </div>
            </form>
          </div>

          {openModalFoto && <ModalUploader />}

          {dataAssetById?.progress?.length > 0 && (
            <div className="w-full p-5 bg-white shadow-md rounded-sm mt-5">
              <h1 className="py-4 text-lg font-bold">Progress Asset</h1>
              <div className="w-full h-[10vh] ">
                <DataGrid
                  domLayout="normal"
                  columnDefs={progressListColumnDef}
                  rowData={dataAssetById.progress}
                  pagination={false}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
