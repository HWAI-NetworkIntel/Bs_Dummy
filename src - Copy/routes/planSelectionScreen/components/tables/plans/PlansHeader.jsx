import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  modifyPlanDataAsObj,
  setPlanData,
  setPlanDataAsObj,
  setPlanSelectedValues,
  setAllSelected,
} from '../../../reducer/planSelectionSlice'
import { sortData } from '../../../utils/planSelection'
import { SortDown, SortUp } from '../../../../../common/images/icons'
import { Checkbox, Tooltip } from 'antd'
import { getBidLevelStateCountyTable } from '../../../api/request'
import PlansMultiSelect from './PlansMultiSelect'
import { PLANS_TO_SELECT, RESULTS, RESULTS1, SELECT_FIRST_TEN_PLANS } from '../../../../../common/constants/constants'

const PlansHeader = ({ setLoading }) => {
  const dispatch = useDispatch()
  const { planSelectedValues, filterValues, organizationSelectedValues, planData, allSelected, planDataAsObj } = useSelector(
    ({ plans }) => plans
  )
  const mainFn = async (ids) => {
    try {
      let payload = {
        stateId: filterValues['stateId'].selected,
        countyId: filterValues['countyId'].selected,
        planCategoryId: filterValues['planCategoryId'].selected,
        premiumId: filterValues['premiumId'].selected,
        planTypeId: filterValues['planTypeId'].selected,
        parentOrganizationId: organizationSelectedValues.toString(),
      }
      let result = await Promise.all(ids?.map((id) => getBidLevelStateCountyTable({ ...payload, bidId: id })))
      result.forEach((singleResult, i) => {
        dispatch(modifyPlanDataAsObj({ key: ids[i], data: singleResult?.data }))
      })
      dispatch(setPlanSelectedValues(ids))
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className="w-full flex sticky top-0 bg-white z-10 item-center h-9 pt-1 gap-x-4 border-b border-[#7D7D7D] px-3 justify-between text-[11px] font-semibold text-[#7D7D7D]">
      <div style={{ flex: '1 1 37%' }} className="flex items-center gap-x-2 pl-1">
        {planData?.length > PLANS_TO_SELECT ? (
          <Tooltip title={SELECT_FIRST_TEN_PLANS} placement="left" overlayClassName="numeric-input">
            <Checkbox
              disabled={planData?.length < 1}
              checked={planSelectedValues.length === PLANS_TO_SELECT}
              onChange={({ target: { checked } }) => {
                if (checked) {
                  setLoading(true)
                  let keys = planData?.map(({ bidId }) => bidId)?.filter((item, i) => i < PLANS_TO_SELECT)
                  mainFn(keys)
                  dispatch(setAllSelected(true))
                } else {
                  let a = {}
                  Object.keys(planDataAsObj)?.forEach((key) => {
                    a[key] = { ...planDataAsObj[key], data: {} }
                  })
                  dispatch(setPlanDataAsObj(a))
                  dispatch(setPlanSelectedValues([]))
                  dispatch(setAllSelected(false))
                }
              }}
            />
          </Tooltip>
        ) : (
          <Checkbox
            disabled={planData?.length < 1}
            checked={planData?.length === planSelectedValues?.length && planData?.length > 0}
            onChange={({ target: { checked } }) => {
              if (checked) {
                setLoading(true)
                let keys = planData?.map(({ bidId }, i) => i < PLANS_TO_SELECT && bidId)
                mainFn(keys)
                dispatch(setAllSelected(true))
              } else {
                let a = {}
                Object.keys(planDataAsObj)?.forEach((key) => {
                  a[key] = { ...planDataAsObj[key], data: {} }
                })
                dispatch(setPlanDataAsObj(a))
                dispatch(setPlanSelectedValues([]))
                dispatch(setAllSelected(false))
              }
            }}
          />
        )}
        <p>PLAN</p>
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setPlanData([]))
              dispatch(setPlanData(sortData('planName', true, planData)))
            }}
          >
            <SortUp />
          </button>
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setPlanData([]))
              dispatch(setPlanData(sortData('planName', false, planData)))
            }}
          >
            <SortDown />
          </button>
        </div>
        <PlansMultiSelect />
      </div>
      <div style={{ flex: '1 1 17%' }} className="flex items-center gap-x-2">
        <div className="flex items-center w-[100px]">STATE & COUNTY</div>
      </div>
      <div style={{ flex: '1 1 20%' }} className="text-end flex items-center justify-end gap-x-1">
        <p> {RESULTS1.preAep} </p>
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setPlanData([]))
              dispatch(setPlanData(sortData('preAEPEnrollment', true, planData)))
            }}
          >
            <SortUp />
          </button>
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setPlanData([]))
              dispatch(setPlanData(sortData('preAEPEnrollment', false, planData)))
            }}
          >
            <SortDown />
          </button>
        </div>
      </div>
      <div style={{ flex: '1 1 20%' }} className="text-end flex items-center justify-end gap-x-1">
        <p> {RESULTS1.postAep}</p>
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setPlanData(sortData('postAEPEnrollment', true, planData)))
            }}
          >
            <SortUp />
          </button>
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setPlanData(sortData('postAEPEnrollment', false, planData)))
            }}
          >
            <SortDown />
          </button>
        </div>
      </div>
    </div>
  )
}
export default React.memo(PlansHeader)
