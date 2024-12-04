import React from 'react'

const CountyRow = ({ county, i }) => {
  return (
    <div className={`w-full flex item-center gap-x-2 h-8 justify-between px-3 ${i === 0 || i % 2 === 0 ? 'bg-[#F2F2F2]' : 'bg-white'}`}>
      <div
        style={{ flex: '1 1 39%' }}
        className="flex items-center text-ellipsis whitespace-nowrap overflow-hidden gap-x-2 text-[13px] text-[#333]"
      ></div>
      <div
        style={{ flex: '1 1 15%' }}
        className="flex items-center pl-6 text-ellipsis whitespace-nowrap overflow-hidden gap-x-2 text-[13px] text-[#333]"
      >
        <p className="text-left w-[100px]">{county?.name}</p>
      </div>
      <div style={{ flex: '1 1 20%' }} className="text-end flex items-center justify-end text-[13px] text-[#333] pr-1">
        {new Intl.NumberFormat('ja-JP').format(county?.preAEPEnrollment)}{' '}
      </div>
      <div style={{ flex: '1 1 20%' }} className="text-end flex items-center justify-end text-[13px] text-[#333] pr-1">
        {new Intl.NumberFormat('ja-JP').format(county?.postAEPEnrollment)}{' '}
      </div>
    </div>
  )
}
export default React.memo(CountyRow)
