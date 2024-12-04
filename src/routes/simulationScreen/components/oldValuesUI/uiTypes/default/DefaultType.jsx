import React from 'react'
import CustomInput from './CustomInput'
import CustomToggle from './CustomToggle'
import { useDispatch, useSelector } from 'react-redux'
import { setBenefitInfoBoxLoader, setBenefitVisible, setEmptyBenefitInfoBox, setIsIncomplete } from '../../../../reducer/BenefitsSlice'
import useDidMountEffect from '../../../../hooks/useDidMountEffect'
import { openNotification } from '../../../../../planSelectionScreen/components/misc/Notification'

const DefaultType = ({ record }) => {
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
    <div className="w-full m-auto flex flex-col gap-y-4 p-2">
      {record?.map((item, i) =>
        item.benefitDataType === 'Boolean' ? <CustomToggle item={item} key={i} /> : <CustomInput item={item} key={i} />
      )}
    </div>
  )
}
export default React.memo(DefaultType)
