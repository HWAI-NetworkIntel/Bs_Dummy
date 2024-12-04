import React, { useState } from 'react'
import { Input, Tooltip } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { handleBenefits } from '../../../reducer/BenefitsSlice'
import { BENEFIT_DATA_TYPES, EMPTY_STRING } from '../../../constants'
import { checkNc, tooltipGenerator } from '../../../utils/General'
import { RESTRICTED_SYMBOLS } from '../../../../../common/constants/constants'

const CustomInput = ({ record, hideTitle, titleUp }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [error, setError] = useState(false)
  const [value1, setValue] = useState(EMPTY_STRING)
  const [maximumLimit, setMaximumLimit] = useState(EMPTY_STRING)
  const [minimumLimit, setMininumLimit] = useState('')
  const [changedBenefit, setChangedBenefit] = useState({
    benefitGroup: record.benefitGroup,
    benefits: record.benefits,
    benefitDescription: record.benefitDescription,
    currentValue: record.currentValue,
    newValue: EMPTY_STRING,
  })
  // useEffect(() => {
  //   if (benefits[selectedBidId][record.benefitOrder].currentValue !== benefits[selectedBidId][record.benefitOrder].newValue) {
  //     setValue(benefits[selectedBidId][record.benefitOrder].newValue?.replace('$', '')?.replace(',', '')?.replace('%', ''))
  //   }
  // }, [])

  const title = (
    <span style={{ visibility: 'visible !important' }} className="custom-tooltiptext">
      {tooltipGenerator(record?.range)}
    </span>
  )
  const handleBinaryChange = (inputValue) => {
    setError(false)
    const validateStr = new RegExp(/^[0-1]+$/)
    const isValid = validateStr.test(inputValue)
    isValid || inputValue === EMPTY_STRING
      ? inputValue.length > maximumLimit.length
        ? setError(true)
        : saveUniqueValues(inputValue)
      : setError(true)
  }
  const handleNumericChange = (inputValue, nc) => {
    setError(false)
    const reg = /^-?\d*(\.\d*)?$/
    const ncValues = inputValue?.toUpperCase() === 'N' || inputValue?.toUpperCase() === 'C' || inputValue?.toUpperCase() === 'NC'
    const allowedConditions = nc
      ? reg.test(inputValue) || inputValue === EMPTY_STRING || ncValues
      : reg.test(inputValue) || inputValue === EMPTY_STRING
    allowedConditions
      ? ncValues
        ? saveUniqueValues(inputValue?.toUpperCase())
        : parseFloat(inputValue) > parseFloat(maximumLimit)
          ? setError(true)
          : parseFloat(inputValue) < parseFloat(minimumLimit)
            ? setError(true)
            : saveUniqueValues(inputValue)
      : setError(true)
  }
  const handleFloatChange = (inputValue) => {
    setError(false)
    const reg = /^-?\d*(\.\d*)?$/
    const allowedConditions = reg.test(inputValue) || inputValue === EMPTY_STRING
    if (allowedConditions) {
      if (parseFloat(inputValue) < record?.range?.split('|')[0]) {
        setError(true)
      } else {
        if (parseFloat(inputValue) > record?.range?.split('|')[1]) {
          setError(true)
        } else {
          saveUniqueValues(inputValue)
        }
      }
    } else {
      setError(true)
    }
  }
  const handleBenefitValidation = (inputValue) => {
    switch (record.benefitDataType) {
      case BENEFIT_DATA_TYPES.stringTick:
        handleBinaryChange(inputValue)
        break
      case BENEFIT_DATA_TYPES.int:
        if (RESTRICTED_SYMBOLS.includes(inputValue)) {
          setError(true)
        } else {
          handleFloatChange(inputValue)
        }
        break
      case BENEFIT_DATA_TYPES.float:
        handleFloatChange(inputValue)
        break
      case BENEFIT_DATA_TYPES.ncPercent:
        handleNumericChange(inputValue, checkNc(record))
        break
      case BENEFIT_DATA_TYPES.ncMoney:
        if (RESTRICTED_SYMBOLS.includes(inputValue)) {
          setError(true)
        } else {
          handleNumericChange(inputValue, checkNc(record))
        }
        break
      default:
        if (RESTRICTED_SYMBOLS.includes(inputValue)) {
          setError(true)
        } else {
          handleNumericChange(inputValue, checkNc(record))
        }
        break
    }
  }
  const saveChangedData = () => {
    dispatch(
      handleBenefits({
        bidId: selectedBidId,
        index: record.benefitOrder,
        value: changedBenefit.newValue,
      })
    )
  }
  const saveUniqueValues = (e) => {
    setValue(e)
    if (e?.length > 0) {
      switch (record.benefitDataType) {
        case BENEFIT_DATA_TYPES.stringTick:
          if (record.currentValue !== e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: e,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: e,
            // })
          }
          if (record.currentValue === e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: EMPTY_STRING,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: EMPTY_STRING,
            // })
          }
          break
        case BENEFIT_DATA_TYPES.ncPercent:
          let ncValue = EMPTY_STRING
          if (e.includes('N') || e.includes('C')) {
            setValue('NC')
            ncValue = 'NC'
          }
          let finalValue = ncValue.length > 0 ? ncValue : e
          if (record.currentValue?.split('%')[0] !== finalValue) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: finalValue !== 'NC' ? finalValue + '%' : finalValue,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: finalValue !== 'NC' ? finalValue + '%' : finalValue,
            // })
          }
          if (record.currentValue?.split('%')[0] === finalValue) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: EMPTY_STRING,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: EMPTY_STRING,
            // })
          }
          break
        case BENEFIT_DATA_TYPES.percent:
          if (record.currentValue?.split('%')[0] !== e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: e + '%',
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: e + '%',
            // })
          }
          if (record.currentValue?.split('%')[0] === e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: EMPTY_STRING,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: EMPTY_STRING,
            // })
          }
          break
        case BENEFIT_DATA_TYPES.ncMoney:
          let ncMoney = EMPTY_STRING
          if (e.includes('N') || e.includes('C')) {
            setValue('NC')
            ncMoney = 'NC'
          }
          let finalNcMoney = ncMoney.length > 0 ? ncMoney : e
          if (record.currentValue?.split('$')?.join(EMPTY_STRING)?.split(',')?.join(EMPTY_STRING) !== finalNcMoney) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: finalNcMoney !== 'NC' ? '$' + finalNcMoney : finalNcMoney,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: finalNcMoney !== 'NC' ? '$' + finalNcMoney : finalNcMoney,
            // })
          }
          if (record.currentValue?.split('$')?.join(EMPTY_STRING)?.split(',')?.join(EMPTY_STRING) === finalNcMoney) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: EMPTY_STRING,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: EMPTY_STRING,
            // })
          }
          break
        case BENEFIT_DATA_TYPES.money:
          if (record.currentValue?.split('$')?.join(EMPTY_STRING)?.split(',')?.join(EMPTY_STRING) !== e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: '$' + e,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: '$' + e,
            // })
          }
          if (record.currentValue?.split('$')?.join(EMPTY_STRING)?.split(',')?.join(EMPTY_STRING) === e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: EMPTY_STRING,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: EMPTY_STRING,
            // })
          }
          break
        case BENEFIT_DATA_TYPES.int:
          if (record.currentValue !== e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: e,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: e,
            // })
          }
          if (record.currentValue === e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: EMPTY_STRING,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: EMPTY_STRING,
            // })
          }
          break
        case BENEFIT_DATA_TYPES.float:
          if (record.currentValue !== e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: e,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: e,
            // })
          }
          if (record.currentValue === e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: record.benefitOrder,
                value: EMPTY_STRING,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: EMPTY_STRING,
            // })
          }
          break
        default:
          break
      }
    } else {
      dispatch(
        handleBenefits({
          bidId: selectedBidId,
          index: record.benefitOrder,
          value: EMPTY_STRING,
        })
      )
      // setChangedBenefit({
      //   ...changedBenefit,
      //   newValue: EMPTY_STRING,
      // })
    }
  }

  useEffect(() => {
    setMaximumLimit(record?.range?.split('|')[1])
    setMininumLimit(record?.range?.split('|')[0])
  }, [record])

  // useEffect(() => {
  //   saveUniqueValues(value1)
  // }, [value1])

  return (
    <div
      className={`flex w-full ${hideTitle ? 'justify-center' : 'justify-between'} p-2 ${titleUp ? 'items-start' : 'items-center'
        } gap-x-10  ${titleUp && 'flex-col gap-y-4'}`}
    >
      {!hideTitle && <p className={`text-sm ${titleUp && 'w-44'}`}> {record.benefitDescription} </p>}
      <Tooltip open={error} trigger={['focus']} title={title} placement="left" overlayClassName="numeric-input">
        <div className="flex items-center gap-x-0.5">
          {(record.benefitDataType === BENEFIT_DATA_TYPES.money || record.benefitDataType === BENEFIT_DATA_TYPES.ncMoney) && (
            <p className="mb-0 w-4 text-sm">$</p>
          )}
          <Input
            style={{
              width: 100,
            }}
            value={value1}
            // onChange={({ target: { value } }) => handleBenefitValidation(value)}
            placeholder={record.currentValue?.replace('$', EMPTY_STRING)?.replace(',', EMPTY_STRING)?.replace('%', EMPTY_STRING)}
          // onMouseLeave={({ target: { value } }) => setError(false)}
          // onBlur={({ target: { value } }) => setError(false)}
          // onKeyDown={(e) => {
          //   if (e.key === 'Tab') {
          //     saveUniqueValues(e.target.value)
          //   }
          // }}
          />
          {(record.benefitDataType === BENEFIT_DATA_TYPES.percent || record.benefitDataType === BENEFIT_DATA_TYPES.ncPercent) && (
            <p className="mb-0 w-4 pl-1 text-sm">%</p>
          )}
        </div>
      </Tooltip>
    </div>
  )
}
export default React.memo(CustomInput)
