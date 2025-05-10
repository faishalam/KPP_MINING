import { ValueGetterParams } from "@ag-grid-community/core";

export type TMasterResponse = {
  totalItems: number | undefined;
  totalPages: number | undefined;
  currentPage: number | undefined;
  data: TInputsProgress[];
};

export type TInputsProgress = {
  assetNumber: string
  id?: string | null;
  dept: string;
  projectNumber: string;
  projectDescription: string;
  totalBudget: string;
  totalRecipt: string;
  totalPr: string;
  balance: string;
  bulanRealisasi: string | Date;
  remarks: string;
  progressCapex: string;
  posisiUnit: string;
  prOutstanding: string;
  poOutstanding: string;
  estimateTimeArrival: string;
} & { checked?: boolean };

export type TMasterProgressCol =
  | ColDef<TInputsProgress>
  | ColGroupDef<TInputsProgress>;
export type TMasterUserColParams = ValueGetterParams<TInputsProgress>;
