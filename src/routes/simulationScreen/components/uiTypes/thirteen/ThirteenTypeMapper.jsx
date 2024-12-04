import React, { useCallback } from 'react'
import CustomInput from '../../widgets/CustomInput'
import CustomDropDown from '../five/CustomDropDown'
import MultiSelectThirteen from './MultiSelectThirteen'
import ThirteenToggle from './ThirteenToggle'

const ThirteenTypeMapper = ({ item, hide }) => {
  const innerContent = useCallback(() => {
    if (item.hasOwnProperty('title')) {
      return (
        <div className="flex w-full">
          <div style={{ flex: '1 1 15%' }} className="w-full justify-center items-end pb-2 flex">
            {item.title}
          </div>
          <div style={{ flex: '1 1 80%' }} className="w-full flex gap-x-2 items-center">
            {item.items?.map((singleItem, i) => (
              <ThirteenTypeMapper key={i} item={singleItem} hide={false} />
            ))}
          </div>
        </div>
      )
    } else {
      switch (item.benefitDataType) {
        case 'Boolean':
          return <ThirteenToggle item={item} hideTitle={hide} />
        case 'Drop':
          return <CustomDropDown item={item} hideTitle />
        case 'multi select':
          return <MultiSelectThirteen item={item} />
        default:
          return <CustomInput record={item} hideTitle />
      }
    }
  }, [item])

  return <>{innerContent()}</>
}
export default React.memo(ThirteenTypeMapper)
