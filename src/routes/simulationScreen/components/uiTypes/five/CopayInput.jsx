import React from 'react'
import { Input, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { handleBenefits, handleCopayCoins } from '../../../reducer/BenefitsSlice'
import { BENEFIT_DATA_TYPES, CUSTOM_CHECKBOX } from '../../../constants'
import { removeSymbolsFromInput, tooltipGenerator } from '../../../utils/General'

const CopayInput = ({ i, renderingItem, singleDataItem, allInput, renderingList, setAllInputs, allError, setAllError }) => {
  const { benefits, selectedBidId, copayCoins, errorBenefitNameList } = useSelector((state) => state.benefits)
  const dispatch = useDispatch()
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
      if (allInput[renderingItem][1]) {
        if (parseFloat(allInput[renderingItem][1]) < parseFloat(inputValue)) {
          setAllInputs({
            ...allInput,
            [renderingItem]: { 0: inputValue, 1: inputValue },
          })
          saveUniqueValues(inputValue, list[renderingItem][1])
        }
      } else {
        if (allInput[renderingItem][1] < inputValue) {
          setAllInputs({
            ...allInput,
            [renderingItem]: { 0: inputValue, 1: inputValue },
          })
          saveUniqueValues(inputValue, list[renderingItem][1])
        }
      }
    }
    if (i === 1) {
      if (parseFloat(allInput[renderingItem][0]) > parseFloat(inputValue)) {
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
      list['Copayment']?.forEach((obj) => {
        saveUniqueValues('  ', obj)
      })
    }
    if (renderingItem === 'Copayment') {
      list['Coinsurance']?.forEach((obj) => {
        saveUniqueValues('  ', obj)
      })
    }
  }

  const handleInputChanges = (inputValue, i, list, renderingItem, singleDataItem) => {
    const reg = /^-?\d*(\.\d*)?$/
    const allowedConditions = reg.test(inputValue) || inputValue === ''
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
  return (
    <div className="flex items-center gap-x-2">
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
                setAllError({
                  ...allError,
                  [renderingItem]: { 0: false, 1: false },
                })
                handleInputChanges(value, i, renderingList, renderingItem, singleDataItem)
              }}
              placeholder={removeSymbolsFromInput(benefits[selectedBidId][singleDataItem.benefitOrder].newValue)}
              onMouseLeave={({ target: { value } }) => {
                setAllError({
                  ...allError,
                  [renderingItem]: { 0: false, 1: false },
                })
                if (value) {
                  if (parseFloat(allInput[renderingItem][0]) > parseFloat(allInput[renderingItem][1])) {
                    handleInputChanges(allInput[renderingItem][0], 1, renderingList, renderingItem, renderingList[renderingItem][1])
                  } else {
                    handleInputChanges(value, i, renderingList, renderingItem, singleDataItem)
                  }
                }
              }}
              onBlur={({ target: { value } }) => {
                setAllError({
                  ...allError,
                  [renderingItem]: { 0: false, 1: false },
                })
                if (value) {
                  if (parseFloat(allInput[renderingItem][0]) > parseFloat(allInput[renderingItem][1])) {
                    handleInputChanges(allInput[renderingItem][0], 1, renderingList, renderingItem, renderingList[renderingItem][1])
                  } else {
                    handleInputChanges(value, i, renderingList, renderingItem, singleDataItem)
                  }
                } else {
                  if (
                    removeSymbolsFromInput(benefits[selectedBidId][renderingList[renderingItem][1]?.benefitOrder].newValue) === '0' &&
                    removeSymbolsFromInput(benefits[selectedBidId][renderingList[renderingItem][0]?.benefitOrder].newValue) === '0'
                  ) {
                  } else if (
                    removeSymbolsFromInput(benefits[selectedBidId][renderingList[renderingItem][1]?.benefitOrder].newValue) === '' &&
                    removeSymbolsFromInput(benefits[selectedBidId][renderingList[renderingItem][0]?.benefitOrder].newValue) === ''
                  ) {
                  } else if (
                    benefits[selectedBidId][renderingList[renderingItem][1]?.benefitOrder].newValue === 'NC' &&
                    benefits[selectedBidId][renderingList[renderingItem][0]?.benefitOrder].newValue === 'NC'
                  ) {
                  } else if (allInput[renderingItem][1] === '' && allInput[renderingItem][0] === '') {
                  } else {
                    if (i === 0) {
                      handleInputChanges(
                        removeSymbolsFromInput(benefits[selectedBidId][renderingList[renderingItem][1]?.benefitOrder].newValue),
                        0,
                        renderingList,
                        renderingItem,
                        renderingList[renderingItem][0]
                      )
                      //   handleInputChanges(allInput[renderingItem][1], 0, renderingList, renderingItem, renderingList[renderingItem][0])
                    } else {
                      handleInputChanges(
                        removeSymbolsFromInput(benefits[selectedBidId][renderingList[renderingItem][0]?.benefitOrder].newValue),
                        1,
                        renderingList,
                        renderingItem,
                        renderingList[renderingItem][1]
                      )
                      // handleInputChanges(allInput[renderingItem][0], 1, renderingList, renderingItem, renderingList[renderingItem][1])
                    }
                  }
                }
              }}
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
  )
}
export default React.memo(CopayInput)
