import { CloseIcon, ResultIcon } from '../../../../../../common/images/icons'
import React from 'react'
import { setBouncePropagation } from '../../../../reducer/scenarioSlice'
import { useDispatch, useSelector } from 'react-redux'
const ResultModalTitle = ({ setOpenResult }) => {
  const { bouncePropagation } = useSelector(({ scenarios }) => scenarios)
  const dispatch = useDispatch()
  return (
    <div className="w-full flex justify-between pb-2 items-center border-[#E9E8E8] border-b">
      <div className="flex gap-x-1 items-center">
        <ResultIcon className="pb-2" />
        <p className="text-[#5C5C5C] text-[16px] tracking-[0.8px] font-bold">Simulation Result</p>
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(setBouncePropagation(bouncePropagation + 1))
          setOpenResult(false)
        }}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default React.memo(ResultModalTitle)
