import { Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EMPTY_STRING, FALSE, TRUE } from '../../constants/index'
import {
  addToErrorBenefitNamesList,
  handleBenefits,
  removeEhcValues,
  removeFromErrorBenefitNamesList,
  restoreEhcValues,
} from '../../reducer/BenefitsSlice'

const CustomToggle = ({ record, children, index }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [allChildInputs, setAllChildInputs] = useState([])
  const [ehcValuesList, setEhcValuesList] = useState([])
  const [isToggleOn, setIsToggleOn] = useState(
    benefits[selectedBidId][record.benefitOrder].newValue.includes('Y') || benefits[selectedBidId][record.benefitOrder].newValue === '1'
  )
  useEffect(() => {
    let allInputsOrderList = []
    record?.child?.forEach((item) => {
      if (item.hasOwnProperty('items')) {
        item.items.forEach((element) => {
          allInputsOrderList.push(element.benefitOrder)
        })
      } else {
        allInputsOrderList.push(item.benefitOrder)
        item.child?.forEach((el) => {
          allInputsOrderList.push(el.benefitOrder)
        })
      }
    })
    setAllChildInputs(allInputsOrderList)
    let allEhcValues = []
    record?.child?.forEach((item) => {
      if (item.hasOwnProperty('items')) {
        item.items.forEach((element) => {
          let iAdditional = allEhcValues?.findIndex((a) => a.id === element.dependentOnAdditionalEhc)
          let i = allEhcValues?.findIndex((a) => a.id === element.dependentOnEhc)
          if (i !== -1) {
            allEhcValues[i].values.push(element.orderOfEhc)
          } else {
            if (element.dependentOnEhc !== 0) {
              allEhcValues.push({ id: element.dependentOnEhc, values: [element.orderOfEhc] })
            }
          }
          if (iAdditional !== -1) {
            allEhcValues[iAdditional].values.push(element.additionalEhcOrder)
          } else {
            if (element.dependentOnAdditionalEhc !== 0) {
              allEhcValues.push({
                id: element.dependentOnAdditionalEhc,
                values: [element.additionalEhcOrder],
              })
            }
          }
        })
      }
    })
    setEhcValuesList(allEhcValues?.map((item) => ({ ...item, values: [...new Set(item.values)] })))
  }, [])
  const isValuePresent = (list) => {
    let a = list?.filter(
      (key) =>
        benefits[selectedBidId][key].newValue.length > 0 &&
        !benefits[selectedBidId][key].newValue.includes('NC') &&
        benefits[selectedBidId][key].newValue !== 'Yes' &&
        benefits[selectedBidId][key].newValue !== 'No'
    )
    if (list?.length > 0) {
      return a?.length > 0 ? true : false
    }
    return true
  }

  useEffect(() => {
    if (isToggleOn) {
      if (!isValuePresent(allChildInputs)) {
        dispatch(addToErrorBenefitNamesList(`${record.benefitGroup}-${index}`))
      } else {
        dispatch(removeFromErrorBenefitNamesList(`${record.benefitGroup}-${index}`))
      }
    } else {
      dispatch(removeFromErrorBenefitNamesList(`${record.benefitGroup}-${index}`))
    }
  }, [benefits, allChildInputs, isToggleOn])
  const currentValue =
    benefits[selectedBidId][record.benefitOrder].newValue.includes('Y') || benefits[selectedBidId][record.benefitOrder].newValue === '1'
  const onChangeHandler = (isChecked) => {
    if (!isChecked) {
      allChildInputs.forEach((a) => {
        dispatch(handleBenefits({ bidId: selectedBidId, index: a, value: EMPTY_STRING }))
      })
      if (ehcValuesList?.length > 0) {
        ehcValuesList.forEach((a) => {
          dispatch(removeEhcValues(a))
        })
      }
    }
    if (isChecked) {
      if (ehcValuesList?.length > 0) {
        ehcValuesList.forEach((a) => {
          dispatch(restoreEhcValues(a))
        })
      }
    }
    if (isChecked !== currentValue) {
      let valueToInsert = record.currentValue.length === 1 ? (isChecked ? '1' : '0') : isChecked ? TRUE : FALSE
      dispatch(handleBenefits({ bidId: selectedBidId, index: record.benefitOrder, value: valueToInsert }))
    }
    if (isChecked === currentValue) {
      dispatch(handleBenefits({ bidId: selectedBidId, index: record.benefitOrder, value: EMPTY_STRING }))
    }
  }
  return (
    <div className="w-full flex flex-wrap gap-x-4 gap-y-2 px-2">
      <div className="flex w-full overflow-hidden px-2 shadow-cards justify-between items-center gap-x-10 ">
        <p className="text-[#333333] py-2"> {record.benefitDescription} </p>
        <Switch
          checkedChildren="Yes"
          unCheckedChildren="No"
          className=" bg-gray-400"
          defaultChecked={currentValue}
          onChange={(isChecked) => {
            onChangeHandler(isChecked)
            setIsToggleOn(isChecked)
          }}
        />
      </div>
      {(benefits[selectedBidId][record.benefitOrder].newValue === 'Yes' || benefits[selectedBidId][record.benefitOrder].newValue === '1') &&
        children}
    </div>
  )
}
export default React.memo(CustomToggle)
