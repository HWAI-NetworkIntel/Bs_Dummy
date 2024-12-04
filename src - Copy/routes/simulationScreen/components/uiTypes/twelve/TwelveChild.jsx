import React from 'react'
import CustomRadio from '../../widgets/CustomRadio'

const TwelveChild = ({ item }) => {
  return (
    <div className="flex flex-col gap-y-2 items-center  rounded overflow-hidden p-2 w-[400px]">
      <p> {item.parent} </p>
      <div className="flex gap-x-4 items-start">
        <CustomRadio list={item.child} />
      </div>
    </div>
  )
}
export default React.memo(TwelveChild)
