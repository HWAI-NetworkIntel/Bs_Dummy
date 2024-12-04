import { Select } from 'antd'
import { MultiSelect } from 'primereact/multiselect'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleBenefits, handleBenefitsForMultiSelect, updateErrorList } from '../../../reducer/BenefitsSlice'
import { setBenefitsToShow } from '../../../reducer/SectionDSlice'
import { benefitsToShow } from '../../../utils/SectionD'

const MultiSelectNine = ({ item, packageNo }) => {
  const dispatch = useDispatch()
  const { selectedBidId, errorBenefitNameList, benefits } = useSelector(({ benefits }) => benefits)
  const newValues = item.newValue.split(';').filter((str) => str)
  const options = item.range.split('|')
  const [selectedValues, setSelectedValues] = useState(newValues)

  const getRemovedValueList = (prev, curr, errorList, no) => {
    let finalErrorList = []
    let listToRemove = []
    if (curr?.length > 0) {
      prev
        .filter((str) => !curr.includes(str))
        ?.forEach((str) => {
          if (benefitsToShow[no][str]) {
            benefitsToShow[no][str].forEach((subStr) => {
              listToRemove.push(subStr)
            })
          }
        })
    } else {
      prev?.forEach((str) => {
        if (benefitsToShow[no][str]) {
          benefitsToShow[no][str].forEach((subStr) => {
            listToRemove.push(subStr)
          })
        }
      })
    }
    errorList.forEach((errName) => {
      listToRemove?.forEach((str) => {
        if (errName.includes(str)) {
          finalErrorList.push(errName)
        }
      })
    })
    return errorList.filter((str) => !finalErrorList.includes(str))
  }

  const changeHandler = (value) => {
    let updatedErrorLists = getRemovedValueList(selectedValues, value, errorBenefitNameList, packageNo)
    dispatch(updateErrorList(updatedErrorLists))
    setTimeout(() => {
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
    }, 100)
  }

  useEffect(() => {
    dispatch(setBenefitsToShow({ no: packageNo, value: selectedValues }))
  }, [selectedValues])
  useEffect(() => {
    if (benefits[selectedBidId]?.[item.benefitOrder]?.newValue) {
      let arrOfValues = benefits[selectedBidId]?.[item.benefitOrder]?.newValue.split(';').filter((str) => str)
      setSelectedValues(arrOfValues)
    }
  }, [benefits[selectedBidId]?.[item.benefitOrder]?.newValue])

  return (
    <div className="flex w-full five justify-center p-2 items-center gap-x-10">
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
