type TPagination = {
  limit: number
  page: number
}

export type TPaginationProps = {
  pagination: TPagination
  setPagination: React.Dispatch<React.SetStateAction<TPagination>>
  currentPage?: number
  totalPages?: number
  totalItems?: number
}
