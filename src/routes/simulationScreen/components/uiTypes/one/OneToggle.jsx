import { Switch } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleBenefits, removeFromErrorBenefitNamesList } from '../../../reducer/BenefitsSlice'
import { getAllChildBenefitOrders } from '../../../utils/Benefits'
import CustomRadioOne from './CustomRadioOne'

const OneToggle = ({ item, hideTitle }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [isChecked, setIsChecked] = useState(benefits[selectedBidId][item.benefitOrder]?.newValue === 'Yes' ? true : false)

  // renders child items if checked
  const childContent = useCallback(() => {
    if (isChecked) {
      return (
        <div className="flex flex-wrap w-full gap-2 ">
          <CustomRadioOne list={item.child} />
        </div>
      )
    }
  }, [isChecked])

  // if uncheck then restore error and values in reducer
  const restoreToDefault = useCallback(() => {
    if (!isChecked) {
      if (item.child?.length > 0) {
        getAllChildBenefitOrders(item.child)?.forEach((order) => {
          dispatch(handleBenefits({ bidId: selectedBidId, index: order, value: '' }))
          dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${order}`))
        })
      }
    }
  }, [isChecked])

  useEffect(() => {
    restoreToDefault()
  }, [isChecked])

  return (
    <div className={`w-full flex flex-wrap gap-x-4 ${!hideTitle && 'shadow-cards'}`}>
      <div className="flex overflow-hidden p-2 justify-between items-center gap-x-10 w-full">
        {!hideTitle && (
          <p
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
        <Switch
          checkedChildren="Yes"
          unCheckedChildren="No"
          className=" bg-gray-400"
          onChange={(isChecked) => {
            setIsChecked(isChecked)
            dispatch(
              handleBenefits({
                bidId: selectedBidId,
                index: item.benefitOrder,
                value: isChecked ? 'Yes' : 'No',
              })
            )
          }}
          defaultChecked={isChecked}
        />
      </div>
      {childContent()}
    </div>
  )
}
export default React.memo(OneToggle)
