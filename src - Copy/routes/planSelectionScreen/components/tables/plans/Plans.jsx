import React, { useCallback, useEffect, useState } from 'react'
import { getBidLevelStateCountyTable, getPlans } from '../../../api/request'
import PlansSingleRow from './PlansSingleRow'
import { useDispatch, useSelector } from 'react-redux'
import {
  modifyPlanDataAsObj,
  setAllSelected,
  setLoading,
  setPlanData,
  setPlanDataAsObj,
  setPlanSelectedValues,
  setSuccess,
} from '../../../reducer/planSelectionSlice'
import PlansHeader from './PlansHeader'
import useDidMountEffect from '../../../../simulationScreen/hooks/useDidMountEffect'
import CustomSpin from '../../../../../common/components/CustomSpin'
import { SELECT_PLANS_TEXT } from '../../../../../common/constants/constants'

const Plans = () => {
  const { organizationSelectedValues, filterValues, planData, success, defaultPlanKeys, organizationData } = useSelector(
    ({ plans }) => plans
  )
  const [count, setCount] = useState(0)
  const [loading1, setLoading1] = useState(false)
  const dispatch = useDispatch()

  const mainFn = useCallback(async () => {
    dispatch(setLoading(true))
    dispatch(setPlanData([]))
    dispatch(setPlanDataAsObj({}))
    dispatch(setPlanSelectedValues([]))
    try {
      if (organizationSelectedValues) {
        setCount((prev) => {
          return prev + 1
        })
        let payload = {
          stateId: filterValues['stateId'].selected,
          countyId: filterValues['countyId'].selected,
          planCategoryId: filterValues['planCategoryId'].selected,
          premiumId: filterValues['premiumId'].selected,
          planTypeId: filterValues['planTypeId'].selected,
          parentOrganizationId: organizationSelectedValues.toString(),
        }
        let result = await getPlans(payload)
        let planDataAsPerBidId = {}
        result?.data?.forEach((ii, i) => {
          planDataAsPerBidId[ii.bidId] = { ...ii, data: {} }
        })
        dispatch(setPlanData(result?.data))
        dispatch(setPlanDataAsObj(planDataAsPerBidId))
        let currentSelectedPlans = count < 1 && defaultPlanKeys?.length > 0 ? [...defaultPlanKeys] : [result?.data[0]?.bidId]
        dispatch(setPlanSelectedValues(currentSelectedPlans))
        let resultForEachRow = await Promise.all(
          currentSelectedPlans?.map((bidId) =>
            getBidLevelStateCountyTable({
              ...payload,
              bidId,
            })
          )
        )
        resultForEachRow?.forEach((rowData, i) => {
          dispatch(modifyPlanDataAsObj({ key: currentSelectedPlans[i], data: rowData?.data }))
        })
        dispatch(setSuccess(true))
        dispatch(setLoading(false))
        dispatch(setAllSelected(false))
      }
      if (success) {
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
    }
  }, [organizationSelectedValues, filterValues, defaultPlanKeys])

  useDidMountEffect(() => {
    mainFn()
  }, [organizationSelectedValues, organizationData])

  return (
    <div className="w-full">
      <PlansHeader setLoading={setLoading1} />
      <div className="flex flex-col gap-y-1 py-1 relative">
        {loading1 && <CustomSpin size={'small'} />}
        {planData?.map((item, i) => (
          <PlansSingleRow item={item} key={i} name={item?.planName} id={item?.bidId} />
        ))}
      </div>
      {planData?.length > 0 && (
        <div className="w-full h-7 border border-t-[#E9E8E8] border-b-0 border-x-0 flex justify-between items-center text-[#7D7D7D] text-xs sticky bottom-0 right-0 left-0 bg-white">
          {SELECT_PLANS_TEXT}
        </div>
      )}
    </div>
  )
}
export default React.memo(Plans)
