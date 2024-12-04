import React, { useState } from 'react'
import { getDifferenceAsString, isDifferencePositive } from '../../../utils/planSelection'
import { ArrowDown, ArrowUp } from '../../../../../common/images/icons'
import CountyRow from './CountyRow'
import StateRow from './StateRow'

const StateCountyTableOfPlan = ({ data }) => {
  const [showStates, setShowStates] = useState(false)
  return (
    <>
      {showStates && Object.keys(data)?.map((key, i) => <StateRow key={i} dataKey={key} data={data} />)}
      <button
        type="button"
        onClick={() => {
          setShowStates(!showStates)
        }}
        className="w-full flex justify-center gap-x-1 items-center border border-t-[#E9E8E8] border-b-0 border-r-0 border-l-0 text-[#7D528B] font-semibold text-[12px]"
      >
        <div className="-ml-12">{showStates ? <ArrowUp /> : <ArrowDown />}</div>{' '}
        <p>
          {showStates
            ? Object.keys(data)?.length > 1
              ? 'Hide All States'
              : 'Hide State'
            : Object.keys(data)?.length > 1
            ? 'Show All States'
            : 'Show State'}
        </p>
      </button>
    </>
  )
}
export default React.memo(StateCountyTableOfPlan)
