import { createSlice } from '@reduxjs/toolkit'
import { handleBenefitsToShow } from '../utils/Fifteen'

const initialState = {
  benefitsToShow: {},
}

export const fifteenUISlice = createSlice({
  name: 'fifteenUI',
  initialState,
  reducers: {
    setBenefitsToShow: (state, { payload: { no, value } }) => {
      if (value?.length > 0) {
        state.benefitsToShow = { ...state.benefitsToShow, [no]: handleBenefitsToShow(value, no) }
      } else {
        state.benefitsToShow = { ...state.benefitsToShow, [no]: [] }
      }
    },
  },
})

// Action creators are generated for each case of reducer function
export const { setBenefitsToShow } = fifteenUISlice.actions

export default fifteenUISlice.reducer
