import LeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import RightIcon from '@mui/icons-material/KeyboardArrowRight'
import { IconButton } from '@mui/material'
import generatePagination from './generator'
import DropdownButton from '../../atoms/dropdown-button'
export type TPaginationProps = {
  limit: number
  page: number
  total: number
  totalPage: number
  onChangePage: (page: number) => void
  onChangeLimit: (limit: number) => void
}

const V2CPagination: React.FC<TPaginationProps> = ({
  limit,
  page,
  total,
  totalPage,
  onChangeLimit,
  onChangePage,
}) => {
  const from = page === 1 ? 1 : 1 + (page - 1) * limit
  const to = page * limit > total ? total : page * limit
  const arrayPageRender = generatePagination(page, totalPage)
  return (
    <div className="flex justify-between items-center px-2 py-1">
      <div className="flex items-center gap-2">
        <DropdownButton
          className="!text-black"
          menuItems={[10, 20, 30].map(item => (
            <div
              key={Math.random()}
              onClick={() => onChangeLimit(item)}
              className="flex items-center w-[200px]"
            >
              <span className="ml-2">{item}</span>
            </div>
          ))}
        >
          {limit} Entries
        </DropdownButton>
        <small>
          Showing {from} to {to} of {total} results
        </small>
      </div>
      <div className="flex items-center border border-solid border-[#d1d5db] rounded-md">
        <div className="flex items-center">
          <IconButton disabled={page === 1} onClick={() => onChangePage(page - 1)}>
            <LeftIcon />
          </IconButton>
        </div>
        {arrayPageRender.map((item, index) => {
          if (item.selectable) {
            return (
              <button
                key={index}
                onClick={() => onChangePage(item.page || 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  item.page === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {item.page}
              </button>
            )
          } else {
            return (
              <div key={index} className="mx-1 px-3 py-1 bg-gray-200 text-gray-700 rounded">
                {'...'}
              </div>
            )
          }
        })}
        <div className="flex items-center">
          <IconButton disabled={page * limit >= total} onClick={() => onChangePage(page + 1)}>
            <RightIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
export default V2CPagination
