import React, { useEffect, useState } from 'react'
import FiltersList from './filters/FiltersList'
import TableMain from './tables/TableMain'
import { useDispatch, useSelector } from 'react-redux'
import CreateScenarioModal from '../../scenarioScreen/components/misc/Modals/CreateScenarioModal'
import { CreateIcon } from '../../../common/images/icons'
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
import BenefitsModal from '../../scenarioScreen/components/misc/Modals/BenefitsModal'

const PlanSelection = ({ userId, clientId }) => {
  const navigate = useNavigate()
  const { loading, duplicateCounties } = useSelector(({ plans }) => plans)
  const [ModalOpen, setModalOpen] = useState(false)
  const [benefitsModalOpen, setbenefitsModalOpen] = useState(false)
  const [blockButton, setBlockButton] = useState(false)
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
        let clientDetails = {
          "success": true,
          "currentIteration": 1,
          "clientInfo": {
              "significantBenefitCount": 21,
              "planCountForSimulation": 25,
              "canResimulate": true
          },
          "scenarioSavedOrganizationId": "136",
          "scenarioSavedOrgPlan": {
              "H3388_014_0": {
                  "planCategoryId": "1",
                  "stateId": [
                      "32"
                  ],
                  "countyId": [
                      "36091",
                      "36001",
                      "36083",
                      "36093",
                      "36115",
                      "36113",
                      "36057",
                      "36021",
                      "36035",
                      "36095",
                      "36039",
                      "36077",
                      "36025",
                      "36031",
                      "36007",
                      "36019",
                      "36065",
                      "36043",
                      "36033",
                      "36017",
                      "36041",
                      "36107",
                      "36089",
                      "36045",
                      "36049",
                      "36053"
                  ]
              }
          },
          "scenarioInfo": {
              "scenarioId": 665,
              "scenarioName": "TC_test"
          },
          "filterInfo": {
              "salesRegionId": {
                  "label": "Sales Region",
                  "name": "salesRegionId",
                  "position": 1,
                  "multiselect": 1,
                  "defaultId": "145,21"
              },
              "marketId": {
                  "label": "Market",
                  "name": "marketId",
                  "position": 0,
                  "multiselect": false,
                  "defaultId": "undefined"
              },
              "subMarketId": {
                  "label": "Sub Market",
                  "name": "subMarketId",
                  "position": 0,
                  "multiselect": false,
                  "defaultId": "undefined"
              },
              "stateId": {
                  "label": "State",
                  "name": "stateId",
                  "position": 2,
                  "multiselect": true,
                  "defaultId": "32"
              },
              "footprintId": {
                  "label": "Footprint",
                  "name": "footprintId",
                  "position": 0,
                  "multiselect": false,
                  "defaultId": "undefined"
              },
              "countyId": {
                  "label": "County",
                  "name": "countyId",
                  "position": 3,
                  "multiselect": true,
                  "defaultId": "36001,36003,36005,36007,36009,36011,36013,36015,36017,36019,36021,36023,36025,36027,36029,36031,36033,36035,36037,36039,36041,36043,36045,36047,36049,36051,36053,36055,36057,36059,36061,36063,36065,36067,36069,36071,36073,36075,36077,36079,36081,36083,36085,36087,36091,36093,36095,36097,36099,36089,36101,36103,36105,36107,36109,36111,36113,36115,36117,36119,36121,36123"
              },
              "premiumId": {
                  "label": "Premium",
                  "name": "premiumId",
                  "position": 5,
                  "multiselect": true,
                  "defaultId": "1,2"
              },
              "planCategoryId": {
                  "label": "SNP Type",
                  "name": "planCategoryId",
                  "position": 4,
                  "multiselect": true,
                  "defaultId": "1"
              },
              "planTypeId": {
                  "label": "Plan Type",
                  "name": "planTypeId",
                  "position": 5,
                  "multiselect": true,
                  "defaultId": "3,4,5,6,9,10,11,12"
              },
              "organizationId": {
                  "label": "Plan Type",
                  "name": "planTypeId",
                  "position": 6,
                  "multiselect": true,
                  "defaultId": "3,4,5,6,9,10,11,12"
              },
              "plandescriptionId": {
                  "label": "Plan Type",
                  "name": "planTypeId",
                  "position": 7,
                  "multiselect": true,
                  "defaultId": "1"
              }
          }
      }
        console.log("clientDetails 1",clientDetails)
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

          console.log("filterData 1",filterData);
          
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

  const handleOnSave = async () => {
    
    
  }
  return (
    <div className="bg-white relative pt-2 flex flex-col justify-between min-h-screen">
      {loading && <CustomSpin size={'large'} />}
      <Header scenarioName={scenarioName} pageNo={2} userId={userId} clientId={clientId} />
      <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: 'calc(100vh - 85px)' }}>
        <FiltersList clientId={clientId} />
        <div className="w-[100%] h-9 px-8  justify-start items-center gap-2 inline-flex">
          <div className="h-7 justify-between items-start flex">
            <div className="h-7 justify-start items-start flex">
              <div className="grow shrink basis-0 h-7 px-2 py-1 border border-[#dddddc] justify-between items-center flex">
                <div className="text-[#dddddc] text-[13px] font-normal font-['Roboto'] leading-[18px] tracking-wide">
                  Search by Iteration Name
                </div>
                <div className="px-2 bg-white rounded-[44px] border border-[#dddddc] justify-center items-center gap-1 flex">
                  <div className="text-[#5c5c5c] text-sm font-normal font-['Roboto'] leading-tight tracking-wide">Scenario ID</div>
                  <div className="w-5 h-5 relative" />
                </div>
              </div>
              <div className="px-2 py-1 bg-white border border-[#dddddc] justify-center items-center gap-1 flex">
                <div className="w-5 h-5 relative" />
                <div className="text-[#5c276e] text-[13px] font-normal font-['Roboto'] leading-[18px] tracking-wide">Search</div>
              </div>
            </div>
            <div className="justify-start items-center gap-2 flex">
              <div className="px-2 py-1 bg-white border border-[#fff] justify-center items-center gap-1 flex">
                <div className="justify-center items-center flex">
                  <div className="w-5 h-5 relative" />
                  <div className="text-[#fff] text-[13px] font-normal font-['Roboto'] leading-[18px] tracking-wide">Download </div>
                </div>
                <div className="w-5 h-5 relative" />
              </div>
              <div className="px-2 py-1 bg-white border border-[#fff] justify-center items-center gap-1 flex">
                <div className="w-5 h-5 relative" />
                <div className="justify-center items-center flex">
                  <div className="text-[#fff] text-[13px] font-normal font-['Roboto'] leading-[18px] tracking-wide">Delete </div>
                </div>
              </div>
              <div className="px-2 py-1 bg-white border border-[#fff] justify-center items-center gap-1 flex">
                <div className="w-5 h-5 relative" />
                <div className="justify-center items-center flex">
                  <div className="text-[#fff] text-[13px] font-normal font-['Roboto'] leading-[18px] tracking-wide">Delete </div>
                </div>
              </div>

              <div className="px-2 py-1 bg-[#fff] justify-end items-center gap-1 flex">
                <div className="w-5 h-5 relative" />
                <div className="justify-center items-center flex">
                  <div className="text-white text-[13px] font-semibold font-['Roboto'] leading-[18px] tracking-wide">New Scenario</div>
                </div>
              </div>
              
            </div>
            <div className="justify-start items-center gap-2 flex">
              <div className="px-2 py-1 bg-white border border-[#fff] justify-center items-center gap-1 flex">
                <div className="justify-center items-center flex">
                  <div className="w-5 h-5 relative" />
                  <div className="text-[#fff] text-[13px] font-normal font-['Roboto'] leading-[18px] tracking-wide"> </div>
                </div>
                <div className="w-5 h-5 relative" />
              </div>
              <div>
                <button
                  className="flex justify-center items-center gap-x-1 w-[166px] h-[32px] border border-[#5C276E] text-sm text-[#FFF] bg-[#5C276E] tracking-[0.7px] leading-[18px]"
                  onClick={() => setbenefitsModalOpen(true)}
                >
                  
                  <div className="pt-[1px]">Significant Benefits</div>
                </button>
                <BenefitsModal
                  blockButton={blockButton}
                  ModalOpen={benefitsModalOpen}
                  setModalOpen={setbenefitsModalOpen}
                  handleOnSave={handleOnSave}
                />
              </div>
             
            </div>
            <div className="justify-start items-center gap-2 flex cursor-pointer " style={{ paddingLeft: '80px' }}>
              <div className="px-2 py-1 bg-white border border-[#dddddc] justify-center items-center gap-1 flex">
                <div className="justify-center items-center flex">
                  <div className="w-5 h-5 relative" />
                  <div className="text-[#dddddc] text-[13px] font-normal font-['Roboto'] leading-[18px] tracking-wide">Download </div>
                </div>
                <div className="w-5 h-5 relative" />
              </div>
              <div className="px-2 py-1 bg-white border border-[#dddddc] justify-center items-center gap-1 flex">
                <div className="w-5 h-5 relative" />
                <div className="justify-center items-center flex">
                  <div className="text-[#dddddc] text-[13px] font-normal font-['Roboto'] leading-[18px] tracking-wide">Delete </div>
                </div>
              </div>
              <div>
                <button
                  className="flex justify-center items-center gap-x-1 w-[136px] h-[32px] border border-[#5C276E] text-sm text-[#FFF] bg-[#5C276E] tracking-[0.7px] leading-[18px]"
                  onClick={() => setModalOpen(true)}
                >
                  <CreateIcon width={20} height={20} />
                  <div className="pt-[1px]">New Scenario</div>
                </button>
                <CreateScenarioModal
                  blockButton={blockButton}
                  ModalOpen={ModalOpen}
                  setModalOpen={setModalOpen}
                  handleOnSave={handleOnSave}
                />
              </div>
            </div>
          </div>
        </div>
        <TableMain />
      </div>
      <FooterPlanSelection scenarioId={JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCENARIO_ID))} clientId={clientId} userId={userId} />
    </div>
  )
}
export default React.memo(PlanSelection)
