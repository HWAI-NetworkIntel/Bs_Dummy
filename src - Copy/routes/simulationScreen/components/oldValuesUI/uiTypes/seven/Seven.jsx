import React, { useCallback } from 'react'
import SevenChild from './SevenChild'
import { useDispatch, useSelector } from 'react-redux'
import useDidMountEffect from '../../../../hooks/useDidMountEffect'
import { setBenefitInfoBoxLoader, setBenefitVisible, setEmptyBenefitInfoBox, setIsIncomplete } from '../../../../reducer/BenefitsSlice'
import { openNotification } from '../../../../../planSelectionScreen/components/misc/Notification'

const Seven = ({ record }) => {
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
  const innerContent = useCallback(() => record?.map((item, i) => <SevenChild item={item} key={i} index={i} />), [record])
  return <div className="flex w-full flex-col gap-y-2 py-2">{innerContent()}</div>
}
export default React.memo(Seven)
