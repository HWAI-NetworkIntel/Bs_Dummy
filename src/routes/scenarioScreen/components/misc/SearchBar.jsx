import React, { useState, useEffect } from 'react'
import { Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setAllScenarios, setDisplayedScenarios, setSelectedOption, setSearchedIds, setSeletectedIds } from '../../reducer/scenarioSlice'
import { setLoading } from '../../../planSelectionScreen/reducer/planSelectionSlice'
import CreateScenario from './ScenarioManagement/Creation/CreateScenario'
import CompareScenario from './ScenarioManagement/Comparison/CompareScenario'
import DeleteScenario from './ScenarioManagement/Deletion/DeleteScenario'
import { CloseOutlined } from '@ant-design/icons'
const SearchBar = ({ userId, email, clientId, setError }) => {
  const [inputValue, setInputValue] = useState('')
  const { selectedOption, originalAllScenarios, allSelected, selectedIds, searchedIds } = useSelector(({ scenarios }) => scenarios)
  const dispatch = useDispatch()
  const debounce = (func, delay) => {
    let timer
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => func.apply(this, args), delay)
    }
  }
  const debouncedHandleInputChange = debounce((newValue) => {
    if (newValue === '') {
      // if (!allSelected) {
      //   dispatch(setSeletectedIds(selectedIds.filter((id) => !searchedIds.includes(id))))
      // }
      setError(false)
      if (originalAllScenarios.length > 0) {
        dispatch(setAllScenarios(originalAllScenarios))
        dispatch(setDisplayedScenarios(originalAllScenarios))
      }
      dispatch(setSearchedIds([]))
    } else {
      dispatch(setLoading(true))
      const searchResults = originalAllScenarios.filter((scenario) => {
        const key = selectedOption
        const value = newValue?.toLowerCase()
        if (key === 'BidId') {
          return scenario && scenario[key] && Object?.keys(scenario[key])?.some((bidId) => bidId?.toLowerCase()?.includes(value))
        } else if (scenario?.hasOwnProperty(key)) {
          const scenarioValue = scenario[key]?.toString()?.toLowerCase()
          return scenarioValue?.includes(value)
        }
        return false
      })
      const searchedIds = searchResults?.map((scenario) => scenario.ScenarioId)

      if (allSelected) {
        dispatch(setSeletectedIds([...selectedIds, ...searchedIds]))
      } else {
      }
      dispatch(setSearchedIds(searchedIds))
      dispatch(setDisplayedScenarios(searchResults))
      dispatch(setAllScenarios(searchResults))
      if (searchResults.length === 0) {
        setError(true)
      }
      dispatch(setLoading(false))
    }
  }, 500)

  const handleInputChange = (newValue) => {
    setInputValue(newValue)
    setError(false)
    debouncedHandleInputChange(newValue)
  }

  useEffect(() => {
    setError(false)
    debouncedHandleInputChange(inputValue)
  }, [selectedOption, inputValue, originalAllScenarios])

  return (
    <div className="w-full justify-between px-8 flex items-center">
      <div className="flex items-center relative h-8">
        <Input
          placeholder="Search Scenarios by Scenario ID / Scenario Name / Bid ID / Submitted by / Description"
          className="w-[731px] rounded items-center px-2 border border-[#DDDDDC] h-full"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div className="flex absolute right-2 input_select">
          <div>
            {inputValue && (
              <CloseOutlined
                onClick={() => setInputValue('')}
                style={{ color: 'rgba(0,0,0,.45)', marginRight: '7px', cursor: 'pointer' }}
              />
            )}
          </div>
          <Select
            defaultValue="ScenarioId"
            options={[
              { value: 'ScenarioId', label: 'Scenario ID' },
              { value: 'ScenarioName', label: 'Scenario Name' },
              { value: 'BidId', label: 'Bid Id' },
              { value: 'CreatedBy', label: 'Submitted By' },
              { value: 'Description', label: 'Description' },
            ]}
            onChange={(value) => {
              dispatch(setSelectedOption(value))
            }}
            className="searchbar"
            suffixIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_1695_28992)">
                  <path d="M5.83337 8.33325L10 12.4999L14.1667 8.33325H5.83337Z" fill="#5C5C5C" />
                </g>
                <defs>
                  <clipPath id="clip0_1695_28992">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
          />
        </div>
      </div>
      {/* <div className="pt-[7.5px] pb-[7.5px] pr-[8px] pl-[8px] border border-[#DDDDDC]">
        <button className="text-sm font-normal tracking-[0.7px] leading-[20px] text-[#5C276E]">
          <SearchGlass width={20} height={20} />
          Search
        </button>
      </div> */}
      <div className="flex items-center gap-x-2">
        <DeleteScenario email={email} clientId={clientId} />
        <CompareScenario clientId={clientId} email={email} />
        <CreateScenario email={email} userId={userId} clientId={clientId} />
      </div>
    </div>
  )
}
export default React.memo(SearchBar)
