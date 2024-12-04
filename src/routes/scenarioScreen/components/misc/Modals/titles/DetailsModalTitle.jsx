import { CloseIcon, Infoicon } from '../../../../../../common/images/icons'
import React from 'react'
const DetailsModalTitle = ({ setOpenDetails }) => {
  return (
    <div className="w-full flex justify-between pb-2 items-center border-[#E9E8E8]">
      <div className="flex gap-x-1 items-center">
        <Infoicon />
        <p className="text-[#5C5C5C] text-[16px] tracking-[0.8px] mb-[2.5px] font-bold h-[24px]">Scenario Details</p>
      </div>
      <button
        type="button"
        onClick={() => {
          setOpenDetails(false)
        }}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default React.memo(DetailsModalTitle)
