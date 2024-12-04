import React from 'react'
import GetScenarioTable from './scenarioTable/GetScenarioTable'
const ParentTable = ({ email, ClientId, userid, userName, error }) => {
  return (
    <div className="w-full pt-2 pb-5 px-8 flex items-center overflow-hidden gap-x-2 border-b border-[#E9E8E8]">
      <div className="w-full rounded border h-full relative border-[#E9E8E8] px-2">
        <GetScenarioTable userName={userName} email={email} ClientId={ClientId} userid={userid} error={error} />
      </div>
    </div>
  )
}

export default React.memo(ParentTable)
