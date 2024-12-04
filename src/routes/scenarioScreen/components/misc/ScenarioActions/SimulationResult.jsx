import React, { useState } from 'react'
import { ResultIcon } from '../../../../../common/images/icons'
import { getScenarios, getSimulationresult } from '../../../api/request'
import SimulationResultModal from '../Modals/SimulationResultModal'
import { useDispatch, useSelector } from 'react-redux'
import { setAllScenarios, setDisplayedScenarios, setOriginalAllScenarios, setSeletectedIds } from '../../../reducer/scenarioSlice'
import { openNotification } from '../../../../planSelectionScreen/components/misc/Notification'
import { setLoading } from '../../../../planSelectionScreen/reducer/planSelectionSlice'

const SimulationResult = ({ item, setCard, card, email, clientId }) => {
  const [OpenResult, setOpenResult] = useState(false)
  const { loading } = useSelector(({ plans }) => plans)

  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const { selectedIds } = useSelector(({ scenarios }) => scenarios)
  const [loading1, setLoading1] = useState(false)
  const [disable, setDisable] = useState(item?.Status === 'Not Submitted' || item?.Status === 'Processing')

  const handleClick = async (event) => {
    dispatch(setLoading(true))

    event.stopPropagation()
    const obj = item?.ScenarioId
    try {
      const result = await getSimulationresult(obj)
      const resultData = result?.success
      if (resultData) {
        setOpenResult(true)
        setLoading1(true)
        let modifiedSimulationOutput = Object.keys(result.data)?.map((key) => ({
          ...result.data[key],
          bidId: key,
        }))
        setData(modifiedSimulationOutput)
      }
    } catch (error) {
      openNotification(error?.response?.data?.message, 'error')
      const response = await getScenarios({
        clientId: clientId,
        createdBy: email,
      })
      const data = response?.data?.scenario
      const validSelectedIds = selectedIds.filter((selectedId) => data.some((scenario) => scenario.ScenarioId === selectedId))

      dispatch(setOriginalAllScenarios(data))
      dispatch(setAllScenarios(data))
      dispatch(setDisplayedScenarios(data))
      dispatch(setSeletectedIds(validSelectedIds))
    } finally {
      setLoading1(false)
      dispatch(setLoading(false))
    }
  }
  return (
    <div className="scenario-card-option flex border-b pb-[6px]">
      <button className="w-full text-left flex" onClick={handleClick} disabled={disable}>
        <ResultIcon />

        <div className="pl-1">Simulation Result</div>
      </button>
      <SimulationResultModal
        data={data}
        loading={loading1}
        OpenResult={OpenResult}
        setOpenResult={setOpenResult}
        setCard={setCard}
        card={card}
        scenarioId={item?.ScenarioId}
      />
    </div>
  )
}

export default React.memo(SimulationResult)
