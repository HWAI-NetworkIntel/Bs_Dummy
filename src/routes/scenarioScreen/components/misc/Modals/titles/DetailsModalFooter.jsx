import { DownloadIcon } from '../../../../../../common/images/icons'
import { downloadExcelFileFromSingleDetailss } from '../../../../utils/detailsDownload'
import React from 'react'

const DetailsModalFooter = ({ handleCancel, data, scenarioId }) => {
  return (
    <div className="flex justify-end h-[36px] mt-[8px]" style={{ gap: '10px' }}>
      <button
        className="text-[14px] font-normal leading-[20px] tracking-[0.7px] text-[#5C276E] border border-[#DDDDDC]"
        style={{ padding: '8px 16px', borderRadius: '4px' }}
        onClick={handleCancel}
      >
        Dismiss
      </button>
      <button
        className="text-[14px] font-normal w-[112px] flex justify-center items-center gap-x-1 rounded leading-[20px] tracking-[0.7px] text-[#FFF] border border-[#DDDDDC] bg-[#5C276E]"
        onClick={function (e) {
          downloadExcelFileFromSingleDetailss(data, scenarioId)
        }}
      >
        <DownloadIcon />
        <p className="pt-[1px]">Download</p>
      </button>
    </div>
  )
}

export default React.memo(DetailsModalFooter)
