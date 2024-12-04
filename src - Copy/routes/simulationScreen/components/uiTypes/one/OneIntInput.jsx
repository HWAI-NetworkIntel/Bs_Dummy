import React, { useState } from 'react'
import { Input, Tooltip } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { BENEFIT_DATA_TYPES, EMPTY_STRING } from '../../../constants'
import { addToErrorBenefitNamesList, handleBenefits, removeFromErrorBenefitNamesList } from '../../../reducer/BenefitsSlice'
import { checkNc, tooltipGenerator } from '../../../utils/General'
import { groupCopayAndCoinsNew } from '../../../utils/Benefits'
import OneBenefitMapper from './OneBenefitMapper'
import CustomDrop from '../../widgets/CustomDrop'
import { RESTRICTED_SYMBOLS } from '../../../../../common/constants/constants'

const OneIntInput = ({ item, hideTitle, titleUp }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [error, setError] = useState(false)
  const [minimumLimit, setMininumLimit] = useState('')

  const [value1, setValue] = useState(benefits[selectedBidId][item.benefitOrder].newValue)
  const [maximumLimit, setMaximumLimit] = useState(EMPTY_STRING)
  const [changedBenefit, setChangedBenefit] = useState('')
  const [data, setData] = useState([])

  const title = (
    <span style={{ visibility: 'visible !important' }} className="custom-tooltiptext">
      {tooltipGenerator(item?.range)}
    </span>
  )

  const handleNumericChange = (inputValue, nc) => {
    setError(false)
    const reg = /^-?\d*(\.\d*)?$/
    const ncValues = inputValue?.toUpperCase() === 'N' || inputValue?.toUpperCase() === 'C' || inputValue?.toUpperCase() === 'NC'
    const allowedConditions = nc
      ? reg.test(inputValue) || inputValue === EMPTY_STRING || ncValues
      : reg.test(inputValue) || inputValue === EMPTY_STRING
    allowedConditions
      ? ncValues
        ? setValue(inputValue?.toUpperCase())
        : parseFloat(inputValue) > parseFloat(maximumLimit)
        ? setError(true)
        : setValue(inputValue)
      : setError(true)
  }
  const handleFloatChange = (inputValue) => {
    setError(false)
    const reg = /^-?\d*(\.\d*)?$/
    const allowedConditions = reg.test(inputValue) || inputValue === EMPTY_STRING
    if (allowedConditions) {
      if (parseFloat(inputValue) < item?.range?.split('|')[0]) {
        setError(true)
      } else {
        if (parseFloat(inputValue) > item?.range?.split('|')[1]) {
          setError(true)
        } else {
          setValue(inputValue)
        }
      }
    } else {
      setError(true)
    }
  }
  const handleBenefitValidation = (inputValue) => {
    switch (item.benefitDataType) {
      case BENEFIT_DATA_TYPES.int:
        handleFloatChange(inputValue)
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
    dispatch(handleBenefits({ bidId: selectedBidId, index: item.benefitOrder, value: changedBenefit }))
  }
  const saveUniqueValues = useCallback((e) => {
    setError(false)
    if (e?.length > 0) {
      switch (item.benefitDataType) {
        case BENEFIT_DATA_TYPES.int:
          if (item.currentValue !== e) {
            setChangedBenefit(e)
          }
          if (item.currentValue === e) {
            setChangedBenefit('')
          }
          break
        default:
          break
      }
    } else {
      setChangedBenefit('')
    }
  }, [])

  // handles error case
  const handleError = useCallback(() => {
    if (benefits[selectedBidId][item.benefitOrder].newValue) {
      let errorIndexes = []
      data?.forEach((itemObj, i) => {
        if (i < parseFloat(benefits[selectedBidId][item.benefitOrder].newValue) - 1) {
          let emptyValueIndex = itemObj.items?.findIndex((obj) => benefits[selectedBidId][obj.benefitOrder].newValue === '')
          if (emptyValueIndex !== -1) {
            errorIndexes.push(emptyValueIndex)
          }
        }
      })
      if (errorIndexes?.length > 0) {
        dispatch(addToErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      } else {
        dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      }
    }
  }, [benefits])

  // restore to default
  const restoreToDefaultValues = useCallback(() => {
    data?.forEach((itemObj, i) => {
      if (value1) {
        if (i >= value1) {
          itemObj.items?.forEach((obj) => {
            dispatch(handleBenefits({ bidId: selectedBidId, index: obj.benefitOrder, value: '' }))
          })
        }
      }
    })
  }, [value1])

  useEffect(() => {
    setMaximumLimit(item?.range?.split('|')[1])
    setMininumLimit(item?.range?.split('|')[0])
  }, [item])

  useEffect(() => {
    handleError()
  }, [benefits])
  useEffect(() => {
    restoreToDefaultValues()
  }, [value1])
  useEffect(() => {
    setData(groupCopayAndCoinsNew(item.child))
    setValue('')
  }, [])
  const childContent = useCallback(() => {
    let no = benefits[selectedBidId][item.benefitOrder].newValue
    if (no) {
      if (item?.child?.length > 0) {
        if (data?.length > 0) {
          ;<div className="w-full flex flex-col gap-y-2">
            {data?.map((itemObj, i) => i < no - 1 && <OneBenefitMapper key={i} hide item={itemObj} />)}
          </div>
        }
        return (
          <div className="w-full flex flex-col gap-y-2">
            {data?.map((itemObj, i) => i < no - 1 && <OneBenefitMapper key={i} item={itemObj} />)}
          </div>
        )
      }
    }
  }, [benefits, value1])

  return (
    <div>
      <div className={`flex w-full justify-between p-2 items-center gap-x-10   ${titleUp && 'flex-col gap-y-4'}`}>
        {!hideTitle && (
          <p
            className="text-sm"
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
        )}
        <Tooltip open={error} trigger={['focus']} title={title} placement="left" overlayClassName="numeric-input">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: item.range === '1|4' ? 'auto' : 120,
            }}
          >
            {item.range === '1|4' ? (
              <CustomDrop item={item} />
            ) : (
              <Input
                style={{
                  width: 100,
                }}
                value={value1}
                onChange={({ target: { value } }) => handleBenefitValidation(value)}
                placeholder={benefits[selectedBidId][item.benefitOrder].newValue}
                onMouseLeave={({ target: { value } }) => saveUniqueValues(value)}
                onBlur={({ target: { value } }) => saveChangedData(value)}
              />
            )}
          </div>
        </Tooltip>
      </div>
      <div className="py-2">{childContent()}</div>
    </div>
  )
}
export default React.memo(OneIntInput)
