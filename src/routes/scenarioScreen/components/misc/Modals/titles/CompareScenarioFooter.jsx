import { DownloadIcon } from '../../../../../../common/images/icons'
import React from 'react'
import { downloadExcelFileForCompare } from '../../../../utils/compareDownload'
const CompareScenarioFooter = ({ handleCancel, data }) => {
  return (
    <div className="flex justify-end mt-3" style={{ gap: '10px' }}>
      <button
        className="text-[14px] font-normal h-[36px] leading-[20px] tracking-[0.7px] text-[#5C276E] border border-[#DDDDDC]"
        style={{ padding: '8px 16px', borderRadius: '4px' }}
        onClick={handleCancel}
      >
        Dismiss
      </button>
      <button
        onClick={() => downloadExcelFileForCompare(data)}
        className="text-[14px] font-normal h-[36px] w-[112px] flex justify-center items-center gap-x-1 rounded leading-[20px] tracking-[0.7px] text-[#FFF] border border-[#DDDDDC] bg-[#5C276E]"
      >
        <DownloadIcon />
        <p className="pt-[1px]">Download</p>
      </button>
    </div>
  )
}
export default React.memo(CompareScenarioFooter)
