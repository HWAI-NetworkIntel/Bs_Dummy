import React, { useEffect, useState } from 'react'
import ScenarioHeader from './ScenarioHeader'
import AllScenarios from './AllScenarios'
import { useSelector } from 'react-redux'
import TablePagination from '../../misc/Pagination'

const GetScenarioTable = ({ email, ClientId, userid, userName, error }) => {
  const { allScenarios, displayedScenarios, bouncePropagation } = useSelector(({ scenarios }) => scenarios)
  const [card, setCard] = useState(0)
  useEffect(() => {
    setCard(0)
  }, [bouncePropagation])
  return (
    <div className="w-full">
      <ScenarioHeader />
      <div className="overflow-y-auto " style={{ height: 'calc(100vh - 241px)' }}>
        {error ? (
          <p className="w-full h-full flex justify-center items-center text-[15px] text-[#333] font-[600]">No results found!!</p>
        ) : (
          allScenarios?.map((item, i) => (
            <AllScenarios
              userName={userName}
              item={item}
              email={email}
              ClientId={ClientId}
              userid={userid}
              card={card}
              setCard={setCard}
              key={i}
            />
          ))
        )}
      </div>
      <TablePagination total={displayedScenarios.length} allScenarios={allScenarios} />
    </div>
  )
}
export default React.memo(GetScenarioTable)
