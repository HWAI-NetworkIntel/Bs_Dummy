import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CreateIcon } from '../../../../../../common/images/icons'
import { notification } from 'antd'
import { createScenario } from '../../../../api/request'
import { LOCAL_STORAGE_SCENARIO_ID } from '../../../../../../common/constants/constants'
import CreateScenarioModal from '../../Modals/CreateScenarioModal'
import { setScenarioName } from '../../../../reducer/scenarioSlice'
import { setOriginalScenarioId } from '../../../../../simulationScreen/reducer/BenefitsSlice'

const CreateScenario = ({ userId, email, clientId }) => {
  const [ModalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { scenarioName, scenarioDescription } = useSelector(({ scenarios }) => scenarios)
  const [blockButton, setBlockButton] = useState(false)
  const handleOnSave = async () => {
    const obj1 = {
      scenarioName: scenarioName.trim(),
      createdBy: email,
      clientId: clientId,
    }
    if (scenarioDescription !== '') {
      obj1.description = scenarioDescription
    }
    if (scenarioName.trim() === '') {
      notification.open({
        message: 'Enter Scenario Name',
        type: 'error',
        placement: 'topRight',
        duration: 3,
      })
      return
    } else {
      setBlockButton(true)
      try {
        const result = await createScenario(obj1)
        const resultData = result?.success
        if (resultData) {
          notification.open({
            message: `New Scenario ${scenarioName} is created`,
            type: 'success',
            placement: 'topRight',
            duration: 3,
          })
          const ScenarioId = Number(result?.data?.scenario_Id)
          localStorage.setItem(LOCAL_STORAGE_SCENARIO_ID, ScenarioId)
          dispatch(setOriginalScenarioId(ScenarioId))
          navigate('/benefit-simulator/plan-selection/' + userId, {
            replace: true,
          })
          dispatch(setScenarioName(''))
        }
      } catch (error) {
        const error2 = error.response.data.data.message
        notification.open({
          message: error2,
          type: 'error',
          placement: 'topRight',
          duration: 3,
        })
      }
      setBlockButton(false)
    }
  }
  return (
    <div>
      <button
        className="flex justify-center items-center gap-x-1 w-[136px] h-[32px] border border-[#5C276E] text-sm text-[#FFF] bg-[#5C276E] tracking-[0.7px] leading-[18px]"
        onClick={() => setModalOpen(true)}
      >
        <CreateIcon width={20} height={20} />
        <div className="pt-[1px]">New Scenario</div>
      </button>
      <CreateScenarioModal blockButton={blockButton} ModalOpen={ModalOpen} setModalOpen={setModalOpen} handleOnSave={handleOnSave} />
    </div>
  )
}

export default React.memo(CreateScenario)
