import React from 'react'
import SimulationResult from './ScenarioActions/SimulationResult'
import DuplicateScenario from './ScenarioActions/DuplicateScenario'
import ShareScenario from './ScenarioActions/ShareScenario'

const ScenarioCard = ({ item, setCard, card, userId, email, clientId, userName }) => {
  return (
    <div className="scenario-card w-full  h-[32px]">
      <SimulationResult item={item} setCard={setCard} card={card} email={email} clientId={clientId} />
      <DuplicateScenario item={item} userId={userId} email={email} clientId={clientId} />
      <ShareScenario item={item} userId={userId} email={email} clientId={clientId} userName={userName} />
    </div>
  )
}

export default React.memo(ScenarioCard)
