import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  resimulate: true,
  significantBenefitList: {},
  benefits: {}, // all benefits data
  modifiedBenefits: {}, // modified benefits data
  errorBenefitNameList: [], // error benefit groups list
  selectedBidId: '',
  listOfBidIds: [],
  benefitVisible: '', // selectedBenefit
  benefitNameButtonClicked: {
    clicked: false,
    name: '',
  },
  isIncomplete: '',
  emptyBenefitInfoBox: false,
  benefitInfoBoxLoader: false,
  changedColorItems: {},
  copayCoins: {},
  currentIteration: 0,
  originalScenarioId: 0
}

export const benefitsSlice = createSlice({
  name: 'benefits',
  initialState,
  reducers: {
    setCurrentIteration: (state, { payload }) => {
      state.currentIteration = payload
    },
    setOriginalScenarioId: (state, { payload }) => {
      state.originalScenarioId = payload
    },
    resetBenefitsData: (state) => {
      state.significantBenefitList = {}
      state.benefits = {}
      state.modifiedBenefits = {}
      state.errorBenefitNameList = []
      state.benefitVisible = ''
      state.selectedBidId = ''
      state.listOfBidIds = []
      state.changedColorItems = {}
      state.benefitNameButtonClicked = {
        clicked: false,
        name: '',
      }
      state.isIncomplete = ''
      state.emptyBenefitInfoBox = false
      state.benefitInfoBoxLoader = false
    },
    resetErrorList: (state) => {
      state.errorBenefitNameList = []
    },
    updateErrorList: (state, { payload }) => {
      state.errorBenefitNameList = payload
    },
    setSignificantBenefitList: (state, { payload }) => {
      state.significantBenefitList = payload
    },
    setResimulate: (state, { payload }) => {
      state.resimulate = payload
    },
    setBenefitVisible: (state, { payload }) => {
      state.benefitVisible = payload
    },
    setChangedColorItems: (state, { payload }) => {
      state.changedColorItems = payload
    },
    setIsIncomplete: (state, { payload }) => {
      state.isIncomplete = payload
    },
    setEmptyBenefitInfoBox: (state, { payload }) => {
      state.emptyBenefitInfoBox = payload
    },
    setBenefitNameButtonClicked: (state, { payload }) => {
      state.benefitNameButtonClicked = payload
    },
    setBenefitInfoBoxLoader: (state, { payload }) => {
      state.benefitInfoBoxLoader = payload
    },
    setListOfBidIds: (state, { payload }) => {
      state.listOfBidIds = payload
    },
    setSelectedBidId: (state, { payload }) => {
      state.selectedBidId = payload
    },
    handleBenefits: (state, { payload: { index, value, bidId } }) => {
      if (value) {
        state.benefits = {
          ...state.benefits,
          [bidId]: {
            ...state.benefits[bidId],
            [index]: { ...state.benefits[bidId][index], newValue: value },
          },
        }
      } else {
        state.benefits = {
          ...state.benefits,
          [bidId]: {
            ...state.benefits[bidId],
            [index]: {
              ...state.benefits[bidId][index],
              newValue: state.benefits[bidId][index].currentValue,
            },
          },
        }
      }
    },
    handleBenefitsForMultiSelect: (state, { payload: { index, value, bidId } }) => {
      state.benefits = {
        ...state.benefits,
        [bidId]: {
          ...state.benefits[bidId],
          [index]: { ...state.benefits[bidId][index], newValue: value },
        },
      }
    },
    handleCopayCoins: (state, { payload: { bidId, benefitOrder } }) => {
      state.copayCoins = {
        ...state.copayCoins,
        [bidId]: {
          ...state.copayCoins[bidId],
          benefitOrder: [...(state.copayCoins[bidId]?.benefitOrder || []), benefitOrder],
        },
      }
    },

    removeBenefitValueHandler: (state, { payload: { value, bidId } }) => {
      state.benefits = {
        ...state.benefits,
        [bidId]: {
          ...state.benefits[bidId],
          [value]: { ...state.benefits[bidId][value], newValue: '' },
        },
      }
    },
    addBenefits: (state, { payload }) => {
      state.benefits = { ...payload }
    },
    addToErrorBenefitNamesList: (state, { payload }) => {
      let isPresent = state.errorBenefitNameList?.findIndex((benefitName) => benefitName === payload) !== -1
      if (!isPresent) {
        state.errorBenefitNameList = [...state.errorBenefitNameList, payload]
      }
    },
    removeFromErrorBenefitNamesList: (state, { payload }) => {
      let isPresent = state.errorBenefitNameList?.findIndex((benefitName) => benefitName === payload) !== -1
      if (isPresent) {
        state.errorBenefitNameList = state.errorBenefitNameList?.filter((item) => item !== payload)
      }
    },
    addModifiedBenefits: (state, { payload }) => {
      state.modifiedBenefits = { ...payload }
    },
    addEhcValues: (state, { payload: { id, values, bidId } }) => {
      let prevNewValues = state.benefits[bidId][id].newValue
      let splitValues = prevNewValues.split('')
      values.forEach((kk) => {
        splitValues[kk - 1] = 1
      })
      prevNewValues = splitValues.join('')
      state.benefits = {
        ...state.benefits,
        [bidId]: {
          ...state.benefits[bidId],
          [id]: { ...state.benefits[bidId][id], newValue: prevNewValues },
        },
      }
    },
    removeEhcValues: (state, { payload: { id, values, bidId } }) => {
      let prevNewValues = state.benefits[bidId][id].newValue
      let splitValues = prevNewValues.split('')
      values.forEach((kk) => {
        splitValues[kk - 1] = 0
      })
      prevNewValues = splitValues.join('')
      state.benefits = {
        ...state.benefits,
        [bidId]: {
          ...state.benefits[bidId],
          [id]: { ...state.benefits[bidId][id], newValue: prevNewValues },
        },
      }
    },
    restoreEhcValues: (state, { payload: { id, values, bidId } }) => {
      let prevNewValues = state.benefits[bidId][id].newValue
      let prevNewValues1 = state.benefits[bidId][id].currentValue.split('')
      let splitValues = prevNewValues.split('')
      values.forEach((kk) => {
        splitValues[kk - 1] = prevNewValues1[kk - 1]
      })
      prevNewValues = splitValues.join('')
      state.benefits = {
        ...state.benefits,
        [bidId]: {
          ...state.benefits[bidId],
          [id]: { ...state.benefits[bidId][id], newValue: prevNewValues },
        },
      }
    },
  },
})

// Action creators are generated for each case of reducer function
export const {
  updateErrorList,
  resetErrorList,
  handleBenefits,
  resetBenefitsData,
  addEhcValues,
  removeEhcValues,
  restoreEhcValues,
  addBenefits,
  addModifiedBenefits,
  addToErrorBenefitNamesList,
  removeFromErrorBenefitNamesList,
  removeBenefitValueHandler,
  handleBenefitsForMultiSelect,
  setSelectedBidId,
  setListOfBidIds,
  setBenefitVisible,
  setBenefitNameButtonClicked,
  setIsIncomplete,
  setEmptyBenefitInfoBox,
  setBenefitInfoBoxLoader,
  setSignificantBenefitList,
  setChangedColorItems,
  handleCopayCoins,
  setCurrentIteration,
  setResimulate,
  setOriginalScenarioId
} = benefitsSlice.actions

export default benefitsSlice.reducer
