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
    dispatch(setLoading(true))
    if (filterOptions['planTypeId']?.length > 0 && filterValues['planTypeId']?.selected) {
      try {
        let payload = {
          stateId: filterValues['stateId'].selected,
          countyId: filterValues['countyId'].selected,
          planCategoryId: filterValues['planCategoryId'].selected,
          premiumId: filterValues['premiumId'].selected,
          planTypeId: filterValues['planTypeId'].selected,
        }
        let result = await getOrganizationData(payload)
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
    <div className="w-full">
      <OrgHeader />
      {organizationData?.map((item) => (
        <OrganizationSingleRow item={item} key={item.id} />
      ))}
    </div>
  )
}
// filter org plan
export default React.memo(Organization)
