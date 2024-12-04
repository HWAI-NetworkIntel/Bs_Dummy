import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrganizationData } from '../../../reducer/planSelectionSlice'
import { sortData } from '../../../utils/planSelection'
import { SortDown, SortUp } from '../../../../../common/images/icons'
import { RESULTS, RESULTS1 } from '../../../../../common/constants/constants'

const OrgHeader = () => {
  const { organizationData } = useSelector(({ plans }) => plans)
  const dispatch = useDispatch()
  return (
    <div className="w-full sticky top-0 bg-white z-10 item-center h-9 pt-1 flex item-center gap-x-2 border-b border-[#7D7D7D] px-3 justify-between text-[11px] font-semibold text-[#7D7D7D]">
      <div style={{ flex: '1 1 40%' }} className="flex items-center gap-x-2">
        <p>ORGANIZATION</p>
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setOrganizationData([]))
              dispatch(setOrganizationData(sortData('name', true, organizationData)))
            }}
          >
            <SortUp />
          </button>
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setOrganizationData([]))
              dispatch(setOrganizationData(sortData('name', false, organizationData)))
            }}
          >
            <SortDown />
          </button>
        </div>
      </div>
      <div style={{ flex: '1 1 13%' }} className="text-end flex items-center justify-end gap-x-1">
        <p> {RESULTS1.preAep} </p>
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setOrganizationData([]))
              dispatch(setOrganizationData(sortData('preAEPEnrollment', true, organizationData)))
            }}
          >
            <SortUp />
          </button>
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setOrganizationData([]))
              dispatch(setOrganizationData(sortData('preAEPEnrollment', false, organizationData)))
            }}
          >
            <SortDown />
          </button>
        </div>
      </div>
      <div style={{ flex: '1 1 13%' }} className="text-end flex items-center justify-end gap-x-1">
        <p> {RESULTS1.postAep} </p>
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setOrganizationData([]))
              dispatch(setOrganizationData(sortData('postAEPEnrollment', true, organizationData)))
            }}
          >
            <SortUp />
          </button>
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setOrganizationData([]))
              dispatch(setOrganizationData(sortData('postAEPEnrollment', false, organizationData)))
            }}
          >
            <SortDown />
          </button>
        </div>
      </div>
    </div>
  )
}
export default React.memo(OrgHeader)
