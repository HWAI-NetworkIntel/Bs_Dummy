import { Checkbox, Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { DetailsIcon } from '../../../../../common/images/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setSeletectedIds } from '../../../reducer/scenarioSlice'
import BidIdDropDown from '../../misc/BidIdDropDown'
import { EditFilled } from '@ant-design/icons'
import CustomModal from '../../misc/Modals/CustomModal'
import EditScenario from '../../misc/ScenarioManagement/Edition/EditScenario'
import ScenarioDetails from '../../misc/ScenarioDetails/ScenarioDetails'
import { formatDate, getStatusAndAction } from '../../../utils/Allscenarios'
import { customTooltip } from '../../misc/Modals/titles/customTooltip'

const AllScenarios = ({ item, email, ClientId, userid, card, setCard, userName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { selectedIds } = useSelector(({ scenarios }) => scenarios)
  const detailsIconButtonRef = useRef(null)
  const SingleBid = item?.BidId ? Object.keys(item.BidId).length === 1 : true

  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useDispatch()
  const { statusIcon, action } = getStatusAndAction(item)
  const firstKey = item?.BidId ? Object.keys(item.BidId)[0] : null
  const innerObject = firstKey ? item.BidId[firstKey] : null
  const newResult = item?.BidId ? (({ [firstKey]: _, ...rest }) => rest)(item.BidId) : null

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (card !== 0 && detailsIconButtonRef.current && !detailsIconButtonRef.current.contains(event.target)) {
        setCard(0)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }


  }, [card, setCard])

  console.log("action={action}",item?.CreatedBy === email)
  return (
    <div>
      <div className="w-full top-0 h-[36px] bg-white z-10 text-[13px] font-normal tracking-[0.55px] text-[#333] item-center flex item-center pr-3">
        <Checkbox
          checked={selectedIds.includes(item?.ScenarioId)}
          className="flex items-center pb-1 pl-[8px]"
          onChange={({ target: { checked } }) => {
            if (checked) {
              dispatch(setSeletectedIds([...selectedIds, item?.ScenarioId]))
            } else {
              dispatch(setSeletectedIds(selectedIds?.filter((key) => key !== item?.ScenarioId)))
            }
          }}
        />
        <div className="flex items-center gap-x-3 pl-2 w-[54px]">{item?.ScenarioId}</div>
        <div
          className="flex pl-2 items-center"
          style={{ flex: '1 1 8.3%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Tooltip title={customTooltip(item?.ScenarioName, item?.Description)} overlayStyle={{ width: '200px' }}>
            <div style={{ maxWidth: '165px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {item?.ScenarioName}
            </div>
          </Tooltip>
          {isHovered && (
            <button onClick={() => setIsModalOpen(true)}>
              <EditFilled />
            </button>
          )}
          <CustomModal
            footer={null}
            width="460px"
            isModalOpen={isModalOpen}
            showModal={() => setIsModalOpen(true)}
            handleOk={() => setIsModalOpen(false)}
            handleCancel={() => setIsModalOpen(false)}
          >
            <EditScenario
              item={item}
              email={email}
              userid={userid}
              clientid={ClientId}
              handleCancel={() => setIsModalOpen(false)}
              scenarioId={item?.ScenarioId}
              setIsModalOpen={setIsModalOpen}
            />
          </CustomModal>
        </div>
        <div
          className="flex pl-1 items-center gap-x-3 "
          style={{ flex: '1 1 1.3%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          {formatDate(item?.ModifiedDate)}
        </div>
        <div
          className="flex pl-1 items-center gap-x-3 "
          style={{
            flex: '1 1 0.5%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          <Tooltip title={item?.CreatedBy}>
            <div style={{ maxWidth: '87px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item?.CreatedBy}</div>
          </Tooltip>
        </div>
        <div
          className="flex pl-4 items-center gap-x-3 "
          style={{ flex: '1 1 2%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          {item?.BidId ? Object.keys(item.BidId)[0] : null}{' '}
        </div>
        <div
          className="flex items-center ellipsis justify-end gap-x-3 "
          style={{ flex: '1 1 3%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          {innerObject?.preAEPEnrollment && innerObject?.preAEPEnrollment.toLocaleString('en-US')}
        </div>
        <div
          className="flex pl-2 items-center ellipsis justify-end gap-x-3 "
          style={{ flex: '1 1 4%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          {innerObject?.postAEPEnrollment && innerObject?.postAEPEnrollment.toLocaleString('en-US')}
        </div>
        <div
          className="flex pl-1 items-center ellipsis justify-end gap-x-3 "
          style={{ flex: '1 1 5%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          {innerObject?.simulatedResult && innerObject?.simulatedResult.toLocaleString('en-US')}{' '}
        </div>
        <div
          className="flex pl-1 items-center ellipsis justify-end gap-x-3 "
          style={{
            flex: '1 1 7%',
            color:
              innerObject?.simulatedChangeFromPostAEP < 0 ? '#DC3545' : innerObject?.simulatedChangeFromPostAEP > 0 ? '#28A745' : '#DC3545',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {innerObject?.simulatedChangeFromPostAEP && (
            <>
              {innerObject.simulatedChangeFromPostAEP > 0 && '+'}
              {innerObject.simulatedChangeFromPostAEP.toLocaleString('en-US')}
            </>
          )}{' '}
        </div>
        <div
          className={`flex items-center ${action === 'Continue' ? 'gap-x-1' : 'gap-x-3'}`}
          style={{ flex: '1 1 6%', justifyContent: 'end' }}
        >
          <div className="flex items-center ellipsis" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {statusIcon}
          </div>
          <ScenarioDetails action={action} userid={userid} item={item} ClientId={ClientId} email={email} isAllowed = {item?.CreatedBy === email} />
          <div
            onClick={(event) => {
              event.stopPropagation()
              setCard(item?.ScenarioId)
            }}
            ref={detailsIconButtonRef}
            style={{ cursor: 'pointer' }}
          >
            <DetailsIcon userName={userName} card={card} item={item} setCard={setCard} userId={userid} email={email} clientId={ClientId} />
          </div>
        </div>
      </div>
      <div className="border-b">{!SingleBid && <BidIdDropDown data={newResult} />}</div>
    </div>
  )
}
export default React.memo(AllScenarios)
