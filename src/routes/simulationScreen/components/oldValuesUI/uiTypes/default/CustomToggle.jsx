import { Switch } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleBenefits } from '../../../../reducer/BenefitsSlice'

const CustomToggle = ({ item }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  
  const currentValue =
    benefits[selectedBidId][item.benefitOrder].currentValue.includes('Y') || benefits[selectedBidId][item.benefitOrder].currentValue === '1'

  const onChangeHandler = (isChecked) => {
    if (isChecked !== currentValue) {
      let valueToInsert = item.currentValue.length === 1 ? (isChecked ? '1' : '0') : isChecked ? 'Yes' : 'No'
      dispatch(handleBenefits({ bidId: selectedBidId, index: item.benefitOrder, value: valueToInsert }))
    }
    if (isChecked === currentValue) {
      dispatch(handleBenefits({ bidId: selectedBidId, index: item.benefitOrder, value: '' }))
    }
  }

  return (
    <div className="flex w-full overflow-hidden px-2 justify-between items-center gap-x-10 shadow-cards">
      <p
        className="text-[#333333] py-2"
        style={{
          // color: `${
          //   benefits[selectedBidId][item.benefitOrder].currentValue !== benefits[selectedBidId][item.benefitOrder].currentValue &&
          //   benefits[selectedBidId][item.benefitOrder].currentValue !== ''
          //     ? '#5C276E'
          //     : ''
          // }`,
        }}
      >
        {' '}
        {item.benefitDescription}{' '}
      </p>
      <Switch
        disabled
        checkedChildren="Yes"
        unCheckedChildren="No"
        className=" bg-gray-400"
        defaultChecked={currentValue}
        onChange={(isChecked) => {
          // onChangeHandler(isChecked)
        }}
      />
    </div>
  )
}
export default React.memo(CustomToggle)
