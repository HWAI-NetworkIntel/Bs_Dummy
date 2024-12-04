import { MultiSelect } from 'primereact/multiselect'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToErrorBenefitNamesList,
  handleBenefits,
  handleBenefitsForMultiSelect,
  removeFromErrorBenefitNamesList,
} from '../../../reducer/BenefitsSlice'

const MultiSelectThirteen = ({ item, selectedValues1, hideShadow }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const options = item.range.split('|')
  const [newValues, setNewValues] = useState([])
  const [selectedValues, setSelectedValues] = useState([])
  const changeHandler = (value) => {
    setSelectedValues(value)
    if (value?.length > 0) {
      let sortedOldValues = newValues.sort()
      let sortedCurrentValues = value.sort()
      if (JSON.stringify(sortedOldValues) !== JSON.stringify(sortedCurrentValues)) {
        let finalString = ''
        value.forEach((str, i) => {
          if (i === 0) {
            finalString = `${finalString}${str}`
          } else {
            finalString = `${finalString};${str}`
          }
        })
        dispatch(
          handleBenefitsForMultiSelect({
            bidId: selectedBidId,
            index: item.benefitOrder,
            value: finalString,
          })
        )
      } else {
        dispatch(handleBenefits({ bidId: selectedBidId, index: item.benefitOrder, value: '' }))
      }
    } else {
      dispatch(handleBenefitsForMultiSelect({ bidId: selectedBidId, index: item.benefitOrder, value: '' }))
    }
  }
  const handleError = useCallback(() => {
    if (item.child.length > 0) {
      if (selectedValues) {
        let emptyValueIndex = item.child
          .filter((obj) => selectedValues.includes(obj.rowName))
          ?.findIndex((obj1) => benefits[selectedBidId][obj1.benefitOrder].newValue === '')
        if (emptyValueIndex !== -1) {
          dispatch(addToErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
        } else {
          dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
        }
      } else {
        dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      }
    }
  }, [benefits])

  useEffect(() => {
    handleError()
  }, [benefits])
  useEffect(() => {
    const newValues1 = benefits[selectedBidId][item.benefitOrder].newValue
      .split(';')
      .filter((str) => str)
      .map((strSub) => strSub.trim())
    setNewValues(newValues1)
    setSelectedValues(newValues1)
  }, [selectedValues1])
  return (
    <div className={`flex w-full flex-col rounded gap-y-2 ${!hideShadow && ' p-2 '}`}>
      <div className="flex w-full five justify-between p-2 items-center gap-x-10">
        <p
          style={{
            color: `${
              benefits[selectedBidId][item.benefitOrder].currentValue !== benefits[selectedBidId][item.benefitOrder].newValue &&
              benefits[selectedBidId][item.benefitOrder].newValue !== ''
                ? '#5C276E'
                : ''
            }`,
          }}
        >
          {item.benefitDescription}
        </p>
        <MultiSelect
          value={selectedValues}
          onChange={({ value }) => {
            changeHandler(value)
          }}
          options={options}
          placeholder=""
          maxSelectedLabels={1}
          className="w-full five h-8 px-2 max-w-sm"
        />
      </div>
      {item.child?.length > 0 && selectedValues && (
        <div className="w-full flex flex-col gap-y-2  rounded bg-white">
          {item.child
            .filter((obj) => selectedValues.includes(obj.rowName))
            .map((childObj, i) => (
              <MultiSelectThirteen key={i} item={childObj} selectedValues1={selectedValues} hideShadow />
            ))}
        </div>
      )}
    </div>
  )
}
export default React.memo(MultiSelectThirteen)
