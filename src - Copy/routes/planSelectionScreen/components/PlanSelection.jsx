import React, { useEffect, useState } from 'react'
import FiltersList from './filters/FiltersList'
import TableMain from './tables/TableMain'
import { useDispatch, useSelector } from 'react-redux'
import './../styles/style.css'
import {
  resetPlansData,
  setDefaultOrgKeys,
  setDefaultPlanKeys,
  setDuplicateCounties,
  setFilterOptions,
  setFilterValues,
  setFiltersList,
  setLoading,
  setSalesFlag,
} from '../reducer/planSelectionSlice'
import { getDefaultFilterValuesFromList, getSortedFiltersList } from '../utils/planSelection'
import { getClientDetails, getFilterDetails } from '../api/request'
import { useNavigate } from 'react-router-dom'
import FooterPlanSelection from './footer/FooterPlanSelection'
import Header from '../../../common/components/Header'
import { LOCAL_STORAGE_SCENARIO_ID } from '../../../common/constants/constants'
import CustomSpin from '../../../common/components/CustomSpin'
import { openNotification } from './misc/Notification'

const PlanSelection = ({ userId, clientId }) => {
  const navigate = useNavigate()
  const { loading, duplicateCounties } = useSelector(({ plans }) => plans)
  const dispatch = useDispatch()
  const [scenarioName, setScenarioName] = useState()
  const handleData = async () => {
    dispatch(setLoading(true))
    try {
      if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCENARIO_ID)) === null) {
        navigate('/benefit-simulator/scenario/' + userId, {
          replace: true,
        })
      } else {
        let clientDetails = await getClientDetails({
          clientId,
          scenarioId: JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCENARIO_ID)),
        })
        if (clientDetails.success) {
          dispatch(resetPlansData())
          dispatch(setDefaultPlanKeys(Object.keys(clientDetails?.scenarioSavedOrgPlan)))
          dispatch(setDefaultOrgKeys(Number(clientDetails?.scenarioSavedOrganizationId)))
          setScenarioName(clientDetails?.scenarioInfo?.scenarioName)
          let listOfFilters = getSortedFiltersList(clientDetails.filterInfo)
          let filterValuesAsObj = getDefaultFilterValuesFromList(listOfFilters)
          let filterData = await getFilterDetails({
            salesFlag: clientDetails.filterInfo?.salesRegionId?.position === 0 ? false : true,
            clientId: clientId,
            changedFilterName: '',
            filterValues: filterValuesAsObj,
            duplicateCounties,
          })
          if (filterData.success) {
            dispatch(setSalesFlag(clientDetails.filterInfo?.salesRegionId?.position === 0 ? false : true))
            dispatch(setFiltersList(listOfFilters)) // filters list
            dispatch(setFilterValues(filterData?.data?.filterValues)) // filter values
            dispatch(setFilterOptions(filterData?.data?.options)) // filter options
            dispatch(setDuplicateCounties(filterData?.data?.duplicateCounties))
          } else {
            dispatch(setFiltersList([])) // filters list
            dispatch(setFilterValues({})) // filter values
            dispatch(setFilterOptions({})) // filter options
          }
        } else {
          navigate('/benefit-simulator/scenario/' + userId, {
            replace: true,
          })
          dispatch(setFiltersList([]))
          dispatch(setFilterValues([]))
        }
      }
    } catch (error) {
      navigate('/benefit-simulator/scenario/' + userId, {
        replace: true,
      })
      let error1 = error?.response?.data?.message
      if (error1 === 'scenarioId not found') {
        error1 = "Scenario doesn't exist!"
      }
      openNotification(error1, 'error')
      dispatch(setLoading(false))
    }
  }
  useEffect(() => {
    handleData()
  }, [])
  useEffect(() => {
    let a = document.querySelectorAll('.p-multiselect-panel')[0]
    if (a) {
      if (loading) {
        a.classList.add('hideOptions')
      } else {
        a.classList.remove('hideOptions')
      }
    }
  }, [loading])
  return (
    <div className="bg-white relative pt-2 flex flex-col justify-between min-h-screen">
      {loading && <CustomSpin size={'large'} />}
      <Header scenarioName={scenarioName} pageNo={2} userId={userId} clientId={clientId} />
      <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: 'calc(100vh - 85px)' }}>
        <FiltersList clientId={clientId} />
        <TableMain />
      </div>
      <FooterPlanSelection scenarioId={JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCENARIO_ID))} clientId={clientId} userId={userId} />
    </div>
  )
}
export default React.memo(PlanSelection)
