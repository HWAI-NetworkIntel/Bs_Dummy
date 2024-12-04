import { Switch } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToErrorBenefitNamesList, handleBenefits, removeFromErrorBenefitNamesList, resetErrorList } from '../../../../reducer/BenefitsSlice'
import NineTypeMapper from './NineTypeMapper'

const NineToggle = ({ item, hideTitle, packageNo }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [isChecked, setIsChecked] = useState(benefits[selectedBidId][item.benefitOrder]?.currentValue === 'Yes' ? true : false)
  const childContent = useCallback(() => {
    if (isChecked) {
      return (
        <div className="flex  w-full gap-2 ">
          {item.child?.map((el, i) => (
            <NineTypeMapper item={el} key={i} packageNo={packageNo} />
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
          obj?.child?.forEach((objChild) => {
            dispatch(handleBenefits({ bidId: selectedBidId, index: objChild.benefitOrder, value: '' }))
            objChild?.child?.forEach((objChild1) => {
              dispatch(handleBenefits({ bidId: selectedBidId, index: objChild1.benefitOrder, value: '' }))
            })
          })
        })
      })
    }
  }, [isChecked])
  const handleError = useCallback(() => {
    if (isChecked) {
      let emptyValueIndex = item.child?.findIndex((obj) => benefits[selectedBidId][obj.benefitOrder].currentValue === '')
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
          if (ob.child.length > 0) {
            dispatch(resetErrorList())
          }
        })
      }
    }
  }, [benefits])
  useEffect(() => {
    restoreToDefault()
  }, [isChecked])
  useEffect(() => {
    handleError()
  }, [benefits])
  return (
    <div className={`w-full flex flex-wrap gap-x-4 gap-y-2 ${!hideTitle && 'shadow-cards'}  rounded  p-2 ${packageNo > 0 && 'pt-0'} `}>
      <div
        className={`flex text-[#333333] w-full overflow-hidden p-2 ${hideTitle ? 'justify-center' : 'justify-between'
          } items-center gap-x-10 `}
      >
        {!hideTitle && (
          <p
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
        )}
        <Switch
          disabled
          checkedChildren="Yes"
          unCheckedChildren="No"
          className=" bg-gray-400"
          // onChange={(isChecked) => {
          //   setIsChecked(isChecked)
          //   dispatch(
          //     handleBenefits({
          //       bidId: selectedBidId,
          //       index: item.benefitOrder,
          //       value: isChecked ? 'Yes' : 'No',
          //     })
          //   )
          // }}
          defaultChecked={isChecked}
        />
      </div>
      {childContent()}
    </div>
  )
}
export default React.memo(NineToggle)
