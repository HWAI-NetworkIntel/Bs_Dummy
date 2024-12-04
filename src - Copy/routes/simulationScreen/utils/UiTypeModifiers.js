import { groupCopayAndCoins, groupCopayAndCoinsNew, makeEachChildAsEmptyArray, mapChildsToItsParent } from './Benefits'

// groups as per title
const groupAsPerTitle = (arr) => {
  let newArr = [...arr]
  let finalArr = newArr.reduce((acc, cur) => {
    let group = acc?.findIndex((item) => item.parent === cur.benefitDescription.split(' ')[1])
    if (group === -1) {
      acc.push({
        parent: cur.benefitDescription.split(' ')[1],
        child: [cur],
      })
    } else {
      acc[group]?.child?.push(cur)
    }
    return acc
  }, [])
  return finalArr
}

// groups as per copay or coins
const groupAsPerCopayOrCoins = (arr) => {
  let newArr = [...arr]
  let finalArr = newArr.reduce((acc, cur) => {
    let group = acc?.findIndex((item) => item.parent === cur.benefitDescription.split('):')[0]?.split('(')[1])
    if (group === -1) {
      acc.push({
        parent: cur.benefitDescription.split('):')[0]?.split('(')[1],
        child: [cur],
      })
    } else {
      acc[group]?.child?.push(cur)
    }
    return acc
  }, [])
  return finalArr
}

const attachChildToCopayOrCoins = (list) => {
  let groupedBenefits = [...list]
  let coinIndex = list.findIndex((item) => item.benefitDescription.includes('Is there an enrollee Coinsurance'))
  let copayIndex = list.findIndex((item) => item.benefitDescription.includes('Is there an enrollee Copayment'))
  groupedBenefits.forEach((item) => {
    if (item.benefitDataType !== 'Boolean') {
      if (item.benefitDescription.includes('Coinsurance')) {
        groupedBenefits[coinIndex].child.push(item)
      }
      if (item.benefitDescription.includes('Copayment')) {
        groupedBenefits[copayIndex].child.push(item)
      }
    }
  })
  return groupedBenefits.filter((item) => item.child.length > 0)
}

// makes normal list to as per UI type 12
export const getModifiedListForUiTwelve = (record) => {
  let result = groupAsPerTitle(record)
  let finalOutput = result.map((item) => ({
    ...item,
    child: groupAsPerCopayOrCoins(item.child),
  }))
  return finalOutput
}

// makes normal list to as per UI type 7
export const normalToTypeSeven = (list) => {
  let modifiedList = [...makeEachChildAsEmptyArray(list)]
  list.forEach((item) => {
    if (item.dependentOnBenefitOrder !== 0) {
      let i = list.findIndex((singleBenefit) => singleBenefit.benefitOrder === item.dependentOnBenefitOrder)
      if (i !== -1) {
        modifiedList[i].child.push(item)
      }
    }
  })
  let parentChildList = modifiedList.filter(
    (item) => !item.benefitDescription.includes('Coinsurance') && !item.benefitDescription.includes('Copayment')
  )
  let final = parentChildList.map((item) => {
    return {
      ...item,
      child: attachChildToCopayOrCoins(item.child),
    }
  })
  return final
}

// makes normal list to as per UI type 2
export const normalToTypeTwo = (list) => {
  let parentChildList = [...mapChildsToItsParent(list)]
  let parentChildListGrouped = [...groupCopayAndCoins(parentChildList)]
  let finalList = parentChildListGrouped.map((item) => {
    if (item.child?.length > 0) {
      return {
        ...item,
        child: [...groupCopayAndCoins(item.child)],
      }
    } else {
      return item
    }
  })
  return finalList
}

export const mapsAllChildsToTheirParentElement = (list) => {
  let parentToChildList = [...list]
  parentToChildList.forEach((item, i) => {
    let index = parentToChildList.findIndex((el) => el.benefitOrder === item.dependentOnBenefitOrder)
    if (index !== -1) {
      parentToChildList[index].child.push(item)
    }
  })
  let finalList = parentToChildList.filter((el) => el.dependentOnBenefitOrder === 0)
  return finalList
}
export const normalToTypeThree = (list) => {
  let parentChildList = [...mapsAllChildsToTheirParentElement(list)]
  let parentChildListGrouped = [...groupCopayAndCoinsNew(parentChildList)]
  let finalList = parentChildListGrouped.map((item) => {
    if (item.child?.length > 0) {
      return {
        ...item,
        child: [...groupCopayAndCoinsNew(item.child)],
      }
    } else {
      return item
    }
  })
  return finalList
}
export const normalToTypeThreeForFourteenUI = (list) => {
  let noToReplaceToZero = list[0].dependentOnBenefitOrder
  let newList = list?.map((item) => ({
    ...item,
    dependentOnBenefitOrder: item.dependentOnBenefitOrder === noToReplaceToZero ? 0 : item.dependentOnBenefitOrder,
  }))
  let parentChildList = [...mapsAllChildsToTheirParentElement(newList)]
  let parentChildListGrouped = [...groupCopayAndCoinsNew(parentChildList)]
  let finalList = parentChildListGrouped.map((item) => {
    if (item.child?.length > 0) {
      return {
        ...item,
        child: [...groupCopayAndCoinsNew(item.child)],
      }
    } else {
      return item
    }
  })
  return finalList
}
export const normalToTypeNineForFourteenUI = (list) => {
  let noToReplaceToZero = list[0].dependentOnBenefitOrder
  let newList = list?.map((item) => ({
    ...item,
    dependentOnBenefitOrder: item.dependentOnBenefitOrder === noToReplaceToZero ? 0 : item.dependentOnBenefitOrder,
  }))
  let parentChildList = [...mapsAllChildsToTheirParentElement(newList)]
  return parentChildList
}
export const normalToTypeNine = (list) => {
  let parentChildList = [...mapsAllChildsToTheirParentElement(list)]
  return parentChildList
}
export const normalToTypeOne = (list) => {
  let parentChildList = [...mapsAllChildsToTheirParentElement(list)]
  return parentChildList
}
