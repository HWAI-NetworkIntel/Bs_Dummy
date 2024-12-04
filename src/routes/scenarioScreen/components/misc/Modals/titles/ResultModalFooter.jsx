import { useDispatch, useSelector } from 'react-redux'
import { DownloadIcon } from '../../../../../../common/images/icons'
import { setBouncePropagation } from '../../../../reducer/scenarioSlice'
import { downloadSimulationExcelFile } from '../../../../utils/simulationResultDownload'
import React from 'react'
const ResultModalFooter = ({ setOpenResult, setCard, card, data, scenarioId }) => {
  const { bouncePropagation } = useSelector(({ scenarios }) => scenarios)
  const dispatch = useDispatch()
  return (
    <div className="flex justify-end h-[36px] mt-[8px]" style={{ gap: '10px' }}>
      <button
        className="bg-[#5C276E] w-[120px] gap-x-1 flex justify-center items-center border border-[#DDDDDC] rounded text-[14px] font-normal tracking-[0.8px] leading-[20px] text-[#FFF]"
        onClick={() => {
          downloadSimulationExcelFile(data, scenarioId)
        }}
      >
        <DownloadIcon />
        <p className="pt-[1px]">Download</p>
      </button>

      <button
        className="text-[14px] font-[600] leading-[20px] tracking-[0.7px] text-[#5C276E] border border-[#DDDDDC]"
        style={{ padding: '8px 16px', borderRadius: '4px' }}
        onClick={() => {
          dispatch(setBouncePropagation(bouncePropagation + 1))
          setOpenResult(false)
        }}
      >
        Ok
      </button>
    </div>
  )
}
export default React.memo(ResultModalFooter)
