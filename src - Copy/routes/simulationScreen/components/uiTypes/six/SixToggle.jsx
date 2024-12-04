import { Switch } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToErrorBenefitNamesList, handleBenefits, removeFromErrorBenefitNamesList } from '../../../reducer/BenefitsSlice'
import { getAllChildBenefitOrders } from '../../../utils/Benefits'
import NineTypeMapper from './SixTypeMapper'

const SixToggle = ({ item }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [isChecked, setIsChecked] = useState(benefits[selectedBidId][item.benefitOrder]?.newValue === 'Yes' ? true : false)
  const childContent = useCallback(() => {
    if (isChecked) {
      return (
        <div className="flex flex-wrap w-full gap-2 ">
          {item.child?.map((el, i) => (
            <div key={i} style={{ flex: '1 1 46%' }}>
              <NineTypeMapper item={el} />
            </div>
          ))}
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

  const handleError = useCallback(() => {
    if (isChecked) {
      let emptyValueIndex = item.child?.findIndex((obj) => benefits[selectedBidId][obj.benefitOrder].newValue === '')
      if (emptyValueIndex !== -1) {
        dispatch(addToErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      } else {
        dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      }
    } else {
      dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
    }
  }, [benefits])
  useEffect(() => {
    restoreToDefault()
  }, [isChecked])
  useEffect(() => {
    handleError()
  }, [benefits])
  return (
    <div className="w-full flex flex-wrap gap-x-4 gap-y-2">
      <div className="flex w-full overflow-hidden p-2 shadow-cards justify-between items-center gap-x-10 ">
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
export default React.memo(SixToggle)
