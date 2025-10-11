import React, { Dispatch, forwardRef, SetStateAction, useState } from 'react'
import { Input } from '../ui/input'
import { X } from 'lucide-react'

type TagInputProps = {
  value: string[],
  handleOnChange: Dispatch<SetStateAction<string[]>>
}

const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, handleOnChange, ...prop }, ref) => {
    const [tagData, settagData] = useState("")

    const addNewtag = () => {
      if (tagData) {
        const newTagData = new Set([...value, tagData])
        handleOnChange(Array.from(newTagData))
        settagData("")
      }
    }

    return (
      <div>
        <div>
          <Input
            ref={ref}
            placeholder='Enter to save'
            value={tagData}
            {...prop}
            onChange={(e) => settagData(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addNewtag()
              }
            }}
          />
        </div>

        <div className='flex gap-2 flex-wrap mt-4'>
          {value.map((v, i) => (
            <div
              key={v}
              className='px-2 py-1 rounded border text-sm border-gray-500 w-fit flex gap-1'
            >
              <span>{v}</span>
              <X
                className='cursor-pointer text-gray-500'
                size={20}
                onClick={() =>
                  handleOnChange(value.filter((_, index) => index !== i))
                }
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
)

TagInput.displayName = "TagInput"

export default TagInput
