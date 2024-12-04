import { EMPTY_STRING } from '../constants'

// used to capitalize first letter of a string
export const capitalizeFirstLetter = (str) => str?.charAt(0)?.toUpperCase() + str?.slice(1)
// used to generate tooltip as per range provided
export const tooltipGenerator = (str) => `Allowed Range : ${str?.split('|')[0]} - ${str?.split('|')[1]}`
export const removeSymbolsFromInput = (str) => str?.replace('$', EMPTY_STRING)?.replace(',', EMPTY_STRING)?.replace('%', EMPTY_STRING)

// checks nc is present or not
export const checkNc = (obj) => {
  if (obj?.range?.includes('NC')) {
    return true
  }else{
    return false
  }
}
export const handleTitle = (str) => {
  if (str?.includes('mode of Payment')) {
    return 'Mode Of Payment'
  } else if (str?.includes('Coverage amount')) {
    return 'Amount'
  } else if (str?.includes('Is the ')) {
    return 'Limit'
  } else if (str?.includes('Benefits offered')) {
    return 'Benefits'
  } else if (str?.includes('Periodicity')) {
    return 'Periodicity'
  } else if (str?.includes('Premium')) {
    return 'Premium'
  } else if (str?.includes('Maximum Plan Benefit Coverage Amount')) {
    return 'Is there a Maximum Plan Benefit Coverage Amount'
  } else {
    return ''
  }
}

export const handleTitle2 = (str) => {
  if (str?.includes('Is this package applicable to VBID or SSBCI')) {
    return 'Package aplicable'
  } else if (str?.includes('Select all the Non-Medicare-covered additional benefits offered')) {
    return 'Additional benefits'
  } else if (str?.includes('Is there a package level maximum coverage amount')) {
    return 'Is there a package level maximum coverage amount?'
  } else if (str?.includes('Benefits offered')) {
    return 'Benefits'
  } else if (str?.includes('Periodicity')) {
    return 'Periodicity'
  } else if (str?.includes('Premium')) {
    return 'Premium'
  } else if (str?.includes('Coverage amount')) {
    return 'Amount'
  } else if (str?.includes('Maximum Plan Benefit Coverage Amount')) {
    return 'Is there a Maximum Plan Benefit Coverage Amount'
  } else {
    return ''
  }
}
