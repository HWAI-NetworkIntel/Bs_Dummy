import { Switch } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToErrorBenefitNamesList, handleBenefits, removeFromErrorBenefitNamesList } from '../../../reducer/BenefitsSlice'
import NineTypeMapper from './ThirteenTypeMapper'

const ThirteenToggle = ({ item, hideTitle }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [isChecked, setIsChecked] = useState(benefits[selectedBidId][item.benefitOrder]?.newValue === 'Yes' ? true : false)
  const childContent = useCallback(() => {
    if (isChecked) {
      return (
        <div className="flex flex-wrap w-full gap-2  py-2 shadow-cards">
          {item.child?.map((el, i) => (
            <div key={i} style={{ flex: '1 1 46%' }}>
              <NineTypeMapper item={el} />
            </div>
          ))}
        </div>
      )
    }
  }, [isChecked])
  const restoreToDefault = useCallback(() => {
    if (!isChecked) {
      item.child?.forEach((subItem) => {
        dispatch(handleBenefits({ bidId: selectedBidId, index: subItem.benefitOrder, value: '' }))
        subItem.child?.forEach((obj) => {
          dispatch(handleBenefits({ bidId: selectedBidId, index: obj.benefitOrder, value: '' }))
        })
      })
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
      if (item.child?.length > 0) {
        item.child.forEach((ob) => {
          dispatch(removeFromErrorBenefitNamesList(`${ob.benefitGroup}-${ob.benefitOrder}`))
        })
      }
    }
  }, [benefits])

  useEffect(() => {
    handleError()
  }, [benefits])
  useEffect(() => {
    restoreToDefault()
  }, [isChecked])
  return (
    <div className={`w-full flex flex-wrap gap-y-2 gap-x-4 ${!hideTitle && 'shadow-cards'} p-2`}>
      <div className="flex w-full overflow-hidden p-2 justify-between items-center gap-x-10 ">
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
export default React.memo(ThirteenToggle)
