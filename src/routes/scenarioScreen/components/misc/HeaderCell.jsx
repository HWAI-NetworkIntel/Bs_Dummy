import { useDispatch, useSelector } from 'react-redux'
import { SortDown, SortUp } from '../../../../common/images/icons'
import { setDisplayedScenarios } from '../../reducer/scenarioSlice'
import { sorting } from '../../utils/Allscenarios'
import React from 'react'

const HeaderCell = ({ dataKey, title, flex, justifycontent, paddingLeft, textAlign, showSortButtons, paddingRight }) => {
  const dispatch = useDispatch()
  const { displayedScenarios } = useSelector(({ scenarios }) => scenarios)
  return (
    <div
      className="flex items-center gap-x-1"
      style={justifycontent ? { flex, justifyContent: 'space-between', paddingLeft } : { flex, paddingLeft }}
    >
      <p style={{ textAlign, paddingRight }}>{title}</p>
      {showSortButtons && (
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setDisplayedScenarios([]))
              dispatch(setDisplayedScenarios(sorting(dataKey, true, displayedScenarios)))
            }}
          >
            <SortUp />
          </button>
          <button
            type="button"
            className="h-[10px] flex justify-center items-center"
            onClick={() => {
              dispatch(setDisplayedScenarios([]))
              dispatch(setDisplayedScenarios(sorting(dataKey, false, displayedScenarios)))
            }}
          >
            <SortDown />
          </button>
        </div>
      )}
    </div>
  )
}
export default React.memo(HeaderCell)
