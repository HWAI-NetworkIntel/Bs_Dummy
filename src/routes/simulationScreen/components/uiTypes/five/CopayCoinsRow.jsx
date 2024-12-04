import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGetPreviousValueIfAny from '../../../hooks/useGetPreviousValueIfAny'
import {
  addToErrorBenefitNamesList,
  handleBenefits,
  removeBenefitValueHandler,
  removeEhcValues,
  removeFromErrorBenefitNamesList,
  restoreEhcValues,
} from '../../../reducer/BenefitsSlice'
import CopayCoinsCard from './CopayCoinsCard'

const CopayCoinsRow = ({ list, title, isOptional, i }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [setToNull, changeSetToNull] = useState(0)
  const [getPreviousValueIfAny] = useGetPreviousValueIfAny(
    list.filter((item) => item.benefitDataType !== 'Boolean' && item.benefitDataType !== 'Drop')
  )
  let test = list
    ?.filter((item) => item.benefitDataType !== 'Boolean' && item.benefitDataType !== 'Drop')
    ?.map((x) => benefits[selectedBidId][x.benefitOrder].newValue)
    .filter((k) => k && k !== 'NC')
  const [isChecked, setIsChecked] = useState(
    benefits[selectedBidId][list[0].dependentOnAdditionalEhc]?.newValue.split('')[list[0].additionalEhcOrder - 1] === '1'
  )

  const checkBoxHandler = (checked) => {
    let copayCoinsList = [...list.filter((item) => item.benefitDataType !== 'Boolean')]
    if (checked === false) {
      copayCoinsList.forEach((element, i) => {
        dispatch(removeBenefitValueHandler({ bidId: selectedBidId, value: element.benefitOrder }))
        if (i === 0 || i === 2) {
          dispatch(
            removeEhcValues({
              bidId: selectedBidId,
              id: element?.dependentOnEhc,
              values: [element?.orderOfEhc],
            })
          )
        }
      })
      dispatch(
        removeEhcValues({
          bidId: selectedBidId,
          id: copayCoinsList[0].dependentOnAdditionalEhc,
          values: [copayCoinsList[0].additionalEhcOrder],
        })
      )
      setIsChecked(checked)
    } else {
      copayCoinsList.forEach((element, i) => {
        dispatch(handleBenefits({ bidId: selectedBidId, index: element.benefitOrder, value: '' }))
        if (i === 0 || i === 2) {
          dispatch(
            restoreEhcValues({
              bidId: selectedBidId,
              id: element?.dependentOnEhc,
              values: [element?.orderOfEhc],
              bidId: selectedBidId,
            })
          )
        }
      })
      dispatch(
        restoreEhcValues({
          bidId: selectedBidId,
          id: copayCoinsList[0].dependentOnAdditionalEhc,
          values: [copayCoinsList[0].additionalEhcOrder],
        })
      )
      setIsChecked(checked)
    }
  }

  useEffect(() => {
    if (isOptional) {
      if (isChecked) {
        if (getPreviousValueIfAny) {
          let indexOfChangedItem = list?.findIndex(
            (rowChild) =>
              !benefits[selectedBidId][rowChild.benefitOrder].newValue.includes('NC') &&
              !(benefits[selectedBidId][rowChild.benefitOrder].newValue === '')
          )
          if (indexOfChangedItem !== -1) {
            dispatch(removeFromErrorBenefitNamesList(`${list[0].benefitGroup}-${list[0].dependentOnBenefitOrder}${i}`))
          } else {
            dispatch(addToErrorBenefitNamesList(`${list[0].benefitGroup}-${list[0].dependentOnBenefitOrder}${i}`))
          }
        } else {
          dispatch(addToErrorBenefitNamesList(`${list[0].benefitGroup}-${list[0].dependentOnBenefitOrder}${i}`))
        }
      } else {
        dispatch(removeFromErrorBenefitNamesList(`${list[0].benefitGroup}-${list[0].dependentOnBenefitOrder}${i}`))
        list?.forEach((el) => {
          dispatch(removeFromErrorBenefitNamesList(`${el.benefitGroup}-${el.benefitOrder}`))
        })
      }
    }
  }, [getPreviousValueIfAny, isChecked, setToNull, benefits])
  useEffect(() => {
    if (benefits[selectedBidId][list[0].dependentOnAdditionalEhc]?.newValue.split('')[list[0].additionalEhcOrder - 1] === '1') {
      if (getPreviousValueIfAny) {
        setIsChecked(true)
      }
    } else {
      setIsChecked(false)
    }
  }, [getPreviousValueIfAny, benefits[selectedBidId][list[0].dependentOnAdditionalEhc]?.newValue.split('')[list[0].additionalEhcOrder - 1]])


  return (
    <div className="w-full p-2 flex flex-col shadow-cards gap-y-1">
      <div className="flex gap-x-2 items-center">
        {isOptional && (
          <Checkbox
            checked={isChecked}
            onChange={({ target: { checked } }) => {
              checkBoxHandler(checked)
            }}
          />
        )}
        {title}
      </div>
      {isOptional ? (
        isChecked && (
          <CopayCoinsCard
            changeSetToNull={changeSetToNull}
            setToNull={setToNull}
            showOptional={test?.length > 0}
            list={list}
            getPreviousValueIfAny={(benefits[selectedBidId][list[0].dependentOnAdditionalEhc]?.newValue.split('')[list[0].additionalEhcOrder - 1] === '1') ? getPreviousValueIfAny : null}
          />
        )
      ) : (
        <CopayCoinsCard changeSetToNull={changeSetToNull} setToNull={setToNull} list={list} getPreviousValueIfAny={getPreviousValueIfAny} />
      )}
    </div>
  )
}
export default React.memo(CopayCoinsRow)
