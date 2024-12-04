import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CUSTOM_CHECKBOX } from '../constants'
import { addEhcValues, removeEhcValues } from '../reducer/BenefitsSlice'
import { removeSymbolsFromInput } from '../utils/General'

const useGetPreviousValueIfAny = (copayCoinsList) => {
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const dispatch = useDispatch()
  const [previousValueIsPresentAs, setPreviousValueIsPresentAs] = useState(null)

  const copayItem = copayCoinsList.filter((item) => item.benefitDescription?.includes('Copayment'))
  const coinsItem = copayCoinsList.filter((item) => item.benefitDescription?.includes('Coinsurance'))
  const getPreviousValueIfAny = () => {
    if (copayCoinsList?.length > 0) {
      let result = []
      copayCoinsList?.forEach((obj) => {
        if (benefits[selectedBidId][obj.benefitOrder].newValue.length > 0) {
          if (
            !benefits[selectedBidId][obj.benefitOrder].newValue.includes('NC') &&
            !benefits[selectedBidId][obj.benefitOrder].newValue.includes(' ')
          ) {
            if (benefits[selectedBidId][obj.benefitOrder].benefitDescription.includes(CUSTOM_CHECKBOX.coinsurance)) {
              result.push({
                name: CUSTOM_CHECKBOX.coinsurance,
                value: removeSymbolsFromInput(benefits[selectedBidId][obj.benefitOrder].newValue),
                id: obj.benefitOrder,
              })
            }
            if (benefits[selectedBidId][obj.benefitOrder].benefitDescription.includes(CUSTOM_CHECKBOX.copayment)) {
              result.push({
                name: CUSTOM_CHECKBOX.copayment,
                value: removeSymbolsFromInput(benefits[selectedBidId][obj.benefitOrder].newValue),
                id: obj.benefitOrder,
              })
            }
          }
        }
      })
      if (result?.length > 0) {
        // result.forEach((obj) => {
        //   if (obj.value.includes(' ')) {
        //     obj.value = '0'
        //   }
        // })
        const maxValue = Math.max(...result.map((o) => parseInt(o.value)))
        let i = result?.findLastIndex((item) => parseInt(removeSymbolsFromInput(item.value)) === maxValue)
        if (i !== -1) {
          setPreviousValueIsPresentAs(result[i].name)
        }
      }
    }
  }
  const isThereAnyValueChange = (list) => {
    let valueChanges = []
    list.forEach((obj, i) => {
      if (benefits[selectedBidId][obj.benefitOrder].newValue !== benefits[selectedBidId][obj.benefitOrder].currentValue) {
        valueChanges.push(benefits[selectedBidId][obj.benefitOrder])
      }
    })
    return valueChanges?.length > 0 ? true : false
  }
  // handles binary ehc values on values change
  useEffect(() => {
    if (copayCoinsList[0]?.dependentOnEhc !== 0) {
      if (isThereAnyValueChange(copayCoinsList)) {
        if (previousValueIsPresentAs) {
          if (previousValueIsPresentAs === 'Coinsurance') {
            // add additional ehc
            // add ehc for coins
            // remove ehc for copay
            if (copayCoinsList[0]?.dependentOnAdditionalEhc !== 0) {
              dispatch(
                addEhcValues({
                  bidId: selectedBidId,
                  id: copayCoinsList[0]?.dependentOnAdditionalEhc,
                  values: [copayCoinsList[0]?.additionalEhcOrder],
                })
              )
            }
            dispatch(
              addEhcValues({
                bidId: selectedBidId,
                id: coinsItem[0]?.dependentOnEhc,
                values: [coinsItem[0]?.orderOfEhc],
              })
            )
            if (copayItem?.length > 0) {
              dispatch(
                removeEhcValues({
                  bidId: selectedBidId,
                  id: copayItem[0]?.dependentOnEhc,
                  values: [copayItem[0]?.orderOfEhc],
                })
              )
            }
          } else {
            // add additional ehc
            // add ehc for copay
            // remove ehc for coins
            if (copayCoinsList[0]?.dependentOnAdditionalEhc !== 0) {
              dispatch(
                addEhcValues({
                  bidId: selectedBidId,
                  id: copayCoinsList[0]?.dependentOnAdditionalEhc,
                  values: [copayCoinsList[0]?.additionalEhcOrder],
                })
              )
            }
            dispatch(
              addEhcValues({
                bidId: selectedBidId,
                id: copayItem[0]?.dependentOnEhc,
                values: [copayItem[0]?.orderOfEhc],
              })
            )
            if (coinsItem?.length > 0) {
              dispatch(
                removeEhcValues({
                  bidId: selectedBidId,
                  id: coinsItem[0]?.dependentOnEhc,
                  values: [coinsItem[0]?.orderOfEhc],
                })
              )
            }
          }
        } else {
          // remove additional ehc
          // remove ehc for copay
          // remove ehc for coins
          if (copayCoinsList[0]?.dependentOnAdditionalEhc !== 0) {
            dispatch(
              removeEhcValues({
                bidId: selectedBidId,
                id: copayCoinsList[0]?.dependentOnAdditionalEhc,
                values: [copayCoinsList[0]?.additionalEhcOrder],
              })
            )
          }
          if (copayItem?.length > 0) {
            dispatch(
              removeEhcValues({
                bidId: selectedBidId,
                id: copayItem[0]?.dependentOnEhc,
                values: [copayItem[0]?.orderOfEhc],
              })
            )
          }
          if (coinsItem?.length > 0) {
            dispatch(
              removeEhcValues({
                bidId: selectedBidId,
                id: coinsItem[0]?.dependentOnEhc,
                values: [coinsItem[0]?.orderOfEhc],
              })
            )
          }
        }
      }
    }
  }, [previousValueIsPresentAs])

  useEffect(() => {
    getPreviousValueIfAny()
  }, [benefits])

  return [previousValueIsPresentAs]
}

export default useGetPreviousValueIfAny
