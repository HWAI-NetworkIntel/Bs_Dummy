import { useDispatch, useSelector } from 'react-redux'
import { CloseIcon, DuplicateIcon } from '../../../../../../common/images/icons'
import React from 'react'
import { setBouncePropagation } from '../../../../reducer/scenarioSlice'
const DuplicateScenarioTitle = ({ setModalOpen }) => {
  const { bouncePropagation } = useSelector(({ scenarios }) => scenarios)
  const dispatch = useDispatch()
  return (
    <div className="w-full flex justify-between items-center border-b pb-[8px] border-[#E9E8E8]">
      <div className="flex gap-x-1 items-center">
        <DuplicateIcon className="pb-2" />
        <p className="text-[#5C5C5C] text-[16px] tracking-[0.8px] font-bold">Duplicate Scenario</p>
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(setBouncePropagation(bouncePropagation + 1))
          setModalOpen(false)
        }}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default React.memo(DuplicateScenarioTitle)
