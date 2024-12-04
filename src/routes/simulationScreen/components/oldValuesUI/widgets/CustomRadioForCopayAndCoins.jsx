import { Input, Radio, Tooltip } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BENEFIT_DATA_TYPES, CUSTOM_CHECKBOX, EMPTY_STRING } from '../../../constants'
import { handleBenefits, handleCopayCoins } from '../../../reducer/BenefitsSlice'
import { removeSymbolsFromInput, tooltipGenerator } from '../../../utils/General'

const CustomRadioForCopayAndCoins = ({ list1 }) => {
  const [renderingList, setRenderingList] = useState({})
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [coin, setCoin] = useState(false)
  const [previousValueIsPresentAs, setPreviousValueIsPresentAs] = useState('')
  const dispatch = useDispatch()
  const [copay, setCopay] = useState(false)
  const [value1, setValue1] = useState(EMPTY_STRING)
  const [allInput, setAllInputs] = useState({
    Coinsurance: { 0: '', 1: '' },
    Copayment: { 0: '', 1: '' },
  })
  const [allError, setAllError] = useState({
    Coinsurance: { 0: false, 1: false },
    Copayment: { 0: false, 1: false },
  })

  const dataModifier = () => {
    let obj = {}
    list1.forEach((k) => {
      k.child?.forEach((d) => {
        if (d.benefits.includes(CUSTOM_CHECKBOX.coins) || d.benefits.includes(CUSTOM_CHECKBOX.copay)) {
          if (d.benefits.includes(CUSTOM_CHECKBOX.coins)) {
            if (CUSTOM_CHECKBOX.coinsurance in obj) {
              obj.Coinsurance.push(d)
            } else {
              obj[CUSTOM_CHECKBOX.coinsurance] = [d]
            }
          } else {
            if (CUSTOM_CHECKBOX.copayment in obj) {
              obj.Copayment.push(d)
            } else {
              obj[CUSTOM_CHECKBOX.copayment] = [d]
            }
          }
        }
      })
    })
    return obj
  }
  useEffect(() => {
    if (list1?.length > 0) {
      setRenderingList(dataModifier)
    }
  }, [list1])
  // saves unique values only else removes from changed array in reducer
  const saveUniqueValues = (e, obj) => {
    if (e?.length > 0) {
      if (obj.currentValue?.replace('%', '')?.replace(',', '')?.replace('$', '') !== e) {
        if (e === '  ') {
          if (obj.currentValue === 'NC' && obj.benefitDescription.includes('Copayment')) {
            e = ' ' + '$NC'
            dispatch(handleCopayCoins({ bidId: selectedBidId, benefitOrder: obj.benefits }))
          } else {
            e = ' ' + obj.currentValue
            dispatch(handleCopayCoins({ bidId: selectedBidId, benefitOrder: obj.benefits }))
          }
        }
        let changedBenefit =
          obj.benefitDataType === BENEFIT_DATA_TYPES.percent || obj.benefitDataType === BENEFIT_DATA_TYPES.ncPercent
            ? /\%/.test(e)
              ? e
              : e + '%'
            : /\$/.test(e)
            ? e
            : '$' + e

        dispatch(handleBenefits({ bidId: selectedBidId, index: obj.benefitOrder, value: changedBenefit }))
      }
      if (obj.currentValue?.replace('%', '')?.replace(',', '')?.replace('$', '') === e) {
        dispatch(handleBenefits({ bidId: selectedBidId, index: obj.benefitOrder, value: '' }))
      }
    } else {
      dispatch(handleBenefits({ bidId: selectedBidId, index: obj.benefitOrder, value: '' }))
    }
  }

  const handleNumericChange = (inputValue, i, list, renderingItem, singleDataItem) => {
    if (i === 0) {
      saveUniqueValues(inputValue, singleDataItem)
      setAllInputs({
        ...allInput,
        [renderingItem]: { ...allInput[renderingItem], [i]: inputValue },
      })
      if (allInput[renderingItem][1] < inputValue) {
        setAllInputs({
          ...allInput,
          [renderingItem]: { 0: inputValue, 1: inputValue },
        })
        saveUniqueValues(inputValue, list[renderingItem][1])
      }
    }
    if (i === 1) {
      if (allInput[renderingItem][0] > inputValue) {
        setAllInputs({
          ...allInput,
          [renderingItem]: { ...allInput[renderingItem], [i]: inputValue },
        })
        setAllError({ ...allError, [renderingItem]: { ...allError[renderingItem], [i]: true } })
      } else {
        if (allInput[renderingItem][0]) {
          setAllInputs({
            ...allInput,
            [renderingItem]: { ...allInput[renderingItem], [i]: inputValue },
          })
        } else {
          setAllInputs({
            ...allInput,
            [renderingItem]: { 0: inputValue, 1: inputValue },
          })
        }
        saveUniqueValues(inputValue, singleDataItem)
      }
    }
    if (renderingItem === 'Coinsurance') {
      list['Copayment'].forEach((obj) => {
        saveUniqueValues('  ', obj)
      })
    }
    if (renderingItem === 'Copayment') {
      list['Coinsurance'].forEach((obj) => {
        saveUniqueValues('  ', obj)
      })
    }
  }

  const handleInputChanges = (inputValue, i, list, renderingItem, singleDataItem) => {
    const reg = /^-?\d*(\.\d*)?$/
    const allowedConditions = reg.test(inputValue) || inputValue === EMPTY_STRING
    if (allowedConditions) {
      if (parseFloat(inputValue) > parseFloat(singleDataItem?.range?.split('|')[1]) || inputValue === '-') {
        setAllError({ ...allError, [renderingItem]: { ...allError[renderingItem], [i]: true } })
      } else {
        setAllError({ ...allError, [renderingItem]: { 0: false, 1: false } })
        handleNumericChange(inputValue, i, list, renderingItem, singleDataItem)
      }
    } else {
      setAllError({ ...allError, [renderingItem]: { ...allError[renderingItem], [i]: true } })
    }
  }

  const onToggleChangeHandler = ({ target }, dontRefresh = false) => {
    if (!dontRefresh) {
      setAllInputs({
        Coinsurance: { 0: '', 1: '' },
        Copayment: { 0: '', 1: '' },
      })
      list1?.forEach((record) => {
        record.child?.forEach((item) => {
          dispatch(handleBenefits({ bidId: selectedBidId, index: item.benefitOrder, value: '' }))
        })
      })
    }
    let value1 = target.value
    setValue1(value1)
    if (value1 === CUSTOM_CHECKBOX.coinsurance) {
      setCoin(true)
      setCopay(false)
      !dontRefresh &&
        list1.forEach((el) => {
          if (el.benefits.includes(CUSTOM_CHECKBOX.coins)) {
            dispatch(handleBenefits({ bidId: selectedBidId, index: el.benefitOrder, value: 'Yes' }))
          } else {
            dispatch(handleBenefits({ bidId: selectedBidId, index: el.benefitOrder, value: 'No' }))
          }
        })
    } else {
      setCoin(false)
      setCopay(true)
      !dontRefresh &&
        list1.forEach((el) => {
          if (el.benefits.includes(CUSTOM_CHECKBOX.coins)) {
            dispatch(handleBenefits({ bidId: selectedBidId, index: el.benefitOrder, value: 'No' }))
          } else {
            dispatch(handleBenefits({ bidId: selectedBidId, index: el.benefitOrder, value: 'Yes' }))
          }
        })
    }
  }

  const title = (data) => (
    <span style={{ visibility: 'visible !important' }} className="custom-tooltiptext">
      {tooltipGenerator(data.range).replace('NC/', '')}
    </span>
  )

  const errorTitleHandler = (renderingItem, i, singleDataItem) => {
    if (i === 0) {
      return title(singleDataItem)
    } else {
      if (allInput[renderingItem][1]) {
        if (parseFloat(allInput[renderingItem][0]) > parseFloat(allInput[renderingItem][1])) {
          return 'Maximum value cannot be less than minimum value'
        }
        return title(singleDataItem)
      }
      return 'Maximum value cannot be less than minimum value'
    }
  }
  const getPreviousValueIfAny = useCallback(() => {
    if (list1?.length > 0) {
      let result = []
      list1?.forEach((obj) => {
        obj?.child?.forEach((item) => {
          if (benefits[selectedBidId][item.benefitOrder].currentValue.length > 0) {
            if (!benefits[selectedBidId][item.benefitOrder].currentValue.includes('NC')) {
              if (benefits[selectedBidId][item.benefitOrder].benefitDescription.includes(CUSTOM_CHECKBOX.coinsurance)) {
                result.push({
                  name: CUSTOM_CHECKBOX.coinsurance,
                  value: removeSymbolsFromInput(benefits[selectedBidId][item.benefitOrder].currentValue),
                })
              }
              if (benefits[selectedBidId][item.benefitOrder].benefitDescription.includes(CUSTOM_CHECKBOX.copayment)) {
                result.push({
                  name: CUSTOM_CHECKBOX.copayment,
                  value: removeSymbolsFromInput(benefits[selectedBidId][item.benefitOrder].currentValue),
                })
              }
            }
          }
        })
      })
      if (result?.length > 0) {
        const maxValue = Math.max(...result.map((o) => parseInt(o.value)))
        let i = result?.findIndex((item) => parseInt(removeSymbolsFromInput(item.value)) === maxValue)
        if (i !== -1) {
          setPreviousValueIsPresentAs(result[i].name)
        }
      }
    }
  }, [benefits])

  useEffect(() => {
    if (previousValueIsPresentAs) {
      let customObj = { target: { value: previousValueIsPresentAs } }
      onToggleChangeHandler(customObj, true)
      Object.keys(renderingList).length > 0 &&
        Object.keys(renderingList).forEach((el) => {
          if (
            benefits[selectedBidId][renderingList[el][0].benefitOrder].currentValue !==
            benefits[selectedBidId][renderingList[el][0].benefitOrder].currentValue
          ) {
            setAllInputs((prev) => ({
              ...prev,
              [el]: {
                0: removeSymbolsFromInput(benefits[selectedBidId][renderingList[el][0].benefitOrder].currentValue),
                1: removeSymbolsFromInput(benefits[selectedBidId][renderingList[el][1].benefitOrder].currentValue),
              },
            }))
          }
        })
    }
  }, [previousValueIsPresentAs])

  useEffect(() => {
    if (list1?.length > 0) {
      getPreviousValueIfAny()
    }
  }, [list1])

  return (
    <>
      <Radio.Group onChange={(e) => onToggleChangeHandler(e)} value={value1}>
        <div className="flex gap-x-4">
          {Object.keys(renderingList)?.map((renderingItem, ii) => (
            <div key={ii} className="flex flex-col items-center gap-y-4 w-56">
              <Radio disabled value={renderingItem}> {renderingItem} </Radio>
              {((renderingItem === CUSTOM_CHECKBOX.coinsurance && coin) || (renderingItem === CUSTOM_CHECKBOX.copayment && copay)) && (
                <div className="flex flex-col gap-y-4 items-start">
                  {renderingList[renderingItem]?.map((singleDataItem, i) => (
                    <div key={i} className="flex items-center gap-x-2">
                      <div className="flex w-full justify-between items-center gap-x-10">
                        <Tooltip
                          open={allError[renderingItem][i]}
                          trigger={['focus']}
                          title={errorTitleHandler(renderingItem, i, singleDataItem)}
                          placement="left"
                          overlayClassName="numeric-input"
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: 140,
                            }}
                          >
                            <p className="mb-0 w-4 text-sm">
                              {(singleDataItem.benefitDataType === BENEFIT_DATA_TYPES.money ||
                                singleDataItem.benefitDataType === BENEFIT_DATA_TYPES.ncMoney) &&
                                '$'}
                            </p>
                            <Input
                              style={{
                                width: 100,
                              }}
                              value={allInput[renderingItem][i]}
                              onChange={({ target: { value } }) => {
                                // setAllError({
                                //   ...allError,
                                //   [renderingItem]: { 0: false, 1: false },
                                // })
                                // handleInputChanges(value, i, renderingList, renderingItem, singleDataItem)
                              }}
                              placeholder={removeSymbolsFromInput(singleDataItem.currentValue)}
                              // onMouseLeave={({ target: { value } }) => {
                              //   setAllError({
                              //     ...allError,
                              //     [renderingItem]: { 0: false, 1: false },
                              //   })
                              //   if (value) {
                              //     if (parseFloat(allInput[renderingItem][0]) > parseFloat(allInput[renderingItem][1])) {
                              //       handleInputChanges(
                              //         allInput[renderingItem][0],
                              //         1,
                              //         renderingList,
                              //         renderingItem,
                              //         renderingList[renderingItem][1]
                              //       )
                              //     } else {
                              //       handleInputChanges(value, i, renderingList, renderingItem, singleDataItem)
                              //     }
                              //   }
                              // }}
                              // onBlur={({ target: { value } }) => {
                              //   setAllError({
                              //     ...allError,
                              //     [renderingItem]: { 0: false, 1: false },
                              //   })
                              //   if (value) {
                              //     if (parseFloat(allInput[renderingItem][0]) > parseFloat(allInput[renderingItem][1])) {
                              //       handleInputChanges(
                              //         allInput[renderingItem][0],
                              //         1,
                              //         renderingList,
                              //         renderingItem,
                              //         renderingList[renderingItem][1]
                              //       )
                              //     } else {
                              //       handleInputChanges(value, i, renderingList, renderingItem, singleDataItem)
                              //     }
                              //   } else {
                              //     if (i === 0) {
                              //       handleInputChanges(
                              //         allInput[renderingItem][1],
                              //         0,
                              //         renderingList,
                              //         renderingItem,
                              //         renderingList[renderingItem][0]
                              //       )
                              //     } else {
                              //       handleInputChanges(
                              //         allInput[renderingItem][0],
                              //         1,
                              //         renderingList,
                              //         renderingItem,
                              //         renderingList[renderingItem][1]
                              //       )
                              //     }
                              //   }
                              // }}
                            />
                            <p className="mb-0 w-4 text-sm">
                              {(singleDataItem.benefitDataType === BENEFIT_DATA_TYPES.percent ||
                                singleDataItem.benefitDataType === BENEFIT_DATA_TYPES.ncPercent) &&
                                '%'}
                            </p>
                          </div>
                        </Tooltip>
                      </div>
                      <p className="text-sm">{i === 0 ? CUSTOM_CHECKBOX.min : CUSTOM_CHECKBOX.max} </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Radio.Group>
    </>
  )
}
export default React.memo(CustomRadioForCopayAndCoins)
