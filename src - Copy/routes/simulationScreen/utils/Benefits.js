import DefaultType from '../components/uiTypes/default/DefaultType'
import Fifteen from '../components/uiTypes/fifteen/Fifteen'
import Five from '../components/uiTypes/five/Five'
import Five2 from '../components/uiTypes/five2/Five2'
import Fourteen from '../components/uiTypes/fourteen/Fourteen'
import Nine from '../components/uiTypes/nine/Nine'
import One from '../components/uiTypes/one/One'
import Seven from '../components/uiTypes/seven/Seven'
import Six from '../components/uiTypes/six/Six'
import Thirteen from '../components/uiTypes/thirteen/Thirteen'
import Twelve from '../components/uiTypes/twelve/Twelve'

import DefaultTypeOld from '../components/oldValuesUI/uiTypes/default/DefaultType'
import FifteenOld from '../components/oldValuesUI/uiTypes/fifteen/Fifteen'
import FiveOld from '../components/oldValuesUI/uiTypes/five/Five'
import Five2Old from '../components/oldValuesUI/uiTypes/five2/Five2'
import FourteenOld from '../components/oldValuesUI/uiTypes/fourteen/Fourteen'
import NineOld from '../components/oldValuesUI/uiTypes/nine/Nine'
import OneOld from '../components/oldValuesUI/uiTypes/one/One'
import SevenOld from '../components/oldValuesUI/uiTypes/seven/Seven'
import SixOld from '../components/oldValuesUI/uiTypes/six/Six'
import ThirteenOld from '../components/oldValuesUI/uiTypes/thirteen/Thirteen'
import TwelveOld from '../components/oldValuesUI/uiTypes/twelve/Twelve'

import { CUSTOM_CHECKBOX, IS_OPTIONAL } from '../constants'
import {
  getModifiedListForUiTwelve,
  normalToTypeNine,
  normalToTypeNineForFourteenUI,
  normalToTypeOne,
  normalToTypeSeven,
  normalToTypeThree,
  normalToTypeThreeForFourteenUI,
} from './UiTypeModifiers'

// make an object with key as benefitOrder and value as benefit for benefits array in benefitSlice
// used for update and fetch at 0(1) time complexity
export const groupBenefitsAsPerBenefitOrder = (list) => {
  let modifiedData = {}
  const benefits = [...list]
  for (const benefit of benefits) {
    modifiedData[benefit.benefitOrder] = {
      benefitGroup: benefit.benefitGroup,
      benefits: benefit.benefits,
      benefitDescription: benefit.benefitDescription,
      currentValue: benefit.currentValue,
      newValue: benefit.newValue,
      dataType: benefit.benefitDataType,
      range: benefit.range,
    }
  }
  return modifiedData
}

// makes a list of all child benefit order in a nested obj
const getNestedBenefitOrder = (obj, result = []) => {
  if (obj.hasOwnProperty('benefitOrder')) {
    result.push(obj.benefitOrder)
  }
  if (Array.isArray(obj.child)) {
    obj.child.forEach((child) => getNestedBenefitOrder(child, result))
  }
  return result
}

// gets a list of benefitOrder in an given array of objects
export const getAllChildBenefitOrders = (list) => {
  let finalResult = []
  list.forEach((obj) => {
    finalResult = [...finalResult, ...getNestedBenefitOrder(obj)]
  })
  return finalResult
}

// converts child in correct format
export const makeEachChildAsEmptyArray = (benefits) => benefits.map((benefit) => ({ ...benefit, child: [] }))

// groups benefits and subBenefits
export const mapSubBenefitsToParentBenefit = (list) =>
  makeEachChildAsEmptyArray(list)?.reduce((acc, curr) => {
    if (curr.benefitDataType !== 'String_TickCross') {
      const group = acc.find((item) => item.benefitName === curr.benefitGroup)
      !group
        ? acc.push({
          benefitName: curr.benefitGroup,
          uiType: curr.benefitGroupUIType,
          subBenefits: [curr],
        })
        : group.subBenefits.push(curr)
    }
    return acc
  }, [])

// groups each as per its rowName field
export const groupCopayAndCoins = (list) => {
  let copiedList = [...list]
  let finalList = []
  copiedList.forEach((item) => {
    if (item.benefitDataType === 'Boolean') {
      finalList.push(item)
    } else {
      let index = finalList.findIndex((obj) => obj.title === item.rowName)
      if (index !== -1) {
        finalList[index].items.push(item)
      } else {
        finalList.push({
          title: item.rowName,
          isOptional: item.flag === IS_OPTIONAL,
          parent: item.dependentOnBenefitOrder,
          items: [item],
        })
      }
    }
  })
  return finalList
}
// groups each as per its rowName field
export const groupCopayAndCoinsNew = (list) => {
  let copiedList = [...list]
  let finalList = []
  copiedList.forEach((item) => {
    if (item.rowName === '') {
      finalList.push(item)
    } else {
      let index = finalList.findIndex((obj) => obj.title?.split(' ')?.join('') === item?.rowName?.split(' ')?.join(''))
      if (index !== -1) {
        finalList[index].items.push(item)
      } else {
        finalList.push({
          title: item.rowName,
          isOptional: item.flag === IS_OPTIONAL,
          parent: item.dependentOnBenefitOrder,
          items: [item],
        })
      }
    }
  })
  return finalList
}
// maps childs to their parent element
export const mapChildsToItsParent = (list) => {
  let finalList = [...list.filter((item) => item.benefitDataType === 'Boolean')]
  list.forEach((item) => {
    let index = finalList?.findIndex((boolItem) => boolItem.benefitOrder === item.dependentOnBenefitOrder)
    if (index !== -1) {
      finalList[index].child.push(item)
    } else {
      if (item.benefitDataType !== 'Boolean') {
        finalList.push(item)
      }
    }
  })
  return finalList
}

// modify list as per its group of copay or coins
export const modifiyListAsPerCopayOrCoins = (list) => {
  let obj = {}
  list?.forEach((item) => {
    if (item.benefitDescription.includes(CUSTOM_CHECKBOX.coinsurance) || item.benefitDescription.includes(CUSTOM_CHECKBOX.copayment)) {
      if (item.benefitDescription.includes(CUSTOM_CHECKBOX.coinsurance)) {
        if (CUSTOM_CHECKBOX.coinsurance in obj) {
          obj.Coinsurance.push(item)
        } else {
          obj[CUSTOM_CHECKBOX.coinsurance] = [item]
        }
      } else {
        if (CUSTOM_CHECKBOX.copayment in obj) {
          obj.Copayment.push(item)
        } else {
          obj[CUSTOM_CHECKBOX.copayment] = [item]
        }
      }
    }
  })
  return obj
}

// main function to extract modified List as per UI types
export const mapSubBenefitsAsPerUiType = (list) => {
  const primary = [...mapSubBenefitsToParentBenefit([...new Map(list.map((item) => [item['benefitOrder'], item])).values()])]
  const finalModifiedList = {}
  let sortedByName = [...primary]?.sort((a, b) => a.benefitName?.toLowerCase().localeCompare(b.benefitName?.toLowerCase()))
  sortedByName.forEach((benefit) => {
    let modifiedSubBenefits = []
    let duplicateBenefitArr = [...benefit.subBenefits]
    let sortedDuplicateBenefitArr = [...duplicateBenefitArr.sort((a, b) => a.benefitOrder - b.benefitOrder)]
    if (benefit.uiType === 2 || benefit.uiType === 4) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 3) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 5) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 7) {
      modifiedSubBenefits = [...normalToTypeSeven(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 8) {
      modifiedSubBenefits = [...normalToTypeSeven(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 6) {
      modifiedSubBenefits = [...normalToTypeNine(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 9) {
      modifiedSubBenefits = [...normalToTypeNine(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 10) {
      modifiedSubBenefits = [...normalToTypeNine(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 14) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 15) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 1) {
      modifiedSubBenefits = [...normalToTypeOne(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 12) {
      modifiedSubBenefits = [...getModifiedListForUiTwelve(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 11) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 13) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else {
      modifiedSubBenefits = [...sortedDuplicateBenefitArr]
    }
    finalModifiedList[benefit.benefitName] = {
      ...benefit,
      subBenefits: modifiedSubBenefits,
    }
  })
  return finalModifiedList
}
// main function to extract modified List as per UI types
export const mapSubBenefitsAsPerUiTypeForUIFourteen = (list) => {
  const primary = [...mapSubBenefitsToParentBenefit([...new Map(list.map((item) => [item['benefitOrder'], item])).values()])]
  const finalModifiedList = {}
  let sortedByName = [...primary]?.sort((a, b) => a.benefitName?.toLowerCase().localeCompare(b.benefitName?.toLowerCase()))
  sortedByName.forEach((benefit) => {
    let modifiedSubBenefits = []
    let duplicateBenefitArr = [...benefit.subBenefits]
    let sortedDuplicateBenefitArr = [...duplicateBenefitArr.sort((a, b) => a.benefitOrder - b.benefitOrder)]
    if (benefit.uiType === 2 || benefit.uiType === 4) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 3) {
      modifiedSubBenefits = [...normalToTypeThreeForFourteenUI(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 5) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 7) {
      modifiedSubBenefits = [...normalToTypeSeven(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 8) {
      modifiedSubBenefits = [...normalToTypeSeven(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 6) {
      modifiedSubBenefits = [...normalToTypeNineForFourteenUI(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 9) {
      modifiedSubBenefits = [...normalToTypeNine(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 10) {
      modifiedSubBenefits = [...normalToTypeNine(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 14) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 15) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 1) {
      modifiedSubBenefits = [...normalToTypeOne(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 12) {
      modifiedSubBenefits = [...getModifiedListForUiTwelve(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 11) {
      modifiedSubBenefits = [...normalToTypeThreeForFourteenUI(sortedDuplicateBenefitArr)]
    } else if (benefit.uiType === 13) {
      modifiedSubBenefits = [...normalToTypeThree(sortedDuplicateBenefitArr)]
    } else {
      modifiedSubBenefits = [...sortedDuplicateBenefitArr]
    }
    finalModifiedList[benefit.benefitName] = {
      ...benefit,
      subBenefits: modifiedSubBenefits,
    }
  })
  return finalModifiedList
}
// fn to convert sub benefits to its main benefit and then merge that to its respective Bid Id
export const mapBidIdWithModifiedData = (obj) => {
  let result = {}
  Object.keys(obj)?.forEach((key) => {
    result[key] = { ...mapSubBenefitsAsPerUiType(obj[key]) }
  })
  return result
}

// get grouped benefits based on their benefit order in obj form to fetch and update at o(1)
// respective to their bidIds
export const groupBenefitsAsPerBenefitOrderAndBidId = (obj) => {
  let result = {}
  Object.keys(obj)?.forEach((key) => {
    result[key] = { ...groupBenefitsAsPerBenefitOrder(obj[key]) }
  })
  return result
}

// maps content as per its uiType
export const individualBenefitMapper = (subBenefits, uiType) => {
  if (uiType === 1) {
    return <One record={subBenefits} />
  } else if ([5, 4, 3, 2, 11].includes(uiType)) {
    if (subBenefits[0].benefitGroup === 'Transportation (b10b)') {
      return <Five2 record={subBenefits} />
    } else {
      return <Five record={subBenefits} />
    }
  } else if ([6].includes(uiType)) {
    return <Six record={subBenefits} />
  } else if ([7, 8].includes(uiType)) {
    return <Seven record={subBenefits} />
  } else if ([9, 10].includes(uiType)) {
    return <Nine record={subBenefits} />
  } else if ([12].includes(uiType)) {
    return <Twelve record={subBenefits} />
  } else if ([13].includes(uiType)) {
    return <Thirteen record={subBenefits} />
  } else if ([14].includes(uiType)) {
    return <Fourteen record={subBenefits} />
  } else if ([15].includes(uiType)) {
    return <Fifteen record={subBenefits} />
  } else {
    return <DefaultType record={subBenefits} />
  }
}

// maps content as per its uiType
export const individualBenefitMapperForOldValues = (subBenefits, uiType) => {
  if (uiType === 1) {
    return <OneOld record={subBenefits} />
  } else if ([5, 4, 3, 2, 11].includes(uiType)) {
    if (subBenefits[0].benefitGroup === 'Transportation (b10b)') {
      return <Five2Old record={subBenefits} />
    } else {
      return <FiveOld record={subBenefits} />
    }
  } else if ([6].includes(uiType)) {
    return <SixOld record={subBenefits} />
  } else if ([7, 8].includes(uiType)) {
    return <SevenOld record={subBenefits} />
  } else if ([9, 10].includes(uiType)) {
    return <NineOld record={subBenefits} />
  } else if ([12].includes(uiType)) {
    return <TwelveOld record={subBenefits} />
  } else if ([13].includes(uiType)) {
    return <ThirteenOld record={subBenefits} />
  } else if ([14].includes(uiType)) {
    return <FourteenOld record={subBenefits} />
  } else if ([15].includes(uiType)) {
    return <FifteenOld record={subBenefits} />
  } else {
    return <DefaultTypeOld record={subBenefits} />
  }
}
