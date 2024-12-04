import { Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleBenefits, removeFromErrorBenefitNamesList } from '../../../reducer/BenefitsSlice'
import { getAllChildBenefitOrders } from '../../../utils/Benefits'
import OneBenefitMapper from './OneBenefitMapper'

const CustomRadioOne = ({ list }) => {
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const dispatch = useDispatch()
  const [value, setValue] = useState()
  const onChange = (e) => {
    list?.forEach((element) => {
      if (element.benefitOrder === e.target.value) {
        dispatch(handleBenefits({ bidId: selectedBidId, index: element.benefitOrder, value: 'Yes' }))
      } else {
        dispatch(handleBenefits({ bidId: selectedBidId, index: element.benefitOrder, value: 'No' }))
      }
      if (element.child?.length > 0) {
        getAllChildBenefitOrders(element.child)?.forEach((order) => {
          dispatch(handleBenefits({ bidId: selectedBidId, index: order, value: '' }))
          dispatch(removeFromErrorBenefitNamesList(`${element.benefitGroup}-${order}`))
        })
      }
    })
    setValue(e.target.value)
  }
  useEffect(() => {
    if (list?.length > 0) {
      list.forEach((element) => {
        if (benefits[selectedBidId][element.benefitOrder].newValue.includes('Y')) {
          setValue(element.benefitOrder)
        }
      })
    }
  }, [list])
  return (
    <Radio.Group onChange={onChange} value={value} className="w-full gap-x-4 flex  p-2 rounded  overflow-hidden m-auto gap-y-2">
      {list?.map((item, index) => (
        <div key={index} style={{ flex: '1 1 48%' }} className="w-full flex items-center gap-y-4 flex-col">
          <Radio value={item.benefitOrder}>{item.benefitDescription?.includes('Coinsurance') ? 'Coinsurance' : 'Copayment'}</Radio>
          <div className="w-full flex flex-col items-center gap-y-4">
            {value === item.benefitOrder && item.child?.map((record, i) => <OneBenefitMapper item={record} key={i} />)}
          </div>
        </div>
      ))}
    </Radio.Group>
  )
}
export default React.memo(CustomRadioOne)
