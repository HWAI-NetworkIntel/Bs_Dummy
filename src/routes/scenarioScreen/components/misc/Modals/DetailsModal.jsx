import React from 'react'
import CustomModal from './CustomModal'
import CustomSpin from '../../../../../common/components/CustomSpin'
import DetailsModalTitle from './titles/DetailsModalTitle'
import DetailsModalFooter from './titles/DetailsModalFooter'
import SingleAndMultipleScenarioDetails from '../../modals/SingleAndMultipleScenarioDetails'

export const DetailsModal = ({ OpenDetails, setOpenDetails, loading, error, data, scenarioId, clientId, email }) => {
  return (
    <CustomModal
      width="1000px"
      isModalOpen={OpenDetails}
      showModal={() => setOpenDetails(true)}
      handleOk={() => setOpenDetails(false)}
      handleCancel={() => setOpenDetails(false)}
      footer={null}
    >
      <DetailsModalTitle setOpenDetails={setOpenDetails} />
      <div className="flex w-full h-96 overflow-auto border">
        {loading ? (
          <CustomSpin size={'Large'} />
        ) : error ? (
          <p className="flex text-lg font-bold justify-center items-center m-auto">{error}</p>
        ) : data ? (
          <SingleAndMultipleScenarioDetails data={{ [scenarioId]: data }} details={true} />
        ) : (
          ''
        )}
      </div>
      <DetailsModalFooter
        handleCancel={() => setOpenDetails(false)}
        data={data}
        scenarioId={scenarioId}
        clientId={clientId}
        email={email}
      />
    </CustomModal>
  )
}
