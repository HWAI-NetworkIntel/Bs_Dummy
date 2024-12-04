import { Switch } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToErrorBenefitNamesList,
  handleBenefits,
  removeBenefitValueHandler,
  removeEhcValues,
  removeFromErrorBenefitNamesList,
  restoreEhcValues,
} from '../../../../reducer/BenefitsSlice'
import DataTypeMapper from './DataTypeMapper'

const ToggleBar = ({ item }) => {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const { benefits, selectedBidId } = useSelector((state) => state.benefits)
  const [listOfInputs, setListOfInputs] = useState([])
  const [isChecked, setIsChecked] = useState(benefits[selectedBidId][item.benefitOrder]?.currentValue === 'Yes' ? true : false)
  const [additionalEhcNo, setAdditionalEhcNo] = useState(0)
  const childContent = useCallback(() => {
    if (item.benefitDescription?.includes('unlimited')) {
      if (!isChecked) {
        return (
          <div className="flex flex-col w-full gap-4">
            {item.child?.map((el, i) => (
              <DataTypeMapper item={el} key={i} />
            ))}
          </div>
        )
      }
    } else {
      if (isChecked) {
        return (
          <div className="flex flex-wrap w-full gap-2 ">
            {item.child?.map((el, i) => (
              <DataTypeMapper item={el} key={i} />
            ))}
          </div>
        )
      }
    }
  }, [isChecked])
  const restoreVisitFields = (obj) => {
    dispatch(handleBenefits({ bidId: selectedBidId, index: obj.benefitOrder, value: '' }))
    if (obj.child?.length > 0) {
      obj.child?.forEach((el) => {
        dispatch(handleBenefits({ bidId: selectedBidId, index: el.benefitOrder, value: '' }))
      })
    }
  }
  const handlerEhcValues = (listToHandle) => {
    listToHandle?.forEach((element) => {
      let copayCoinsList = [...element.items?.filter((item) => item.benefitDataType !== 'Boolean' && item.benefitDataType !== 'Drop')]
      let otherList = [...element.items?.filter((item) => item.benefitDataType === 'Boolean' || item.benefitDataType === 'Drop')]
      if (isChecked === false) {
        if (item.currentValue === 'No') {
          copayCoinsList.forEach((obj, i) => {
            dispatch(handleBenefits({ bidId: selectedBidId, index: obj.benefitOrder, value: '' }))
            if (i === 0 || i === 2) {
              if (obj?.dependentOnEhc !== 0) {
                dispatch(
                  restoreEhcValues({
                    bidId: selectedBidId,
                    id: obj?.dependentOnEhc,
                    values: [obj?.orderOfEhc],
                    bidId: selectedBidId,
                  })
                )
              }
            }
          })
          if (copayCoinsList[0].dependentOnAdditionalEhc !== 0) {
            dispatch(
              restoreEhcValues({
                bidId: selectedBidId,
                id: copayCoinsList[0].dependentOnAdditionalEhc,
                values: [copayCoinsList[0].additionalEhcOrder],
              })
            )
          }
        } else {
          copayCoinsList.forEach((obj, i) => {
            dispatch(removeBenefitValueHandler({ bidId: selectedBidId, value: obj.benefitOrder }))
            if (i === 0 || i === 2) {
              if (obj?.dependentOnEhc !== 0) {
                dispatch(
                  removeEhcValues({
                    bidId: selectedBidId,
                    id: obj?.dependentOnEhc,
                    values: [obj?.orderOfEhc],
                  })
                )
              }
            }
          })
          if (copayCoinsList[0].dependentOnAdditionalEhc !== 0) {
            dispatch(
              removeEhcValues({
                bidId: selectedBidId,
                id: copayCoinsList[0].dependentOnAdditionalEhc,
                values: [copayCoinsList[0].additionalEhcOrder],
              })
            )
          }
        }
        if (otherList?.length > 0) {
          otherList?.forEach((visitObj) => {
            restoreVisitFields(visitObj)
          })
        }
      } else {
        copayCoinsList.forEach((obj, i) => {
          dispatch(
            handleBenefits({ bidId: selectedBidId, index: obj.benefitOrder, value: benefits[selectedBidId][obj.benefitOrder]?.currentValue })
          )
          if (i === 0 || i === 2) {
            if (obj?.dependentOnEhc !== 0) {
              dispatch(
                restoreEhcValues({
                  bidId: selectedBidId,
                  id: obj?.dependentOnEhc,
                  values: [obj?.orderOfEhc],
                  bidId: selectedBidId,
                })
              )
            }
          }
        })
        if (copayCoinsList[0].dependentOnAdditionalEhc !== 0) {
          dispatch(
            restoreEhcValues({
              bidId: selectedBidId,
              id: copayCoinsList[0].dependentOnAdditionalEhc,
              values: [copayCoinsList[0].additionalEhcOrder],
            })
          )
        }
      }
    })
  }
  const handleErrorCaseForEhc = useCallback(
    (itemNo) => {
      if (isChecked) {
        let listOfBinaryCodes = [...benefits[selectedBidId][itemNo]?.currentValue.split('')]
        if (listOfBinaryCodes?.includes('1')) {
          dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
        } else {
          dispatch(addToErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
        }
      } else {
        dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
        item?.child?.forEach((childItemSub, i) => {
          dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}${i}`))
        })
      }
    },
    [benefits]
  )
  const handleErrorCaseForUnlimited = useCallback(() => {
    if (!isChecked) {
      let index = item.child?.findIndex((el) => benefits[selectedBidId][el.benefitOrder]?.currentValue === '')
      if (index !== -1) {
        dispatch(addToErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      } else {
        dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      }
    } else {
      dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
    }
  }, [benefits])
  useEffect(() => {
    setCount(0)
  }, [])
  useEffect(() => {
    if (!item.benefitDescription?.includes('unlimited')) {
      let listToHandle = item.child?.filter((el) => el.hasOwnProperty('title'))
      if (listToHandle?.length > 0) {
        let copayCoinsList = [
          ...listToHandle[0].items?.filter((item) => item.benefitDataType !== 'Boolean' && item.benefitDataType !== 'Drop'),
        ]
        if (copayCoinsList[0].dependentOnAdditionalEhc !== 0) {
          setAdditionalEhcNo(copayCoinsList[0].dependentOnAdditionalEhc)
        } else {
          let listOfAllInput = []
          item.child?.forEach((el) => {
            el.items?.forEach((obj) => {
              if (
                obj.benefitDataType === 'String_NC_Percentage' ||
                obj.benefitDataType === 'String_NC_Money' ||
                obj.benefitDataType === 'Percentage' ||
                obj.benefitDataType === 'Money'
              ) {
                listOfAllInput.push(obj)
              }
            })
          })
          setListOfInputs(listOfAllInput)
        }
      }
    }
  }, [])
  const handleErrorCaseForNonOptional = useCallback(() => {
    if (isChecked) {
      let i = listOfInputs?.findIndex(
        (element) => benefits[selectedBidId][element.benefitOrder].currentValue !== benefits[selectedBidId][element.benefitOrder].currentValue
      )
      if (i !== -1) {
        dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
      } else {
        let ii = listOfInputs?.findIndex(
          (element) =>
            benefits[selectedBidId][element.benefitOrder].currentValue !== '' &&
            !benefits[selectedBidId][element.benefitOrder].currentValue.includes('NC')
        )
        if (ii !== -1) {
          dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
        } else {
          dispatch(addToErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
        }
      }
    } else {
      dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
    }
  }, [benefits])
  useEffect(() => {
    if (item.benefitDescription?.includes('unlimited')) {
      handleErrorCaseForUnlimited()
    } else {
      if (additionalEhcNo !== 0) {
        handleErrorCaseForEhc(additionalEhcNo)
      } else {
        if (listOfInputs?.length > 0) {
          handleErrorCaseForNonOptional()
        }
      }
    }
    // return () => {
    //   dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}`))
    //   dispatch(removeFromErrorBenefitNamesList(`${item.benefitGroup}-${item.benefitOrder}m`))
    // }
  }, [benefits])
  useEffect(() => {
    if (!item.benefitDescription?.includes('unlimited')) {
      let listToHandle = item.child?.filter((el) => el.hasOwnProperty('title'))
      if (listToHandle?.length > 0) {
        (count !== 0) && handlerEhcValues(listToHandle)
      }
    }
  }, [isChecked])

  const restoreChildValues = (obj) => {
    if (obj.benefitOrder) {
      dispatch(removeFromErrorBenefitNamesList(`${obj.benefitGroup}-${obj.benefitOrder}`))
      dispatch(handleBenefits({ bidId: selectedBidId, index: obj.benefitOrder, value: '' }))
      obj.child?.forEach((subchild) => {
        restoreChildValues(subchild)
      })
    }
  }
  useEffect(() => {
    if (!isChecked) {
      if (item.benefitGroup === 'Transportation (b10b)' && item.dependentOnBenefitOrder === 0) {
        restoreChildValues(item)
      }
    }
  }, [isChecked])
  return (
    <div className="w-full flex flex-wrap gap-x-4 gap-y-2">
      <div className="flex w-full overflow-hidden shadow-cards p-2 justify-between items-center gap-x-10 ">
        <p
          style={{
            // color: `${
            //   benefits[selectedBidId][item.benefitOrder].currentValue !== benefits[selectedBidId][item.benefitOrder].currentValue &&
            //   benefits[selectedBidId][item.benefitOrder].currentValue !== ''
            //     ? '#5C276E'
            //     : ''
            // }`,
          }}
        >
          {' '}
          {item.benefitDescription}{' '}
        </p>
        <Switch
          checkedChildren="Yes"
          unCheckedChildren="No"
          className=" bg-gray-400"
          disabled
          // onChange={(isChecked) => {
          //   setCount(1)
          //   setIsChecked(isChecked)
          //   dispatch(
          //     handleBenefits({
          //       bidId: selectedBidId,
          //       index: item.benefitOrder,
          //       value: isChecked ? 'Yes' : 'No',
          //     })
          //   )
          // }}
          defaultChecked={isChecked}
        />
      </div>
      {childContent()}
    </div>
  )
}
export default React.memo(ToggleBar)
