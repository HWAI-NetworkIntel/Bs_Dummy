import React, { useEffect, useState } from 'react'
import { modifiyListAsPerCopayOrCoins } from '../../../utils/Benefits'
import CopayCoinsRadio from './CopayCoinsRadio'
import DataTypeMapper from './DataTypeMapper'

const CopayCoinsCard = ({ list, getPreviousValueIfAny, showOptional, changeSetToNull, setToNull }) => {
  const [copayCoinsItem, setCopayCoinsItem] = useState({})
  const [visitsList, setVisitsList] = useState([])
  useEffect(() => {
    setCopayCoinsItem(
      modifiyListAsPerCopayOrCoins(list?.filter((item) => item.benefitDataType !== 'Boolean' && item.benefitDataType !== 'Drop'))
    )
    setVisitsList(list?.filter((item) => item.benefitDataType === 'Boolean' || item.benefitDataType === 'Drop'))
  }, [list])
  return (
    <div className="flex flex-col gap-y-4 items-center w-full">
      {Object.keys(copayCoinsItem)?.length > 0 && (
        <CopayCoinsRadio
          changeSetToNull={changeSetToNull}
          getPreviousValueIfAny={getPreviousValueIfAny}
          setToNull={setToNull}
          copayCoinsItem={copayCoinsItem}
          list={list?.filter((item) => item.benefitDataType !== 'Boolean' && item.benefitDataType !== 'Drop')}
        />
      )}
      {getPreviousValueIfAny && visitsList?.map((item, i) => <DataTypeMapper key={i} item={item} i={i} />)}
    </div>
  )
}
export default React.memo(CopayCoinsCard)
