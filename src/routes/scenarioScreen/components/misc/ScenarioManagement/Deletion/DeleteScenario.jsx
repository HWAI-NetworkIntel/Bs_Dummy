import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CloseIcon, DeleteIcon, DeleteModalIcon } from '../../../../../../common/images/icons'
import { deleteScenario, getScenarios } from '../../../../api/request'
import { setAllScenarios, setDisplayedScenarios, setOriginalAllScenarios, setSeletectedIds } from '../../../../reducer/scenarioSlice'
import { Input, Modal, notification } from 'antd'
import { setLoading } from '../../../../../planSelectionScreen/reducer/planSelectionSlice'
import CustomModal from '../../Modals/CustomModal'
import DuplicateScenarioTitle from '../../Modals/titles/DuplicateScenarioTitle'
import CustomSpin from '../../../../../../common/components/CustomSpin'

const DeleteScenario = ({ email, clientId }) => {
  const { loading } = useSelector(({ plans }) => plans)
  const { selectedIds, allScenarios } = useSelector(({ scenarios }) => scenarios)
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const handleDelete = async () => {
    dispatch(setLoading(true))
    const uniqueSelectedIds = [...new Set(selectedIds)]

    const obj = {
      scenarioId: uniqueSelectedIds.join(','),
    }
    try {
      const result = await deleteScenario(obj)
      const resultData = result?.data
      if (resultData) {
        const updatedAllScenarios = allScenarios.filter((scenario) => !selectedIds.includes(scenario.ScenarioId))
        dispatch(setAllScenarios(updatedAllScenarios))
        dispatch(setDisplayedScenarios(updatedAllScenarios))
        const response = await getScenarios({
          clientId: clientId,
          createdBy: email,
        })
        if (response.success) {
          dispatch(setOriginalAllScenarios(response?.data?.scenario))
        }

        dispatch(setSeletectedIds([]))
        const notificationMessage = selectedIds.length > 1 ? 'Scenarios Deleted' : 'Scenario Deleted'
        notification.open({
          message: notificationMessage,
          type: 'success',
          placement: 'topRight',
          duration: 3,
        })
      }
      dispatch(setLoading(false))
      setModalOpen(false)
    } catch (error) {
      const error2 = error.response.data.data.message
      notification.open({
        message: error2,
        type: 'error',
        placement: 'topRight',
        duration: 3,
      })
      const response = await getScenarios({
        clientId: clientId,
        createdBy: email,
      })
      if (response.success) {
        dispatch(setOriginalAllScenarios(response?.data?.scenario))
      }

      dispatch(setSeletectedIds([]))
      dispatch(setLoading(false))
      setModalOpen(false)
    }
  }

  return (
    <div>
      <button
        className={`flex justify-center items-center w-[100px] h-[32px] text-sm gap-x-1 tracking-[0.7px] leading-[20px] ${
          selectedIds.length > 0 ? 'bg-[#5C276E] text-white' : 'border border-[#DDDDDC] text-[#DDDDDC]'
        }`}
        onClick={() => setModalOpen(true)}
        disabled={selectedIds.length <= 0}
      >
        <DeleteIcon width={20} height={20} />
        <p className="pt-[1px]">Delete</p>
      </button>
      <Modal
        closable={false}
        footer={null}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width="480px"
        className="relative"
      >
        {loading && <CustomSpin size={'large'} />}
        <div className="w-full border-b border-[#DDDDDC] flex justify-between items-center pb-2">
          <div className="flex items-center">
            <DeleteModalIcon className="pb-2" />
            <p className="text-[#5C5C5C] text-[16px] tracking-[0.8px] font-bold">Delete Confirmation</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setModalOpen(false)
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mt-[8px]">
          <div className="flex">
            <p className="text-[13px] pl-[4px] font-normal leading-[20px] tracking-[0.65px] text-[#333]">
              Are you sure you want to delete selected {selectedIds.length > 1 ? 'scenarios' : 'scenario'}?
            </p>
          </div>
          <div className="flex justify-center items-end gap-[8px] self-stretch h-[36px] mt-[12px]">
            <button
              className="bg-[#FFF] border border-[#DDDDDC] text-[14px] font-normal tracking-[0.8px] w-[98px] h-[36px] leading-[20px] text-[#5C276E]"
              style={{ padding: '8px 24px', borderRadius: '4px' }}
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="bg-[#5C276E] border border-[#DDDDDC] text-[14px] font-normal h-[36px] w-[79px] tracking-[0.8px] leading-[20px] text-[#FFF]"
              style={{ borderRadius: '4px' }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default React.memo(DeleteScenario)
