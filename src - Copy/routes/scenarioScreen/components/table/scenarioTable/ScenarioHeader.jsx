import React from 'react'
import { SortDown, SortUp } from '../../../../../common/images/icons'
import { useDispatch, useSelector } from 'react-redux'
import HeaderCell from '../../misc/HeaderCell'
import { setDisplayedScenarios, setAllSelected, setSeletectedIds } from '../../../reducer/scenarioSlice'
import { sorting } from '../../../utils/Allscenarios'
import { Checkbox } from 'antd'
import { RESULTS } from '../../../../../common/constants/constants'

const ScenarioHeader = () => {
  const { displayedScenarios, allSelected, selectedIds, searchedIds } = useSelector(({ scenarios }) => scenarios)
  const dispatch = useDispatch()
  const uniqueSelectedIds = [...new Set(selectedIds)]

  return (
    <div className="flex border-b border-[#7D7D7D]">
      <Checkbox
        className="items-center pb-1 pl-2"
        checked={allSelected ? selectedIds.length > 0 && displayedScenarios.length <= uniqueSelectedIds.length : false}
        onChange={({ target: { checked } }) => {
          if (checked) {
            dispatch(setAllSelected(true))

            const selectedIds = displayedScenarios.map((scenario) => scenario.ScenarioId)
            dispatch(setSeletectedIds(selectedIds))
          } else {
            dispatch(setAllSelected(false))
            if (searchedIds.length > 0) {
              dispatch(setSeletectedIds(selectedIds.filter((id) => !searchedIds.includes(id))))
            } else {
              dispatch(setSeletectedIds([]))
            }
          }

          // Toggle the allSelected state
        }}
      />
      <div className="w-full uppercase sticky top-0 bg-white z-10 text-[11px] font-[600] tracking-[0.55px] leading-[14px] text-[#7D7D7D] item-center pt-2 gap-x-3 pb-1 flex item-center  pr-4 pl-2">
        <div className="text-end flex items-center gap-x-[9.5px]">
          <p>ID</p>
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="h-[10px] flex justify-center items-center"
              onClick={() => {
                dispatch(setDisplayedScenarios([]))
                dispatch(setDisplayedScenarios(sorting('ScenarioId', true, displayedScenarios)))
              }}
            >
              <SortUp />
            </button>
            <button
              type="button"
              className="h-[10px] flex justify-center items-center"
              onClick={() => {
                dispatch(setDisplayedScenarios([]))
                dispatch(setDisplayedScenarios(sorting('ScenarioId', false, displayedScenarios)))
              }}
            >
              <SortDown />
            </button>
          </div>
        </div>
        <HeaderCell dataKey="ScenarioName" title="Scenario Name" paddingRight="8px" flex="1 1 8%" showSortButtons={true} />
        <HeaderCell dataKey="ModifiedDate" title="Created On" flex="1 1 1%" showSortButtons={true} />
        <HeaderCell dataKey="CreatedBy" title="Submitted By" flex="1 1 1%" showSortButtons={true} />
        <HeaderCell dataKey="bidId" title="Bid Id" flex="1 1 1%" paddingLeft="4px" justifycontent={true} showSortButtons={true} />
        <HeaderCell dataKey="preAEPEnrollment" flex="1 1 4%" title={RESULTS.preAep} showSortButtons={true} textAlign="right" />
        <HeaderCell dataKey="postAEPEnrollment" flex="1 1 3%" title={RESULTS.postAep} showSortButtons={true} textAlign="right" />
        <HeaderCell dataKey="simulatedResult" flex="1 1 4.8%" title={RESULTS.simulatedPostAep} showSortButtons={true} textAlign="right" />
        <HeaderCell
          dataKey="simulatedChangeFromPostAEP"
          flex="1 1 7%"
          title={RESULTS.simulatedChangePostAep}
          showSortButtons={true}
          textAlign="right"
        />
        <HeaderCell title="Status" showSortButtons={false} />
        <HeaderCell title="Action" flex="1 1 0.001%" showSortButtons={false} />
      </div>
    </div>
  )
}

export default React.memo(ScenarioHeader)
