import axios from 'axios'
import { BASE_URL } from '../../../common/constants/baseUrl'

export function ValidateUserid(userId) {
  let result = axios.get(`${BASE_URL}/user/?userId=${userId}`).then((res) => res.data)
  return result
}
export function createScenario(obj) {
  let result = axios.post(`${BASE_URL}/createScenario`, obj).then((res) => res.data)
  return result
}

export function getScenarios(obj) {
  let result = axios.post(`${BASE_URL}/getScenarios`, obj).then((res) => res.data)
  return result
}
export function deleteScenario(obj) {
  let result = axios.post(`${BASE_URL}/deleteScenario`, obj).then((res) => res.data)
  return result
}

export function editScenario(obj) {
  let result = axios.post(`${BASE_URL}/editScenario`, obj).then((res) => res.data)
  return result
}

export const getSimulationresult = (payload) => axios.get(`${BASE_URL}/simulationResult/?scenarioId=${payload}`).then((res) => res.data)

export const getEmailIdForShareScenario = (obj) => {
  let result = axios.post(`${BASE_URL}/receiverListForShareScenario`, obj).then((res) => res.data)
  return result
}
export const shareScenario = (obj) => {
  let result = axios.post(`${BASE_URL}/shareScenario`, obj).then((res) => res.data)
  return result
}
export const getScenarioDetails = (obj) => {
  let result = axios.post(`${BASE_URL}/getScenarioDetails`, obj).then((res) => res.data)
  return result
}
export function duplicateSaveFilterDetails(obj) {
  let result = axios.post(`${BASE_URL}/duplicateSaveFilterDetails`, obj).then((res) => res.data)
  return result
}

export function compareScenario(obj) {
  let result = axios.post(`${BASE_URL}/compareScenarios`, obj).then((res) => res.data)
  return result
}
