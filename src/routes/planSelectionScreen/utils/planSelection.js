// converts list from an comma separetd array
// ex: str: '1,2,3' ---> [1,2,3]
export const getListFromCommaSeparatedString = (str) => str?.split(',')

// converts string from list
// ex: list:[1,2,3] ---> str: '1,2,3'
export const getStringFromAnArray = (arr) => arr?.toString()

// get filters list based on position and remove unnecessary filters
export const getSortedFiltersList = (obj) => {
  let list = []
  Object.keys(obj)?.forEach((key) => {
    if (obj[key]?.position > 0) {
      list.push(obj[key])
    }
  })
  return list.sort((a, b) => a.position - b.position)
}

// get default Filter Values for sorted list
export const getDefaultFilterValuesFromList = (arr) => {
  let obj = {}
  arr?.forEach((item) => {
    obj[item.name] = {
      defaults: item.defaultId,
      selected: item.defaultId,
    }
  })
  return obj
}

// empty next options in case of deselect all values
export const getCascadingEmptyOptions = (list, currentPosition) => {
  let emptyOptions = {}
  list?.forEach((filter) => {
    if (filter.position > currentPosition) {
      emptyOptions[filter.name] = []
    }
  })
  return emptyOptions
}

export const multiSelectValue = (options, value) => {
  if (options?.length > 0) {
    return options?.filter((obj) => value?.split(',')?.includes(`${obj?.Id}`))?.map((obj1) => obj1?.Id) || []
  }
  return []
}

export const getSelectedItemsLabel = (options, value) => {
  console.log("getSelectedItemsLabel",options, value);
  
  let selectedCount = options?.filter((obj) => value?.split(',')?.includes(`${obj?.Id}`))?.length || 0
  if (options?.length > 0 && selectedCount === options?.length) {
    return `All Selected`
  }
  return `${options?.filter((obj) => value?.split(',')?.includes(`${obj?.Id}`))?.length || 0} of ${options?.length} Selected`
}

export const sortData = (key, isIncrement, list) => {
  let arr = [...list]
  let sortedList = []

  if (key === 'name' || key === 'planName') {
    sortedList = [
      ...arr?.sort((a, b) => {
        if (isIncrement) {
          return a[key].localeCompare(b[key])
        } else {
          return b[key].localeCompare(a[key])
        }
      }),
    ]
  } else {
    if (isIncrement) {
      sortedList = [...arr?.sort((a, b) => b[key] - a[key])]
    } else {
      sortedList = [...arr?.sort((a, b) => a[key] - b[key])]
    }
  }

  return sortedList
}

export const getDifferenceAsString = (post, pre) => {
  const differenceAmount = Number(post) - Number(pre)
  return differenceAmount > 0 ? `+${differenceAmount}` : `${differenceAmount}`
}

export const isDifferencePositive = (post, pre) => {
  const differenceAmount = Number(post) - Number(pre)
  return differenceAmount > 0 ? true : false
}

export const getPayloadFormatStateCountyFromObj = (obj) => {
  let modifiedObj = {}
  Object.keys(obj)?.forEach((key) => {
    modifiedObj[obj[key].stateId] = obj[key].countyData?.map((item) => item.id)?.toString()
  })
  return modifiedObj
}
