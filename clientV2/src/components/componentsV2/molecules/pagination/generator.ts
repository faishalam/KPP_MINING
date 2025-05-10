type PaginationItem = {
  selected: boolean
  selectable: boolean
  page: number | null
}

const generatePagination = (currentPage: number, totalPage: number): PaginationItem[] => {
  const pagination: PaginationItem[] = []
  const maxVisiblePages = 5

  if (totalPage <= maxVisiblePages + 1) {
    for (let i = 1; i <= totalPage; i++) {
      pagination.push({
        selected: i === currentPage,
        selectable: true,
        page: i,
      })
    }
  } else {
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPage - 1, currentPage + 1)

    pagination.push({
      selected: currentPage === 1,
      selectable: true,
      page: 1,
    })

    if (startPage > 2) {
      pagination.push({
        selected: false,
        selectable: false,
        page: null,
      })
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push({
        selected: i === currentPage,
        selectable: true,
        page: i,
      })
    }

    if (endPage < totalPage - 1) {
      pagination.push({
        selected: false,
        selectable: false,
        page: null,
      })
    }

    pagination.push({
      selected: currentPage === totalPage,
      selectable: true,
      page: totalPage,
    })
  }

  return pagination
}
export default generatePagination
