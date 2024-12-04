import { filterScenarioDetailsData } from './ScenarioDetailsUtils'

export const removeNotRequiredBenefits = (obj) => {
  let final = { ...obj }
  Object.keys(final)?.forEach((key) => {
    Object.keys(final[key])?.forEach((str) => {
      if (str === 'benefitsAltered') {
        Object.keys(final[key][str][0])?.forEach((bid) => {
          final[key][str][0][bid] = filterScenarioDetailsData([...final[key][str][0][bid]])
        })
      }
    })
  })
  return final
}
