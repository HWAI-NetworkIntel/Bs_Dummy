import { MultiSelect } from 'primereact/multiselect'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleBenefits, handleBenefitsForMultiSelect } from '../../../reducer/BenefitsSlice'

const MultiSelectNine = ({ item, showTitle }) => {
  const dispatch = useDispatch()
  const { selectedBidId, benefits } = useSelector(({ benefits }) => benefits)
  const newValues = item.newValue
    .split(';')
    .map((str) => str.trim())
    .filter((str) => str)
  const options = item.range.split('|')
  const [selectedValues, setSelectedValues] = useState(newValues)

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

  useEffect(() => {
    if (benefits[selectedBidId]?.[item.benefitOrder]?.newValue) {
      let arrOfValues = benefits[selectedBidId]?.[item.benefitOrder]?.newValue
        .split(';')
        .map((str) => str.trim())
        .filter((str) => str)
      setSelectedValues(arrOfValues)
    }
  }, [benefits])

  return (
    <div className="flex w-full five justify-between p-2 items-center gap-x-10">
      {showTitle && <p className="text-sm"> {item.benefitDescription} </p>}
      <MultiSelect
        value={selectedValues}
        onChange={({ value }) => {
          changeHandler(value)
        }}
        options={options}
        placeholder=""
        maxSelectedLabels={1}
        className="w-full five h-8 px-2 shadow-cards text-sm"
      />
    </div>
  )
}
export default React.memo(MultiSelectNine)
