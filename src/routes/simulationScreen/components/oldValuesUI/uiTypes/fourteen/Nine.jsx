import React from 'react'
import NineTypeMapper from './NineTypeMapper'
import { useDispatch, useSelector } from 'react-redux'
import useDidMountEffect from '../../../../hooks/useDidMountEffect'
import { setBenefitInfoBoxLoader, setBenefitVisible, setEmptyBenefitInfoBox } from '../../../../reducer/BenefitsSlice'
import { openNotification } from '../../../../../planSelectionScreen/components/misc/Notification'

const Nine = ({ record }) => {
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
  return (
    <div className="w-full flex flex-wrap gap-y-2 gap-x-2 p-2">
      {record?.map((item, i) => (
        <NineTypeMapper item={item} key={i} />
      ))}
    </div>
  )
}
export default React.memo(Nine)
