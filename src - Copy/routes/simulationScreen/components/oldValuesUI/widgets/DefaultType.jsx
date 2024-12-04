import React, { useCallback } from 'react'
import MapIndividualAsPerDataType from './MapIndividualAsPerDataType'

const DefaultType = ({ record }) => {
  const content = useCallback(() => record?.map((benefit, i) => <MapIndividualAsPerDataType item={benefit} key={i} />), [record])
  return (
    <div className="flex flex-col w-full gap-y-4 ">
      <div className="w-full m-auto flex flex-col gap-y-4">{content()}</div>
    </div>
  )
}
export default React.memo(DefaultType)
