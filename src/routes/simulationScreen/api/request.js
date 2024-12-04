import axios from 'axios'
import { BASE_URL } from '../../../common/constants/baseUrl'

export const getSignificantBenefits = (payload) => axios.post(`${BASE_URL}/significantBenefitList`, payload).then((res) => res.data)

export const getSimulateThroughUI = (payload) => axios.post(`${BASE_URL}/simulateThroughUI`, payload).then((res) => res.data)

export const getSimulationResult = (payload) => axios.get(`${BASE_URL}/simulationResult/?scenarioId=${payload}`).then((res) => res.data)

export const saveSimulationResult = (payload) => axios.post(`${BASE_URL}/saveSimulationResult`, payload).then((res) => res.data)

export const getSignificantBenefits2 = (payload) => axios.post(`${BASE_URL}/newTest`, payload).then((res) => res.data)

export const dataScienceSaveFilter = (payload) => axios.post(`${BASE_URL}/dataScienceSaveFilterOrgPlan`, payload).then((res) => res.data)
export const dataScienceBenefits = (payload) => axios.post(`${BASE_URL}/dataScienceBenefits`, payload).then((res) => res.data)
export const dataScienceSimulationResult = (payload) =>
  axios.post(`${BASE_URL}/dataScienceSimulationResult`, payload).then((res) => res.data)
