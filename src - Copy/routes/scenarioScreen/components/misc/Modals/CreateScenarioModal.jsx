import React from 'react'
import CustomModal from './CustomModal'
import { useDispatch } from 'react-redux'
import { CancelIcon, CloseIcon, NewScenario, NextIcon, TitleIcon } from '../../../../../common/images/icons'
import { Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { setScenarioDescription, setScenarioName } from '../../../reducer/scenarioSlice'

const CreateScenarioModal = ({ blockButton, ModalOpen, setModalOpen, handleOnSave }) => {
  const dispatch = useDispatch()
  return (
    <CustomModal
      footer={null}
      isModalOpen={ModalOpen}
      showModal={() => setModalOpen(true)}
      handleOk={() => setModalOpen(false)}
      handleCancel={() => setModalOpen(false)}
      width="460px"
    >
      <div className="text-[20px] font-[600] tracking-[1px] text-[#333]">
        <div className="w-full flex justify-between items-center border-[#E9E8E8]">
          <div className="flex gap-x-1 items-center">
            <NewScenario className="pb-1" />
            <p className="text-[#5C5C5C]  font-bold">New Scenario</p>
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
      </div>
      <div className="mt-1 border-b border-gray-200"></div>
      <div className="pt-[15px] pl-4 text-[16px] text-[#5C5C5C] tracking-[0.8px] leading-[24px] font-bold">
        Title <TitleIcon />
      </div>
      <div className="pt-[6px] pl-4 text-[14px] font-normal text-[#7D7D7D] tracking-[0.7px] leading-[20px]">
        Give the scenario a title to identify
      </div>
      <div className="mt-[10px] pl-4 pr-4">
        <Input placeholder="Scenario Name" style={{ height: '30px' }} onChange={(e) => dispatch(setScenarioName(e.target.value))} />{' '}
      </div>
      <div className="mt-[24px] pl-4 pr-4 ">
        <div className="flex text-[16px] text-[#5C5C5C] items-center tracking-[0.8px] font-bold">
          Description
          <div className="text-[14px] font-normal pt-[2px] pl-1 tracking-[0.7px] text-[#7D7D7D]">(Optional)</div>
        </div>

        <div className="pt-[6px] pb-[6px] text-sm text-[#7D7D7D] tracking-[0.7px] leading-[20px]">Describe the scenario name</div>
        <TextArea
          style={{ height: '90px' }}
          rows={4}
          placeholder="Scenario Description"
          onChange={(e) => dispatch(setScenarioDescription(e.target.value))}
        />
      </div>
      <div className="mt-4 pr-4 pl-4 pb-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
        <button
          className="h-[36px] pt-[5px] pb-[5px] pl-[56px] pr-[56px] text-sm text-[#4A1E57] border border-[#4A1E57] tracking-[0.7px] rounded hover:text-[#4A1E57]"
          onClick={() => setModalOpen(false)}
        >
          <div className="flex justify-between items-center">
            <CancelIcon />
            Cancel
          </div>
        </button>
        <button
          className="h-[36px] pt-[5px] pb-[5px] pl-[56px] pr-[56px] text-sm text-[#FFF] tracking-[0.7px] rounded bg-[#4A1E57] hover:bg-[#4A1E57] hover:text-[#FFF]"
          onClick={handleOnSave}
          disabled={blockButton}
        >
          <div className=" flex justify-between items-center">
            Create <NextIcon />
          </div>
        </button>
      </div>
    </CustomModal>
  )
}
export default React.memo(CreateScenarioModal)
