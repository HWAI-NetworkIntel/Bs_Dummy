import React from 'react'
import MultiSelectBox from './MultiSelectBox'
import { useSelector } from 'react-redux'

const FiltersList = ({ clientId }) => {

  let filtersList = [
    {
        "label": "Sales Region",
        "name": "salesRegionId",
        "position": 1,
        "multiselect": 1,
        "defaultId": "145,21"
    },
    {
        "label": "State",
        "name": "stateId",
        "position": 2,
        "multiselect": true,
        "defaultId": "32"
    },
    {
        "label": "County",
        "name": "countyId",
        "position": 3,
        "multiselect": true,
        "defaultId": "36001,36003,36005,36007,36009,36011,36013,36015,36017,36019,36021,36023,36025,36027,36029,36031,36033,36035,36037,36039,36041,36043,36045,36047,36049,36051,36053,36055,36057,36059,36061,36063,36065,36067,36069,36071,36073,36075,36077,36079,36081,36083,36085,36087,36091,36093,36095,36097,36099,36089,36101,36103,36105,36107,36109,36111,36113,36115,36117,36119,36121,36123"
    },
    {
        "label": "SNP Type",
        "name": "planCategoryId",
        "position": 4,
        "multiselect": true,
        "defaultId": "1"
    },
    {
        "label": "Premium",
        "name": "premiumId",
        "position": 5,
        "multiselect": true,
        "defaultId": "1,2"
    },
    {
        "label": "Plan Type",
        "name": "planTypeId",
        "position": 6,
        "multiselect": true,
        "defaultId": "3,4,5,6,9,10,11,12"
    },
    {
        "label": "Organization",
        "name": "organizationId",
        "position": 7,
        "multiselect": false,
        "defaultId": "3"
    }
    ,
    {
        "label": "Plan Description",
        "name": "plandescriptionId",
        "position": 8,
        "multiselect": false,
        "defaultId": "1"
    }
]

  return (
    <div className="w-full py-2 px-8 flex items-center gap-x-2 flex-wrap border-b border-[#E9E8E8]">
      {filtersList?.map((item, i) => (
        <MultiSelectBox key={i} item={item} clientId={clientId} />
      ))}
    </div>
  )
}
export default React.memo(FiltersList)
