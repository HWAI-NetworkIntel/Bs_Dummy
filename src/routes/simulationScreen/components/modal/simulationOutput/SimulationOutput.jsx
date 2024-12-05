import React, { useState } from 'react'
import { BackArrow } from '../../../../../common/images/icons'
import { Modal, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BACK_TO_SCENARIOS, LOCAL_STORAGE_SCENARIO_ID, RESULTS } from '../../../../../common/constants/constants'
import { setLoading } from '../../../../planSelectionScreen/reducer/planSelectionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { createScenario, duplicateSaveFilterDetails } from '../../../../scenarioScreen/api/request'
import { openNotification } from '../../../../planSelectionScreen/components/misc/Notification'
import CustomSpin from '../../../../../common/components/CustomSpin'
import { dataScienceBenefits, dataScienceSaveFilter, dataScienceSimulationResult, saveSimulationResult } from '../../../api/request'
import { getPayloadFormatStateCountyFromObj } from '../../../../planSelectionScreen/utils/planSelection'
import { setCurrentIteration } from '../../../reducer/BenefitsSlice'
import SimulationTrend from './SimulationTrend'

const SimulationOutput = ({ userId, open, setOpen, data, email, clientId, scenarioId, scenarioName, resultfromapi, changedBenefits }) => {
  const navigate = useNavigate()
  const { planSelectedValues, filterValues, salesFlag, organizationSelectedValues, planDataAsObj } = useSelector(({ plans }) => plans)
  const { currentIteration, resimulate } = useSelector(({ benefits }) => benefits)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleResimulate = () => {
    setOpen(false)
    let Iteration = currentIteration + 1
    dispatch(setCurrentIteration(Iteration))
    let obj1 = {
      scenarioId: scenarioId,
      iteration: Iteration,
      simulationResult: resultfromapi,
    }
    let obj2 = { scenarioId: scenarioId, iteration: Iteration, bidLevelInfo: changedBenefits }
    let obj3 = {
      clientId: clientId,
      scenarioId,
      salesFlag,
      iteration: Iteration,
      orgPlan: {
        iteration: Iteration,
        scenarioId,
        organizationId: organizationSelectedValues?.toString(),
        planId: {},
      },
    }
    Object.keys(filterValues)?.forEach((key) => {
      obj3[key] = filterValues[key].selected
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
    obj3.orgPlan['planId'] = requiredObjForPayload
    dataScienceSimulationResult(obj1)
    dataScienceBenefits(obj2)
    dataScienceSaveFilter(obj3)
  }
  return (
    <Modal open={open} className="p-6" footer={null} width={920} centered closable={false}>
      <div className="w-full h-full relative">
        {loading && <CustomSpin size={'large'} />}
        <div className="w-full flex justify-between items-center pb-1 border-b border-[#E9E8E8]">
          <div className="flex gap-x-1 items-center">
            <p className="text-[#5C5C5C] font-bold">Simulation Output</p>
          </div>
        </div>
        <div className="flex justify-around gap-x-4 py-1 text-xs uppercase font-semibold text-[#7D7D7D] border-b border-[#7D7D7D]">
          <p className="w-[70px]"> {RESULTS.bidId} </p>
          <p className="w-[127px] text-right"> {RESULTS.preAep} </p>
          <p className="w-[127px] text-right">{RESULTS.postAep}</p>
          <p className="w-[127px] text-right">{RESULTS.simulatedPostAep}</p>
          <p className="w-[127px] text-right">{RESULTS.simulatedChangePostAep}</p>
        </div>
        <div className="h-[340px] overflow-y-auto">
          {data?.map(
            ({ bidId, postAEPEnrollment, simulatedResult, preAEPEnrollment, simulatedPostAEPDifference, simulatedPreAEPDifference }) => (
              <div className="h-9 flex justify-around gap-x-4 items-center border-b border-[#E9E8E8] text-[#333] text-sm">
                <p className="w-[100px]">{bidId}</p>
                <p className="w-[127px] text-right">{new Intl.NumberFormat('ja-JP').format(preAEPEnrollment)}</p>
                <p className="w-[127px] text-right">{new Intl.NumberFormat('ja-JP').format(postAEPEnrollment)}</p>
                <p className="w-[150px] text-right">{new Intl.NumberFormat('ja-JP').format(simulatedResult)}<span className='px-1' style={{fontStyle:"italic",color:"#7e7878", fontSize:"12px"}}>(8724-9150)  <span className='pl-8'>84% confidence  </span></span></p>
                
                <p
                  className={`w-[127px] flex justify-end pr-2  items-center ${simulatedPostAEPDifference > 0 ? ' text-green-500' : 'text-red-500'
                    }`}
                >
                  {simulatedPostAEPDifference > 0 ? '+' : ''} {new Intl.NumberFormat('ja-JP').format(simulatedPostAEPDifference)}
                </p>
              </div>
            )
          )}
          <div>
            <SimulationTrend/>SIGNIFICANT BENEFIT GROUPS
          </div>
        </div>
        <div className="flex justify-end mt-3" style={{ gap: '10px' }}>
          <button
            onClick={() => {
              if (resimulate) {
                handleResimulate()
              } else {
                // navigate('/benefit-simulator/plan-selection/' + userId, {
                //   replace: true,
                // })
                setLoading(false)
              }
            }}
            className='text-[14px] flex font-normal  h-[36px] leading-[20px] tracking-[0.7px] text-[#5C276E] border border-[#DDDDDC]'
            style={{ paddingLeft: '4px', paddingTop: '8px', paddingBottom: '8px', borderRadius: '4px', paddingRight: '8px' }}
          >
            <BackArrow />
            <p> {resimulate ? 'Re-Simulate' : 'Cancel'} </p>
          </button>
          <button
            className="text-[14px] font-normal h-[36px] w-[130px] flex justify-center items-center gap-x-1 rounded leading-[20px] tracking-[0.7px] text-[#FFF] border border-[#DDDDDC] bg-[#5C276E]"
            onClick={async () => {
              let obj1 = {
                scenarioId: scenarioId,
                simulationResult: resultfromapi,
              }

              try {
                let saveResult = await saveSimulationResult(obj1)
                setLoading(true)
                if (saveResult?.success) {
                  // navigate('/benefit-simulator/plan-selection/' + userId, {
                  //   replace: true,
                  // })
                } else {
                  openNotification('Failed To Save Simulation', 'error')
                }
              } catch (error) {
                openNotification('Failed To Save Simulation', 'error')
              }
              setLoading(false)
            }}
          >
            <p className="pt-[1px]">Save Simulation</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}
export default React.memo(SimulationOutput)
