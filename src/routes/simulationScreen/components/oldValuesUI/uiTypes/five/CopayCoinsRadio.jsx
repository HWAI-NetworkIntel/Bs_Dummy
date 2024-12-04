import { Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import CopayInput from './CopayInput'
import { handleBenefits, restoreEhcValues } from '../../../../reducer/BenefitsSlice'
import { useDispatch, useSelector } from 'react-redux'

const CopayCoinsRadio = ({ copayCoinsItem, getPreviousValueIfAny, list, changeSetToNull, setToNull }) => {
  const { selectedBidId } = useSelector((state) => state.benefits)

  const dispatch = useDispatch()
  const [radioValue, setRadioValue] = useState('')
  const [allInput, setAllInputs] = useState({
    Coinsurance: { 0: '', 1: '' },
    Copayment: { 0: '', 1: '' },
  })
  const [allError, setAllError] = useState({
    Coinsurance: { 0: false, 1: false },
    Copayment: { 0: false, 1: false },
  })
  useEffect(() => {
    setRadioValue(getPreviousValueIfAny)
  }, [getPreviousValueIfAny])
  return (
    <>
      <Radio.Group
        // onChange={({ target: { value } }) => {
        //   changeSetToNull(setToNull + 1)
        //   setRadioValue(value)
        //   list?.forEach((item, i) => {
        //     if (item?.dependentOnEhc !== 0) {
        //       dispatch(
        //         restoreEhcValues({
        //           bidId: selectedBidId,
        //           id: item?.dependentOnEhc,
        //           values: [item?.orderOfEhc],
        //         })
        //       )
        //     }
        //     dispatch(handleBenefits({ bidId: selectedBidId, index: item.benefitOrder, value: '' }))
        //   })
        //   setAllInputs({
        //     Coinsurance: { 0: '', 1: '' },
        //     Copayment: { 0: '', 1: '' },
        //   })
        // }}
        value={radioValue}
      >
        <div className="flex gap-x-4">
          {Object.keys(copayCoinsItem)?.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-y-4 w-56">
              <Radio value={item}> {item}</Radio>
              {item === radioValue && (
                <div className="flex flex-col gap-y-4 items-start">
                  {copayCoinsItem[item]?.map((singleDataItem, i) => (
                    <CopayInput
                      key={i}
                      i={i}
                      renderingItem={item}
                      singleDataItem={singleDataItem}
                      allInput={allInput}
                      renderingList={copayCoinsItem}
                      setAllInputs={setAllInputs}
                      allError={allError}
                      setAllError={setAllError}
                    />
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
export default React.memo(CopayCoinsRadio)
