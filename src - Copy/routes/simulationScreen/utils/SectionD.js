export let benefitsToShow = {
  1: {
    '16a': ['16a Package 1 - Cost', '16a Package 1 - Coverage'],
    '16b': ['16b Package 1 - Cost', '16b Package 1 - Coverage'],
    '17a': ['17a Package 1 - Cost', '17a Package 1 - Coverage'],
    '17b': ['17b Package 1 - Cost', '17b Package 1 - Coverage'],
    '18a': ['18a Package 1 - Cost', '18a Package 1 - Coverage'],
    '18b': ['18b Package 1 - Cost', '18b Package 1 - Coverage'],
  },
  2: {
    '16a': ['16a Package 2 - Cost', '16a Package 2 - Coverage'],
    '16b': ['16b Package 2 - Cost', '16b Package 2 - Coverage'],
    '17a': ['17a Package 2 - Cost', '17a Package 2 - Coverage'],
    '17b': ['17b Package 2 - Cost', '17b Package 2 - Coverage'],
    '18a': ['18a Package 2 - Cost', '18a Package 2 - Coverage'],
    '18b': ['18b Package 2 - Cost', '18b Package 2 - Coverage'],
  },
  3: {
    '16a': ['16a Package 3 - Cost', '16a Package 3 - Coverage'],
    '16b': ['16b Package 3 - Cost', '16b Package 3 - Coverage'],
    '17a': ['17a Package 3 - Cost', '17a Package 3 - Coverage'],
    '17b': ['17b Package 3 - Cost', '17b Package 3 - Coverage'],
    '18a': ['18a Package 3 - Cost', '18a Package 3 - Coverage'],
    '18b': ['18b Package 3 - Cost', '18b Package 3 - Coverage'],
  },
}
export const handleBenefitsToShow = (arr, no) => {
  let result = []
  arr?.forEach((str) => {
    if (benefitsToShow[no]?.[str]) {
      benefitsToShow[no][str]?.forEach((singleStr) => {
        result.push(singleStr)
      })
    }
  })
  return result
}
