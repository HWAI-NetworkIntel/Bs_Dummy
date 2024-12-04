import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getScenarioDetails, getScenarios } from '../../../api/request'
import { LOCAL_STORAGE_SCENARIO_ID } from '../../../../../common/constants/constants'
import { DetailsModal } from '../Modals/DetailsModal'
import { setAllScenarios, setDisplayedScenarios, setOriginalAllScenarios, setSeletectedIds } from '../../../reducer/scenarioSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setOriginalScenarioId } from '../../../../simulationScreen/reducer/BenefitsSlice'

const ScenarioDetails = ({ userid, action, item, ClientId, email, isAllowed }) => {
  const [OpenDetails, setOpenDetails] = useState(false)
  const { selectedIds } = useSelector(({ scenarios }) => scenarios)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const getDetails = async () => {
    setOpenDetails(true)
    setLoading(true)
    let obj1 = {
      clientId: ClientId,
      scenarioId: item?.ScenarioId,
    }
    try {
      let result = await getScenarioDetails(obj1)
      if (result?.success) {
        setError(null)
        setData(result?.data)
        setLoading(false)
      }
    } catch (error) {
      let error1 = error?.response?.data?.message
      setError(error1)
      const response = await getScenarios({
        clientId: ClientId,
        createdBy: email,
      })
      const data = response?.data?.scenario
      const validSelectedIds = selectedIds.filter((selectedId) => data.some((scenario) => scenario.ScenarioId === selectedId))

      dispatch(setOriginalAllScenarios(data))
      dispatch(setAllScenarios(data))
      dispatch(setDisplayedScenarios(data))
      dispatch(setSeletectedIds(validSelectedIds))
      setLoading(false)
    }
  }
  return (
    <div
      className="pl-1 items-center"
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        paddingLeft: action === 'Continue' ? '13px' : '10px',
      }}
    >
      <button
        style={{
          zIndex: 2,
        }}
        type='button'
        disabled={!isAllowed && action === 'Continue'}
        className={`text-[12px] leading-[18px] tracking-[0.65px] ${action === 'Continue' && !isAllowed ? 'text-[#d5d5d4]' : 'text-[#7D528B]'}  font-[600]`}
        key={item.ScenarioStatusId}
        value={item.ScenarioId}
        onClick={(event) => {
          if (item?.Status === 'Not Submitted' || item?.Status === 'Processing') {
            const selectedScenarioId = event.target.value
            localStorage.setItem(LOCAL_STORAGE_SCENARIO_ID, selectedScenarioId)
            navigate('/benefit-simulator/plan-selection/' + userid, {
              replace: true,
            })
            dispatch(setOriginalScenarioId(selectedScenarioId))
          } else {
            getDetails()
          }
        }}
      >
        {action}
      </button>
      <DetailsModal
        OpenDetails={OpenDetails}
        scenarioId={item?.ScenarioId}
        setOpenDetails={setOpenDetails}
        loading={loading}
        data={data}
        error={error}
      />
    </div>
  )
}

export default React.memo(ScenarioDetails)
