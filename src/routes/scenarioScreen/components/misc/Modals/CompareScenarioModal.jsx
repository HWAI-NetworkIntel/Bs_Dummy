import React from 'react'
import CompareScenarioTitle from './titles/CompareScenarioTitle'
import CustomModal from './CustomModal'
import CompareScenarioFooter from './titles/CompareScenarioFooter'
import CustomSpin from '../../../../../common/components/CustomSpin'
import SingleAndMultipleScenarioDetails from '../../modals/SingleAndMultipleScenarioDetails'

const CompareScenarioModal = ({ setOpenModal, OpenModal, loading, error, data }) => {
  return (
    <CustomModal
      width="1116px"
      isModalOpen={OpenModal}
      showModal={() => setOpenModal(true)}
      handleOk={() => setOpenModal(false)}
      handleCancel={() => setOpenModal(false)}
      footer={null}
    >
      <CompareScenarioTitle setOpenModal={setOpenModal} />
      <div className="flex w-full h-96 overflow-auto border">
        {loading ? (
          <CustomSpin size={'Large'} />
        ) : error ? (
          <p className="flex text-lg font-bold justify-center items-center m-auto">{error}</p>
        ) : data ? (
          <SingleAndMultipleScenarioDetails data={data} />
        ) : (
          ''
        )}
      </div>
      <CompareScenarioFooter data={data} handleCancel={() => setOpenModal(false)} />
    </CustomModal>
  )
}
export default React.memo(CompareScenarioModal)
