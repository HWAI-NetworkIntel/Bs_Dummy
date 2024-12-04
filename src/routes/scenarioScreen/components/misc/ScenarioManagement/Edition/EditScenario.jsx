import React, { useState } from 'react'
import { CancelIcon, CloseIcon, NewScenario, NextIcon, TitleIcon } from '../../../../../../common/images/icons'
import TextArea from 'antd/lib/input/TextArea'
import { Input, notification } from 'antd'
import {
  setAllScenarios,
  setDisplayedScenarios,
  setEditedScenarioDescription,
  setEditedScenarioName,
  setOriginalAllScenarios,
} from '../../../../reducer/scenarioSlice'
import { useDispatch, useSelector } from 'react-redux'
import { editScenario, getScenarios } from '../../../../api/request'

const EditScenario = ({ item, email, clientid, handleCancel, scenarioId, setIsModalOpen }) => {
  const [InputValue, setInputValue] = useState(item?.ScenarioName)
  const [TextValue, setTextValue] = useState(item?.Description)
  const dispatch = useDispatch()
  const { searchedIds } = useSelector(({ scenarios }) => scenarios)

  const handleOnSave = async () => {
    const obj1 = {
      scenarioName: InputValue,
      scenarioId: scenarioId,
    }
    if (TextValue !== '') {
      obj1.description = TextValue
    }

    dispatch(setEditedScenarioDescription(''))
    if (InputValue === '') {
      notification.open({
        message: 'Enter Scenario Name',
        type: 'error',
        placement: 'topRight',
        duration: 3,
      })
      return
    } else {
      try {
        const result = await editScenario(obj1)
        const resultData = result?.success
        const message = result?.data?.Status
        if (resultData) {
          notification.open({
            message: message,
            type: 'success',
            placement: 'topRight',
            duration: 3,
          })
          const obj2 = {
            clientId: clientid,
            createdBy: email,
          }
          const result1 = await getScenarios(obj2)
          const resultData1 = result1?.data?.scenario
          dispatch(setAllScenarios(resultData1))
          dispatch(setOriginalAllScenarios(resultData1))
          let filteredResultData1
          if (searchedIds.length === 0) {
            filteredResultData1 = resultData1
          } else {
            filteredResultData1 = resultData1.filter((scenario) => searchedIds.includes(scenario.ScenarioId))
          }
          dispatch(setDisplayedScenarios(filteredResultData1))
          setIsModalOpen(false)
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
    }
  }
  return (
    <div>
      <div className="w-full flex justify-between items-center border-[#E9E8E8]">
        <div className="flex gap-x-1 items-center">
          <NewScenario className="pb-1" />
          <p className="text-[#5C5C5C] text-[20px] font-bold">Edit Scenario</p>
        </div>
        <button type="button" onClick={handleCancel}>
          <CloseIcon />
        </button>
      </div>
      <div className="mt-1 border-b border-gray-200"></div>
      <div className="pt-[15px] pl-4 text-[16px] text-[#5C5C5C] tracking-[0.8px] leading-[24px] font-bold">
        Title <TitleIcon />
      </div>
      <div className="pt-[6px] pl-4 text-[14px] font-normal text-[#7D7D7D] tracking-[0.7px] leading-[20px]">
        Give the scenario a title to identify
      </div>
      <div className="mt-[10px] pl-4 pr-4">
        <Input
          placeholder="Scenario Name"
          value={InputValue}
          style={{ height: '30px' }}
          onChange={(e) => (dispatch(setEditedScenarioName(e.target.value)), setInputValue(e.target.value))}
        />
      </div>
      <div className="mt-[24px] pl-4 pr-4 ">
        <div className="flex text-[16px] text-[#5C5C5C] items-center tracking-[0.8px] leading-[24px] font-bold">
          Description
          <div className="text-[14px] font-normal tracking-[0.7px] pl-1 leading-[18px]text-[#7D7D7D]">(Optional)</div>
        </div>
        <div className="pt-[6px] pb-[6px] text-sm text-[#7D7D7D] tracking-[0.7px] leading-[20px]">Describe the scenario name</div>
        <TextArea
          rows={4}
          style={{ height: '90px' }}
          value={TextValue}
          placeholder="Scenario Description"
          onChange={(e) => (dispatch(setEditedScenarioDescription(e.target.value)), setTextValue(e.target.value))}
        />
      </div>
      <div className="mt-4 pr-4 pl-4 pb-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
        <button
          className="h-[36px] pt-[5px] pb-[5px] pl-[57.5px] pr-[57.5px] text-sm text-[#4A1E57] border border-[#4A1E57] leading-[20px] tracking-[0.7px] rounded hover:text-[#4A1E57]"
          onClick={handleCancel}
        >
          <CancelIcon />
          Cancel
        </button>
        <button
          className="h-[36px] pt-[5px] pb-[5px] pl-[57.5px] pr-[57.5px] text-sm text-[#FFF] tracking-[0.7px] leading-[20px] rounded bg-[#4A1E57] hover:bg-[#4A1E57] hover:text-[#FFF]"
          onClick={handleOnSave}
        >
          Edit <NextIcon />
        </button>
      </div>
    </div>
  )
}

export default React.memo(EditScenario)
