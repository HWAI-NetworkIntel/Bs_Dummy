import React, { useCallback } from 'react'
import CopayCoinsRow from './CopayCoinsRow'
import CustomDropDown from './CustomDropDown'
import ToggleBar from './ToggleBar'
import MultiSelectNine from '../nine/MultiSelectNine'
import CustomInput from './CustomInput'

const DataTypeMapper = ({ item, showTitle, i }) => {
  const innerContent = useCallback(() => {
    if (item.hasOwnProperty('title')) {
      return (
        <div style={{ flex: '1 1 45%' }} className="flex w-full flex-wrap gap-x-4">
          <CopayCoinsRow list={item.items} title={item.title} isOptional={item.isOptional} i={i} />
        </div>
      )
    } else {
      switch (item.benefitDataType) {
        case 'Boolean':
          return <ToggleBar item={item} />
        case 'Drop':
          return <CustomDropDown item={item} />
        case 'multi select':
          return <MultiSelectNine item={item} showTitle />
        default:
          return <CustomInput record={item} />
      }
    }
  }, [item])

  return <>{innerContent()}</>
}
export default React.memo(DataTypeMapper)
