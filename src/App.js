import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import { notification } from 'antd'
import { Provider } from 'react-redux'
import { store } from './common/store/store'
import './index.css'
import SimulationScreen from './routes/simulationScreen/components/SimulationScreen'
import PlanSelection from './routes/planSelectionScreen/components/PlanSelection'
import styles from './common/style/home.module.scss'
import style from './common/style/content.module.scss'
import ScenarioScreen from './routes/scenarioScreen/components/ScenarioScreen'
import { ValidateUserid } from './routes/scenarioScreen/api/request'
import { openNotification } from './routes/planSelectionScreen/components/misc/Notification'

function App() {
  const [userID, setuserID] = useState('')
  const [ClientId, setClientId] = useState(null)
  const [userName, setuserName] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [landingURL, setlandingURL] = useState(null)
  const [planSelectionURL, setplanSelectionURL] = useState(null)
  const [simulationURL, setsimulationURL] = useState(null)

  useEffect(async () => {
    var urlSegments = []
    var appURL = window?.location.pathname
    urlSegments = appURL.split('/')
    if (urlSegments.length != 4) {
      openNotification('Invalid URL', 'error')
    } else {
      let userid = urlSegments[3]
      setuserID(userid)
      let result = await ValidateUserid(userid)
      setUserEmail(result?.email || null)
      setClientId(result?.clientId || null)
      setuserName(result?.firstName || null)
      if (!result?.firstName?.length) {
        openNotification('Access Denied', 'error')
      } else {
        // setlandingURL('/benefit-simulator/scenario/' + userid)
        setplanSelectionURL('/benefit-simulator/plan-selection/' + userid)
        setsimulationURL('/benefit-simulator/simulation/' + userid)
      }
    }
  }, [])

  return (
    <Provider store={store}>
      <div className="w-full min-h-screen flex flex-col justify-between">
        <div className="w-full">
          <BrowserRouter>
            <Routes>
              {/* <Route
                path={landingURL}
                element={<ScenarioScreen userName={userName} ClientId={ClientId} userid={userID} userEmail={userEmail} />}
              /> */}
              <Route
                path={planSelectionURL}
                element={<PlanSelection userName={userName} clientId={ClientId} userId={userID} userEmail={userEmail} />}
              />
              <Route
                path={simulationURL}
                element={<SimulationScreen userName={userName} clientId={ClientId} userId={userID} userEmail={userEmail} />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </Provider>
  )
}
export default App
