import React from 'react'
import { useSelector } from 'react-redux'
import DataTypeMapper from './DataTypeMapper'
import CustomDrop from '../../widgets/CustomDrop'

const CustomDropDown = ({ item, hideTitle }) => {
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className={`flex p-2 w-full items-center ${hideTitle ? 'justify-center' : 'justify-between'}`}>
        {!hideTitle && (
          <p
            className="text-sm max-w-xs"
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
        )}
        <CustomDrop item={item} compulsory={item.benefitGroup !== 'Transportation (b10b)'} />
      </div>
      {item.child?.length > 0 &&
        benefits[selectedBidId][item.benefitOrder]?.newValue &&
        item.child?.map((obj, i) => {
          // if (parseInt(benefits[selectedBidId][item.benefitOrder]?.newValue) === i + 1) {
          //   return <DataTypeMapper key={i} item={obj} />
          // }
          if (item.benefitGroup !== 'Transportation (b10b)') {
            if (parseInt(benefits[selectedBidId][item.benefitOrder]?.newValue) === i + 1) {
              return <DataTypeMapper key={i} item={obj} />
            }
          } else {
            if (parseInt(benefits[selectedBidId][item.benefitOrder]?.newValue) === 1) {
              if (obj?.benefitDescription?.includes('Plan Approved Health-related Location')) {
                return <DataTypeMapper key={i} item={obj} showTitle />
              }
            } else if (parseInt(benefits[selectedBidId][item.benefitOrder]?.newValue) === 2) {
              if (obj?.benefitDescription?.includes('Any Health-related Location')) {
                return <DataTypeMapper key={i} item={obj} showTitle />
              }
            }
          }
        })}
    </div>
  )
}
export default React.memo(CustomDropDown)
