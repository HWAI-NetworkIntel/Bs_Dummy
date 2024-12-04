import { configureStore } from '@reduxjs/toolkit'
import benefitsReducer from '../../routes/simulationScreen/reducer/BenefitsSlice'
import sectionDReducer from '../../routes/simulationScreen/reducer/SectionDSlice'
import planSelectionReducer from '../../routes/planSelectionScreen/reducer/planSelectionSlice'
import scenarioReducer from '../../routes/scenarioScreen/reducer/scenarioSlice'
import fifteenUIReducer from '../../routes/simulationScreen/reducer/UiFifteen'

export const store = configureStore({
  reducer: {
    benefits: benefitsReducer,
    plans: planSelectionReducer,
    scenarios: scenarioReducer,
    sectionD: sectionDReducer,
    fifteen: fifteenUIReducer,
  },
})
