import axios from 'axios'
import { BASE_URL } from '../../../common/constants/baseUrl'

export function getOrganizationData(obj) {
  let result = axios.post(`${BASE_URL}/organizationTable`, obj).then((res) => res.data)
  return result
}
export function getPlans(obj) {
  let result = axios.post(`${BASE_URL}/planTable`, obj).then((res) => res.data)
  return result
}
export function getBidLevelStateCountyTable(obj) {
  let result = axios.post(`${BASE_URL}/bidLevelStateCountyTable`, obj).then((res) => res.data)
  return result
}

export const getClientDetails = (payload) => axios.post(`${BASE_URL}/clientScenarioConfig`, payload).then((res) => res.data)

export const getFilterDetails = (payload) => axios.post(`${BASE_URL}/filter`, payload).then((res) => res.data)

export const saveFilters = (payload) => axios.post(`${BASE_URL}/saveFilter`, payload).then((res) => res.data)
