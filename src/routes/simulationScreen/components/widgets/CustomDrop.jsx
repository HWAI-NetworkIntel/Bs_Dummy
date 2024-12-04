import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleBenefits } from '../../reducer/BenefitsSlice'
import { Select } from 'antd'
import { dropDownData, handleKey } from '../../constants/DropDownData'

const CustomDrop = ({ item, compulsory }) => {
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const handleChange = (value) => {
    dispatch(handleBenefits({ bidId: selectedBidId, index: item.benefitOrder, value }))
  }
  const [selected, setSelected] = useState(
    compulsory
      ? benefits[selectedBidId][item.benefitOrder]?.newValue || dropDownData[item.range][handleKey(item?.benefits)][0].value
      : benefits[selectedBidId][item.benefitOrder]?.newValue
  )
  useEffect(() => {
    if (compulsory) {
      if (!benefits[selectedBidId][item.benefitOrder]?.newValue) {
        dispatch(
          handleBenefits({
            bidId: selectedBidId,
            index: item.benefitOrder,
            value: dropDownData[item.range][handleKey(item?.benefits)][0].value,
          })
        )
      }
    }
  }, [])
  return (
    <Select
      defaultValue={selected}
      style={{
        width: 160,
        padding: 8,
      }}
      onChange={handleChange}
      options={dropDownData[item.range][handleKey(item?.benefits)]}
    />
  )
}
export default React.memo(CustomDrop)
