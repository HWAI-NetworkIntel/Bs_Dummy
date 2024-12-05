import React, { useCallback, useEffect } from 'react'
import OrganizationSingleRow from './OrganizationSingleRow'
import { getOrganizationData } from '../../../api/request'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setOrganizationData, setOrganizationSelectedValues, setSuccess } from '../../../reducer/planSelectionSlice'
import OrgHeader from './OrgHeader'
import useDidMountEffect from '../../../../simulationScreen/hooks/useDidMountEffect'

const Organization = () => {
  const dispatch = useDispatch()
  const { defaultOrgKeys, organizationData, filterValues, filterOptions } = useSelector(({ plans }) => plans)
  const mainFn = async () => {
    
    if (filterOptions['planTypeId']?.length > 0 && filterValues['planTypeId']?.selected) {
      try {
        let payload = {
          stateId: filterValues['stateId'].selected,
          countyId: filterValues['countyId'].selected,
          planCategoryId: filterValues['planCategoryId'].selected,
          premiumId: filterValues['premiumId'].selected,
          planTypeId: filterValues['planTypeId'].selected,
        }
        let result = {
          "success": true,
          "data": [
              {
                  "id": 136,
                  "name": "Capital District Physicians' Health Plan, Inc.",
                  "postAEPEnrollment": 41601,
                  "preAEPEnrollment": 38055
              },
              {
                  "id": 1,
                  "name": "Centene Corporation",
                  "postAEPEnrollment": 92390,
                  "preAEPEnrollment": 102415
              },
              {
                  "id": 145,
                  "name": "Centers Plan for Healthy Living, LLC",
                  "postAEPEnrollment": 421,
                  "preAEPEnrollment": 394
              },
              {
                  "id": 7,
                  "name": "CVS Health Corporation",
                  "postAEPEnrollment": 130746,
                  "preAEPEnrollment": 112939
              },
              {
                  "id": 143,
                  "name": "Elderplan, Inc.",
                  "postAEPEnrollment": 3690,
                  "preAEPEnrollment": 3348
              },
              {
                  "id": 12,
                  "name": "Elevance Health, Inc.",
                  "postAEPEnrollment": 25106,
                  "preAEPEnrollment": 24780
              },
              {
                  "id": 51,
                  "name": "EmblemHealth, Inc.",
                  "postAEPEnrollment": 7682,
                  "preAEPEnrollment": 7125
              },
              {
                  "id": 133,
                  "name": "Healthfirst, Inc.",
                  "postAEPEnrollment": 79008,
                  "preAEPEnrollment": 71909
              },
              {
                  "id": 52,
                  "name": "Highmark Health",
                  "postAEPEnrollment": 60730,
                  "preAEPEnrollment": 58908
              },
              {
                  "id": 6,
                  "name": "Humana Inc.",
                  "postAEPEnrollment": 102538,
                  "preAEPEnrollment": 100776
              },
              {
                  "id": 142,
                  "name": "Independent Health Association, Inc.",
                  "postAEPEnrollment": 48883,
                  "preAEPEnrollment": 48173
              },
              {
                  "id": 141,
                  "name": "Lifetime Healthcare, Inc.",
                  "postAEPEnrollment": 148882,
                  "preAEPEnrollment": 144999
              },
              {
                  "id": 140,
                  "name": "MVP Health Care, Inc.",
                  "postAEPEnrollment": 38801,
                  "preAEPEnrollment": 36895
              },
              {
                  "id": 139,
                  "name": "New York City Health and Hospitals Corporation",
                  "postAEPEnrollment": 276,
                  "preAEPEnrollment": 271
              },
              {
                  "id": 322,
                  "name": "The Cigna Group",
                  "postAEPEnrollment": 17332,
                  "preAEPEnrollment": 7025
              },
              {
                  "id": 50,
                  "name": "Trinity Health",
                  "postAEPEnrollment": 204,
                  "preAEPEnrollment": 177
              },
              {
                  "id": 2,
                  "name": "UnitedHealth Group, Inc.",
                  "postAEPEnrollment": 198394,
                  "preAEPEnrollment": 203721
              },
              {
                  "id": 135,
                  "name": "Village Care of New York, Inc.",
                  "postAEPEnrollment": 14,
                  "preAEPEnrollment": 0
              },
              {
                  "id": 138,
                  "name": "Visiting Nurse Service of New York",
                  "postAEPEnrollment": 1070,
                  "preAEPEnrollment": 854
              }
          ]
      }
        console.log("Organization",result)
        if (result.data?.length > 0) {
          dispatch(setOrganizationData(result?.data))
          if (defaultOrgKeys) {
            let i = result?.data?.findIndex((orgItem) => orgItem.id === defaultOrgKeys)
            // dispatch(setOrganizationSelectedValues(0))
            if (i === -1) {
              dispatch(setOrganizationSelectedValues(result?.data[0]?.id))
            } else {
              dispatch(setOrganizationSelectedValues(defaultOrgKeys))
            }
          }
        } else {
          dispatch(setOrganizationData([]))
          dispatch(setOrganizationSelectedValues(0))
        }
        dispatch(setSuccess(true))
      } catch (error) {
        dispatch(setOrganizationData([]))
        dispatch(setOrganizationSelectedValues(0))
      }
    } else {
      dispatch(setOrganizationData([]))
      dispatch(setOrganizationSelectedValues(0))
    }
  }

  useDidMountEffect(() => {
    mainFn()
  }, [filterValues['planTypeId']?.selected, filterOptions['planTypeId']])
  return (
    <div className="w-full" style={{display:'none'}}>
      <OrgHeader />
      {organizationData?.map((item) => (
        <OrganizationSingleRow item={item} key={item.id} />
      ))}
    </div>
  )
}
// filter org plan
export default React.memo(Organization)
