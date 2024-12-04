import React, { useState } from 'react'
import { ArrowDown, ArrowUp } from '../../../../common/images/icons'

const BidIdDropDown = ({ data }) => {
  const [showBidIds, setShowBidIds] = useState(false)

  const tranformeddata = Object.entries(data).map(([key, value]) => ({
    bidId: key,
    ...value,
  }))
  return (
    <div>
      {showBidIds &&
        tranformeddata?.map((key, i) => (
          <div
            key={i}
            className={`w-full flex text-[13px] font-normal tracking-[0.55px] text-[#7D7D7D] item-center gap-x-2 h-[36px] ${
              i === 0 || i % 2 === 0 ? 'bg-[#F2F2F2]' : 'bg-white'
            }`}
          >
            <div style={{ flex: '1 1 36%' }}></div>
            <div style={{ flex: '1 1 0.5%' }}></div>

            <div className="flex items-center" style={{ flex: '1 1 8.8%' }}>
              {key.bidId}
            </div>
            <div className="text-end flex items-center justify-end gap-x-3" style={{ flex: '1 1 7.6%' }}>
              {key.preAEPEnrollment && key.preAEPEnrollment.toLocaleString('en-US')}
            </div>
            <div className="text-end flex items-center justify-end " style={{ flex: '1 1 9.7%' }}>
              {key.postAEPEnrollment && key.postAEPEnrollment.toLocaleString('en-US')}
            </div>
            <div className="text-end flex items-center justify-end" style={{ flex: '1 1 11.2%' }}>
              {key.simulatedResult && key.simulatedResult.toLocaleString('en-US')}
            </div>
            <div
              className="text-end flex items-center justify-end"
              style={{
                flex: '1 1 13.2%',
                color: key?.simulatedChangeFromPostAEP < 0 ? '#DC3545' : key?.simulatedChangeFromPostAEP > 0 ? '#28A745' : '#DC3545',
              }}
            >
              {key.simulatedChangeFromPostAEP && key.simulatedChangeFromPostAEP.toLocaleString('en-US')}
            </div>
            <div style={{ flex: '1 1 13%' }}></div>
          </div>
        ))}
      <button
        type="button"
        onClick={() => {
          setShowBidIds(!showBidIds)
        }}
        className="w-full flex gap-x-1 tracking-[0.6px] items-center border-b-0 border-r-0 border-l-0 text-[#7D528B] font-semibold text-xs justify-center pr-[76px]"
      >
        <div className="flex w-[400px]">
          {showBidIds ? (
            tranformeddata?.length > 1 ? (
              <div className="flex pl-[67px]">
                <div className="text-[#7D7D7D] text-[13px] font-normal tracking-[0.65px] pr-3 w-[116px]"></div>
                <div className="pl-3 w-[90px] flex items-center">Hide All</div>
              </div>
            ) : (
              <div className="flex justify-end items-center pl-[67px]">
                <div className="text-[#7D7D7D] text-[13px] font-normal tracking-[0.65px] pr-3 w-[116px]"></div>
                <div className="pl-3 w-[90px] flex items-center">Hide Bid Id</div>
              </div>
            )
          ) : tranformeddata?.length > 1 ? (
            <div className="flex justify-end items-center pl-[67px]">
              <div className="text-[#7D7D7D] text-[13px] font-normal tracking-[0.65px] pr-3 w-[116px]">
                +{tranformeddata.length} Other Plans
              </div>
              <div className="border-l pl-3 w-[90px] flex items-center">Show All</div>
            </div>
          ) : (
            <div className="flex justify-end items-center pl-[67px]">
              <div className="text-[#7D7D7D] text-[13px] font-normal tracking-[0.65px] pr-3 w-[116px]">
                +{tranformeddata.length} Other Plan
              </div>
              <div className="border-l pl-3 w-[90px] flex items-center">Show Bid Id</div>
            </div>
          )}
          <div>{showBidIds ? <ArrowUp /> : <ArrowDown />}</div>
        </div>
      </button>
    </div>
  )
}

export default React.memo(BidIdDropDown)
