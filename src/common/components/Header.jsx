import React from 'react'
import { HomeIcon, HomeNext } from '../images/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveFilters } from '../../routes/planSelectionScreen/api/request'
import { openNotification } from '../../routes/planSelectionScreen/components/misc/Notification'
import { setLoading } from '../../routes/planSelectionScreen/reducer/planSelectionSlice'
import { getPayloadFormatStateCountyFromObj } from '../../routes/planSelectionScreen/utils/planSelection'
import { LOCAL_STORAGE_SCENARIO_ID } from '../constants/constants'

const Header = ({ scenarioName, pageNo, userId, clientId }) => {
  const { planSelectedValues, filterValues, organizationSelectedValues, salesFlag, planDataAsObj } = useSelector(({ plans }) => plans)
  const dispatch = useDispatch()
  // const scenarioId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCENARIO_ID))
  let scenarioId
  try {
    scenarioId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCENARIO_ID))
  } catch (error) {
    scenarioId = null
  }
  const handleBack = async () => {
    if (planSelectedValues?.length > 0) {
      dispatch(setLoading(true))
      try {
        let payload = {
          clientId: clientId,
          scenarioId,
          salesFlag,
          orgPlan: {
            scenarioId,
            organizationId: organizationSelectedValues?.toString(),
            planId: {},
          },
        }
        Object.keys(filterValues)?.forEach((key) => {
          payload[key] = filterValues[key].selected
        })
        let requiredObjForPayload = {}
        planSelectedValues?.forEach((bidIdAsString) => {
          requiredObjForPayload[bidIdAsString] = {
            planTypeId: planDataAsObj[bidIdAsString]?.planTypeId,
            planCategoryId: planDataAsObj[bidIdAsString]?.planCategoryId,
            premiumId: planDataAsObj[bidIdAsString]?.premiumId,
            stateCounty: getPayloadFormatStateCountyFromObj(planDataAsObj[bidIdAsString]?.data),
          }
        })
        payload.orgPlan['planId'] = requiredObjForPayload
        let result = await saveFilters(payload)
        if (result.success) {
          // navigate('/benefit-simulator/scenario/' + userId, {
          //   replace: true,
          // })
        } else {
          openNotification(result.message, 'error')
        }
        dispatch(setLoading(false))
      } catch (error) {
        dispatch(setLoading(false))
      }
    } else {
      openNotification('Please select at least 1 plan to continue', 'error')
    }
  }
  const navigate = useNavigate()
  return (
    <div className="w-full h-6 px-1 flex justify-between items-center border-y border-[#E9E8E8]">
      <div className="flex items-center">
        <div className="w-[1302px] h-8 px-8 py-1 justify-between items-center inline-flex">
          <div className="justify-start items-center gap-1 flex">
            <div className="text-[#5c5c5c] text-base font-semibold font-['Roboto'] leading-normal tracking-wide">Benefit Simulator</div>
          </div>
          
        </div>

        {pageNo === 2 && (
          <>
            <p className="text-[#5C5C5C] pt-[1px] text-[13px]"></p>
          </>
        )}
        {pageNo === 3 && (
          <>
            <p
              className="text-primary_hue_purple pt-[1px] text-[13px] cursor-pointer"
              onClick={() => {
                navigate('/benefit-simulator/plan-selection/' + userId, {
                  replace: true,
                })
              }}
            >
              Select Plans
            </p>
            <HomeNext />
            <p className="text-[#5C5C5C] text-[13px] pt-[1px]">Change Benefits</p>
          </>
        )}
      </div>
      <p className="text-[#5C5C5C] text-[13px] font-semibold pt-[1px]"> {scenarioName}</p>
    </div>
  )
}
export default React.memo(Header)
