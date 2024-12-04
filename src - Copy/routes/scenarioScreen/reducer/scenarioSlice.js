import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  scenarioName: '',
  scenarioDescription: '',
  allScenarios: [],
  selectedIds: [],
  selectedOption: 'ScenarioId',
  originalAllScenarios: [],
  displayedScenarios: [],
  editedName: '',
  editedDescription: '',
  currentPage: 1,
  currentSize: 50,
  searchedIds: [],
  showCard: null,
  compareCount: '',
  allSelected: false,
  bouncePropagation: 0,
}
export const ScenarioSlice = createSlice({
  name: 'Scenarios',
  initialState,
  reducers: {
    setScenarioName: (state, { payload }) => {
      state.scenarioName = payload
    },
    setBouncePropagation: (state, { payload }) => {
      state.bouncePropagation = payload
    },
    setScenarioDescription: (state, { payload }) => {
      state.scenarioDescription = payload
    },
    setAllScenarios: (state, { payload }) => {
      state.allScenarios = payload
    },
    setSeletectedIds: (state, { payload }) => {
      state.selectedIds = payload
    },
    setSelectedOption: (state, { payload }) => {
      state.selectedOption = payload
    },
    setOriginalAllScenarios: (state, { payload }) => {
      state.originalAllScenarios = payload
    },
    setEditedScenarioName: (state, { payload }) => {
      state.editedName = payload
    },
    setEditedScenarioDescription: (state, { payload }) => {
      state.editedDescription = payload
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload
    },
    setCurrentSize: (state, { payload }) => {
      state.currentSize = payload
    },
    setDisplayedScenarios: (state, { payload }) => {
      state.displayedScenarios = payload
    },
    setSearchedIds: (state, { payload }) => {
      state.searchedIds = payload
    },
    setShowCard: (state, { payload }) => {
      state.showCard = payload
    },
    setCompareCount: (state, { payload }) => {
      state.compareCount = payload
    },

    setAllSelected: (state, { payload }) => {
      state.allSelected = payload
    },
  },
})

export const {
  setScenarioName,
  setScenarioDescription,
  setAllScenarios,
  setLoadScenarioId,
  setSeletectedIds,
  setSelectedOption,
  setOriginalAllScenarios,
  setEditedScenarioName,
  setEditedScenarioDescription,
  setCurrentPage,
  setCurrentSize,
  setDisplayedScenarios,
  setSearchedIds,
  setShowCard,
  setCompareCount,
  setAllSelected,
  setBouncePropagation,
} = ScenarioSlice.actions
export default ScenarioSlice.reducer
