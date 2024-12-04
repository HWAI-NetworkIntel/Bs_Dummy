import { useDispatch, useSelector } from 'react-redux'
import { CloseIcon, ShareIcon } from '../../../../../../common/images/icons'
import React from 'react'
import { setBouncePropagation } from '../../../../reducer/scenarioSlice'
const ShareScenarioTitle = ({ setModalOpen }) => {
  const { bouncePropagation } = useSelector(({ scenarios }) => scenarios)
  const dispatch = useDispatch()
  return (
    <div className="w-full flex justify-between pb-[8px] items-center border-[#E9E8E8]">
      <div className="flex gap-x-1 items-center">
        <ShareIcon className="pb-2" />
        <p className="text-[#5C5C5C] text-[16px] tracking-[0.8px] font-bold">Share Scenario</p>
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

export default React.memo(ShareScenarioTitle)
