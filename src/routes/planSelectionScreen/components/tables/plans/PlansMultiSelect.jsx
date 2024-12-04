import { MultiSelect } from 'primereact/multiselect'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterDropDownIcon } from '../../../../../common/images/icons'
import { modifyPlanDataAsObj, setLoading, setPlanDataAsObj, setPlanSelectedValues } from '../../../reducer/planSelectionSlice'
import { getBidLevelStateCountyTable } from '../../../api/request'
import './style/style.css'
import { openNotification } from '../../misc/Notification'
import { PLANS_TO_SELECT } from '../../../../../common/constants/constants'

const PlansMultiSelect = () => {
  const { planSelectedValues, filterValues, planDataAsObj, organizationSelectedValues, planData } = useSelector(({ plans }) => plans)
  const dispatch = useDispatch()
  const [modifiedData, setModifiedData] = useState([])

  const mainFn = async (ids) => {
    dispatch(setLoading(true))
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
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (planData?.length > 0) {
      let result = planData?.map((item) => ({
        ...item,
        planName: `${item.planName}(${item.bidId})`,
      }))
      setModifiedData(result)
    }
  }, [planData])

  return (
    <MultiSelect
      filter
      options={modifiedData}
      onChange={({ value }) => {
        if (value.length > 0) {
          if (value.length < PLANS_TO_SELECT + 1) {
            mainFn(value)
          } else {
            openNotification(`Cannot select more than ${PLANS_TO_SELECT} plans`, 'error')
          }
        } else {
          let a = {}
          Object.keys(planDataAsObj)?.forEach((key) => {
            a[key] = { ...planDataAsObj[key], data: {} }
          })
          dispatch(setPlanDataAsObj(a))
          dispatch(setPlanSelectedValues([]))
        }
      }}
      value={planSelectedValues}
      optionLabel="planName"
      selectedItemsLabel={`${planSelectedValues?.length} ${planSelectedValues?.length > 1 ? 'plans' : 'plan'} selected`}
      optionValue="bidId"
      dataKey="bidId"
      placeholder={'Select plans'}
      showSelectAll={false}
      maxSelectedLabels={1}
      className="w-full h-7 rounded border border-[#DDDDDC] flex items-center"
      style={{ borderRadius: '4px', width: 177 }}
      dropdownIcon={filterDropDownIcon}
    />
  )
}
export default React.memo(PlansMultiSelect)
