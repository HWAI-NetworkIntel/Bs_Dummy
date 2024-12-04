import { Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CUSTOM_CHECKBOX } from '../../constants'
import { handleBenefits } from '../../reducer/BenefitsSlice'
import { modifiyListAsPerCopayOrCoins } from '../../utils/Benefits'
import { removeSymbolsFromInput } from '../../utils/General'
import CustomInput from './CustomInput'
import CopayCoinsCard from '../uiTypes/five/CopayCoinsCard'

const CustomRadio = ({ list }) => {
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [previousValueAsCopayOrCoins, setPreviousValueAsCopayOrCoins] = useState('')
  const [value, setValue] = useState('')
  const [setToNull, changeSetToNull] = useState(0)

  const [modifiedList, setModifiedList] = useState({})
  const dispatch = useDispatch()
  const getPresentValueNameAsCopayOrCoins = (list) => {
    let result = []
    list?.forEach((item) => {
      if (benefits[selectedBidId][item.benefitOrder].newValue.length > 0) {
        if (!benefits[selectedBidId][item.benefitOrder].newValue.includes('NC')) {
          if (benefits[selectedBidId][item.benefitOrder].benefitDescription.includes(CUSTOM_CHECKBOX.coinsurance)) {
            result.push({
              name: CUSTOM_CHECKBOX.coinsurance,
              value: removeSymbolsFromInput(benefits[selectedBidId][item.benefitOrder].newValue),
            })
          }
          if (benefits[selectedBidId][item.benefitOrder].benefitDescription.includes(CUSTOM_CHECKBOX.copayment)) {
            result.push({
              name: CUSTOM_CHECKBOX.copayment,
              value: removeSymbolsFromInput(benefits[selectedBidId][item.benefitOrder].newValue),
            })
          }
        }
      }
    })

    if (result?.length > 0) {
      const maxValue = Math.max(...result.map((o) => parseInt(o.value)))
      let i = result?.findIndex((item) => parseInt(removeSymbolsFromInput(item.value)) === maxValue)
      if (i !== -1 && result?.length === 1) {
        setPreviousValueAsCopayOrCoins(result[i].name)
      } else {
        if (result?.length === 2) {
          list?.forEach((item) => {
            if (benefits[selectedBidId][item.benefitOrder].newValue.length > 0) {
              if (!benefits[selectedBidId][item.benefitOrder].newValue.includes('NC')) {
                if (benefits[selectedBidId][item.benefitOrder].benefitDescription.includes(CUSTOM_CHECKBOX.coinsurance)) {
                  if (benefits[selectedBidId][item.benefitOrder].newValue !== benefits[selectedBidId][item.benefitOrder].currentValue) {
                    setPreviousValueAsCopayOrCoins('Coinsurance')
                  }
                }
                if (benefits[selectedBidId][item.benefitOrder].benefitDescription.includes(CUSTOM_CHECKBOX.copayment)) {
                  if (benefits[selectedBidId][item.benefitOrder].newValue !== benefits[selectedBidId][item.benefitOrder].currentValue) {
                    setPreviousValueAsCopayOrCoins('Copayment')
                  }
                }
              }
            }
          })
        }
      }
    }
  }
  const onChangeHandler = (e) => {
    setValue(e.target.value)
    list?.forEach((item) => {
      dispatch(handleBenefits({ bidId: selectedBidId, index: item.benefitOrder, value: '' }))
    })
  }
  useEffect(() => {
    if (list?.length > 0) {
      setModifiedList(modifiyListAsPerCopayOrCoins(list))
      getPresentValueNameAsCopayOrCoins(list)
    }
  }, [list])
  useEffect(() => {
    setValue(previousValueAsCopayOrCoins)
  }, [previousValueAsCopayOrCoins])
  useEffect(() => {
    if (list?.length > 0) {
      getPresentValueNameAsCopayOrCoins(list)
    }
  }, [benefits])
  return (
    <>
      <Radio.Group value={value} onChange={(e) => onChangeHandler(e)}>
        <div className="flex gap-x-4">
          {Object.keys(modifiedList)?.map((item, i) => {
            if (modifiedList[item]?.length > 1) {
              return <CopayCoinsCard getPreviousValueIfAny={previousValueAsCopayOrCoins} changeSetToNull={changeSetToNull} setToNull={setToNull} list={modifiedList[item]} key={i} />
            } else {
              return (
                <div key={i} className="flex flex-col gap-y-4">
                  <Radio value={item}> {item} </Radio>
                  {value === item && (
                    <div className="flex flex-col gap-y-4 items-start">
                      {modifiedList[item]?.map((listItem, ii) => (
                        <div className="flex items-center" key={ii}>
                          <CustomInput record={listItem} key={ii} hideTitle />
                          {listItem.benefitDescription.includes('Minimum') && <p className="text-sm">MIN</p>}
                          {listItem.benefitDescription.includes('Maximum') && <p className="text-sm">MAX</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
          })}
        </div>
      </Radio.Group>
    </>
  )
}
export default React.memo(CustomRadio)
