"use client";
import React from "react";
import Image from "next/image";
import IconUploadImage from "@/assets/svg/icon-upload-image.svg";
import { toast } from "react-toastify";
import IconTrash from "@/assets/svg/delete-icon.svg";
import { serializeFile } from "@/helper/serializeFile";

export type TSerializableFile = {
  id: string;
  base64: string;
  filename: string;
  filetype: string;
  filesize: number;
  url?: string;
};
export type IStringDate = string;

type TProps = {
  id: string;
  file: TSerializableFile | null;
  label?: string;
  description?: string;
  onChange: (file: TSerializableFile | null) => void;
  className?: string;
  maxSize?: number;
  onError?: string;
  disabled?: boolean;
  required?: boolean;
};
const CInputImage: React.FC<TProps> = ({
  id,
  file,
  label,
  description,
  onChange,
  className,
  maxSize = 1024 * 1024 * 5,
  onError,
  disabled,
  required,
}) => {
  return (
    <div className={className}>
      {typeof label === "string" ? (
        <small>
          <label htmlFor={id}>
            {label.replace(/\*$/, "")}
            {(required || label.endsWith("*")) && (
              <span style={{ color: "red" }}>*</span>
            )}
          </label>
        </small>
      ) : (
        <small>
          <label htmlFor={id}>{label}</label>
        </small>
      )}
      <div className="flex gap-2">
        <input
          type="file"
          className="!hidden"
          id={id}
          accept="image/*"
          multiple
          onChange={async (e) => {
            if (e.target.files && e.target.files.length > 0) {
              const file = e.target.files[0];
              if (file.size <= maxSize) {
                const serializedFile = await serializeFile(file);
                onChange(serializedFile);
              } else {
                toast.error(onError || "File size is too large");
              }
            }
          }}
        />
        {file ? (
          <div className="relative !w-[102px] h-[102px]">
            <Image
              src={file?.base64 || ""}
              alt={file?.filename || "image"}
              width={102}
              height={102}
              className="!w-[102px] !h-[102px] object-cover"
            />
            {!disabled && (
              <div className="absolute bottom-0 right-0 p-1 cursor-pointer">
                <Image
                  onClick={() => onChange(null)}
                  src={IconTrash}
                  alt="delete"
                />
              </div>
            )}
          </div>
        ) : (
          <Image
            className="cursor-pointer"
            src={IconUploadImage}
            alt="upload image"
            width={102}
            height={102}
            onClick={() => {
              if (!disabled) {
                document.getElementById(id)?.click();
              }
            }}
          />
        )}
        <small className="w-[calc(100%-110px)] text-gray-500">{description}</small>
      </div>
    </div>
  );
};
export default CInputImage;
