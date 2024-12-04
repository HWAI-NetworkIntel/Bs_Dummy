import React, { useCallback } from 'react'
import CustomRadioOne from './CustomRadioOne'
import OneToggle from './OneToggle'
import OneBenefitMapper from './OneBenefitMapper'
import { useDispatch, useSelector } from 'react-redux'
import useDidMountEffect from '../../../../hooks/useDidMountEffect'
import { setBenefitInfoBoxLoader, setBenefitVisible, setEmptyBenefitInfoBox, setIsIncomplete } from '../../../../reducer/BenefitsSlice'
import { openNotification } from '../../../../../planSelectionScreen/components/misc/Notification'

const One = ({ record }) => {
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
  const contentHandler = useCallback(() => {
    if (record[0]?.benefitGroup?.includes('OON')) {
      return (
        <div className="w-full flex flex-col gap-y-2">
          <OneToggle item={record[0]} />
        </div>
      )
    } else {
      let a = record.filter((item) => item.child.length > 0)
      let b = record.filter((item) => item.child.length === 0)
      return (
        <div className="w-full">
          <CustomRadioOne list={a} />
          {b?.map((item, i) => (
            <OneBenefitMapper key={i} item={item} />
          ))}
        </div>
      )
    }
  }, [record])

  return <div className="w-full">{contentHandler()}</div>
}
export default React.memo(One)
