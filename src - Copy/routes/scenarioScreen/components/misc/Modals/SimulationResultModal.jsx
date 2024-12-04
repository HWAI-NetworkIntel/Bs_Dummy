import React from 'react'
import CustomSpin from '../../../../../common/components/CustomSpin'
import { RESULTS } from '../../../../../common/constants/constants'
import CustomModal from './CustomModal'
import ResultModalTitle from './titles/ResultModalTitle'
import ResultModalFooter from './titles/ResultModalFooter'
import { useDispatch, useSelector } from 'react-redux'
import { setBouncePropagation } from '../../../reducer/scenarioSlice'

const SimulationResultModal = ({ data, OpenResult, setOpenResult, loading, setCard, card, scenarioId }) => {
  const { bouncePropagation } = useSelector(({ scenarios }) => scenarios)
  const dispatch = useDispatch()
  return (
    <CustomModal
      footer={null}
      isModalOpen={OpenResult}
      showModal={() => setOpenResult(true)}
      handleOk={() => {
        dispatch(setBouncePropagation(bouncePropagation + 1))
        setOpenResult(false)
      }}
      handleCancel={() => {
        dispatch(setBouncePropagation(bouncePropagation + 1))
        setOpenResult(false)
      }}
      width="920px"
      closable={false}
    >
      <ResultModalTitle setOpenResult={setOpenResult} />
      <div className="w-full h-full ">
        {loading ? (
          <CustomSpin size={'Large'} />
        ) : (
          <div>
            <div className="flex justify-around gap-x-4 items-center text-xs py-1 font-semibold text-[#7D7D7D] uppercase border-b border-[#7D7D7D]">
              <p className="w-[120px]"> {RESULTS.bidId} </p>
              <p className="w-[130px] text-right">{RESULTS.preAep}</p>
              <p className="w-[130px] text-right">{RESULTS.postAep}</p>
              <p className="w-[130px] text-right">{RESULTS.simulatedPostAep}</p>
              <p className="w-[130px] text-right">{RESULTS.simulatedChangePostAep}</p>
            </div>
            <div className="h-auto overflow-y-auto">
              {data?.map(
                (
                  { bidId, postAEPEnrollment, simulatedResult, preAEPEnrollment, simulatedPostAEPDifference, simulatedPreAEPDifference },
                  index
                ) => (
                  <div key={index} className="h-9 flex justify-around gap-x-4 items-center border-b border-[#E9E8E8] text-[#333] text-sm">
                    <p className="w-[122px]">{bidId}</p>
                    <p className="w-[122px] text-right">{new Intl.NumberFormat('ja-JP').format(preAEPEnrollment)}</p>
                    <p className="w-[122px] text-right">{new Intl.NumberFormat('ja-JP').format(postAEPEnrollment)}</p>
                    <p className="w-[122px] text-right">{new Intl.NumberFormat('ja-JP').format(simulatedResult)}</p>
                    <p
                      className={`w-[122px] flex justify-end pr-2 items-center ${
                        simulatedPostAEPDifference > 0 ? ' text-green-500' : 'text-red-500'
                      }`}
                    >
                      {simulatedPostAEPDifference > 0 ? '+' : ''} {new Intl.NumberFormat('ja-JP').format(simulatedPostAEPDifference)}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
      <ResultModalFooter setOpenResult={setOpenResult} setCard={setCard} card={card} data={data} scenarioId={scenarioId} />
    </CustomModal>
  )
}

export default React.memo(SimulationResultModal)
