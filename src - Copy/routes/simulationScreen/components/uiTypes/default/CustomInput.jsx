import React, { useState } from 'react'
import { Input, Tooltip } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { checkNc, tooltipGenerator } from '../../../utils/General'
import { handleBenefits } from '../../../reducer/BenefitsSlice'
import { BENEFIT_DATA_TYPES } from '../../../constants'
import { RESTRICTED_SYMBOLS } from '../../../../../common/constants/constants'

const CustomInput = ({ item }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [error, setError] = useState(false)
  const [value1, setValue] = useState('')
  const [maximumLimit, setMaximumLimit] = useState('')
  const [minimumLimit, setMininumLimit] = useState('')

  const [changedBenefit, setChangedBenefit] = useState({
    benefitGroup: item.benefitGroup,
    benefits: item.benefits,
    benefitDescription: item.benefitDescription,
    currentValue: item.currentValue,
    newValue: '',
  })
  useEffect(() => {
    if (benefits[selectedBidId][item.benefitOrder].currentValue !== benefits[selectedBidId][item.benefitOrder].newValue) {
      setValue(benefits[selectedBidId][item.benefitOrder].newValue?.replace('$', '')?.replace(',', '')?.replace('%', ''))
    }
  }, [])
  const title = (
    <span style={{ visibility: 'visible !important' }} className="custom-tooltiptext">
      {tooltipGenerator(item?.range)}
    </span>
  )
  const handleBinaryChange = (inputValue) => {
    setError(false)
    const validateStr = new RegExp(/^[0-1]+$/)
    const isValid = validateStr.test(inputValue)
    isValid || inputValue === ''
      ? inputValue.length > maximumLimit.length
        ? setError(true)
        : saveUniqueValues(inputValue)
      : setError(true)
  }
  const handleNumericChange = (inputValue, nc) => {
    setError(false)
    const reg = /^-?\d*(\.\d*)?$/
    const ncValues = inputValue?.toUpperCase() === 'N' || inputValue?.toUpperCase() === 'C' || inputValue?.toUpperCase() === 'NC'
    const allowedConditions = nc ? reg.test(inputValue) || inputValue === '' || ncValues : reg.test(inputValue) || inputValue === ''
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
    const allowedConditions = reg.test(inputValue) || inputValue === ''
    if (allowedConditions) {
      if (parseFloat(inputValue) < item?.range?.split('|')[0]) {
        setError(true)
      } else {
        if (parseFloat(inputValue) > item?.range?.split('|')[1]) {
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
    switch (item.benefitDataType) {
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
        if (RESTRICTED_SYMBOLS.includes(inputValue)) {
          setError(true)
        } else {
          handleFloatChange(inputValue)
        }
        break
      case BENEFIT_DATA_TYPES.ncPercent:
        handleNumericChange(inputValue, checkNc(item))
        break
      case BENEFIT_DATA_TYPES.ncMoney:
        handleNumericChange(inputValue, checkNc(item))
        break
      default:
        if (RESTRICTED_SYMBOLS.includes(inputValue)) {
          setError(true)
        } else {
          handleNumericChange(inputValue, checkNc(item))
        }
        break
    }
  }
  const saveChangedData = () => {
    dispatch(
      handleBenefits({
        bidId: selectedBidId,
        index: item.benefitOrder,
        value: changedBenefit.newValue,
      })
    )
  }
  const saveUniqueValues = (e) => {
    setValue(e)
    if (e?.length > 0) {
      switch (item.benefitDataType) {
        case BENEFIT_DATA_TYPES.stringTick:
          if (item.currentValue !== e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: e,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: e,
            // })
          }
          if (item.currentValue === e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: '',
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: '',
            // })
          }
          break
        case BENEFIT_DATA_TYPES.ncPercent:
          let ncValue = ''
          if (e.includes('N') || e.includes('C')) {
            setValue('NC')
            ncValue = 'NC'
          }
          let finalValue = ncValue.length > 0 ? ncValue : e
          if (item.currentValue?.split('%')[0] !== finalValue) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: finalValue !== 'NC' ? finalValue + '%' : finalValue,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: finalValue !== 'NC' ? finalValue + '%' : finalValue,
            // })
          }
          if (item.currentValue?.split('%')[0] === finalValue) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: '',
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: '',
            // })
          }
          break
        case BENEFIT_DATA_TYPES.percent:
          if (item.currentValue?.split('%')[0] !== e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: e + '%',
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: e + '%',
            // })
          }
          if (item.currentValue?.split('%')[0] === e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: '',
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: '',
            // })
          }
          break
        case BENEFIT_DATA_TYPES.ncMoney:
          let ncMoney = ''
          if (e.includes('N') || e.includes('C')) {
            setValue('NC')
            ncMoney = 'NC'
          }
          let finalNcMoney = ncMoney.length > 0 ? ncMoney : e
          if (item.currentValue?.split('$')?.join('')?.split(',')?.join('') !== finalNcMoney) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: finalNcMoney !== 'NC' ? '$' + finalNcMoney : finalNcMoney,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: finalNcMoney !== 'NC' ? '$' + finalNcMoney : finalNcMoney,
            // })
          }
          if (item.currentValue?.split('$')?.join('')?.split(',')?.join('') === finalNcMoney) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: '',
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: '',
            // })
          }
          break
        case BENEFIT_DATA_TYPES.money:
          if (item.currentValue?.split('$')?.join('')?.split(',')?.join('') !== e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: '$' + e,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: '$' + e,
            // })
          }
          if (item.currentValue?.split('$')?.join('')?.split(',')?.join('') === e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: '',
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: '',
            // })
          }
          break
        case BENEFIT_DATA_TYPES.int:
          if (item.currentValue !== e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: e,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: e,
            // })
          }
          if (item.currentValue === e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: '',
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: '',
            // })
          }
          break
        case BENEFIT_DATA_TYPES.float:
          if (item.currentValue !== e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: e,
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: e,
            // })
          }
          if (item.currentValue === e) {
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: '',
              })
            )
            // setChangedBenefit({
            //   ...changedBenefit,
            //   newValue: '',
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
          index: item.benefitOrder,
          value: '',
        })
      )
      // setChangedBenefit({
      //   ...changedBenefit,
      //   newValue: '',
      // })
    }
  }

  useEffect(() => {
    setMaximumLimit(item?.range?.split('|')[1])
    setMininumLimit(item?.range?.split('|')[0])
  }, [item])
  // useEffect(() => {
  //   saveUniqueValues(value1)
  // }, [value1])
  return (
    <div className="flex w-full justify-between p-2 items-center gap-x-10 ">
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
        {' '}
        {item.benefitDescription}{' '}
      </p>
      <Tooltip open={error} trigger={['focus']} title={title} placement="left" overlayClassName="numeric-input">
        <div className="flex items-center justify-between w-36">
          <p className="mb-0 w-4 text-sm">
            {(item.benefitDataType === BENEFIT_DATA_TYPES.money || item.benefitDataType === BENEFIT_DATA_TYPES.ncMoney) && '$'}
          </p>
          <Input
            style={{
              width: 100,
            }}
            value={value1}
            onChange={({ target: { value } }) => handleBenefitValidation(value)}
            placeholder={item.currentValue?.replace('$', '')?.replace(',', '')?.replace('%', '')}
            onMouseLeave={({ target: { value } }) => setError(false)}
            onBlur={({ target: { value } }) => setError(false)}
          />
          <p className="mb-0 w-4 pl-1 text-sm">
            {(item.benefitDataType === BENEFIT_DATA_TYPES.percent || item.benefitDataType === BENEFIT_DATA_TYPES.ncPercent) && ' %'}
          </p>
        </div>
      </Tooltip>
    </div>
  )
}
export default React.memo(CustomInput)
