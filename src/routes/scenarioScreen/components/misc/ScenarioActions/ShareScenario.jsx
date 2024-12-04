import React, { useState } from 'react'
import { ShareIcon } from '../../../../../common/images/icons'
import ShareScenarioModal from '../Modals/ShareScenarioModal'

const ShareScenario = ({ item, userId, email, clientId, userName }) => {
  const [ModalOpen, setModalOpen] = useState(false)
  const [disable, setDisable] = useState(item?.Status === 'Not Submitted' || item?.Status === 'Processing')

  return (
    <div className="w-full scenario-card-option flex pb-[6px]">
      <button onClick={() => setModalOpen(true)} className="flex w-full text-left" disabled={disable}>
        <ShareIcon />
        <div className="pl-1">Share</div>
      </button>
      <ShareScenarioModal
        userName={userName}
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        userId={userId}
        emailId={email}
        clientId={clientId}
        item={item}
      />
    </div>
  )
}
export default React.memo(ShareScenario)
