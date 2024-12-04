import { CloseIcon, CompareModalicon } from '../../../../../../common/images/icons'
import React from 'react'
const CompareScenarioTitle = ({ setOpenModal }) => {
  return (
    <div className="w-full flex justify-between pb-2 items-center border-[#E9E8E8]">
      <div className="flex gap-x-1 items-center">
        <CompareModalicon className="pb-2" />
        <p className="text-[#5C5C5C] text-[16px] tracking-[0.8px] font-bold">Scenario Comparison</p>
      </div>
      <button
        type="button"
        onClick={() => {
          setOpenModal(false)
        }}
      >
        <CloseIcon />
      </button>
    </div>
  )
}
export default React.memo(CompareScenarioTitle)
