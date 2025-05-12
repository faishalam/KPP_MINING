export interface AssetFormInputs {
  namaAsset: string;
  kodePN: string;
  nilaiAsset: number;
  quantityAsset: number;
  actionPlan: string;
  remark: string;
  areaKerja: string;
  benefit: string;
  planRealisasi: string;
}

export interface TMasterUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  district: string;
  department: string;
  site: string;
  createdAt: string;
  updatedAt: string;
}
