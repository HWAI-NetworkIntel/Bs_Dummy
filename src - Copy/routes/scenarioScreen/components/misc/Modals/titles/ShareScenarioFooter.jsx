import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBouncePropagation } from '../../../../reducer/scenarioSlice'

const ShareScenarioFooter = ({ setModalOpen, shareMail, selectedData }) => {
  const { bouncePropagation } = useSelector(({ scenarios }) => scenarios)
  const dispatch = useDispatch()
  return (
    <div className="flex justify-center items-end gap-[8px] self-stretch pt-[8px]">
      <button
        className="bg-[#FFF] border border-[#DDDDDC] text-[14px] h-[36px] font-normal tracking-[0.8px] leading-[20px] text-[#5C276E]"
        style={{ padding: '8px 24px', borderRadius: '4px' }}
        onClick={() => {
          dispatch(setBouncePropagation(bouncePropagation + 1))
          setModalOpen(false)
        }}
      >
        Cancel
      </button>
      <button
        className="bg-[#5C276E] border border-[#DDDDDC] text-[14px] h-[36px] font-normal tracking-[0.8px] leading-[20px] text-[#FFF]"
        style={{ padding: '8px 24px', borderRadius: '4px' }}
        type="button"
        onClick={shareMail}
        disabled={selectedData?.length < 1}
      >
        Share
      </button>
    </div>
  )
}

export default React.memo(ShareScenarioFooter)
