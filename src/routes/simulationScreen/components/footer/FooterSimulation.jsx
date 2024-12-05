import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openNotification } from '../../../planSelectionScreen/components/misc/Notification'
import { BackArrow, Simulate } from '../../../../common/images/icons'
import { getSimulateThroughUI } from '../../api/request'
import SimulationOutput from '../modal/simulationOutput/SimulationOutput'
import { SIMULATION_ERROR_FOR_NO_CHANGE, SIMULATION_FAILED } from '../../../../common/constants/constants'
import { updateValuesToZero } from '../../utils/ChangedItems'

function FooterSimulation({ userId, scenarioId, setLoading, email, clientId, scenarioName }) {
  const { errorBenefitNameList, benefits, copayCoins } = useSelector(({ benefits }) => benefits)
  const navigate = useNavigate()
  const [openResults, setOpenResults] = useState(false)
  const [simulationResults, setSimulationResult] = useState([])
  const [resultfromapi, setresultfromapi] = useState({})
  const [changedBenefits, setChangedBenefits] = useState()
  const simulationHandler = async () => {
    try {
      setLoading(true)
      if (errorBenefitNameList?.length > 0) {
        let namesList = errorBenefitNameList[0]?.split('-')
        let finalName = namesList.filter((str, i, arr) => i !== arr.length - 1)?.join('-')
        const project = document.getElementById(finalName)
        openNotification(`Please fill complete details for ${finalName}`, 'error')
        project.scrollIntoView()
        setLoading(false)
      } else {
        let allData = { ...benefits }
        let changedItems = {}
        Object.keys(allData).forEach((bidId) => {
          Object.keys(allData[bidId])?.forEach((key) => {
            let newObj = updateValuesToZero(allData[bidId]?.[key])
            if (newObj?.currentValue !== newObj?.newValueFromUI) {
              if (newObj?.newValueFromUI !== '') {
                const { newValue, ...rest } = newObj
                const modifiedItem = { ...rest }
                if (changedItems[bidId]) {
                  changedItems[bidId].push(modifiedItem)
                } else {
                  changedItems[bidId] = [modifiedItem]
                }
              }
            }
          })
        })
        setChangedBenefits(changedItems)
        // const updatedItems = updateValuesToZero(changedItems, copayCoins)
        setTimeout(async () => {
          if (Object.keys(changedItems)?.length === 0) {
            openNotification(SIMULATION_ERROR_FOR_NO_CHANGE, 'error')
            setLoading(false)
          } else {
            try {
              let result = {
                "success": true,
                "data": {
                    "H3388_014_0": {
                        "preAEPEnrollment": 6743,
                        "postAEPEnrollment": 8548,
                        "simulatedResult": 8978,
                        "simulatedPreAEPDifference": 0,
                        "simulatedPostAEPDifference": 430
                    }
                }
            }
              console.log('getSimulateThroughUI', result);
              
              if (result.success) {
                let finalResult = result?.data
                let modifiedSimulationOutput = Object.keys(finalResult)?.map((key) => ({
                  ...finalResult[key],
                  bidId: key,
                }))
                setresultfromapi(finalResult)
                setSimulationResult(modifiedSimulationOutput)
                setOpenResults(true)
              } else {
                openNotification(SIMULATION_FAILED, 'error')
              }
              setLoading(false)
            } catch (error) {
              openNotification(SIMULATION_FAILED, 'error')
              setLoading(false)
            }
          }
        }, 400)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        boxShadow: '0px -2px 8px 0px rgba(0, 0, 0, 0.12)',
      }}
      className="w-full py-2 px-8 flex justify-between items-center bg-white"
    >
      <SimulationOutput
        userId={userId}
        data={simulationResults}
        open={openResults}
        setOpen={setOpenResults}
        email={email}
        clientId={clientId}
        scenarioId={scenarioId}
        scenarioName={scenarioName}
        resultfromapi={resultfromapi}
        setLoading={setLoading}
        changedBenefits={changedBenefits}
      />
      <div className="flex items-center gap-x-2"></div>
      <div className="flex gap-x-2 items-center">
        <button
          className="w-[76px] h-9 rounded bg-white flex pl-1 items-center border-[#DDDDDC] border"
          type="button"
          onClick={() => {
            navigate('/benefit-simulator/plan-selection/' + userId, {
              replace: true,
            })
          }}
        >
          <BackArrow />
          <p className="text-sm text-[#5C276E]">Back</p>
        </button>
        <button
          onClick={() => {
            simulationHandler()
          }}
          className="w-[109px] h-9 flex rounded justify-center items-center bg-[#5C276E] "
          type="button"
        >
          <Simulate />
          <p className="text-white pl-2">Simulate</p>
        </button>
      </div>
    </div>
  )
}

export default React.memo(FooterSimulation)
