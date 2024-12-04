import React, { useCallback } from 'react'
import { BENEFIT_DATA_TYPES } from '../../../constants'
import CustomInput from '../../widgets/CustomInput'
import OneIntInput from './OneIntInput'
import OneReverseToggle from './OneReverseToggle'
import OneToggle from './OneToggle'
import CustomDrop from '../../widgets/CustomDrop'
import { useSelector } from 'react-redux'

const OneBenefitMapper = ({ item, titleUp }) => {
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const content = useCallback(() => {
    if (item.hasOwnProperty('title')) {
      return (
        <div className="w-full flex gap-x-4 ">
          {item.items?.map((singleItem, i) => (
            <OneBenefitMapper item={singleItem} key={i} titleUp />
          ))}
        </div>
      )
    } else {
      switch (item.benefitDataType) {
        case BENEFIT_DATA_TYPES.bool:
          if (item.rowName.includes('Reverse Boolean')) {
            return <OneReverseToggle item={item} />
          } else {
            return <OneToggle item={item} />
          }
        case 'Drop':
          if (item?.child?.length > 0) {
            return <OneIntInput item={item} />
          } else {
            return item.benefitDescription.includes('What') ? (
              <div className="w-full flex justify-between items-center  rounded p-2">
                <p
                  style={{
                    color: `${
                      benefits[selectedBidId][item.benefitOrder].currentValue !== benefits[selectedBidId][item.benefitOrder].newValue &&
                      benefits[selectedBidId][item.benefitOrder].newValue !== ''
                        ? '#5C276E'
                        : ''
                    }`,
                  }}
                >
                  {' '}
                  {item.benefitDescription}{' '}
                </p>
                <CustomDrop item={item} />
              </div>
            ) : (
              <CustomInput record={item} titleUp={item.benefitDescription.includes('What') ? false : true} />
            )
          }
        case 'Int':
          if (item?.child?.length > 0) {
            return <OneIntInput item={item} />
          } else {
            return item.benefitDescription.includes('What') ? (
              <div className="w-full flex justify-between items-center  rounded p-2">
                <p
                  style={{
                    color: `${
                      benefits[selectedBidId][item.benefitOrder].currentValue !== benefits[selectedBidId][item.benefitOrder].newValue &&
                      benefits[selectedBidId][item.benefitOrder].newValue !== ''
                        ? '#5C276E'
                        : ''
                    }`,
                  }}
                >
                  {' '}
                  {item.benefitDescription}{' '}
                </p>
                <CustomDrop item={item} />
              </div>
            ) : (
              <CustomInput record={item} titleUp={item.benefitDescription.includes('What') ? false : true} />
            )
          }
        default:
          return <CustomInput titleUp={item.benefitDescription?.includes('Interval')} record={item} />
      }
    }
  }, [item])
  return <div className="w-full"> {content()} </div>
}
export default React.memo(OneBenefitMapper)
