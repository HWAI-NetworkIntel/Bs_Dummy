import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../reducer/planSelectionSlice'
import { saveFilters } from '../../api/request'
import { openNotification } from '../misc/Notification'
import { useNavigate } from 'react-router-dom'
import { getPayloadFormatStateCountyFromObj } from '../../utils/planSelection'
import { BackArrow, NextArrow } from '../../../../common/images/icons'

function FooterPlanSelection({ scenarioId, userId, clientId }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { planSelectedValues, salesFlag, filterValues, organizationSelectedValues, planDataAsObj } = useSelector(({ plans }) => plans)
  const saveFiltersData = async () => {
    dispatch(setLoading(true))
    try {
      let payload = {
        clientId: clientId,
        salesFlag,
        scenarioId,
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
        navigate('/benefit-simulator/simulation/' + userId, {
          replace: true,
        })
      } else {
        openNotification(result.message, 'error')
      }
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
    }
  }
  const handleBack = async () => {
    dispatch(setLoading(true))
    try {
      let payload = {
        clientId: clientId,
        salesFlag,
        scenarioId,
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
        // navigate('/benefit-simulator/plan-selection/' + userId, {
        //   replace: true,
        // })
      } else {
        openNotification(result.message, 'error')
      }
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
    }
  }
  return (
    <div
      style={{
        boxShadow: '0px -2px 8px 0px rgba(0, 0, 0, 0.12)',
      }}
      className="w-full py-2 px-8 flex justify-between items-center bg-white"
    >
      <p className="text-[#5C5C5C]">
        {planSelectedValues?.length > 0 ? planSelectedValues?.length : 'No'} {planSelectedValues?.length === 1 ? 'plan' : 'plans'} selected
      </p>
      <div className="flex gap-x-2 items-center">
        <button
          className="w-[76px] h-9 rounded bg-white flex pl-1 items-center border-[#DDDDDC] border"
          type="button"
          disabled={planSelectedValues?.length === 0}
          onClick={() => {
            handleBack()
          }}
        >
          <BackArrow />
          <p className="text-sm text-[#5C276E]">Back</p>
        </button>
        <button
          onClick={() => {
            saveFiltersData()
          }}
          disabled={planSelectedValues?.length === 0}
          className="w-[76px] h-9 flex rounded justify-center items-center bg-[#5C276E] "
          type="button"
        >
          <p className="text-white pl-2">Next</p>
          <NextArrow />
        </button>
      </div>
    </div>
  )
}

export default React.memo(FooterPlanSelection)
