import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filterValues: {}, // filter values selected and default
  filterOptions: {}, // filter options
  filtersList: [], // list of filters based on position
  loading: false, // page loader
  organizationData: [], // org data
  organizationSelectedValues: 0, // org selected values
  planData: [], // plans data
  planSelectedValues: [], // plans selected values
  planDataAsObj: {},
  salesFlag: true,
  success: false,
  defaultPlanKeys: [],
  defaultOrgKeys: 0,
  duplicateCounties: {},
  allSelected: false,
}

export const PlanSelectionSlice = createSlice({
  name: 'PlanSelection',
  initialState,
  reducers: {
    resetPlansData: (state) => {
      state.filterValues = {}
      state.filterOptions = {}
      state.filtersList = []
      state.organizationData = []
      state.organizationSelectedValues = 0
      state.defaultOrgKeys = 0
      state.planData = []
      state.planSelectedValues = []
      state.planDataAsObj = {}
      state.salesFlag = true
      state.success = false
      state.defaultPlanKeys = []
      state.duplicateCounties = {}
    },
    setFilterValues: (state, { payload }) => {
      state.filterValues = payload
    },
    setAllSelected: (state, { payload }) => {
      state.allSelected = payload
    },
    setDuplicateCounties: (state, { payload }) => {
      state.duplicateCounties = payload
    },
    setPlanDataAsObj: (state, { payload }) => {
      state.planDataAsObj = payload
    },
    setDefaultPlanKeys: (state, { payload }) => {
      state.defaultPlanKeys = payload
    },
    setDefaultOrgKeys: (state, { payload }) => {
      state.defaultOrgKeys = payload
    },
    modifyPlanDataAsObj: (state, { payload: { key, data } }) => {
      state.planDataAsObj = {
        ...state.planDataAsObj,
        [key]: { ...state.planDataAsObj[key], data: data },
      }
    },
    setSalesFlag: (state, { payload }) => {
      state.salesFlag = payload
    },
    setSuccess: (state, { payload }) => {
      state.success = payload
    },
    setFilterOptions: (state, { payload }) => {
      state.filterOptions = payload
    },
    setFiltersList: (state, { payload }) => {
      state.filtersList = payload
    },
    updateFilterOptions: (state, { payload }) => {
      state.filterOptions = {
        ...state.filterOptions,
        ...payload,
      }
    },
    updateFilterValues: (state, { payload: { key, value } }) => {
      state.filterValues = {
        ...state.filterValues,
        [key]: { ...state.filterValues[key], selected: value },
      }
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setOrganizationData: (state, { payload }) => {
      state.organizationData = payload
    },
    setOrganizationSelectedValues: (state, { payload }) => {
      state.organizationSelectedValues = payload
    },
    setPlanData: (state, { payload }) => {
      state.planData = payload
    },
    setPlanSelectedValues: (state, { payload }) => {
      state.planSelectedValues = payload
    },
  },
})

// Action creators are generated for each case of reducer function
export const {
  setPlanSelectedValues,
  setPlanData,
  setOrganizationSelectedValues,
  setOrganizationData,
  setFilterValues,
  setFilterOptions,
  setFiltersList,
  updateFilterOptions,
  updateFilterValues,
  setLoading,
  setAllSelected,
  setSalesFlag,
  setSuccess,
  setPlanDataAsObj,
  modifyPlanDataAsObj,
  setDefaultPlanKeys,
  resetPlansData,
  setDefaultOrgKeys,
  setDuplicateCounties,
} = PlanSelectionSlice.actions

export default PlanSelectionSlice.reducer
