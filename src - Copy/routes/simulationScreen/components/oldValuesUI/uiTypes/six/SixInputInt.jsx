import React, { useState } from 'react'
import { Input, Tooltip } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { BENEFIT_DATA_TYPES, EMPTY_STRING } from '../../../../constants'
import { addToErrorBenefitNamesList, handleBenefits, removeFromErrorBenefitNamesList } from '../../../../reducer/BenefitsSlice'
import { checkNc, tooltipGenerator } from '../../../../utils/General'
import { groupCopayAndCoinsNew } from '../../../../utils/Benefits'
import NineTypeMapper from './SixTypeMapper'

const SixInputInt = ({ record, hideTitle, titleUp }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [error, setError] = useState(false)
  const [value1, setValue] = useState(benefits[selectedBidId][record.benefitOrder].currentValue)
  const [maximumLimit, setMaximumLimit] = useState(EMPTY_STRING)
  // const [changedBenefit, setChangedBenefit] = useState('')
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
        ? saveUniqueValues(inputValue?.toUpperCase())
        : parseFloat(inputValue) > parseFloat(maximumLimit)
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
  const saveUniqueValues = (e) => {
    setValue(e)
    if (e?.length > 0) {
      switch (record.benefitDataType) {
        case BENEFIT_DATA_TYPES.int:
          if (record.currentValue !== e) {
            dispatch(handleBenefits({ bidId: selectedBidId, index: record.benefitOrder, value: e }))
            // setChangedBenefit(e)
          }
          if (record.currentValue === e) {
            dispatch(handleBenefits({ bidId: selectedBidId, index: record.benefitOrder, value: '' }))
            // setChangedBenefit('')
          }
          break
        default:
          break
      }
    } else {
      dispatch(handleBenefits({ bidId: selectedBidId, index: record.benefitOrder, value: '' }))
      // setChangedBenefit('')
    }
  }
  const handleBenefitValidation = (inputValue) => {
    switch (record.benefitDataType) {
      case BENEFIT_DATA_TYPES.int:
        handleFloatChange(inputValue)
        break
      default:
        handleNumericChange(inputValue, checkNc(record))
        break
    }
  }
  // const saveChangedData = () => {
  //   dispatch(handleBenefits({ bidId: selectedBidId, index: record.benefitOrder, value: changedBenefit }))
  // }

  const handleError = useCallback(() => {
    if (value1) {
      data?.forEach((item, i) => {
        if (i < value1) {
          let emptyValueIndex = item.items?.findIndex((obj) => benefits[selectedBidId][obj.benefitOrder].currentValue === '')
          if (emptyValueIndex !== -1) {
            dispatch(addToErrorBenefitNamesList(`${record.benefitGroup}-${record.benefitOrder}`))
          } else {
            dispatch(removeFromErrorBenefitNamesList(`${record.benefitGroup}-${record.benefitOrder}`))
          }
        }
      })
    }
  }, [benefits])
  const restoreToDefaultValues = useCallback(() => {
    data?.forEach((item, i) => {
      if (i >= value1) {
        item.items?.forEach((obj) => {
          dispatch(handleBenefits({ bidId: selectedBidId, index: obj.benefitOrder, value: '' }))
        })
      }
    })
  }, [value1])

  useEffect(() => {
    setMaximumLimit(record?.range?.split('|')[1])
  }, [record])
  useEffect(() => {
    handleError()
  }, [benefits])
  useEffect(() => {
    restoreToDefaultValues()
  }, [value1])
  useEffect(() => {
    let test = [...record.child]
    setData(groupCopayAndCoinsNew(test.sort((a, b) => a.benefitOrder - b.benefitOrder)))
    setValue('')
  }, [])
  const childContent = useCallback(() => {
    let no = value1 ? value1 : benefits[selectedBidId][record.benefitOrder].currentValue
    if (no) {
      if (record?.child?.length > 0) {
        if (data?.length > 0) {
          if (data[0].items?.length === 4) {
            return (
              <div className="w-full flex flex-col gap-y-2">
                {/* <div className="flex items-center w-full gap-x-4">
                  <div style={{ flex: '1 1 15%' }} />
                  <div style={{ flex: '1 1 80%' }} className="w-full flex gap-x-4">
                    <p className="w-full flex justify-center">Benefits</p>
                    <p className="w-full flex justify-center">Premium</p>
                    <p className="w-full flex justify-center">Coverage</p>
                    <p className="w-full flex justify-center">Coverage Periodicity</p>
                  </div>
                </div> */}
                <div className="w-full flex flex-col gap-y-2">
                  {data?.map((item, i) => i < no && <NineTypeMapper key={i} item={item} showTitleName={i === 0} />)}
                </div>
              </div>
            )
          } else if (data[0].items?.length === 5) {
            return (
              <div className="w-full flex flex-col gap-y-2">
                {/* <div className="flex items-center w-full gap-x-4">
                  <div style={{ flex: '1 1 15%' }} />
                  <div style={{ flex: '1 1 80%' }} className="w-full flex gap-x-4">
                    <p className="flex w-full justify-center">Benefits</p>
                    <p className="flex w-full justify-center">Mode of Payment </p>
                    <p className="flex w-full justify-center">Limit</p>
                    <p className="flex w-full justify-center">Coverage</p>
                    <p className="flex w-full justify-center">Coverage Periodicity</p>
                  </div>
                </div> */}
                <div className="w-full flex flex-col gap-y-2">
                  {data?.map((item, i) => i < no && <NineTypeMapper key={i} item={item} showTitleName={i === 0} />)}
                </div>
              </div>
            )
          }
        }
        return (
          <div className="w-full flex flex-col gap-y-2">{data?.map((item, i) => i < no && <NineTypeMapper key={i} item={item} />)}</div>
        )
      }
    }
  }, [value1])

  // useEffect(() => {
  //   saveUniqueValues(value1)
  // }, [value1])

  return (
    <div>
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
              // value={value1}
              // onChange={({ target: { value } }) => handleBenefitValidation(value)}
              placeholder={benefits[selectedBidId][record.benefitOrder].currentValue}
              // onMouseLeave={({ target: { value } }) => setError(false)}
              // onBlur={({ target: { value } }) => setError(false)}
            />
          </div>
        </Tooltip>
      </div>
      <div className="py-2">{childContent()}</div>
    </div>
  )
}
export default React.memo(SixInputInt)
