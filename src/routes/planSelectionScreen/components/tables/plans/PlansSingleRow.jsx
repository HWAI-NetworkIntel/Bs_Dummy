import { Checkbox, Spin } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modifyPlanDataAsObj, setPlanSelectedValues } from '../../../reducer/planSelectionSlice'
import { getDifferenceAsString, isDifferencePositive } from '../../../utils/planSelection'
import { openNotification } from '../../misc/Notification'
import { getBidLevelStateCountyTable } from '../../../api/request'
import StateCountyTableOfPlan from './StateCountyTableOfPlan'
import { BidIdSymbol, PlanSymbol } from '../../../../../common/images/icons'
import CustomSpin from '../../../../../common/components/CustomSpin'
import { MORE_THAN_TEN_PLANS_ERROR, PLANS_TO_SELECT } from '../../../../../common/constants/constants'

const PlansSingleRow = ({ name, id, item }) => {
  const { planSelectedValues, filterValues, organizationSelectedValues, planDataAsObj } = useSelector(({ plans }) => plans)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const mainFn = async (id) => {
    try {
      let payload = {
        stateId: filterValues['stateId'].selected,
        countyId: filterValues['countyId'].selected,
        planCategoryId: filterValues['planCategoryId'].selected,
        premiumId: filterValues['premiumId'].selected,
        planTypeId: filterValues['planTypeId'].selected,
        parentOrganizationId: organizationSelectedValues.toString(),
        bidId: id,
      }
      let result = await getBidLevelStateCountyTable(payload)
      dispatch(modifyPlanDataAsObj({ key: id, data: result?.data }))
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className={`border border-l-4 relative border-[#E9E8E8] ${planSelectedValues?.includes(id) && 'border-l-[#9775A2]'}`}>
      <div className={`w-full flex py-2 gap-x-2 justify-between px-3`}>
        <div style={{ flex: '1 1 46%' }} className="flex text-ellipsis whitespace-nowrap overflow-hidden gap-x-2 text-[13px] text-[#333]">
          <Checkbox
            checked={planSelectedValues?.includes(id)}
            onChange={({ target: { checked } }) => {
              if (checked) {
                if (planSelectedValues?.length > PLANS_TO_SELECT - 1) {
                  openNotification(MORE_THAN_TEN_PLANS_ERROR, 'error')
                } else {
                  setLoading(true)
                  mainFn(id)
                  dispatch(setPlanSelectedValues([...planSelectedValues, id]))
                }
              } else {
                dispatch(modifyPlanDataAsObj({ key: id, data: {} }))
                dispatch(setPlanSelectedValues(planSelectedValues?.filter((key) => key !== id)))
              }
            }}
          />
          <div>
            <p className=" text-ellipsis whitespace-nowrap text-[#333]">{name}</p>
            <div className="flex gap-x-2 items-center">
              <div className="flex items-center">
                <PlanSymbol />
                <p className="text-[#5C5C5C] text-[11.5px] font-semibold"> {name?.split('(')[1]?.split(')')[0]} </p>
              </div>
              <div className="flex items-center">
                <BidIdSymbol />
                <p className="text-[#5C5C5C] text-[11.5px] font-semibold"> {id} </p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: '1 1 10%' }} className="text-end flex justify-end text-[13px] text-[#333] pr-1">
          {new Intl.NumberFormat('ja-JP').format(item?.preAEPEnrollment)}{' '}
        </div>
        <div style={{ flex: '1 1 10%' }} className="flex flex-col items-end justify-center text-[13px] text-[#333] pr-1">
          <p>{new Intl.NumberFormat('ja-JP').format(item?.postAEPEnrollment)}</p>
          <p className={`${isDifferencePositive(item?.postAEPEnrollment, item?.preAEPEnrollment) ? 'text-[#28A745]' : 'text-red-500'}`}>
            {isDifferencePositive(item?.postAEPEnrollment, item?.preAEPEnrollment) && '+'}
            {new Intl.NumberFormat('ja-JP').format(getDifferenceAsString(item?.postAEPEnrollment, item?.preAEPEnrollment))}
          </p>
        </div>
      </div>
      {loading && <CustomSpin size={'small'} />}
      {planDataAsObj?.[id]?.data && Object.keys(planDataAsObj?.[id]?.data)?.length > 0 && (
        <StateCountyTableOfPlan data={planDataAsObj?.[id]?.data} />
      )}
    </div>
  )
}
export default React.memo(PlansSingleRow)
