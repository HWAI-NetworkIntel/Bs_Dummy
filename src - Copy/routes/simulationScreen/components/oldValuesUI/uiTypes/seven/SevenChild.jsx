import React from 'react'
import CustomRadioForCopayAndCoins from '../../widgets/CustomRadioForCopayAndCoins'
import CustomToggle from '../../widgets/CustomToggle'
import MapIndividualAsPerDataType from '../../widgets/MapIndividualAsPerDataType'

const SevenChild = ({ item, index }) => {
  return (
    <>
      {item.benefitDataType === 'Int' ? (
        <MapIndividualAsPerDataType item={item} />
      ) : (
        <CustomToggle record={item} index={index}>
          {item?.child?.length > 0 && (
            <div style={{ flex: '1 1 48%' }} className="flex  items-center w-full flex-col p-2 overflow-hidden m-auto gap-y-2 shadow-cards">
              <CustomRadioForCopayAndCoins list1={item?.child} />
            </div>
          )}
        </CustomToggle>
      )}
    </>
  )
}
export default React.memo(SevenChild)
