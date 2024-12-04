// Online Javascript Editor for free

import { RESULTS } from '../../../common/constants/constants'
import { camelToNormal, formatDate } from './Allscenarios'
import { removeNotRequiredBenefits } from './commonForSingleAndCompare'

export let mainTitles = ['Plans Selected', 'Filters Applied', 'Simulation Results', 'Benefits Altered', 'Basic Details']
export const rightAlignTitles = [RESULTS.preAep, RESULTS.postAep, RESULTS.simulatedPostAep, RESULTS.simulatedChangePostAep]
const hasNumbers = (str) => {
  if (str.match(/\d+/g) !== null) {
    return true
  } else {
    return false
  }
}

let getUniqueBenefits = (obj) => {
  let result = {}
  let uniqueBenefits = []
  Object.keys(obj)?.forEach((key) => {
    Object.keys(obj[key]?.benefitsAltered[0])?.forEach((planId) => {
      obj[key]?.benefitsAltered[0]?.[planId]?.forEach((item) => {
        if (!result[item.benefits]) {
          result[item.benefits] = true
          uniqueBenefits.push(`${item.benefitBusinessName}`) //manish
        }
      })
    })
  })
  return uniqueBenefits
}
const getSimulationResults = (obj) => {
  let bb = {}
  Object.keys(obj).forEach((scenario, i) => {
    let listOfBidIds = Object.keys(obj[scenario]?.plansSelected[0])
    Object.keys(obj[scenario]).forEach((title) => {
      if (title === 'simulationResults') {
        if (!bb[camelToNormal(title)]) {
          bb[camelToNormal(title)] = []
        }
        bb[camelToNormal(title)].push(listOfBidIds)
        listOfBidIds.forEach((bidId, j) => {
          const simulationResults = obj[scenario][title][0][bidId]
          if (simulationResults && simulationResults.length > 0) {
            const index = simulationResults.findIndex((item) => item !== null)
            if (index !== -1) {
              Object.keys(simulationResults[index]).forEach((subTitle) => {
                const normalizedSubTitle = camelToNormal(subTitle)
                if (!bb[normalizedSubTitle]) {
                  bb[normalizedSubTitle] = Array(i + 1).fill(Array(listOfBidIds.length).fill('Not changed'))
                }
                if (!bb[normalizedSubTitle][i]) {
                  bb[normalizedSubTitle][i] = Array(listOfBidIds.length).fill('Not changed')
                }
                bb[normalizedSubTitle][i][j] = simulationResults[index][subTitle]?.toLocaleString('en-US')
              })
            } else {
              Object.keys(bb).forEach((field) => {
                if (field !== camelToNormal('simulationResults')) {
                  if (!bb[field][i]) {
                    bb[field][i] = Array(listOfBidIds.length).fill('Not changed')
                  } else {
                    bb[field][i][j] = 'Not changed'
                  }
                }
              })
            }
          } else {
            Object.keys(bb).forEach((field) => {
              if (field !== camelToNormal('simulationResults')) {
                if (!bb[field][i]) {
                  bb[field][i] = Array(listOfBidIds.length).fill('Not changed')
                } else {
                  bb[field][i][j] = 'Not changed'
                }
              }
            })
          }
        })
      }
    })
  })
  return bb
}

const getBenefitsAltered = (obj) => {
  let bb = {}
  let uniqueBenefits = getUniqueBenefits(obj)
  Object?.keys(obj).forEach((scenario, i) => {
    let listOfBidIds = Object?.keys(obj[scenario]?.plansSelected[0])
    Object.keys(obj[scenario]).forEach((title) => {
      if (title === 'benefitsAltered') {
        if (bb[camelToNormal(title)]) {
          bb[camelToNormal(title)] = [...bb[camelToNormal(title)], [...listOfBidIds]]
          listOfBidIds.forEach((bidId) => {
            uniqueBenefits?.forEach((benefit) => {
              let arrofresults = obj[scenario][title][0][bidId] || ''
              if (arrofresults) {
                let ii = obj[scenario][title][0][bidId]?.findIndex((item) => `${item.benefitBusinessName}` === benefit) //manish
                if (bb[benefit]) {
                  if (bb[benefit][i]) {
                    if (ii === -1) {
                      bb[benefit][i].push('Not changed')
                    } else {
                      let m = `Current Value (${obj[scenario][title][0][bidId][ii]?.currentValue}) & Changed Value (${
                        hasNumbers(obj[scenario][title][0][bidId][ii]?.changedValue)
                          ? obj[scenario][title][0][bidId][ii]?.changedValue.includes('%')
                            ? obj[scenario][title][0][bidId][ii]?.changedValue
                            : obj[scenario][title][0][bidId][ii]?.changedValue.includes('$')
                            ? '$' + Number(obj[scenario][title][0][bidId][ii]?.changedValue?.replace('$', ''))?.toLocaleString('en-US')
                            : obj[scenario][title][0][bidId][ii]?.changedValue
                          : obj[scenario][title][0][bidId][ii]?.changedValue
                      })`
                      bb[benefit][i].push(m)
                    }
                  } else {
                    if (ii === -1) {
                      bb[benefit].push(['Not changed'])
                    } else {
                      let m = `Current Value (${obj[scenario][title][0][bidId][ii]?.currentValue}) & Changed Value (${
                        hasNumbers(obj[scenario][title][0][bidId][ii]?.changedValue)
                          ? obj[scenario][title][0][bidId][ii]?.changedValue.includes('%')
                            ? obj[scenario][title][0][bidId][ii]?.changedValue
                            : obj[scenario][title][0][bidId][ii]?.changedValue.includes('$')
                            ? '$' + Number(obj[scenario][title][0][bidId][ii]?.changedValue?.replace('$', ''))?.toLocaleString('en-US')
                            : obj[scenario][title][0][bidId][ii]?.changedValue
                          : obj[scenario][title][0][bidId][ii]?.changedValue
                      })`
                      bb[benefit].push([m])
                    }
                  }
                } else {
                  if (ii === -1) {
                    bb[benefit] = [['Not changed']]
                  } else {
                    let m = `Current Value (${obj[scenario][title][0][bidId][ii]?.currentValue}) & Changed Value (${
                      hasNumbers(obj[scenario][title][0][bidId][ii]?.changedValue)
                        ? obj[scenario][title][0][bidId][ii]?.changedValue.includes('%')
                          ? obj[scenario][title][0][bidId][ii]?.changedValue
                          : obj[scenario][title][0][bidId][ii]?.changedValue.includes('$')
                          ? '$' + Number(obj[scenario][title][0][bidId][ii]?.changedValue?.replace('$', ''))?.toLocaleString('en-US')
                          : obj[scenario][title][0][bidId][ii]?.changedValue
                        : obj[scenario][title][0][bidId][ii]?.changedValue
                    })`
                    bb[benefit] = [[m]]
                  }
                }
              } else {
                if (bb[benefit]) {
                  if (bb[benefit][i]) {
                    bb[benefit][i].push('Not changed')
                  } else {
                    bb[benefit].push(['Not changed'])
                  }
                } else {
                  bb[benefit] = [['Not changed']]
                }
              }
            })
          })
        } else {
          bb[camelToNormal(title)] = [listOfBidIds]
          listOfBidIds.forEach((bidId) => {
            uniqueBenefits?.forEach((benefit) => {
              let arrofresults = obj[scenario][title][0][bidId] || ''
              if (arrofresults) {
                let ii = obj[scenario][title][0][bidId]?.findIndex((item) => `${item.benefitBusinessName}` === benefit) //manish
                if (bb[benefit]) {
                  if (bb[benefit][i]) {
                    if (ii === -1) {
                      bb[benefit][i].push('Not changed')
                    } else {
                      let m = `Current Value (${obj[scenario][title][0][bidId][ii]?.currentValue}) & Changed Value (${
                        hasNumbers(obj[scenario][title][0][bidId][ii]?.changedValue)
                          ? obj[scenario][title][0][bidId][ii]?.changedValue.includes('%')
                            ? obj[scenario][title][0][bidId][ii]?.changedValue
                            : obj[scenario][title][0][bidId][ii]?.changedValue.includes('$')
                            ? '$' + Number(obj[scenario][title][0][bidId][ii]?.changedValue?.replace('$', ''))?.toLocaleString('en-US')
                            : obj[scenario][title][0][bidId][ii]?.changedValue
                          : obj[scenario][title][0][bidId][ii]?.changedValue
                      })`
                      bb[benefit][i].push(m)
                    }
                  } else {
                    if (ii === -1) {
                      bb[benefit].push(['Not changed'])
                    } else {
                      let m = `Current Value (${obj[scenario][title][0][bidId][ii]?.currentValue}) & Changed Value (${
                        hasNumbers(obj[scenario][title][0][bidId][ii]?.changedValue)
                          ? obj[scenario][title][0][bidId][ii]?.changedValue.includes('%')
                            ? obj[scenario][title][0][bidId][ii]?.changedValue
                            : obj[scenario][title][0][bidId][ii]?.changedValue.includes('$')
                            ? '$' + Number(obj[scenario][title][0][bidId][ii]?.changedValue?.replace('$', ''))?.toLocaleString('en-US')
                            : obj[scenario][title][0][bidId][ii]?.changedValue
                          : obj[scenario][title][0][bidId][ii]?.changedValue
                      })`
                      bb[benefit].push([m])
                    }
                  }
                } else {
                  if (ii === -1) {
                    bb[benefit] = [['Not changed']]
                  } else {
                    let m = `Current Value (${obj[scenario][title][0][bidId][ii]?.currentValue}) & Changed Value (${
                      hasNumbers(obj[scenario][title][0][bidId][ii]?.changedValue)
                        ? obj[scenario][title][0][bidId][ii]?.changedValue.includes('%')
                          ? obj[scenario][title][0][bidId][ii]?.changedValue
                          : obj[scenario][title][0][bidId][ii]?.changedValue.includes('$')
                          ? '$' + Number(obj[scenario][title][0][bidId][ii]?.changedValue?.replace('$', ''))?.toLocaleString('en-US')
                          : obj[scenario][title][0][bidId][ii]?.changedValue
                        : obj[scenario][title][0][bidId][ii]?.changedValue
                    })`
                    bb[benefit] = [[m]]
                  }
                }
              } else {
                if (bb[benefit]) {
                  if (bb[benefit][i]) {
                    bb[benefit][i].push('Not changed')
                  } else {
                    bb[benefit].push(['Not changed'])
                  }
                } else {
                  bb[benefit] = [['Not changed']]
                }
              }
            })
          })
        }
      }
    })
  })
  return bb
}
const getPlansSelected = (obj) => {
  let bb = {}
  Object?.keys(obj).forEach((scenario, i) => {
    let listOfBidIds = Object?.keys(obj[scenario]?.plansSelected[0])
    Object.keys(obj[scenario]).forEach((title) => {
      if (title === 'plansSelected') {
        if (bb[camelToNormal(title)]) {
          bb[camelToNormal(title)] = [...bb[camelToNormal(title)], [...listOfBidIds]]
          listOfBidIds.forEach((bidId) => {
            if (obj[scenario]?.[title]?.[0]?.[bidId]?.[0]) {
              Object.keys(obj[scenario]?.[title]?.[0]?.[bidId]?.[0]).forEach((subTitle) => {
                if (bb[camelToNormal(subTitle)]) {
                  if (bb[camelToNormal(subTitle)][i]) {
                    bb[camelToNormal(subTitle)][i].push(obj[scenario][title][0][bidId][0][subTitle])
                  } else {
                    bb[camelToNormal(subTitle)].push([obj[scenario][title][0][bidId][0][subTitle]])
                  }
                } else {
                  bb[camelToNormal(subTitle)] = [[obj[scenario][title][0][bidId][0][subTitle]]]
                }
              })
            } else {
              Object.keys(bb).forEach((field) => {
                if (field !== camelToNormal('plansSelected')) {
                  if (bb[field][i]) {
                    bb[field][i].push('Not changed')
                  } else {
                    bb[field].push(['Not changed'])
                  }
                }
              })
            }
          })
        } else {
          bb[camelToNormal(title)] = [listOfBidIds]
          listOfBidIds.forEach((bidId) => {
            if (obj[scenario]?.[title]?.[0]?.[bidId]?.[0]) {
              Object.keys(obj[scenario]?.[title]?.[0]?.[bidId]?.[0]).forEach((subTitle) => {
                if (bb[camelToNormal(subTitle)]) {
                  if (bb[camelToNormal(subTitle)][i]) {
                    bb[camelToNormal(subTitle)][i].push(obj[scenario][title][0][bidId][0][subTitle])
                  } else {
                    bb[camelToNormal(subTitle)].push([obj[scenario][title][0][bidId][0][subTitle]])
                  }
                } else {
                  bb[camelToNormal(subTitle)] = [[obj[scenario][title][0][bidId][0][subTitle]]]
                }
              })
            } else {
              Object.keys(bb).forEach((field) => {
                if (field !== camelToNormal('simulationResults')) {
                  if (bb[field][i]) {
                    bb[field][i].push('Not changed')
                  } else {
                    bb[field].push(['Not changed'])
                  }
                }
              })
            }
          })
        }
      }
    })
  })
  return bb
}
const getBasicDetails = (obj) => {
  let bb = {}
  Object.keys(obj).forEach((scenario) => {
    let noOfColumns = Object?.keys(obj[scenario].plansSelected[0]).length
    Object?.keys(obj[scenario]).forEach((title) => {
      if (title !== 'simulationResults' && title !== 'plansSelected' && title !== 'benefitsAltered') {
        if (bb[camelToNormal(title)]) {
          bb[camelToNormal(title)] = [...bb[camelToNormal(title)], ['em']]
        } else {
          bb[camelToNormal(title)] = [['em']]
        }
        Object.keys(obj[scenario][title][0])?.forEach((innerTitle) => {
          if (bb[camelToNormal(innerTitle)]) {
            if (innerTitle === 'createdDate') {
              bb[camelToNormal(innerTitle)] = [...bb[camelToNormal(innerTitle)], [formatDate(obj[scenario][title][0][innerTitle])]]
            } else {
              bb[camelToNormal(innerTitle)] = [...bb[camelToNormal(innerTitle)], [obj[scenario][title][0][innerTitle]]]
            }
          } else {
            if (innerTitle === 'createdDate') {
              bb[camelToNormal(innerTitle)] = [[formatDate(obj[scenario][title][0][innerTitle])]]
            } else {
              bb[camelToNormal(innerTitle)] = [[obj[scenario][title][0][innerTitle]]]
            }
          }
        })
      }
    })
    Object.keys(bb).forEach((key) => {
      let i = bb[key].length - 1
      if (bb[key][i].length < noOfColumns) {
        let minus = noOfColumns - bb[key][i].length
        for (let index = 0; index < minus; index++) {
          bb[key][i]?.push('em')
        }
      }
    })
  })
  return bb
}
export const getModifiedObjectForRendering = (obj) => {
  let m = removeNotRequiredBenefits(obj)
  return [getBasicDetails(m), getPlansSelected(m), getBenefitsAltered(m), getSimulationResults(m)]
}
