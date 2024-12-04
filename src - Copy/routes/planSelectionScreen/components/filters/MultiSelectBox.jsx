import React from 'react'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import { getFilterDetails } from '../../api/request'
import { useDispatch, useSelector } from 'react-redux'
import {
  setDuplicateCounties,
  setFilterValues,
  setLoading,
  updateFilterOptions,
  updateFilterValues,
} from '../../reducer/planSelectionSlice'
import { getCascadingEmptyOptions, getSelectedItemsLabel, multiSelectValue } from '../../utils/planSelection'
import { filterDropDownIcon } from '../../../../common/images/icons'

const MultiSelectBox = ({ item, clientId }) => {
  const dispatch = useDispatch()
  const { filterValues, filtersList, filterOptions, salesFlag, duplicateCounties } = useSelector(({ plans }) => plans)

  const filterHandler = async (value) => {
    dispatch(setLoading(true))
    if (value?.length > 0) {
      if (item.name === 'planTypeId') {
        dispatch(updateFilterValues({ key: item.name, value: value.toString() }))
      } else {
        let filterData = await getFilterDetails({
          salesFlag,
          clientId,
          changedFilterName: item.name,
          duplicateCounties,
          filterValues: {
            ...filterValues,
            [item.name]: {
              ...filterValues[item.name],
              selected: value.toString(),
            },
          },
        })
        dispatch(setFilterValues(filterData?.data?.filterValues))
        dispatch(updateFilterOptions(filterData?.data?.options))
        dispatch(setDuplicateCounties(filterData?.data?.duplicateCounties))
      }
    } else {
      dispatch(updateFilterValues({ key: item.name, value: '' }))
      dispatch(updateFilterOptions(getCascadingEmptyOptions(filtersList, item.position)))
    }
  }

  return (
    <div className="w-[200px] gap-y-1">
      <div className="w-full h-5 flex items-center text-[#7D7D7D] uppercase font-semibold text-[11px]">{item.label}</div>
      {item.multiselect ? (
        <MultiSelect
          filter
          options={filterOptions[item.name]}
          onChange={({ value }) => {
            filterHandler(value)
          }}
          value={multiSelectValue(filterOptions[item?.name], filterValues?.[item?.name]?.selected)}
          optionLabel="Name"
          selectedItemsLabel={getSelectedItemsLabel(filterOptions[item?.name], filterValues?.[item?.name]?.selected)}
          optionValue="Id"
          dataKey="Id"
          placeholder={'Select ' + item?.label}
          maxSelectedLabels={1}
          className="w-full h-7 rounded border border-[#DDDDDC] flex items-center"
          style={{ borderRadius: '4px' }}
          dropdownIcon={filterDropDownIcon}
        />
      )
        : (
          <div className='relative'>
            <Dropdown
              filter
              options={filterOptions[item.name]}
              onChange={({ value }) => {
                filterHandler([value])
              }}
              value={multiSelectValue(filterOptions[item?.name], filterValues?.[item?.name]?.selected)[0] || ''}
              optionLabel="Name"
              selectedItemsLabel={getSelectedItemsLabel(filterOptions[item?.name], filterValues?.[item?.name]?.selected)}
              optionValue="Id"
              dataKey="Id"
              placeholder={'Select ' + item?.label}
              maxSelectedLabels={1}
              className="w-full h-7 rounded border border-[#DDDDDC] flex items-center"
              style={{ borderRadius: '4px' }}
              dropdownIcon={filterDropDownIcon}
            />
            <div className='absolute top-0.5 right-2 z-10'>
              {filterDropDownIcon}
            </div>
          </div>
        )}


    </div>
  )
}
export default React.memo(MultiSelectBox)
