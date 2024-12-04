export const colorItems = (obj = {}) => {
  let changedItems = {}
  Object.keys(obj).forEach((bidId) => {
    Object.keys(obj[bidId])?.forEach((key) => {
      if (obj[bidId]?.[key]?.currentValue !== obj[bidId]?.[key]?.newValue) {
        if (obj[bidId]?.[key]?.newValue !== '') {
          if (changedItems[bidId]) {
            if (!changedItems[bidId].includes(obj[bidId]?.[key]?.benefitGroup)) {
              changedItems[bidId].push(obj[bidId]?.[key]?.benefitGroup)
            }
          } else {
            changedItems[bidId] = [obj[bidId]?.[key]?.benefitGroup]
          }
        }
      }
    })
  })
  return changedItems
}
