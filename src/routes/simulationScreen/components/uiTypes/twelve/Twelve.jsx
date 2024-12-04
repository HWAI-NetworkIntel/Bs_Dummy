import React, { useCallback } from 'react'
import TwelveChild from './TwelveChild'
import { useDispatch, useSelector } from 'react-redux'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import { setBenefitInfoBoxLoader, setBenefitVisible, setEmptyBenefitInfoBox, setIsIncomplete } from '../../../reducer/BenefitsSlice'
import { openNotification } from '../../../../planSelectionScreen/components/misc/Notification'

const Twelve = ({ record }) => {
  const { benefitNameButtonClicked, errorBenefitNameList } = useSelector(({ benefits }) => benefits)
  const dispatch = useDispatch()
  useDidMountEffect(() => {
    if (errorBenefitNameList?.length > 0) {
      dispatch(setBenefitInfoBoxLoader(false))
      const lastIndex = errorBenefitNameList[0]?.lastIndexOf('-')
      const firstPart = lastIndex !== -1 ? errorBenefitNameList[0]?.substring(0, lastIndex).trim() : errorBenefitNameList[0]?.trim()
      openNotification(`Please fill complete details for ${firstPart}`, 'error')
    } else {
      dispatch(setEmptyBenefitInfoBox(true))
      dispatch(setBenefitVisible(benefitNameButtonClicked.name))
    }
  }, [benefitNameButtonClicked.clicked])
  const content = useCallback(
    () =>
      record?.map((singleItem) => (
        <div key={singleItem.parent} className="flex w-full shadow-cards rounded overflow-hidden p-2 flex-col items-center gap-y-2">
          <p> {singleItem.parent} </p>
          <div className="flex w-full flex-wrap">
            {singleItem.child?.map((subChild, i) => (
              <TwelveChild key={i} item={subChild} />
            ))}
          </div>
        </div>
      )),
    [record]
  )
  return <div className="flex justify-center flex-wrap gap-2 p-2">{content()}</div>
}
export default React.memo(Twelve)
