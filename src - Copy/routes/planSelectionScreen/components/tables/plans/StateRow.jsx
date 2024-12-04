import React, { useState } from 'react'
import CountyRow from './CountyRow'
import { ArrowDown, ArrowUp } from '../../../../../common/images/icons'
import { getDifferenceAsString, isDifferencePositive } from '../../../utils/planSelection'

const StateRow = ({ dataKey, data }) => {
  const [statesForWhichCountiesShouldBeVisible, setStatesForWhichCountiesShouldBeVisible] = useState([])
  return (
    <div>
      <div
        className={`w-full flex item-center py-2 gap-x-2 justify-between px-3 border border-t-[#E9E8E8] border-b-0 border-l-0 border-r-0`}
      >
        <div
          style={{ flex: '1 1 39%' }}
          className="flex items-center text-ellipsis whitespace-nowrap overflow-hidden gap-x-2 text-[13px] text-[#333]"
        ></div>
        <div
          style={{ flex: '1 1 15%' }}
          className="flex items-center text-ellipsis whitespace-nowrap overflow-hidden gap-x-2 text-[13px] text-[#333]"
        >
          <button
            type="button"
            onClick={() => {
              if (statesForWhichCountiesShouldBeVisible?.includes(dataKey)) {
                setStatesForWhichCountiesShouldBeVisible(statesForWhichCountiesShouldBeVisible?.filter((str) => str !== dataKey))
              } else {
                setStatesForWhichCountiesShouldBeVisible([...statesForWhichCountiesShouldBeVisible, dataKey])
              }
            }}
            className="flex flex-col w-[124px] items-start justify-center"
          >
            <div className="flex gap-x-1 items-center">
              <div>{statesForWhichCountiesShouldBeVisible?.includes(dataKey) ? <ArrowUp /> : <ArrowDown />}</div>
              <div>{data[dataKey]?.state}</div>
            </div>
            <div className="flex">
              <div className="w-6"></div>
              <p className="text-[#17A2B8] text-[13px]">
                {' '}
                {data[dataKey]?.countyData?.length} {data[dataKey]?.countyData?.length > 1 ? 'Counties' : 'County'}{' '}
              </p>
            </div>
          </button>
        </div>
        <div style={{ flex: '1 1 20%' }} className="text-end flex justify-end text-[13px] text-[#333] pr-1">
          {new Intl.NumberFormat('ja-JP').format(data[dataKey]?.totalPreAEPEnrollment)}
        </div>
        <div style={{ flex: '1 1 20%' }} className="flex flex-col items-end justify-center text-[13px] text-[#333] pr-1">
          <p>{new Intl.NumberFormat('ja-JP').format(data[dataKey]?.totalPostAEPEnrollment)} </p>
          <p
            className={`${
              isDifferencePositive(data[dataKey]?.totalPostAEPEnrollment, data[dataKey]?.totalPreAEPEnrollment)
                ? 'text-[#28A745]'
                : 'text-red-500'
            }`}
          >
            {new Intl.NumberFormat('ja-JP').format(
              getDifferenceAsString(data[dataKey]?.totalPostAEPEnrollment, data[dataKey]?.totalPreAEPEnrollment)
            )}
          </p>
        </div>
      </div>
      {statesForWhichCountiesShouldBeVisible?.includes(dataKey) &&
        data[dataKey]?.countyData?.map((county, i) => <CountyRow county={county} i={i} key={i} />)}
    </div>
  )
}
export default React.memo(StateRow)
