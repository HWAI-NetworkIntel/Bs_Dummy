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
  const { filterValues, filtersList, salesFlag, duplicateCounties } = useSelector(({ plans }) => plans)


let filterOptions = 
{
  "salesRegionId": [
      {
          "Id": 145,
          "Name": "All"
      },
      {
          "Id": 21,
          "Name": "Others"
      }
  ],
  "stateId": [
      {
          "Id": 1,
          "Name": "Alabama"
      },
      {
          "Id": 3,
          "Name": "Arizona"
      },
      {
          "Id": 4,
          "Name": "Arkansas"
      },
      {
          "Id": 5,
          "Name": "California"
      },
      {
          "Id": 6,
          "Name": "Colorado"
      },
      {
          "Id": 7,
          "Name": "Connecticut"
      },
      {
          "Id": 8,
          "Name": "Delaware"
      },
      {
          "Id": 9,
          "Name": "Florida"
      },
      {
          "Id": 10,
          "Name": "Georgia"
      },
      {
          "Id": 11,
          "Name": "Hawaii"
      },
      {
          "Id": 12,
          "Name": "Idaho"
      },
      {
          "Id": 13,
          "Name": "Illinois"
      },
      {
          "Id": 14,
          "Name": "Indiana"
      },
      {
          "Id": 15,
          "Name": "Iowa"
      },
      {
          "Id": 16,
          "Name": "Kansas"
      },
      {
          "Id": 17,
          "Name": "Kentucky"
      },
      {
          "Id": 18,
          "Name": "Louisiana"
      },
      {
          "Id": 19,
          "Name": "Maine"
      },
      {
          "Id": 20,
          "Name": "Maryland"
      },
      {
          "Id": 21,
          "Name": "Massachusetts"
      },
      {
          "Id": 22,
          "Name": "Michigan"
      },
      {
          "Id": 23,
          "Name": "Minnesota"
      },
      {
          "Id": 24,
          "Name": "Mississippi"
      },
      {
          "Id": 25,
          "Name": "Missouri"
      },
      {
          "Id": 26,
          "Name": "Montana"
      },
      {
          "Id": 27,
          "Name": "Nebraska"
      },
      {
          "Id": 28,
          "Name": "Nevada"
      },
      {
          "Id": 29,
          "Name": "New Hampshire"
      },
      {
          "Id": 30,
          "Name": "New Jersey"
      },
      {
          "Id": 31,
          "Name": "New Mexico"
      },
      {
          "Id": 32,
          "Name": "New York"
      },
      {
          "Id": 33,
          "Name": "North Carolina"
      },
      {
          "Id": 34,
          "Name": "North Dakota"
      },
      {
          "Id": 35,
          "Name": "Ohio"
      },
      {
          "Id": 36,
          "Name": "Oklahoma"
      },
      {
          "Id": 37,
          "Name": "Oregon"
      },
      {
          "Id": 38,
          "Name": "Pennsylvania"
      },
      {
          "Id": 39,
          "Name": "Puerto Rico"
      },
      {
          "Id": 40,
          "Name": "Rhode Island"
      },
      {
          "Id": 41,
          "Name": "South Carolina"
      },
      {
          "Id": 42,
          "Name": "South Dakota"
      },
      {
          "Id": 43,
          "Name": "Tennessee"
      },
      {
          "Id": 44,
          "Name": "Texas"
      },
      {
          "Id": 45,
          "Name": "Utah"
      },
      {
          "Id": 46,
          "Name": "Vermont"
      },
      {
          "Id": 47,
          "Name": "Virginia"
      },
      {
          "Id": 48,
          "Name": "Washington"
      },
      {
          "Id": 49,
          "Name": "Washington D.C."
      },
      {
          "Id": 50,
          "Name": "West Virginia"
      },
      {
          "Id": 51,
          "Name": "Wisconsin"
      },
      {
          "Id": 52,
          "Name": "Wyoming"
      }
  ],
  "countyId": [
      {
          "Id": 36001,
          "Name": "Albany"
      },
      {
          "Id": 36003,
          "Name": "Allegany"
      },
      {
          "Id": 36005,
          "Name": "Bronx"
      },
      {
          "Id": 36007,
          "Name": "Broome"
      },
      {
          "Id": 36009,
          "Name": "Cattaraugus"
      },
      {
          "Id": 36011,
          "Name": "Cayuga"
      },
      {
          "Id": 36013,
          "Name": "Chautauqua"
      },
      {
          "Id": 36015,
          "Name": "Chemung"
      },
      {
          "Id": 36017,
          "Name": "Chenango"
      },
      {
          "Id": 36019,
          "Name": "Clinton"
      },
      {
          "Id": 36021,
          "Name": "Columbia"
      },
      {
          "Id": 36023,
          "Name": "Cortland"
      },
      {
          "Id": 36025,
          "Name": "Delaware"
      },
      {
          "Id": 36027,
          "Name": "Dutchess"
      },
      {
          "Id": 36029,
          "Name": "Erie"
      },
      {
          "Id": 36031,
          "Name": "Essex"
      },
      {
          "Id": 36033,
          "Name": "Franklin"
      },
      {
          "Id": 36035,
          "Name": "Fulton"
      },
      {
          "Id": 36037,
          "Name": "Genesee"
      },
      {
          "Id": 36039,
          "Name": "Greene"
      },
      {
          "Id": 36041,
          "Name": "Hamilton"
      },
      {
          "Id": 36043,
          "Name": "Herkimer"
      },
      {
          "Id": 36045,
          "Name": "Jefferson"
      },
      {
          "Id": 36047,
          "Name": "Kings"
      },
      {
          "Id": 36049,
          "Name": "Lewis"
      },
      {
          "Id": 36051,
          "Name": "Livingston"
      },
      {
          "Id": 36053,
          "Name": "Madison"
      },
      {
          "Id": 36055,
          "Name": "Monroe"
      },
      {
          "Id": 36057,
          "Name": "Montgomery"
      },
      {
          "Id": 36059,
          "Name": "Nassau"
      },
      {
          "Id": 36061,
          "Name": "New York"
      },
      {
          "Id": 36063,
          "Name": "Niagara"
      },
      {
          "Id": 36065,
          "Name": "Oneida"
      },
      {
          "Id": 36067,
          "Name": "Onondaga"
      },
      {
          "Id": 36069,
          "Name": "Ontario"
      },
      {
          "Id": 36071,
          "Name": "Orange"
      },
      {
          "Id": 36073,
          "Name": "Orleans"
      },
      {
          "Id": 36075,
          "Name": "Oswego"
      },
      {
          "Id": 36077,
          "Name": "Otsego"
      },
      {
          "Id": 36079,
          "Name": "Putnam"
      },
      {
          "Id": 36081,
          "Name": "Queens"
      },
      {
          "Id": 36083,
          "Name": "Rensselaer"
      },
      {
          "Id": 36085,
          "Name": "Richmond"
      },
      {
          "Id": 36087,
          "Name": "Rockland"
      },
      {
          "Id": 36091,
          "Name": "Saratoga"
      },
      {
          "Id": 36093,
          "Name": "Schenectady"
      },
      {
          "Id": 36095,
          "Name": "Schoharie"
      },
      {
          "Id": 36097,
          "Name": "Schuyler"
      },
      {
          "Id": 36099,
          "Name": "Seneca"
      },
      {
          "Id": 36089,
          "Name": "St. Lawrence"
      },
      {
          "Id": 36101,
          "Name": "Steuben"
      },
      {
          "Id": 36103,
          "Name": "Suffolk"
      },
      {
          "Id": 36105,
          "Name": "Sullivan"
      },
      {
          "Id": 36107,
          "Name": "Tioga"
      },
      {
          "Id": 36109,
          "Name": "Tompkins"
      },
      {
          "Id": 36111,
          "Name": "Ulster"
      },
      {
          "Id": 36113,
          "Name": "Warren"
      },
      {
          "Id": 36115,
          "Name": "Washington"
      },
      {
          "Id": 36117,
          "Name": "Wayne"
      },
      {
          "Id": 36119,
          "Name": "Westchester"
      },
      {
          "Id": 36121,
          "Name": "Wyoming"
      },
      {
          "Id": 36123,
          "Name": "Yates"
      }
  ],
  "planCategoryId": [
      {
          "Id": 2,
          "Name": "D-SNP"
      },
      {
          "Id": 1,
          "Name": "Non-SNP"
      }
  ],
  "premiumId": [
      {
          "Id": "1",
          "Name": "Non-zero Premium"
      },
      {
          "Id": "2",
          "Name": "Zero Premium"
      }
  ],
  "planTypeId": [
      {
          "Id": 3,
          "Name": "Local HMO"
      },
      {
          "Id": 4,
          "Name": "Local HMO (Without Drugs)"
      },
      {
          "Id": 5,
          "Name": "Local PPO"
      },
      {
          "Id": 6,
          "Name": "Local PPO (Without Drugs)"
      },
      {
          "Id": 9,
          "Name": "PFFS"
      },
      {
          "Id": 10,
          "Name": "PFFS (Without Drugs)"
      },
      {
          "Id": 11,
          "Name": "Regional PPO"
      },
      {
          "Id": 12,
          "Name": "Regional PPO (Without Drugs)"
      }
  ],
  "organizationId": [
      {
          "Id": 3,
          "Name": "Capital District Physicians' Health Pla"
      },
      {
          "Id": 4,
          "Name": "Centene Corporation"
      },
      
  ],

}

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
