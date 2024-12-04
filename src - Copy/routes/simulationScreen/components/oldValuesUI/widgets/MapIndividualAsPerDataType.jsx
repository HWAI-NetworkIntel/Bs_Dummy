import React, { useCallback } from 'react'
import { BENEFIT_DATA_TYPES } from '../../../constants'
import CustomInput from './CustomInput'
import CustomToggle from './CustomToggle'

const MapIndividualAsPerDataType = ({ item }) => {
  const innerContent = useCallback(() => {
    switch (item.benefitDataType) {
      case BENEFIT_DATA_TYPES.bool:
        return <CustomToggle record={item} />
      default:
        return <CustomInput record={item} />
    }
  }, [item])

  return <>{innerContent()}</>
}
export default React.memo(MapIndividualAsPerDataType)
