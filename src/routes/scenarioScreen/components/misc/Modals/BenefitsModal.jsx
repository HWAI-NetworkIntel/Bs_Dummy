import React from 'react'
import CustomModal from './CustomModal'
import { useDispatch } from 'react-redux'
import { CancelIcon, CloseIcon, NewScenario, NextIcon, TitleIcon } from '../../../../../common/images/icons'
import { Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { setScenarioDescription, setScenarioName } from '../../../reducer/scenarioSlice'

const BenefitsModal = ({ blockButton, ModalOpen, setModalOpen, handleOnSave }) => {
  const dispatch = useDispatch()

  const jsonData = {
    "H3388_014_0": {
      "Additional Coverage Offered in Gap": {
        "benefitName": "Additional Coverage Offered in Gap",
        "uiType": 0,
        "subBenefits": [
          {
            "items": [
              {
                "benefitGroup": "Additional Coverage Offered in Gap",
                "benefitDescription": "Does this plan offer Additional Gap Coverage (Yes or No):",
                "benefitDataType": "Boolean",
                "range": "No|Yes",
                "currentValue": "No",
                "newValue": "No",
              },
            ],
          },
        ],
      },
      "Ambulance (b10a)": {
        "benefitName": "Ambulance (b10a)",
        "uiType": 2,
        "subBenefits": [
          {
            "items": [
              {
                "benefitGroup": "Ambulance (b10a)",
                "benefitDescription": "Indicate the Minimum Coinsurance percentage for Medicare-covered Ground Ambulance Services:",
                "benefitDataType": "Percentage",
                "range": "0|100",
                "currentValue": "",
                "newValue": "0%",
              },
            ],
          },
        ],
      },
     "Ambulatory Surgical Center (b9b)": {
        benefitName: "Ambulatory Surgical Center (b9b)",
        uiType: 4,
        subBenefits: [
          {
            title: "Please enter Copayment or Coinsurance below:",
            isOptional: false,
            parent: 0,
            items: [
              {
                benefitGroup: "Ambulatory Surgical Center (b9b)",
                benefits: "pbp_b9b_coins_pct_mc",
                benefitDescription: "Indicate Minimum Coinsurance percentage for Medicare-covered Benefits:",
                benefitDataType: "Percentage",
                range: "0|100",
                currentValue: "",
                newValue: "",
              },
              
              
              
            ],
          },
        ],
      },
      "Brand Drug Cost": {
        benefitName: "Brand Drug Cost",
        uiType: 4,
        subBenefits: [
          {
            title: "Please enter Copayment or Coinsurance below:",
            isOptional: false,
            parent: 0,
            items: [
              {
                benefitGroup: "Brand Drug Cost",
                benefits: "pbp_b9b_coins_pct_mc",
                benefitDescription: "Indicate INP Copayment amount for Standard Retail Cost-Sharing 1-month supply (Preferred Brand1)",
                benefitDataType: "Percentage",
                range: "0|100",
                currentValue: "",
                newValue: "",
              },
              
              
              
            ],
          },
        ],
      },
      
    },
  };
  
  return (
    <CustomModal
      footer={null}
      isModalOpen={ModalOpen}
      showModal={() => setModalOpen(true)}
      handleOk={() => setModalOpen(false)}
      handleCancel={() => setModalOpen(false)}
      width="660px"
    >
      <div className="text-[18px] font-[600] tracking-[1px] text-[#333]">
        <div className="w-full flex justify-between items-center border-[#E9E8E8]">
          <div className="flex gap-x-1 items-center">
            {/* <NewScenario className="pb-1" /> */}
            <p className="text-[#5C5C5C]  font-bold">Significant Benefits List</p>
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
      <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 font-['Roboto'] px-4 py-2 text-[#5C5C5C] text-left">Benefit Group</th>
            <th className="border border-gray-300 font-['Roboto'] px-4 py-2 text-[#5C5C5C] text-left">Benefit Description</th>
           
          
            
           
          </tr>
        </thead>
        <tbody>
          {Object.keys(jsonData).map((planKey) => {
            const benefits = jsonData[planKey];
            return Object.keys(benefits).map((benefitKey) => {
              const benefitGroup = benefits[benefitKey];
              return benefitGroup.subBenefits.map((subBenefit) =>
                subBenefit.items.map((item, index) => (
                  <tr key={`${benefitKey}-${index}`} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-['Roboto']">{item.benefitGroup}</td>
                    <td className="border border-gray-300 px-4 py-2 font-['Roboto']">{item.benefitDescription}</td>
                   
                    
                  </tr>
                ))
              );
            });
          })}
        </tbody>
      </table>
    </div>

              
    </CustomModal>
  )
}
export default React.memo(BenefitsModal)
