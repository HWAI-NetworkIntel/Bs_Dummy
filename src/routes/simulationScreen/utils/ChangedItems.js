// export function updateValuesToZero(changedItems, copayCoins) {
//   const updatedItems = {}

//   for (const bidId in changedItems) {
//     if (changedItems.hasOwnProperty(bidId)) {
//       const benefitOrder = copayCoins[bidId]?.benefitOrder || []

//       updatedItems[bidId] = changedItems[bidId].map((item) => ({
//         ...item,
//         newValueFromUI:
//           benefitOrder.includes(item.benefits) && (item.newValueFromUI.startsWith(' ') || item.newValueFromUI.endsWith(' '))
//             ? item.benefitDescription.includes('Coinsurance')
//               ? 'x%'
//               : '$x'
//             : item.newValueFromUI,
//       }))

//       updatedItems[bidId] = updatedItems[bidId].filter((item) => {
//         const isSameValue = item.currentValue === item.newValueFromUI
//         const isZeroValueAndXValue =
//           (item.currentValue.includes('0%') || item.currentValue.includes('$0')) &&
//           (item.newValueFromUI.includes('x%') || item.newValueFromUI.includes('$x'))

//         return !isSameValue && !isZeroValueAndXValue
//       })
//     }
//   }

//   return updatedItems
// }

export function updateValuesToZero(obj) {
  let result = {}
  if (obj.newValue.startsWith(' ') || obj.newValue.endsWith(' ')) {
    if (obj.newValue.includes('%')) {
      if (obj.newValue.trim() === obj.currentValue && obj.newValue.trim() === '0%') {
        return { ...obj, newValueFromUI: obj.newValue.trim() }
      } else {
        result = { ...obj, newValueFromUI: 'x%' }
      }
    } else if (obj.newValue.includes('$')) {
      if (obj.newValue.trim() === obj.currentValue && obj.newValue.trim() === '$0') {
        return { ...obj, newValueFromUI: obj.newValue.trim() }
      } else {
        result = { ...obj, newValueFromUI: '$x' }
      }
    }
  } else {
    return { ...obj, newValueFromUI: obj.newValue }
  }
  return result
}
