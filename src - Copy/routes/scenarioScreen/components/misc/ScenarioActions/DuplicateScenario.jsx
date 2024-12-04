import React, { useState } from 'react'
import { DuplicateIcon } from '../../../../../common/images/icons'
import { DuplicateScenarioModal } from '../Modals/DuplicateScenarioModal'

const DuplicateScenario = ({ item, userId, email, clientId }) => {
  const [ModalOpen, setModalOpen] = useState(false)
  const [disable, setDisable] = useState(item?.Status === 'Not Submitted' || item?.Status === 'Processing')

  return (
    <div className="w-full scenario-card-option flex border-b pb-[6px]">
      <button onClick={() => setModalOpen(true)} className="w-full text-left flex" disabled={disable}>
        <DuplicateIcon />
        <div className="pl-1">Duplicate</div>
      </button>
      <DuplicateScenarioModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        item={item}
        userId={userId}
        email={email}
        clientId={clientId}
      />
    </div>
  )
}
export default React.memo(DuplicateScenario)
