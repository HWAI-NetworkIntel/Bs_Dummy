import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../../common/components/Header'
import ParentTable from './table/ParentTable'
import { getScenarios } from '../api/request'
import {
  setAllScenarios,
  setCompareCount,
  setDisplayedScenarios,
  setOriginalAllScenarios,
  setSeletectedIds,
} from '../reducer/scenarioSlice'
import { setLoading } from '../../planSelectionScreen/reducer/planSelectionSlice'
import Title from './misc/Title'
import SearchBar from './misc/SearchBar'
import './../style/style.css'
import CustomSpin from '../../../common/components/CustomSpin'

const ScenarioScreen = ({ ClientId, userid, userEmail, userName }) => {
  const { loading } = useSelector(({ plans }) => plans)
  const { selectedIds } = useSelector(({ scenarios }) => scenarios)

  const [error, setError] = useState(false)

  const dispatch = useDispatch()
  const handleData = async () => {
    dispatch(setLoading(true))
    try {
      const response = await getScenarios({
        clientId: ClientId,
        createdBy: userEmail,
      })

      if (response.success) {
        const data = response?.data?.scenario
        if (data) {
          dispatch(setOriginalAllScenarios(data))
          const data2 = response?.data?.isComparable[0].ComparableTotal
          dispatch(setCompareCount(data2))
          dispatch(setAllScenarios(data))
          dispatch(setDisplayedScenarios(data))
          // // const validSelectedIds = selectedIds.filter((selectedId) => data.some((scenario) => scenario.ScenarioId === selectedId))
          dispatch(setSeletectedIds([]))
        } else {
        }

        dispatch(setLoading(false))
      } else {
        console.error('API call failed:', response.error)
      }
    } catch (error) {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    handleData()
  }, [])

  return (
    <div className="bg-white relative pt-2 flex flex-col first_screen">
      {loading && <CustomSpin size={'large'} />}
      <Header pageNo={1} userId={userid} clientId={ClientId} />
      <Title />
      <SearchBar userId={userid} email={userEmail} clientId={ClientId} setError={setError} />
      <ParentTable userName={userName} email={userEmail} ClientId={ClientId} userid={userid} error={error} />
    </div>
  )
}

export default React.memo(ScenarioScreen)
