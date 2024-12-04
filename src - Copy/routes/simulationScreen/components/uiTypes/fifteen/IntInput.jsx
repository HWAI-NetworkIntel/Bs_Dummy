import React, { useState } from 'react'
import { Input, Tooltip } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { BENEFIT_DATA_TYPES, EMPTY_STRING } from '../../../constants'
import { addToErrorBenefitNamesList, handleBenefits, removeFromErrorBenefitNamesList } from '../../../reducer/BenefitsSlice'
import { checkNc, tooltipGenerator } from '../../../utils/General'
import { groupCopayAndCoinsNew } from '../../../utils/Benefits'
import NineTypeMapper from './NineTypeMapper'
import { RESTRICTED_SYMBOLS } from '../../../../../common/constants/constants'

const IntInput = ({ record, hideTitle, titleUp }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [error, setError] = useState(false)
  const [value1, setValue] = useState(benefits[selectedBidId][record.benefitOrder].newValue)
  const [maximumLimit, setMaximumLimit] = useState(EMPTY_STRING)
  const [minimumLimit, setMininumLimit] = useState('')

  const [data, setData] = useState([])

  const title = (
    <span style={{ visibility: 'visible !important' }} className="custom-tooltiptext">
      {tooltipGenerator(record?.range)}
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
      if (parseFloat(inputValue) < record?.range?.split('|')[0]) {
        setError(true)
      } else {
        if (parseFloat(inputValue) > record?.range?.split('|')[1]) {
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
    switch (record.benefitDataType) {
      case BENEFIT_DATA_TYPES.int:
        if (RESTRICTED_SYMBOLS.includes(inputValue)) {
          setError(true)
        } else {
          handleFloatChange(inputValue)
        }
        break
      default:
        handleNumericChange(inputValue, checkNc(record))
        break
    }
  }

  const saveChangedData = (str) => {
    if (str) {
      dispatch(handleBenefits({ bidId: selectedBidId, index: record.benefitOrder, value: str }))
    } else {
      dispatch(
        handleBenefits({ bidId: selectedBidId, index: record.benefitOrder, value: benefits[selectedBidId][record.benefitOrder].newValue })
      )
    }
  }

  const handleError = useCallback(() => {
    if (benefits[selectedBidId][record.benefitOrder].newValue) {
      let errorIndexes = []
      data?.forEach((item, i) => {
        if (i < benefits[selectedBidId][record.benefitOrder].newValue) {
          let emptyValueIndex = item.items?.findIndex((obj) => benefits[selectedBidId][obj.benefitOrder].newValue === '')
          if (emptyValueIndex !== -1) {
            errorIndexes.push(emptyValueIndex)
          }
        }
      })
      if (errorIndexes?.length > 0) {
        dispatch(addToErrorBenefitNamesList(`${record.benefitGroup}-${record.benefitOrder}`))
      } else {
        dispatch(removeFromErrorBenefitNamesList(`${record.benefitGroup}-${record.benefitOrder}`))
      }
    }
  }, [benefits])

  // saves in reducer for each change in input
  useEffect(() => {
    saveChangedData(value1)
  }, [value1])

  const restoreToDefaultValues = useCallback(() => {
    data?.forEach((item, i) => {
      if (i >= benefits[selectedBidId][record.benefitOrder].newValue) {
        item.items?.forEach((obj) => {
          dispatch(handleBenefits({ bidId: selectedBidId, index: obj.benefitOrder, value: '' }))
          if (obj?.child?.length > 0 && benefits[selectedBidId][record.benefitOrder].newValue > 0) {
            obj?.child?.forEach((objInner) => {
              dispatch(handleBenefits({ bidId: selectedBidId, index: objInner.benefitOrder, value: '' }))
            })
          }
        })
      }
    })
  }, [benefits[selectedBidId][record.benefitOrder].newValue])

  useEffect(() => {
    setMaximumLimit(record?.range?.split('|')[1])
  }, [record])
  useEffect(() => {
    handleError()
  }, [benefits])

  // restores old values of removed packages
  useEffect(() => {
    if (benefits[selectedBidId][record.benefitOrder].newValue) {
      restoreToDefaultValues()
    }
  }, [benefits[selectedBidId][record.benefitOrder].newValue])

  useEffect(() => {
    let test = [...record.child]
    setData(groupCopayAndCoinsNew(test.sort((a, b) => a.benefitOrder - b.benefitOrder)))
    setValue('')
  }, [])
  const childContent = useCallback(() => {
    let no = value1 ? value1 : benefits[selectedBidId][record.benefitOrder].newValue
    if (no) {
      if (record?.child?.length > 0) {
        if (data?.length > 0) {
          if (data[0].items?.length === 4) {
            return (
              <div className="w-full flex flex-col gap-y-2">
                <div className="w-full flex flex-col gap-y-2">
                  {data?.map((item, i) => i < no && <NineTypeMapper key={i} hide item={item} showTitleName={i === 0} />)}
                </div>
              </div>
            )
          } else if (data[0].items?.length === 5) {
            return (
              <div className="w-full flex flex-col gap-y-2">
                <div className="w-full flex flex-col gap-y-2">
                  {data?.map((item, i) => i < no && <NineTypeMapper key={i} hide item={item} showTitleName={i === 0} />)}
                </div>
              </div>
            )
          }
        }
        return (
          <div className="w-full flex flex-col gap-y-2">
            <div className="w-full flex flex-col gap-y-2">
              {data?.map((item, i) => i < no && <NineTypeMapper key={i} hide item={item} showTitleName={i === 0} packageNo={i + 1} />)}
            </div>
          </div>
        )
      }
    }
  }, [benefits[selectedBidId][record.benefitOrder].newValue, value1])

  return (
    <div className="w-full">
      <div className={`flex w-full justify-between p-2 items-center gap-x-10   ${titleUp && 'flex-col gap-y-4'}`}>
        {!hideTitle && <p className="text-sm"> {record.benefitDescription} </p>}
        <Tooltip open={error} trigger={['focus']} title={title} placement="left" overlayClassName="numeric-input">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 120,
            }}
          >
            <Input
              style={{
                width: 100,
              }}
              tabIndex="-1"
              value={value1}
              onChange={({ target: { value } }) => handleBenefitValidation(value)}
              placeholder={benefits[selectedBidId][record.benefitOrder].newValue}
              onMouseLeave={() => setError(false)}
              onBlur={() => setError(false)}
            />
          </div>
        </Tooltip>
      </div>
      <div className="py-2">{childContent()}</div>
    </div>
  )
}
export default React.memo(IntInput)
