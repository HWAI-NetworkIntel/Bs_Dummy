import React, { useEffect, useState } from 'react'
import CustomModal from './CustomModal'
import { Input, Checkbox } from 'antd'
import { SortDown, SortUp } from '../../../../../common/images/icons'
import ShareScenarioTitle from './titles/ShareScenarioTitle'
import ShareScenarioFooter from './titles/ShareScenarioFooter'
import { openNotification } from '../../../../planSelectionScreen/components/misc/Notification'
import { getEmailIdForShareScenario, getScenarioDetails, getScenarios, shareScenario } from '../../../api/request'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../../planSelectionScreen/reducer/planSelectionSlice'
import CustomSpin from '../../../../../common/components/CustomSpin'
import { mainHtmlGeneratorForSingleDetails } from '../../../utils/generateHtmlTable'
import {
  setAllScenarios,
  setBouncePropagation,
  setDisplayedScenarios,
  setOriginalAllScenarios,
  setSeletectedIds,
} from '../../../reducer/scenarioSlice'
import { sortByFirstName } from '../../../utils/Allscenarios'

const ShareScenarioModal = ({ item, ModalOpen, setModalOpen, userName, emailId, clientId, userId }) => {
  const [mailIdsData, setMailIdsData] = useState([])
  const [mailIdsDataCached, setMailIdsDataCached] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [showAllChecked, setShowAllChecked] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const { bouncePropagation, selectedIds } = useSelector(({ scenarios }) => scenarios)
  const dispatch = useDispatch()
  const shareMail = async () => {
    setLoading1(true)
    let obj1 = {
      clientId: clientId,
      scenarioId: item?.ScenarioId,
    }
    try {
      let result = await getScenarioDetails(obj1)
      if (result.success) {
        const html1 = await mainHtmlGeneratorForSingleDetails(item?.ScenarioId, result?.data)
        let obj = {
          userName,
          userEmailId: emailId,
          receiverEmailId: selectedData?.map((data) => data.email)?.toString(),
          htmlString: html1,
        }

        try {
          result = await shareScenario(obj)
          if (result.success) {
            setLoading1(false)
            openNotification('Scenario Shared Successfully!', 'success')
            dispatch(setBouncePropagation(bouncePropagation + 1))
            setModalOpen(false)
          } else {
            dispatch(setLoading1(false))
            dispatch(setLoading(false))
          }
        } catch (error) {
          setLoading1(false)
          dispatch(setLoading(false))
          openNotification(error?.response?.data?.data?.message, 'error')
        }
      } else {
        console.error('Error in getScenarioDetails:', result.error)
        setLoading1(false)
      }
    } catch (error) {
      const response = await getScenarios({
        clientId: clientId,
        createdBy: emailId,
      })
      const data = response?.data?.scenario
      const validSelectedIds = selectedIds.filter((selectedId) => data.some((scenario) => scenario.ScenarioId === selectedId))

      dispatch(setOriginalAllScenarios(data))
      dispatch(setAllScenarios(data))
      dispatch(setDisplayedScenarios(data))
      dispatch(setSeletectedIds(validSelectedIds))
      openNotification(error?.response?.data?.data?.message, 'error')
      dispatch(setBouncePropagation(bouncePropagation + 1))
      setModalOpen(false)
      setLoading1(false)
      console.error('Error calling getScenarioDetails:', error)
    }
  }

  const getMailIdsData = async () => {
    setLoading1(true)
    try {
      let result = await getEmailIdForShareScenario({
        clientId,
        userId,
      })
      if (result.success) {
        const sortedData = sortByFirstName(result.data)
        setMailIdsData(sortedData)
        setMailIdsDataCached(sortedData)
      }
      setLoading1(false)
    } catch (error) {
      setLoading1(false)
      openNotification(error?.response?.data?.data?.message || 'Error', 'error')
    }
  }
  useEffect(() => {
    getMailIdsData()
  }, [])
  useEffect(() => {
    if (mailIdsData?.length > 0 && selectedData?.length > 0) {
      let isNotPresent = []
      mailIdsData?.forEach((mailId) => {
        if (selectedData?.findIndex((data) => data.email === mailId.email) === -1) {
          isNotPresent.push(mailId)
        }
      })
      setShowAllChecked(isNotPresent?.length > 0 ? false : true)
    } else {
      setShowAllChecked(false)
    }
  }, [selectedData, mailIdsData])
  return (
    <CustomModal
      footer={null}
      isModalOpen={ModalOpen}
      showModal={() => setModalOpen(true)}
      handleOk={() => {
        dispatch(setBouncePropagation(bouncePropagation + 1))
        setModalOpen(false)
      }}
      handleCancel={() => {
        dispatch(setBouncePropagation(bouncePropagation + 1))
        setModalOpen(false)
      }}
      width="640px"
    >
      <ShareScenarioTitle setModalOpen={setModalOpen} />
      <div className="flex mb-[8px]">
        <Input
          placeholder="Search by name or email"
          className="w-[46%] items-center h-[32px] pt-[10px] pb-[10px] px-2 border border-[#DDDDDC]"
          style={{
            flex: '1 1 46%',
            borderRadius: '4px',
          }}
          onChange={({ target: { value } }) => {
            if (value) {
              setMailIdsData(
                mailIdsData?.filter(
                  (id) =>
                    id?.email?.toLowerCase().includes(value?.toLowerCase()) ||
                    id?.firstName?.toLowerCase().includes(value.toLowerCase()) ||
                    id?.lastName?.toLowerCase().includes(value.toLowerCase())
                )
              )
            } else {
              setMailIdsData(mailIdsDataCached)
            }
          }}
        />
        {/* <div className="pt-[7.5px] pb-[7.5px] pr-[8px] pl-[8px] border border-[#DDDDDC]">
          <button className="text-sm font-normal tracking-[0.7px] leading-[20px] text-[#5C276E]">
            <SearchGlass width={20} height={20} />
            Search
          </button>
        </div> */}
      </div>
      <div className="w-full bg-white z-10 flex item-center px-[4px] pb-[6px] pt-[8px] text-[11px] border-b font-normal tracking-[0.55px] text-[#7D7D7D]">
        <div className="flex items-center gap-x-2" style={{ flex: '1 1 40%' }}>
          <Checkbox
            checked={showAllChecked}
            onChange={({ target: { checked } }) => {
              if (checked) {
                setSelectedData([...mailIdsData])
              } else {
                setSelectedData([])
              }
            }}
          />
          NAME
          <div className="flex flex-col">
            <button
              type="button"
              className="h-[10px] flex justify-center items-center"
              onClick={() => {
                setMailIdsData([
                  ...mailIdsData
                    ?.sort((a, b) =>
                      a.firstName.toLowerCase() > b.firstName.toLowerCase()
                        ? 1
                        : b.firstName.toLowerCase() > a.firstName.toLowerCase()
                        ? -1
                        : 0
                    )
                    ?.reverse(),
                ])
              }}
            >
              <SortUp />
            </button>
            <button
              type="button"
              className="h-[10px] flex justify-center items-center"
              onClick={() => {
                setMailIdsData([
                  ...mailIdsData?.sort((a, b) =>
                    a.firstName.toLowerCase() > b.firstName.toLowerCase()
                      ? 1
                      : b.firstName.toLowerCase() > a.firstName.toLowerCase()
                      ? -1
                      : 0
                  ),
                ])
              }}
            >
              <SortDown />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-x-2 pl-2 w-[63px]" style={{ flex: '1 1 60%' }}>
          EMAIL
          <div className="flex flex-col">
            <button
              type="button"
              className="h-[10px] flex justify-center items-center"
              onClick={() => {
                setMailIdsData([
                  ...mailIdsData
                    ?.sort((a, b) =>
                      a.email.toLowerCase() > b.email.toLowerCase() ? 1 : b.email.toLowerCase() > a.email.toLowerCase() ? -1 : 0
                    )
                    ?.reverse(),
                ])
              }}
            >
              <SortUp />
            </button>
            <button
              type="button"
              className="h-[10px] flex justify-center items-center"
              onClick={() => {
                setMailIdsData([
                  ...mailIdsData?.sort((a, b) =>
                    a.email.toLowerCase() > b.email.toLowerCase() ? 1 : b.email.toLowerCase() > a.email.toLowerCase() ? -1 : 0
                  ),
                ])
              }}
            >
              <SortDown />
            </button>
          </div>
        </div>
      </div>
      <div className="h-[228px] overflow-y-auto overflow-x-hidden">
        {loading1 && <CustomSpin size={'large'} />}

        {mailIdsData?.length > 0 ? (
          mailIdsData?.map((item, i) => (
            <div
              key={i}
              className="w-full bg-white z-10 h-[32px] flex px-[4px] py-[6px] item-center text-[13px] border-b font-normal tracking-[0.65px] text-[#333]"
            >
              <div className="flex items-center gap-x-2" style={{ flex: '1 1 40%' }}>
                <Checkbox
                  checked={selectedData?.findIndex((data) => data.email === item.email) !== -1}
                  onChange={({ target: { checked } }) => {
                    if (checked) {
                      if (selectedData?.findIndex((data) => data.email === item.email) === -1) {
                        setSelectedData([...selectedData, item])
                      }
                    } else {
                      setSelectedData(selectedData?.filter((data) => data?.email !== item?.email))
                    }
                  }}
                />
                {item?.firstName} {item?.lastName}
              </div>
              <div className="flex items-center gap-x-3 pl-2 w-[63px]" style={{ flex: '1 1 60%' }}>
                {item?.email}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center"> No Matching Emails! </div>
        )}
      </div>
      <ShareScenarioFooter selectedData={selectedData} shareMail={shareMail} setModalOpen={setModalOpen} />
    </CustomModal>
  )
}
export default React.memo(ShareScenarioModal)
