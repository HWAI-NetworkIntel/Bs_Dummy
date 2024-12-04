import { dropDownData, handleKey } from '../../../routes/simulationScreen/constants/DropDownData'
import { removeSymbolsFromInput } from '../../../routes/simulationScreen/utils/General'

// extracts newValue from string
const extractNewValueFromStr = (str) => {
  let result = removeSymbolsFromInput(str?.split(')')[1]?.split('(')[1])
  return Number(result)
}

// change new value to (-)
const changeNewValueToEmpty = (str) => {
  let result = str?.split(')')[0]?.split('(')[1]
  return `Current Value (${result}) & New Value (-)`
}

// removes ehc values from list
export const hideEhcValues = (arr) => {
  return arr.filter((obj) => !obj.index_b.includes('ehc'))
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
      const maxValue = Math.max(...b.map((o) => parseInt(o.value)))
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

export const hideCopayOrCoinsFields = (arr, scenarioName) => {
  let a = arr
    ?.filter((obj) => obj.index_b.includes('coins') || obj.index_b.includes('copay'))
    ?.map((obj1) => ({
      name: obj1.index_b,
      id: extractLastCommonNameForId(obj1.index_b),
      value: extractNewValueFromStr(obj1[scenarioName]),
    }))
  let b = groupCopayAndCoins(a)
  let c = extractNamesOfFiledsToRemove(b)
  return c
}

const handlesDropValuesByBenefitGroup = (str, id, range) => {
  let newValue = removeSymbolsFromInput(str?.split(')')[1]?.split('(')[1])
  let currentValue = str?.split(')')[0]?.split('(')[1]
  let updatedCurrentValue = '-'
  let updatedNewValue = '-'
  if (currentValue) {
    let a = dropDownData[range][handleKey(id)]
    let i = a?.findIndex((item) => item.value === currentValue)
    if (i !== -1) {
      updatedCurrentValue = a[i].label
    }
  }
  if (newValue) {
    let a = dropDownData[range][handleKey(id)]
    let i = a?.findIndex((item) => item.value === newValue)
    if (i !== -1) {
      updatedNewValue = a[i].label
    }
  }
  return `Current Value (${updatedCurrentValue}) & New Value (${updatedNewValue})`
}

const changeDropValuesFromNumericToText = (arr) => {
  let a = [...arr]
  let b = a?.map(({ benefitDataType, range, group, index_a, index_b, ...required }) => {
    if (benefitDataType === 'Drop') {
      if (range?.includes('|')) {
        let final = {
          group,
          index_a,
          index_b,
        }
        let modifiedListOfDropValues = Object.keys(required)?.map((key) => ({
          [key]: handlesDropValuesByBenefitGroup(required[key], index_b, range),
        }))
        modifiedListOfDropValues.forEach((item) => {
          final[Object.keys(item)[0]] = item[Object.keys(item)[0]]
        })
        return final
      } else {
        return { group, index_a, index_b, ...required }
      }
    } else {
      return { group, index_a, index_b, ...required }
    }
  })
  return b
}

export const filterScenarioDetailsData = (arr) => {
  let filteredEhcList = hideEhcValues(arr)
  let objContainingNamesToFilter = {}
  let namesToIgnoreInObj = ['group', 'index_a', 'index_b']
  let scenarioNames = Object.keys(filteredEhcList[0])?.filter((key) => !namesToIgnoreInObj.includes(key))
  scenarioNames?.forEach((scenarioName) => {
    objContainingNamesToFilter[scenarioName] = [...hideCopayOrCoinsFields(filteredEhcList, scenarioName)]
  })
  Object.keys(objContainingNamesToFilter)?.forEach((scenarioNameAsKey) => {
    objContainingNamesToFilter[scenarioNameAsKey]?.forEach((item) => {
      let i = filteredEhcList.findIndex((obj) => obj.index_b === item)
      if (i !== -1) {
        filteredEhcList[i][scenarioNameAsKey] = changeNewValueToEmpty(filteredEhcList[i][scenarioNameAsKey])
      }
    })
  })
  let changedResultFromDropNumericToText = changeDropValuesFromNumericToText(filteredEhcList)
  return changedResultFromDropNumericToText
}
