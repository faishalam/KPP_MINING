"use client";

import Link from "next/link";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
import { useMemo } from "react";
import { CAutoComplete, CInput } from "@/components/componentsV2/atoms";
import { Controller } from "react-hook-form";
import ButtonSubmit from "@/components/button/ButtonSubmit";
import useUserManagement from "../hooks";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";

export default function UserManagementAddPage() {
  const {
    handleSubmitRegister,
    controlRegister,
    departmentOptions,
    siteOptions,
    isLoadingAddUser,
    isLoadingUserById,
    rolesOptions,
    onValidSubmit,
    onInvalidSubmit,
    handleCancelUserManagement,
    isLoadingGetUserList,
    mode,
  } = useUserManagement();

  const title = useMemo(() => {
    if (mode === "view") return "View User";
    if (mode === "add") return "Add User";
    if (mode === "edit") return "Edit User";
  }, [mode]);

  return (
    <>
      {isLoadingGetUserList ? (
        <BlockingLoader />
      ) : (
        <div className="w-full h-full no-scrollbar">
          <div
            id="master-user-form-header"
            className="flex items-center gap-2 h-[50px]"
          >
            <Link
              href="/user-management"
              className="max-w-[40px] w-full bg-[#154940] hover:bg-[#0e342d] rounded flex justify-center items-center p-2"
            >
              <BackIcon className="text-white" />
            </Link>

            <div className="font-bold">{title}</div>
          </div>
          <div className="w-full h-full bg-white p-4 shadow-md rounded-sm mt-5">
            {isLoadingUserById || isLoadingAddUser ? (
              <BlockingLoader />
            ) : (
              <>
                <form
                  onSubmit={handleSubmitRegister(
                    onValidSubmit,
                    onInvalidSubmit
                  )}
                >
                  <div className="w-full flex flex-col gap-2 px-4 py-2">
                    <Controller
                      name="username"
                      control={controlRegister}
                      rules={{
                        required: "Username is required",
                        pattern: {
                          value: /^[A-Za-z0-9]+$/i,
                          message: "Username hanya boleh huruf dan angka",
                        },
                      }}
                      render={({ field }) => (
                        <CInput
                          label="Username*"
                          disabled={mode === "view"}
                          className="w-full"
                          placeholder="Enter username"
                          {...field}
                          autoComplete="off"
                        />
                      )}
                    />

                    <Controller
                      name="email"
                      control={controlRegister}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <CInput
                          label="Email*"
                          autoComplete="off"
                          disabled={mode === "view"}
                          className="w-full"
                          placeholder="Enter email"
                          {...field}
                        />
                      )}
                    />
                    {mode === "add" && (
                      <Controller
                        name="password"
                        control={controlRegister}
                        rules={{
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password minimal 8 karakter",
                          },
                        }}
                        render={({ field }) => (
                          <CInput
                            label="Password*"
                            autoComplete="off"
                            className="w-full"
                            placeholder="Enter password"
                            {...field}
                          />
                        )}
                      />
                    )}

                    <Controller
                      name="district"
                      control={controlRegister}
                      rules={{
                        required: "District is required",
                      }}
                      render={({ field }) => (
                        <CInput
                          label="District*"
                          disabled={mode === "view"}
                          autoComplete="off"
                          className="w-full"
                          placeholder="Enter password"
                          {...field}
                        />
                      )}
                    />

                    <Controller
                      name="role"
                      control={controlRegister}
                      rules={{
                        required: "Role is required",
                      }}
                      render={({ field }) => (
                        <CAutoComplete
                          label="Role*"
                          className="w-full"
                          disabled={mode === "view"}
                          options={rolesOptions ?? []}
                          getOptionLabel={(option) => option.label ?? ""}
                          placeholder="Select role"
                          value={
                            rolesOptions.find(
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
                      name="department"
                      control={controlRegister}
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
                      name="site"
                      control={controlRegister}
                      rules={{
                        required: "Site is required",
                      }}
                      render={({ field }) => (
                        <CAutoComplete
                          label="Site*"
                          className="w-full"
                          options={siteOptions ?? []}
                          disabled={mode === "view"}
                          getOptionLabel={(option) => option.label ?? ""}
                          placeholder="Select site"
                          value={
                            siteOptions.find(
                              (opt) => opt.value === field.value
                            ) || null
                          }
                          onChange={(_, newValue) => {
                            field.onChange(newValue?.value || "");
                          }}
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
                        onClick={handleCancelUserManagement}
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
