"use client";
import { useMemo } from "react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
import { CAutoComplete, CInput } from "@/components/componentsV2/atoms";
import CInputDate from "@/components/componentsV2/atoms/input-date";
import { TextArea } from "@/components/componentsV2/atoms/Input-text-area";
import ButtonSubmit from "@/components/button/ButtonSubmit";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";
import moment from "moment";
import useProgressAssetManagement from "../hooks";

export default function ProgressAssetPage() {
  const {
    handleSubmitProgress,
    controlProgress,
    isLoadingAddProgress,
    isLoadingProgressById,
    isLoadingMutateEdit,
    isLoadingProgressList,
    departmentOptions,
    onValidSubmit,
    onInvalidSubmit,
    handleCancelProgress,
    mode,
  } = useProgressAssetManagement();

  const title = useMemo(() => {
    if (mode === "view") return "View Capex";
    if (mode === "add") return "Add Capex";
    if (mode === "edit") return "Edit Capex";
  }, [mode]);
  return (
    <>
      {(isLoadingProgressById || isLoadingProgressList || isLoadingMutateEdit || isLoadingAddProgress)  ? (
        <BlockingLoader />
      ) : (
        <div className="w-full h-full no-scrollbar">
          <div
            id="master-user-form-header"
            className="flex items-center gap-2 h-[50px]"
          >
            <Link
              href="/progress-management/incoming"
              className="max-w-[40px] w-full bg-[#154940] hover:bg-[#0e342d] rounded flex justify-center items-center p-2"
            >
              <BackIcon className="text-white" />
            </Link>

            <div className="font-bold">{title}</div>
          </div>
          {(isLoadingAddProgress || isLoadingMutateEdit) && <BlockingLoader />}
          <div className="w-full h-full bg-white p-4 shadow-md rounded-md mt-5">
            <form
              onSubmit={handleSubmitProgress(onValidSubmit, onInvalidSubmit)}
            >
              <div className="w-full px-4 py-2 grid grid-cols-2 gap-x-7 gap-y-3">
                <Controller
                  name="projectDescription"
                  control={controlProgress}
                  rules={{
                    required: "Project Description is required",
                  }}
                  render={({ field }) => (
                    <CInput
                      label="Nama Asset*"
                      disabled
                      className="w-full"
                      placeholder="Enter project description"
                      {...field}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="assetNumber"
                  control={controlProgress}
                  rules={{
                    required: "Project Description is required",
                  }}
                  render={({ field }) => (
                    <CInput
                      label="Asset Number*"
                      disabled
                      className="w-full"
                      placeholder="Enter project description"
                      {...field}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="dept"
                  control={controlProgress}
                  rules={{
                    required: "Department is required",
                  }}
                  render={({ field }) => (
                    <CAutoComplete
                      label="Department*"
                      className="w-full"
                      options={departmentOptions ?? []}
                      disabled={mode === "view"}
                      getOptionLabel={(option) => option.label ?? ""}
                      placeholder="Select department"
                      value={
                        departmentOptions.find(
                          (opt: { label: string; value: string }) =>
                            opt.value === field.value
                        ) || null
                      }
                      onChange={(_, newValue) => {
                        field.onChange(newValue?.value || "");
                      }}
                    />
                  )}
                />
                <Controller
                  name="projectNumber"
                  control={controlProgress}
                  rules={{
                    required: "Project Number is required",
                  }}
                  render={({ field }) => (
                    <CInput
                      label="Project Number*"
                      disabled={mode === "view"}
                      className="w-full"
                      placeholder="Enter project number"
                      {...field}
                      autoComplete="off"
                    />
                  )}
                />

                <Controller
                  name="totalBudget"
                  control={controlProgress}
                  rules={{
                    required: "Total Budget is required",
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
                        label="Total Budget*"
                        disabled={mode === "view"}
                        className="w-full"
                        value={formatCurrency(field.value || "")}
                        placeholder="Enter total project"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    );
                  }}
                />
                <Controller
                  name="totalRecipt"
                  control={controlProgress}
                  rules={{
                    required: "Total PO Recipt is required",
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
                        label="Total PO Recipt*"
                        type="text"
                        disabled={mode === "view"}
                        className="w-full"
                        placeholder="Enter total po recipt"
                        value={formatCurrency(field.value || "")}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    );
                  }}
                />

                <Controller
                  name="totalPr"
                  control={controlProgress}
                  rules={{
                    required: "Total PO/PR is required",
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
                        label="Total PO/PR*"
                        disabled={mode === "view"}
                        className="w-full"
                        placeholder="Enter total po/pr"
                        autoComplete="off"
                        value={formatCurrency(field.value || "")}
                        onChange={handleChange}
                      />
                    );
                  }}
                />
                 <Controller
                  name="poOutstanding"
                  control={controlProgress}
                  rules={{
                    required: "PO outstanding is required",
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
                        label="PO Outstanding*"
                        disabled={mode === "view"}
                        className="w-full"
                        placeholder="Enter po outstanding"
                        autoComplete="off"
                        value={formatCurrency(field.value || "")}
                        onChange={handleChange}
                      />
                    );
                  }}
                />
                 <Controller
                  name="prOutstanding"
                  control={controlProgress}
                  rules={{
                    required: "Total PR outstanding is required",
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
                        label="PR Outstanding*"
                        disabled={mode === "view"}
                        className="w-full"
                        placeholder="Enter pr outstanding"
                        autoComplete="off"
                        value={formatCurrency(field.value || "")}
                        onChange={handleChange}
                      />
                    );
                  }}
                />
                <Controller
                  name="balance"
                  control={controlProgress}
                  rules={{
                    required: "Total End Balance is required",
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
                        label="Total End Balance*"
                        disabled={mode === "view"}
                        className="w-full"
                        placeholder="Enter total end balance"
                        value={formatCurrency(field.value || "")}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    );
                  }}
                />
                <Controller
                  name="bulanRealisasi"
                  control={controlProgress}
                  rules={{
                    required: "Bulan Realisasi is required",
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <CInputDate
                      label="Bulan Realisasi*"
                      disabled={mode === "view"}
                      className="!w-full"
                      placeholder="Enter bulan realisasi"
                      value={moment(value).format("YYYY-MM-DD")}
                      onChange={onChange}
                      inputRef={ref}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="progressCapex"
                  control={controlProgress}
                  rules={{
                    required: "Progress Capex is required",
                  }}
                  render={({ field }) => (
                    <CInput
                      label="Progress Capex*"
                      disabled={mode === "view"}
                      className="w-full"
                      placeholder="Enter progress capex"
                      {...field}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="posisiUnit"
                  control={controlProgress}
                  rules={{
                    required: "Posisi Unit is required",
                  }}
                  render={({ field }) => (
                    <CInput
                      label="Posisi Unit*"
                      disabled={mode === "view"}
                      className="w-full"
                      placeholder="Enter posisi unit"
                      {...field}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="remarks"
                  control={controlProgress}
                  rules={{
                    required: "Remarks is required",
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <TextArea
                      label="Remarks*"
                      disabled={mode === "view"}
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

              <div className="mt-10 px-4">
                <div className="flex gap-2 w-full max-w-full justify-end">
                  <ButtonSubmit
                    type={"button"}
                    classname={
                      "w-[100px] max-w-full text-sm rounded-md bg-white hover:bg-gray-50 text-black border p-2"
                    }
                    btnText="Cancel"
                    onClick={handleCancelProgress}
                  />
                  {mode !== "view" && (
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
        </div>
      )}
    </>
  );
}
