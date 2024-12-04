import React, { useState } from 'react'
import { CompareIcon } from '../../../../../../common/images/icons'
import { useDispatch, useSelector } from 'react-redux'
import CompareScenarioModal from '../../Modals/CompareScenarioModal'
import { compareScenario, getScenarios } from '../../../../api/request'
import { openNotification } from '../../../../../planSelectionScreen/components/misc/Notification'
import { setAllScenarios, setDisplayedScenarios, setOriginalAllScenarios, setSeletectedIds } from '../../../../reducer/scenarioSlice'

const CompareScenario = ({ clientId, email }) => {
  const { selectedIds, originalAllScenarios, compareCount } = useSelector(({ scenarios }) => scenarios)
  const [OpenModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const uniqueSelectedIds = [...new Set(selectedIds)]
  const dispatch = useDispatch()

  const selectedScenarios = uniqueSelectedIds

  const getScenarios1 = async () => {
    const filteredSelectedScenarios = selectedScenarios.filter((scenarioId) => {
      const foundScenario = originalAllScenarios.find((scenario) => scenario.ScenarioId === scenarioId)
      return foundScenario && !['Not Submitted', 'Processing'].includes(foundScenario.Status)
    })
    if (filteredSelectedScenarios.length < 2) {
      openNotification('Select more than 1 Ready Scenario for Comparing', 'error')
    } else if (filteredSelectedScenarios.length > compareCount) {
      openNotification(`Select less than ${compareCount} Scenarios for Comparing`, 'error')
    } else {
      setOpenModal(true)
      setLoading(true)
      let obj1 = {
        clientId: clientId,
        scenarioIds: filteredSelectedScenarios.join(','),
      }
      try {
        let result = await compareScenario(obj1)
        if (result?.success) {
          setError(null)
          setData(result?.data)
        }
      } catch (error) {
        let error1 = error?.response?.data?.message
        setError(error1)
        const response = await getScenarios({
          clientId: clientId,
          createdBy: email,
        })
        const data = response?.data?.scenario
        const validSelectedIds = selectedIds.filter((selectedId) => data.some((scenario) => scenario.ScenarioId === selectedId))

        dispatch(setOriginalAllScenarios(data))
        dispatch(setAllScenarios(data))
        dispatch(setDisplayedScenarios(data))
        dispatch(setSeletectedIds(validSelectedIds))
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div>
      <button
        className={`flex justify-center items-center w-[120px] h-[32px] gap-x-1 text-sm tracking-[0.7px] leading-[20px] ${
          selectedIds.length > 1 ? 'bg-[#5C276E] text-white' : 'border border-[#DDDDDC] text-[#DDDDDC]'
        }`}
        disabled={selectedIds.length <= 1}
        onClick={getScenarios1}
      >
        <CompareIcon width={20} height={20} />
        <div className="pt-[1px]">Compare</div>
      </button>
      <CompareScenarioModal OpenModal={OpenModal} setOpenModal={setOpenModal} loading={loading} data={data} error={error} />
    </div>
  )
}
export default React.memo(CompareScenario)
