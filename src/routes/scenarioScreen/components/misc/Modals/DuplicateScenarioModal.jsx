import React, { useState } from 'react'
import { Input, Checkbox } from 'antd'
import CustomModal from './CustomModal'
import DuplicateScenarioTitle from './titles/DuplicateScenarioTitle'
import { openNotification } from '../../../../planSelectionScreen/components/misc/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../../planSelectionScreen/reducer/planSelectionSlice'
import { createScenario, duplicateSaveFilterDetails, getScenarios } from '../../../api/request'
import { LOCAL_STORAGE_SCENARIO_ID } from '../../../../../common/constants/constants'
import { useNavigate } from 'react-router-dom'
import {
  setAllScenarios,
  setBouncePropagation,
  setDisplayedScenarios,
  setOriginalAllScenarios,
  setSeletectedIds,
} from '../../../reducer/scenarioSlice'
import TextArea from 'antd/lib/input/TextArea'
import { setOriginalScenarioId } from '../../../../simulationScreen/reducer/BenefitsSlice'

export const DuplicateScenarioModal = ({ ModalOpen, setModalOpen, item, userId, email, clientId }) => {
  const [InputValue, setInputValue] = useState(`${item?.ScenarioName}_copy_1`)
  const { selectedIds } = useSelector(({ scenarios }) => scenarios)
  const [DesValue, setDesValue] = useState(`${item?.Description}`)
  const [isChecked, setIsChecked] = useState(true)
  const { bouncePropagation, allScenarios } = useSelector(({ scenarios }) => scenarios)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleOnSave = async () => {
    dispatch(setLoading(true))
    const obj1 = {
      scenarioName: InputValue,
      createdBy: email,
      clientId: clientId,
      oldScenarioId: item?.ScenarioId,
    }
    if (DesValue !== '' && DesValue !== '-') {
      obj1.description = DesValue
    }
    if (InputValue === '') {
      openNotification('Please Enter Scenario Name', 'error')
      dispatch(setLoading(false))
    } else {
      const response = await getScenarios({
        clientId: clientId,
        createdBy: email,
      })
      const data = response?.data?.scenario
      const isScenarioIdPresent = data.some((scenario) => scenario?.ScenarioId === item?.ScenarioId)
      if (isScenarioIdPresent) {
        try {
          const result = await createScenario(obj1)
          if (result?.success) {
            const newScenarioId = Number(result?.data?.scenario_Id)
            localStorage.setItem(LOCAL_STORAGE_SCENARIO_ID, newScenarioId)
            if (isChecked) {
              const result = await duplicateSaveFilterDetails({
                oldScenarioId: item?.ScenarioId,
                newScenarioId,
              })
              dispatch(setOriginalScenarioId(item?.ScenarioId))
              if (result.success) {
                navigate('/benefit-simulator/simulation/' + userId, {
                  replace: true,
                })
              }
            } else {
              dispatch(setOriginalScenarioId(newScenarioId))
              navigate('/benefit-simulator/plan-selection/' + userId, {
                replace: true,
              })
            }
          }
          dispatch(setLoading(false))
        } catch (error) {
          openNotification(error?.response?.data?.data?.message, 'error')
          const response = await getScenarios({
            clientId: clientId,
            createdBy: email,
          })
          const data = response?.data?.scenario
          const validSelectedIds = selectedIds.filter((selectedId) => data.some((scenario) => scenario.ScenarioId === selectedId))

          dispatch(setOriginalAllScenarios(data))
          dispatch(setAllScenarios(data))
          dispatch(setDisplayedScenarios(data))
          dispatch(setSeletectedIds(validSelectedIds))
          dispatch(setLoading(false))
        }
      } else {
        openNotification("Scenario doesn't exist", 'error')
        const response = await getScenarios({
          clientId: clientId,
          createdBy: email,
        })
        const data = response?.data?.scenario
        const validSelectedIds = selectedIds.filter((selectedId) => data.some((scenario) => scenario.ScenarioId === selectedId))

        dispatch(setOriginalAllScenarios(data))
        dispatch(setAllScenarios(data))
        dispatch(setDisplayedScenarios(data))
        dispatch(setSeletectedIds(validSelectedIds))
        dispatch(setLoading(false))
      }
    }
  }
  return (
    <CustomModal
      footer={null}
      isModalOpen={ModalOpen}
      showModal={() => setModalOpen(true)}
      handleOk={() => {
        dispatch(setBouncePropagation(bouncePropagation + 1))
        setModalOpen(false)
      }}
      handleCancel={() => {
        dispatch(setBouncePropagation(bouncePropagation + 1))
        setModalOpen(false)
      }}
      width="460px"
    >
      <DuplicateScenarioTitle setModalOpen={setModalOpen} />
      <div className="mt-[12px] pl-1">
        <div className="flex text-[13px] text-[#5C5C5C] items-center tracking-[0.8px] font-bold pb-[6px]">Scenario Name</div>
        <Input style={{ width: '376px' }} value={InputValue} onChange={(e) => setInputValue(e.target.value)} />
        <div className="mt-[8px] pr-4 ">
          <div className="flex text-[13px] pb-[6px] text-[#5C5C5C] items-center tracking-[0.8px] font-bold">
            Description
            <div className="text-[14px] font-normal pt-[2px] pl-1 tracking-[0.7px] text-[#7D7D7D]">(Optional)</div>
          </div>

          <TextArea
            value={DesValue === '-' ? '' : DesValue}
            onChange={(e) => setDesValue(e.target.value)}
            style={{ height: '90px' }}
            rows={4}
            placeholder="Scenario Description"
          />
        </div>
        <div className="flex pt-1 items-center">
          <Checkbox
            checked={isChecked}
            defaultChecked={isChecked}
            className="pr-1"
            onChange={({ target: { checked } }) => {
              setIsChecked(checked)
            }}
          />
          <p className="text-[13px] font-normal leading-[20px] tracking-[0.65px] text-[#333]">
            Continue with the filters selected for plans
          </p>
        </div>
        <div className="flex justify-center items-end gap-[8px] self-stretch h-[36px] mt-[12px]">
          <button
            className="bg-[#FFF] border border-[#DDDDDC] text-[14px] font-normal tracking-[0.8px] h-[36px] leading-[20px] text-[#5C276E]"
            style={{ padding: '8px 24px', borderRadius: '4px' }}
            onClick={() => {
              dispatch(setBouncePropagation(bouncePropagation + 1))
              setModalOpen(false)
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleOnSave}
            className="bg-[#5C276E] border border-[#DDDDDC] text-[14px] font-normal h-[36px] tracking-[0.8px] leading-[20px] text-[#FFF]"
            style={{ padding: '8px 24px', borderRadius: '4px' }}
          >
            Duplicate
          </button>
        </div>
      </div>
    </CustomModal>
  )
}
