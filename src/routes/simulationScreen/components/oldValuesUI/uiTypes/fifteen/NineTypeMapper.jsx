import React, { useCallback, useEffect, useState } from 'react'
import CustomInput from '../../widgets/CustomInput'
import IntInput from './IntInput'
import MultiSelectNine from './MultiSelectNine'
import NineToggle from './NineToggle'
import { handleTitle, handleTitle2 } from '../../../../utils/General'
import CustomDrop from '../../widgets/CustomDrop'
import { useSelector } from 'react-redux'
import PackageBenefits from './PackageBenefits'

const NineTypeMapper = ({ item, hide, showTitleName, packageNo }) => {
  const { benefitsToShow } = useSelector(({ fifteen }) => fifteen)
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(1)
    setTimeout(() => {
      setCount(0)
    }, 2)
  }, [benefitsToShow])
  const innerContent = useCallback(() => {
    if (item.hasOwnProperty('title')) {
      return (
        <div className="w-full shadow-primaryNew">
          <div className="flex w-full">
            <div style={{ flex: '1 1 15%' }} className={`w-full justify-center flex pt-11 pb-1`}>
              {item.title}
            </div>
            <div style={{ flex: '1 1 80%' }} className="w-full flex gap-x-2">
              {item.items?.map((singleItem, i) => (
                <div key={i} className={`flex flex-col items-center w-full ${i === 2 && 'min-w-[340px]'} ${showTitleName && 'gap-y-1'}`}>
                  <div className="flex pt-2">
                    <NineTypeMapper item={singleItem} hide key={i} packageNo={packageNo} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full ">{count === 1 ? '' : <PackageBenefits arr={item.items} packageNo={packageNo} />}</div>
        </div>
      )
    } else {
      switch (item.benefitDataType) {
        case 'Boolean':
          return (
            <div className="flex flex-col gap-y-1 items-center w-full">
              {packageNo > 0 && <p> {handleTitle2(item.benefitDescription)} </p>}
              <NineToggle item={item} hideTitle={hide} packageNo={packageNo} />
            </div>
          )
        case 'Int':
          if (item?.child?.length > 0) {
            return <IntInput record={item} />
          } else {
            return (
              <div className="flex flex-col gap-y-1 items-center w-full">
                {packageNo > 0 && <p> {handleTitle2(item.benefitDescription)} </p>}
                <CustomInput record={item} hideTitle />
              </div>
            )
          }
        case 'multi select':
          return (
            <div className="flex flex-col gap-y-1 items-center w-full">
              {packageNo > 0 && <p> {handleTitle2(item.benefitDescription)} </p>}
              <MultiSelectNine item={item} packageNo={packageNo} />
            </div>
          )
        case 'Drop':
          return (
            <div className="flex flex-col gap-y-1 items-center w-full">
              {packageNo > 0 && <p> {handleTitle2(item.benefitDescription)} </p>}
              <CustomDrop item={item} />
            </div>
          )
        default:
          return (
            <div className="flex flex-col gap-y-1 items-center w-full">
              {packageNo > 0 && <p> {handleTitle2(item.benefitDescription)} </p>}
              <CustomInput record={item} hideTitle />
            </div>
          )
      }
    }
  }, [item, benefitsToShow, count])

  return <>{innerContent()}</>
}
export default React.memo(NineTypeMapper)
