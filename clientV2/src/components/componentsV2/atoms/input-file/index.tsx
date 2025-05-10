import { Button, TextField } from '@mui/material'
import { toast } from 'react-toastify'

type TProps = {
  onChange?: (files: File) => void
  id: string
  value?: string
  className?: string
  label?: string
  maxSize: number
  onError?: string
  disabled?: boolean
  accept?: string
  required?: string
}

const CInputFile: React.FC<TProps> = props => {
  return (
    <div>
       {typeof props?.label === 'string' ? (
        <small>
          <label htmlFor={props?.id}>
            {props?.label.replace(/\*$/, '')}
            {(props?.required || props?.label.endsWith('*')) && <span style={{ color: 'red' }}>*</span>}
          </label>
        </small>
      ) : (
        <small>
          <label htmlFor={props?.id}>{props?.label}</label>
        </small>
      )}
      <input
        type="file"
        className="!hidden"
        id={props.id}
        accept={props?.accept || '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.ppt,.pptx'}
        multiple
        onChange={e => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (props.onChange) {
              if (file.size <= props.maxSize) {
                if (props.onChange) {
                  props.onChange(file)
                }
              } else {
                toast.error(props.onError)
              }
            }
          }
        }}
      />
      <TextField
        className={'w-full ' + props.className}
        disabled
        value={props.value}
        slotProps={{
          input: {
            endAdornment: !props.disabled && (
              <Button
                variant="contained"
                color="inherit"
                disabled={props.disabled}
                className="!text-black !px-6 !border-none !rounded-r-none"
                onClick={() => {
                  const input = document.getElementById(props.id)
                  if (input) {
                    input.click()
                  }
                }}
              >
                Browse
              </Button>
            ),
          },
        }}
        sx={{
          width: '100%',
          '& .MuiInputBase-root': { height: '38px', padding: '0px' },
        }}
      />
    </div>
  )
}
export default CInputFile
