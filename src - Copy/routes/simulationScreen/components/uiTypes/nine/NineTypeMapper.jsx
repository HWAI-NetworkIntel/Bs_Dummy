import React, { useCallback } from 'react'
import CustomInput from '../../widgets/CustomInput'
import CustomDropDown from '../five/CustomDropDown'
import IntInput from './IntInput'
import MultiSelectNine from './MultiSelectNine'
import NineToggle from './NineToggle'
import { handleTitle } from '../../../utils/General'
import CustomDrop from '../../widgets/CustomDrop'

const NineTypeMapper = ({ item, hide, showTitleName }) => {
  const innerContent = useCallback(() => {
    if (item.hasOwnProperty('title')) {
      return (
        <div className="flex w-full">
          <div style={{ flex: '1 1 15%' }} className={`w-full justify-center flex ${showTitleName ? 'items-end pb-2' : 'items-center'}`}>
            {item.title}
          </div>
          <div style={{ flex: '1 1 80%' }} className="w-full flex gap-x-2 items-center">
            {item.items?.map((singleItem, i) => (
              <div key={i} className={`flex flex-col items-center w-full ${showTitleName && ' h-16 justify-between'}`}>
                {showTitleName && <div className="h-7 flex justify-center w-full">{handleTitle(singleItem.benefitDescription)} </div>}
                <NineTypeMapper item={singleItem} hide key={i} />
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      switch (item.benefitDataType) {
        case 'Boolean':
          return <NineToggle item={item} hideTitle={hide} />
        case 'Drop':
          return <CustomDrop item={item} hideTitle />
        case 'Int':
          if (item?.child?.length > 0) {
            return <IntInput record={item} />
          } else {
            return <CustomInput record={item} hideTitle />
          }
        case 'multi select':
          return <MultiSelectNine item={item} />
        case 'Drop':
          return <CustomDrop item={item} />
        default:
          return <CustomInput record={item} hideTitle />
      }
    }
  }, [item])

  return <>{innerContent()}</>
}
export default React.memo(NineTypeMapper)
