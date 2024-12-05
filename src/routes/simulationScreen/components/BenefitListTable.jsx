import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { individualBenefitMapper, individualBenefitMapperForOldValues } from '../utils/Benefits'
import { CloseIcon, ForwardArrow, Infoicon, SelectAllIcon } from '../../../common/images/icons'
import { Tooltip } from 'antd'
import {
  handleBenefits,
  setBenefitInfoBoxLoader,
  setBenefitNameButtonClicked,
  setBenefitVisible,
  setChangedColorItems,
  setEmptyBenefitInfoBox,
} from '../reducer/BenefitsSlice'
import { openNotification } from '../../planSelectionScreen/components/misc/Notification'
import { THIRD_SCREEN } from '../../../common/constants/constants'
import CustomSpin from '../../../common/components/CustomSpin'
import { colorItems } from '../utils/ColorItems'
import CustomModal from '../../scenarioScreen/components/misc/Modals/CustomModal'
import { changeToOriginal } from '../utils/changeToOriginal'
import showOriginalImg from '../../../common/images/visibility.svg'
import restoreImg from '../../../common/images/settings_backup_restore.svg'
import originalTextImg from '../../../common/images/originalText.svg'

const BenefitListTable = () => {
  const [showPopUp, setShowPopUp] = useState()
  const {
    selectedBidId,
    benefits,
    errorBenefitNameList,
    listOfBidIds,
    significantBenefitList,
    modifiedBenefits,
    benefitVisible,
    benefitNameButtonClicked,
    emptyBenefitInfoBox,
    benefitInfoBoxLoader,
    changedColorItems,
  } = useSelector(({ benefits }) => benefits)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setBenefitInfoBoxLoader(false))
    dispatch(setEmptyBenefitInfoBox(false))
  }, [emptyBenefitInfoBox])
  useEffect(() => {
    if (Object.keys(modifiedBenefits[selectedBidId] || {})?.length > 0) {
      dispatch(setEmptyBenefitInfoBox(true))
      dispatch(setBenefitVisible(Object.keys(modifiedBenefits[selectedBidId] || {})?.[0]))
    }
  }, [modifiedBenefits, selectedBidId])
  const handleSelectAll = (onlyBooleanResultRequired) => {
    let listOfBenefitOrder = []
    significantBenefitList[selectedBidId]?.forEach((element) => {
      if (element.benefitGroup === benefitVisible) {
        listOfBenefitOrder.push(element.benefitOrder)
      }
    })
    let isItPresentInAllBidId = true
    if (isItPresentInAllBidId) {
      Object.keys(significantBenefitList)?.forEach((key) => {
        if (key !== selectedBidId) {
          if (isItPresentInAllBidId) {
            listOfBenefitOrder?.forEach((no) => {
              let i = significantBenefitList[key]?.findIndex((item) => item.benefitOrder === no)
              if (i === -1) {
                isItPresentInAllBidId = false
              }
            })
          }
        }
      })
    }
    if (onlyBooleanResultRequired) {
      return !isItPresentInAllBidId
    } else {
      return { isItPresentInAllBidId, listOfBenefitOrder, bidIdsList: Object.keys(significantBenefitList) }
    }
  }
  useEffect(() => {
    let result = colorItems(benefits)
    dispatch(setChangedColorItems(result))
  }, [benefits])

  return (
    <div className="w-full py-2 px-8 flex items-center overflow-hidden">
      <div style={{ flex: '1 1 30%' }} className="w-full rounded-l border-r h-full shadow-cards overflow-y-auto">
        <div className="h-9 w-full pl-2 gap-x-2 flex items-center text-xs font-semibold text-[#7D7D7D] border-b border-[#E9E8E8]">
          {THIRD_SCREEN.benefitGroups}
          <Tooltip
            title={
              <div className="flex flex-col w-full px-4 pb-4">
                {/* <p style={{ color: 'white' }} className="pt-4 pb-2 text-lg italic">
                  Significant Benefits have significant evidence of correlation to the change in enrollment.
                </p> */}
                <p style={{ fontSize: '15px' }} className="text-white">
                  Significant Benefits have significant evidence of correlation to the change in enrollment. These benefits can give you a
                  lift in the market if offered well - also keeping an eye on competitor plan offerings. However, please note that the
                  changed benefits have interactions with others benefits - so just changing one benefit in silo will not always give you a
                  growth/decline.
                </p>
              </div>
            }
            placement="top"
            overlayStyle={{ maxWidth: 400 }}
          >
            <div>
              <Infoicon width={24} height={24} />
            </div>
          </Tooltip>
        </div>
        {console.log("modifiedBenefits",modifiedBenefits)}
        {(() => {
  const allBenefits = Object.keys(modifiedBenefits[selectedBidId] || {});

  // Extract first 10 benefits for Foundational
  const foundationalBenefits = allBenefits.slice(0, 10).map((benefitName) => ({
    name: benefitName,
    suffix: " - Foundational",
  }));

  // Remaining benefits for Utility
  const utilityBenefits = allBenefits.slice(10).map((benefitName) => ({
    name: benefitName,
    suffix: " - Utility",
  }));

  // Combine Foundational and Utility benefits for display
  const displayBenefits = [...foundationalBenefits, ...utilityBenefits];

  return displayBenefits.map(({ name, suffix }) => {
    const addGap = Math.random() > 0.5; // Random gap addition logic

    return (
      <React.Fragment key={name}>
        <button
          type="button"
          id={name}
          onClick={() => {
            if (benefitVisible !== name) {
              if (benefitVisible) {
                dispatch(setBenefitInfoBoxLoader(true));
                dispatch(
                  setBenefitNameButtonClicked({
                    clicked: !benefitNameButtonClicked.clicked,
                    name,
                  })
                );
              } else {
                dispatch(setEmptyBenefitInfoBox(true));
                dispatch(setBenefitVisible(name));
              }
            }
          }}
          className={`h-9 w-full pl-2 flex gap-x-1 items-center justify-between text-[13px] text-[#333] border-b border-[#E9E8E8] ${
            benefitVisible === name && "bg-[#dbdbdb]"
          }`}
        >
          <p
            className={`flex text-left ${
              changedColorItems[selectedBidId]?.includes(name)
                ? "text-xs font-semibold"
                : ""
            }`}
          >
            {`${name}${suffix}`} {/* Add suffix */}
          </p>
          <div className="w-5">
            <ForwardArrow />
          </div>
        </button>
        {addGap && <div className="h-4" />} {/* Add a gap randomly */}
      </React.Fragment>
    );
  });
})()}
      </div>
      <div style={{ flex: '1 1 65%' }} className="w-full rounded-r h-full shadow-cards border-l-0 overflow-y-auto">
        <div className="h-9 w-full pl-2 gap-x-2 flex items-center text-xs font-semibold text-[#7D7D7D] border-b border-[#E9E8E8] relative">
          {THIRD_SCREEN.description}
          {listOfBidIds?.length > 1 && (
            <button
              onClick={() => {
                if (errorBenefitNameList?.length < 1) {
                  let { isItPresentInAllBidId, listOfBenefitOrder, bidIdsList } = handleSelectAll(false)
                  if (isItPresentInAllBidId) {
                    bidIdsList?.forEach((key) => {
                      if (key !== selectedBidId) {
                        listOfBenefitOrder?.forEach((uniqueNo) => {
                          dispatch(
                            handleBenefits({
                              bidId: key,
                              index: uniqueNo,
                              value: benefits[selectedBidId]?.[uniqueNo]?.newValue,
                            })
                          )
                        })
                      }
                    })
                  }
                  openNotification(THIRD_SCREEN.appliedToAll, 'success')
                } else {
                  openNotification(THIRD_SCREEN.incompleteDetails, 'error')
                }
              }}
              disabled={handleSelectAll(true)}
              type="button"
              className="rounded active:scale-105 active:shadow-sm disabled:scale-100 disabled:opacity-60 border border-[#DDDDDC] h-7 flex justify-center items-center gap-x-1 p-[0.5rem]"
            >
              <SelectAllIcon />
              <p className="text-[#5C5C5C]">Apply to All Plans</p>
            </button>
          )}
          <div className='flex items-center gap-x-2 absolute right-4'>
            <button type='button'
              onClick={() => {
                let result = changeToOriginal(significantBenefitList[selectedBidId], benefitVisible)
                result?.forEach((idOfItem) => {
                  dispatch(
                    handleBenefits({
                      bidId: selectedBidId,
                      index: idOfItem,
                      value: benefits[selectedBidId]?.[idOfItem]?.currentValue,
                    })
                  )
                })
                dispatch(setEmptyBenefitInfoBox(true))
              }}
              className='flex items-center gap-x-1'>
              <img src={restoreImg} alt="restore" srcset="" />
              <div
                className='text-[#5C276E] text-[13px]'
              >Restore Original</div>
            </button>
            <div className='h-[21px] m-x-1 w-[1px] bg-[#E9E8E8]'></div>
            <button type='button' onClick={() => setShowPopUp(!showPopUp)} className='flex items-center gap-x-1'>
              <img src={showOriginalImg} alt="" srcset="" />
              <div className='text-[#5C276E] text-[13px]' >See Original</div>
            </button>
          </div>
        </div>
        <div className="w-full relative">
          {benefitInfoBoxLoader && <CustomSpin size={'Large'} />}
          <CustomModal
            width="1116px"
            isModalOpen={showPopUp}
            showModal={() => setShowPopUp(true)}
            handleOk={() => setShowPopUp(false)}
            handleCancel={() => setShowPopUp(false)}
            footer={null}
            closable={false}
          >
            <div className='h-[500px] w-full flex flex-col justify-between'>
              <div className=''>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-x-2 pb-2'>
                    <p className='pl-2.5 text-base font-bold text-[#5C5C5C]'> {benefitVisible} </p>
                    <img src={originalTextImg} alt="restore" srcset="" />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPopUp(false)
                    }}
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className='h-[400px] overflow-auto'>
                  {individualBenefitMapperForOldValues(
                    modifiedBenefits[selectedBidId]?.[benefitVisible]?.subBenefits,
                    modifiedBenefits[selectedBidId]?.[benefitVisible]?.uiType
                  )}
                </div>
              </div>
              <div className='flex justify-between items-center py-1'>
                <button type='button' onClick={() => {
                  let result = changeToOriginal(significantBenefitList[selectedBidId], benefitVisible)
                  result?.forEach((idOfItem) => {
                    dispatch(
                      handleBenefits({
                        bidId: selectedBidId,
                        index: idOfItem,
                        value: benefits[selectedBidId]?.[idOfItem]?.currentValue,
                      })
                    )
                  })
                  dispatch(setEmptyBenefitInfoBox(true))
                  setShowPopUp(false)
                }} className='pl-2.5 text-[#7D528B] font-semibold text-[13px]'>Restore Original</button>
                <button type='button'
                  onClick={() => {
                    setShowPopUp(false)
                  }}
                  className='w-[60px] mr-2 h-[26px] text-[#7D528B] font-semibold text-[13px] flex justify-center items-center border border-[#E9E8E8]'
                >
                  <p>Close</p>

                </button>
              </div>
            </div>
          </CustomModal>
          {emptyBenefitInfoBox
            ? ''
            : individualBenefitMapper(
              modifiedBenefits[selectedBidId]?.[benefitVisible]?.subBenefits,
              modifiedBenefits[selectedBidId]?.[benefitVisible]?.uiType
            )}
        </div>
      </div>
    </div>
  )
}
export default React.memo(BenefitListTable)
