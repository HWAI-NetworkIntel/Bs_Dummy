import React from 'react'
import { PlanSymbol } from '../../../common/images/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setBenefitVisible, setSelectedBidId } from '../reducer/BenefitsSlice'
import { openNotification } from '../../planSelectionScreen/components/misc/Notification'

const BidIdHeader = ({ setCount }) => {
  const { selectedBidId, listOfBidIds, errorBenefitNameList, changedColorItems } = useSelector(({ benefits }) => benefits)
  const dispatch = useDispatch()
  return (
    <div className="w-full px-8 h-11 flex items-center justify-between border-b border-[#DDDDDC]">
      <div className="max-w-xl">
        <div className="flex items-center h-11">
          {listOfBidIds?.map((key, i) => (
            <button
              key={i}
              onClick={() => {
                if (errorBenefitNameList?.length > 0) {
                  const lastIndex = errorBenefitNameList[0]?.lastIndexOf('-')
                  const firstPart =
                    lastIndex !== -1 ? errorBenefitNameList[0]?.substring(0, lastIndex).trim() : errorBenefitNameList[0]?.trim()
                  openNotification(`Please fill complete details for ${firstPart}`, 'error')
                } else {
                  setCount(0)
                  dispatch(setBenefitVisible(''))
                  dispatch(setSelectedBidId(key))
                }
              }}
              type="button"
              className={`flex justify-center flex-col items-center min-w-[116px] h-11 border-[#DDDDDC] ${
                selectedBidId === key && 'border-b border-b-white'
              } ${i === 0 ? 'border-x' : 'border-r'}`}
            >
              <div className="flex items-center">
                <PlanSymbol />
                <p
                  className={`text-xs ${
                    selectedBidId === key
                      ? 'text-[#333] font-semibold'
                      : Object.keys(changedColorItems)?.includes(key)
                      ? 'text-primary_hue_purple text-xs font-semibold'
                      : 'text-[#7D7D7D] font-normal'
                  }`}
                >
                  {' '}
                  {key}{' '}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
export default React.memo(BidIdHeader)
