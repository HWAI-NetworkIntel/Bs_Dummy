import { Checkbox, Radio, Tooltip } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultOrgKeys, setOrganizationSelectedValues } from '../../../reducer/planSelectionSlice'

const OrganizationSingleRow = ({ item }) => {
  const { organizationSelectedValues } = useSelector(({ plans }) => plans)
  const dispatch = useDispatch()
  return (
    <div className="w-full flex item-center gap-x-2 border-b h-8 border-[#E9E8E8] px-3 justify-between">
      <div
        style={{ flex: '1 1 40%' }}
        className="flex items-center text-ellipsis whitespace-nowrap overflow-hidden gap-x-2 text-[13px] text-[#333]"
      >
        <Radio
          checked={organizationSelectedValues === item.id}
          onChange={({ target: { checked } }) => {
            if (checked) {
              dispatch(setOrganizationSelectedValues(item.id))
              dispatch(setDefaultOrgKeys(item.id))
            }
          }}
        />
        <Tooltip title={item?.name}>
          <p style={{ maxWidth: '230px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item?.name}</p>
        </Tooltip>
      </div>
      <div style={{ flex: '1 1 13%' }} className="text-end flex items-center justify-end text-[13px] text-[#333] pr-1.5">
        {' '}
        {new Intl.NumberFormat('ja-JP').format(item?.preAEPEnrollment)}{' '}
      </div>
      <div style={{ flex: '1 1 13%' }} className="text-end flex items-center justify-end text-[13px] text-[#333] pr-1.5">
        {' '}
        {new Intl.NumberFormat('ja-JP').format(item?.postAEPEnrollment)}
      </div>
    </div>
  )
}
export default React.memo(OrganizationSingleRow)
