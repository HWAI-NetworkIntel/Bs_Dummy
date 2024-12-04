import { dropDownData, handleKey } from '../../../routes/simulationScreen/constants/DropDownData'
import { removeSymbolsFromInput } from '../../../routes/simulationScreen/utils/General'

// removes ehc values from list
export const hideEhcValues = (arr) => {
  return arr.filter((obj) => !obj.benefits.includes('ehc'))
}

const groupCopayAndCoins = (arr) => {
  let a = {}
  arr.forEach((obj) => {
    if (obj.id in a) {
      a[obj.id].push(obj)
    } else {
      a[obj.id] = [obj]
    }
  })
  return a
}

const extractNamesOfFiledsToRemove = (obj) => {
  let a = []
  Object.keys(obj).forEach((key) => {
    let b = obj[key].filter((tag, index, array) => array.findIndex((t) => t.value == tag.value) == index)
    if (b.length > 1) {
      const maxValue = Math.max(...b?.map((o) => parseInt(o.value)))
      let i = b?.findIndex((item) => item.value === maxValue)
      if (i !== -1) {
        if (b[i]?.name?.includes('coins')) {
          obj[key].forEach((bChild) => {
            if (bChild.name?.includes('copay')) {
              a.push(bChild.name)
            }
          })
        } else {
          obj[key].forEach((bChild) => {
            if (bChild.name?.includes('coins')) {
              a.push(bChild.name)
            }
          })
        }
      }
    }
  })
  return a
}

const extractLastCommonNameForId = (str) => {
  let a = str?.split('_')
  return a[a.length - 1]
}

export const hideCopayOrCoinsFields = (arr) => {
  let a = arr
    ?.filter((obj) => obj.benefits.includes('coins') || obj.benefits.includes('copay'))
    ?.map((obj1) => ({
      name: obj1.benefits,
      id: extractLastCommonNameForId(obj1.benefits),
      value: parseFloat(removeSymbolsFromInput(obj1.changedValue)),
    }))
  let b = groupCopayAndCoins(a)
  let c = extractNamesOfFiledsToRemove(b)
  return c
}
const handlesDropValuesByBenefitGroup = (str, id, range) => {
  if (str) {
    let a = dropDownData[range][handleKey(id)]
    let i = a?.findIndex((item) => item.value === str)
    if (i !== -1) {
      return a[i].label
    }
    return str
  }
  return ''
}
export const changeDropValuesFromNumericToText = (arr) => {
  let a = [...arr]
  let b = a?.map((item) => {
    if (item.benefitDataType === 'Drop') {
      if (item.range?.includes('|')) {
        return {
          ...item,
          currentValue: handlesDropValuesByBenefitGroup(item.currentValue, item.benefitGroup, item.range),
          changedValue: handlesDropValuesByBenefitGroup(item.changedValue, item.benefitGroup, item.range),
        }
      } else {
        return item
      }
    } else {
      return item
    }
  })
  return b
}
export const filterScenarioDetailsData = (arr) => {
  let a = hideEhcValues(arr)
  // let toHideFieldnames = [...hideCopayOrCoinsFields(a)]
  // let result = a?.filter((item) => !toHideFieldnames.includes(item.benefits))
  let changedResultFromDropNumericToText = changeDropValuesFromNumericToText(a)
  // let removeNotRequiredKeys = changedResultFromDropNumericToText?.map(({ benefitDataType, range, ...required }) => required)
  return changedResultFromDropNumericToText
}
