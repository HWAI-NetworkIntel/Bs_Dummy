import { Spin } from 'antd'
import React from 'react'

const CustomSpin = ({ size }) => (
  <div className="w-full absolute z-20  flex justify-center items-center opacity-70 bg-slate-100 h-full top-0 bottom-0 right-0 left-0">
    <Spin size={size} />
  </div>
)
export default React.memo(CustomSpin)
