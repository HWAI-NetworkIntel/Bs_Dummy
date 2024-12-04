import React, { useCallback } from 'react'
import CustomInput from '../../widgets/CustomInput'
import CustomDropDown from '../five/CustomDropDown'
import SixInputInt from './SixInputInt'
import SixToggle from './SixToggle'
import { handleTitle } from '../../../../utils/General'

const SixTypeMapper = ({ item, showTitleName }) => {
  const innerContent = useCallback(() => {
    if (item.hasOwnProperty('title')) {
      return (
        <div className="flex w-full">
          <div style={{ flex: '1 1 15%' }} className="w-full justify-center items-end pb-2 flex">
            {item.title}
          </div>
          <div style={{ flex: '1 1 80%' }} className="w-full flex gap-x-2 items-center">
            {item.items?.map((singleItem, i) => (
              <div className="flex flex-col items-center gap-y-2 w-full">
                {showTitleName && <div className="h-7 flex justify-center w-full">{handleTitle(singleItem.benefitDescription)} </div>}
                <SixTypeMapper key={i} item={singleItem} />
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      switch (item.benefitDataType) {
        case 'Boolean':
          return <SixToggle item={item} />
        case 'Drop':
          return <CustomDropDown item={item} />
        case 'Int':
          if (item?.child?.length > 0) {
            return <SixInputInt record={item} />
          } else {
            return <CustomInput record={item} />
          }
        default:
          return <CustomInput record={item} />
      }
    }
  }, [item])

  return <>{innerContent()}</>
}
export default React.memo(SixTypeMapper)
