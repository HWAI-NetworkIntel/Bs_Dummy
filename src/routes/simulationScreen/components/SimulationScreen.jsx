import React, { useEffect, useState } from 'react'
import FooterSimulation from './footer/FooterSimulation'
import BenefitListTable from './BenefitListTable'
import BidIdHeader from './BidIdHeader'
import { useDispatch, useSelector } from 'react-redux'
import {
  addBenefits,
  addModifiedBenefits,
  resetBenefitsData,
  setCurrentIteration,
  setListOfBidIds,
  setSelectedBidId,
  setSignificantBenefitList,
  setResimulate,
} from '../reducer/BenefitsSlice'
import { groupBenefitsAsPerBenefitOrderAndBidId, mapBidIdWithModifiedData } from '../utils/Benefits'
import Header from '../../../common/components/Header'
import { getSignificantBenefits } from '../api/request'
import { getClientDetails } from '../../planSelectionScreen/api/request'
import '../style/style.css'
import { useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_SCENARIO_ID } from '../../../common/constants/constants'
import CustomSpin from '../../../common/components/CustomSpin'

const SimulationScreen = ({ userId, clientId, userEmail }) => {
  const { originalScenarioId } = useSelector(({ benefits }) => benefits)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [scenarioName, setScenarioName] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleData = async () => {
    setLoading(true)
    try {
      let clientDetails = await getClientDetails({
        clientId,
        scenarioId: JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCENARIO_ID)),
      })
      if (clientDetails.success) {
        dispatch(setResimulate(clientDetails?.clientInfo?.canResimulate))
        setScenarioName(clientDetails?.scenarioInfo?.scenarioName)
        setCurrentIteration(clientDetails?.currentIteration)
        let requiredPayloadForBenefitsList = { ...clientDetails?.scenarioSavedOrgPlan }
        Object.keys(requiredPayloadForBenefitsList)?.forEach((key) => {
          requiredPayloadForBenefitsList[key].countyId = requiredPayloadForBenefitsList[key].countyId.toString()
          requiredPayloadForBenefitsList[key].stateId = requiredPayloadForBenefitsList[key].stateId.toString()
        })
        let result = await getSignificantBenefits({
          significantBenfitCount: clientDetails?.clientInfo?.significantBenefitCount,
          bidLevelInfo: requiredPayloadForBenefitsList,
          originalScenarioId
        })
        if (result.success) {
          dispatch(resetBenefitsData())
          dispatch(setListOfBidIds(Object.keys(result.data)))
          dispatch(setSignificantBenefitList(result.data))
          dispatch(addBenefits(groupBenefitsAsPerBenefitOrderAndBidId(result.data)))
          dispatch(addModifiedBenefits(mapBidIdWithModifiedData(result.data)))
          dispatch(setSelectedBidId(Object.keys(result.data)[0]))
          setLoading(false)
        } else {
          setLoading(false)
        }
      } else {
        navigate('/benefit-simulator/scenario/' + userId, {
          replace: true,
        })
        setLoading(false)
      }
    } catch (error) {
      navigate('/benefit-simulator/scenario/' + userId, {
        replace: true,
      })
      setLoading(false)
    }
  }
  useEffect(() => {
    handleData()
  }, [])
  useEffect(() => {
    setCount(1)
  }, [count])
  return (
    <div className="bg-white apply_only relative pt-2 flex flex-col justify-between min-h-screen">
      {loading && <CustomSpin size={'large'} />}
      <Header scenarioName={scenarioName} pageNo={3} userId={userId} />
      <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: 'calc(100vh - 84px)' }}>
        <BidIdHeader setCount={setCount} />
        {count === 0 ? '' : <BenefitListTable />}
      </div>
      <FooterSimulation
        scenarioName={scenarioName}
        scenarioId={JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCENARIO_ID))}
        clientId={clientId}
        userId={userId}
        setLoading={setLoading}
        email={userEmail}
      />
    </div>
  )
}
export default React.memo(SimulationScreen)
