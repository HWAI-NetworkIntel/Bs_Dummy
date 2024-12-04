import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTypeMapper from './DataTypeMapper'
import CustomDrop from '../../widgets/CustomDrop'
import { addToErrorBenefitNamesList, removeFromErrorBenefitNamesList } from '../../../../reducer/BenefitsSlice'

const CustomDropDown = ({ item, hideTitle }) => {
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const dispatch = useDispatch()
  const handleError = () => {
    if (parseInt(benefits[selectedBidId][item.benefitOrder]?.currentValue) === 1) {
      let childs = item.child?.filter((obj) => obj?.benefitDescription?.includes('Plan Approved Health-related Location'))
      let index = childs?.findIndex((el) => benefits[selectedBidId][el.benefitOrder]?.currentValue === '')
      if (index !== -1) {
        dispatch(addToErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      } else {
        dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      }
    } else if (parseInt(benefits[selectedBidId][item.benefitOrder]?.currentValue) === 2) {
      let childs = item.child?.filter((obj) => obj?.benefitDescription?.includes('Any Health-related Location'))
      let index = childs?.findIndex((el) => benefits[selectedBidId][el.benefitOrder]?.currentValue === '')
      if (index !== -1) {
        dispatch(addToErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      } else {
        dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      }
    }
  }
  useEffect(() => {
    if (item.benefitGroup === 'Transportation (b10b)') {
      if (item?.child?.length > 0) {
        handleError()
      }
    }
  }, [benefits])
  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className={`flex p-2 w-full items-center ${hideTitle ? 'justify-center' : 'justify-between'}`}>
        {!hideTitle && (
          <p
            className="text-sm max-w-xs"
            style={{
              // color: `${
              //   benefits[selectedBidId][item.benefitOrder].currentValue !== benefits[selectedBidId][item.benefitOrder].currentValue &&
              //   benefits[selectedBidId][item.benefitOrder].currentValue !== ''
              //     ? '#5C276E'
              //     : ''
              // }`,
            }}
          >
            {' '}
            {item.benefitDescription}{' '}
          </p>
        )}
        <CustomDrop item={item} compulsory={item.benefitGroup === 'Transportation (b10b)'} />
      </div>
      {item.child?.length > 0 &&
        benefits[selectedBidId][item.benefitOrder]?.currentValue &&
        item.child?.map((obj, i) => {
          if (item.benefitGroup !== 'Transportation (b10b)') {
            if (parseInt(benefits[selectedBidId][item.benefitOrder]?.currentValue) === i + 1) {
              return <DataTypeMapper key={i} item={obj} />
            }
          } else {
            if (parseInt(benefits[selectedBidId][item.benefitOrder]?.currentValue) === 1) {
              if (obj?.benefitDescription?.includes('Plan Approved Health-related Location')) {
                return <DataTypeMapper key={i} item={obj} showTitle />
              }
            } else if (parseInt(benefits[selectedBidId][item.benefitOrder]?.currentValue) === 2) {
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
