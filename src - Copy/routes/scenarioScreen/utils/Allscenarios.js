import { RESULTS } from '../../../common/constants/constants'
import { PassedIcon, PausedIcon } from '../../../common/images/icons'

export const sorting = (key, isIncrement, list) => {
  let arr = list
  let sortedList = [...arr]

  if (isIncrement) {
    sortedList.sort((a, b) => {
      let aValue, bValue

      if (['postAEPEnrollment', 'preAEPEnrollment', 'simulatedChangeFromPostAEP', 'simulatedResult', 'bidId'].includes(key)) {
        if (a.BidId && b.BidId) {
          if (['postAEPEnrollment', 'preAEPEnrollment', 'simulatedChangeFromPostAEP', 'simulatedResult'].includes(key)) {
            aValue = a.BidId[Object.keys(a.BidId)[0]] ? a.BidId[Object.keys(a.BidId)[0]][key] : null
            bValue = b.BidId[Object.keys(b.BidId)[0]] ? b.BidId[Object.keys(b.BidId)[0]][key] : null
          } else if (key === 'bidId') {
            const aSimulationResultKey = Object.keys(a.BidId)[0]
            const bSimulationResultKey = Object.keys(b.BidId)[0]
            aValue = aSimulationResultKey
            bValue = bSimulationResultKey
          }
        } else {
          if (a.BidId === null && b.BidId === null) {
            return 0
          } else if (a.BidId === null) {
            return 1
          } else {
            return -1
          }
        }
      } else {
        // For other keys, set values directly
        aValue = a[key]
        bValue = b[key]
      }

      if (aValue === null && bValue === null) {
        return 0
      } else if (aValue === null) {
        return 1
      } else if (bValue === null) {
        return -1
      } else if (DateTime(aValue) && DateTime(bValue)) {
        return new Date(aValue) - new Date(bValue)
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return bValue.localeCompare(aValue)
      } else {
        if (aValue >= 0 && bValue < 0) {
          return -1
        } else if (aValue < 0 && bValue >= 0) {
          return 1
        } else {
          return bValue - aValue
        }
      }
    })
  } else {
    sortedList.sort((a, b) => {
      let aValue, bValue

      if (['postAEPEnrollment', 'preAEPEnrollment', 'simulatedChangeFromPostAEP', 'simulatedResult', 'bidId'].includes(key)) {
        if (a.BidId && b.BidId) {
          if (['postAEPEnrollment', 'preAEPEnrollment', 'simulatedChangeFromPostAEP', 'simulatedResult'].includes(key)) {
            aValue = a.BidId[Object.keys(a.BidId)[0]] ? a.BidId[Object.keys(a.BidId)[0]][key] : null
            bValue = b.BidId[Object.keys(b.BidId)[0]] ? b.BidId[Object.keys(b.BidId)[0]][key] : null
          } else if (key === 'bidId') {
            const aSimulationResultKey = Object.keys(a.BidId)[0]
            const bSimulationResultKey = Object.keys(b.BidId)[0]
            aValue = aSimulationResultKey
            bValue = bSimulationResultKey
          }
        } else {
          if (a.BidId === null && b.BidId === null) {
            return 0
          } else if (a.BidId === null) {
            return 1
          } else {
            return -1
          }
        }
      } else {
        // For other keys, set values directly
        aValue = a[key]
        bValue = b[key]
      }

      if (aValue === null && bValue === null) {
        return 0
      } else if (aValue === null) {
        return 1
      } else if (bValue === null) {
        return -1
      } else if (DateTime(aValue) && DateTime(bValue)) {
        return new Date(bValue) - new Date(aValue)
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue)
      } else {
        if (aValue < 0 && bValue >= 0) {
          return -1
        } else if (aValue >= 0 && bValue < 0) {
          return 1
        } else {
          return aValue - bValue
        }
      }
    })
  }

  return sortedList
}

const DateTime = (str) => {
  const Pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/
  return Pattern.test(str)
}

export const formatDate = (isoDateString) => {
  let formattedDate = ''
  if (isoDateString) {
    const date = new Date(isoDateString)
    const day = date.getUTCDate().toString().padStart(2, '0')
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = date.getUTCFullYear()
    formattedDate = `${day}/${month}/${year}`
  }
  return formattedDate
}

export const getStatusAndAction = (item) => {
  let statusIcon
  let action

  if (item?.Status === 'Not Submitted' || item?.Status === 'Processing') {
    statusIcon = <PausedIcon />
    action = 'Continue'
  } else {
    statusIcon = <PassedIcon />
    action = 'Details'
  }

  return { statusIcon, action }
}

export const splitBidIds = (bidId) => {
  if (bidId) {
    return bidId.split(',')
  } else {
    return bidId
  }
}

export function camelToNormal(camelCaseString) {
  if (camelCaseString === 'footPrint') {
    return camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1)
  } else if (camelCaseString === 'preAEPEnrollment (Dec 23)') {
    return RESULTS.preAep
  } else if (camelCaseString === 'postAEPEnrollment (Feb 24)') {
    return RESULTS.postAep
  } else if (camelCaseString === 'simulatedChangeFromPostAEP (Feb 24)') {
    return RESULTS.simulatedChangePostAep
  } else if (camelCaseString === 'simulatedPostAEPEnrollment (Feb 24)') {
    return RESULTS.simulatedPostAep
  } else {
    return camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, function (str) {
      return str.toUpperCase()
    })
  }
}

export const sortByFirstName = (data) => {
  return data.sort((a, b) => {
    const nameA = a.firstName.toLowerCase()
    const nameB = b.firstName.toLowerCase()

    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
}
