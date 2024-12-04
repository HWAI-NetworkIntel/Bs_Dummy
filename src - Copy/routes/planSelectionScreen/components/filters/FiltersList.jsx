import React from 'react'
import MultiSelectBox from './MultiSelectBox'
import { useSelector } from 'react-redux'

const FiltersList = ({ clientId }) => {
  const { filtersList } = useSelector(({ plans }) => plans)
  return (
    <div className="w-full py-2 px-8 flex items-center gap-x-2 flex-wrap border-b border-[#E9E8E8]">
      {filtersList?.map((item, i) => (
        <MultiSelectBox key={i} item={item} clientId={clientId} />
      ))}
    </div>
  )
}
export default React.memo(FiltersList)
