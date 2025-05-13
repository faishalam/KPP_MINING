import { TSerializableFile } from "@/components/componentsV2/atoms/input-file/image";
import { ValueGetterParams } from "@ag-grid-community/core";

export type InputsSearch = {
  search: string;
};

export type FotoAssetFormData = {
  fotoAsset: TSerializableFile;
  fotoTandaTerima: TSerializableFile;
};

export interface TypeDataAssetList {
  id?: string | null;
  no: number;
  assetNumber: string;
  index: number;
  id: number;
  site: string;
  namaAsset: string;
  kodePN: string;
  nilaiAsset: number;
  quantityAsset: number;
  totalNilaiAsset: number;
  actionPlan: string;
  userDept: string;
  depresiasi: number;
  remark: string;
  areaKerja: string;
  benefit: string;
  planRealisasi: string | Date;
  realisasiAsset: string;
  statusApproval: string;
  statusRealisasi: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  keterangan: string;
  poReciept: number;
  fotoTandaTerima: TSerializableFile;
  fotoAsset: TSerializableFile;
  User: {
    username: string;
  };
}

export interface AssetResponse {
  totalItems: number | undefined;
  totalPages: number | undefined;
  currentPage: number | undefined;
  data: TypeDataAssetList[];
}

export interface AssetFormInputs {
  assetNumber: string;
  namaAsset: string;
  kodePN: string;
  nilaiAsset: number;
  quantityAsset: number;
  actionPlan: string;
  remark: string;
  areaKerja: string;
  benefit: string;
  planRealisasi: string | Date;
  poReciept: number;
  fotoAsset: TSerializableFile;
  fotoTandaTerima: TSerializableFile;
}

export type TAssetListCol =
  | ColDef<AssetFormInputs>
  | ColGroupDef<AssetFormInputs>;
export type TAssetListParams = ValueGetterParams<AssetFormInputs>;

// interface HomeContextProps {
//   dataAssetList?: AssetResponse;
//   isLoadingDataAssetList: boolean;
//   register: UseFormReturn<InputsSearch>["register"];
//   handleSubmit: UseFormReturn<InputsSearch>["handleSubmit"];
//   setSearchAsset: React.Dispatch<React.SetStateAction<string>>;
//   searchAsset: string | undefined;
//   onSubmit: (data: InputsSearch) => void;
//   pagination: { page: number; limit: number };
//   setPagination: React.Dispatch<
//     React.SetStateAction<{ page: number; limit: number }>
//   >;
//   isFetchingDataAssetList: boolean;
// }

// interface HomeProviderContext {
//   children: ReactNode;
// }
