export let benefitsToShow = {
  1: {
    '13i1': ['Food and Produce (Group ID 1)'],
    '13i10': ['General Supports for Living (Group ID 1)'],
    '13i2': ['Meals (beyond limited basis) (Group ID 1)'],
    '13i3': ['Pest Control (Group ID 1)'],
    '13i4': ['Transportation for Non-Medical Needs (Group ID 1)'],
    '13i6': ['Social Needs Benefit (Group ID 1)'],
  },
  2: {
    '13i1': ['Food and Produce (Group ID 2)'],
    '13i10': ['General Supports for Living (Group ID 2)'],
    '13i2': ['Meals (beyond limited basis) (Group ID 2)'],
    '13i3': ['Pest Control (Group ID 2)'],
    '13i4': ['Transportation for Non-Medical Needs (Group ID 2)'],
    '13i6': ['Social Needs Benefit (Group ID 2)'],
  },
  3: {
    '13i1': ['Food and Produce (Group ID 3)'],
    '13i10': ['General Supports for Living (Group ID 3)'],
    '13i2': ['Meals (beyond limited basis) (Group ID 3)'],
    '13i3': ['Pest Control (Group ID 3)'],
    '13i4': ['Transportation for Non-Medical Needs (Group ID 3)'],
    '13i6': ['Social Needs Benefit (Group ID 3)'],
  },
  4: {
    '13i1': ['Food and Produce (Group ID 3)'],
    '13i10': ['General Supports for Living (Group ID 3)'],
    '13i2': ['Meals (beyond limited basis) (Group ID 3)'],
    '13i3': ['Pest Control (Group ID 3)'],
    '13i4': ['Transportation for Non-Medical Needs (Group ID 3)'],
    '13i6': ['Social Needs Benefit (Group ID 3)'],
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
