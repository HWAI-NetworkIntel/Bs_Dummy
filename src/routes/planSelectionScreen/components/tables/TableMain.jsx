import React from 'react'
import Organization from './organization/Organization'
import Plans from './plans/Plans'
import ScenarioTable from './plans/ScenarioTable'

const TableMain = () => {
  return (
    <div className="w-full py-2 px-8 flex items-center overflow-hidden gap-x-2 border-b border-[#E9E8E8]">
      <div
        style={{ flex: '1 1 50%', boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.16)' }}
        className="w-full rounded border h-full relative border-[#E9E8E8] overflow-y-auto px-2"
      >
        {/* <Organization /> */}
        <Plans />
      </div>
      <div
        style={{ flex: '1 1 50%', boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.16)' }}
        className="w-full rounded border h-full relative border-[#E9E8E8] overflow-y-auto px-2"
      >
        {/* <Plans /> */}
        <ScenarioTable/>
      </div>
    </div>
  )
}
export default React.memo(TableMain)
