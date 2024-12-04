import React from 'react'
import { Infoicon } from '../../../../common/images/icons'
import { useSelector } from 'react-redux'
import { Tooltip } from 'antd'

const Title = () => {
  const { selectedIds } = useSelector(({ scenarios }) => scenarios)
  const uniqueSelectedIds = Array.from(new Set(selectedIds))

  const message =
    uniqueSelectedIds.length === 0
      ? 'No scenario selected'
      : uniqueSelectedIds.length === 1
      ? '1 scenario selected'
      : `${uniqueSelectedIds.length} scenarios selected`
  return (
    <div className="w-full my-2 px-8 flex items-center gap-x-2 h-[32px] flex-wrap">
      <div
        style={{ fontSize: '18px', fontWeight: '600', fontStyle: 'normal', letterSpacing: '1px', lineHeight: 'normal', color: '#5C5C5C' }}
      >
        Benefit Simulator
      </div>
      <Tooltip
        title={
          <div className="flex flex-col w-full px-4 pb-4">
            {/* <p style={{ color: 'white' }} className="pt-4 pb-2 text-lg italic">
                  Significant Benefits have significant evidence of correlation to the change in enrollment.
                </p> */}
            <p style={{ fontSize: '15px' }} className="text-white">
              A powerful real time tool which can be used to understand the impact of significant benefit costs (or coverages) on
              enrollment. The enrollment predicted considers the overall benefit design of the modified plan and compares with competitor
              offerings to provide the predicted enrollment. The tool works in simple steps - create a scenario, pick the plan(s) that you
              want to modify and then edit the benefits to run the simulation. The result screen can be used to compare scenarios or revisit
              it a later stage for final design.
            </p>
            <p style={{ fontSize: '15px' }} className="text-white">
              <strong>Note : </strong> Scenarios simulated and saved prior to 29th March , 2024 will show Post - AEP Enrollment , Simulated
              Post - AEP Enrollment and Simulated Change From Post - AEP Enrollment values from Jan 2024.
            </p>
          </div>
        }
        placement="top"
        overlayStyle={{ maxWidth: 400 }}
      >
        <div style={{ cursor: 'pointer' }}>
          <Infoicon width={24} height={24} />
        </div>
      </Tooltip>
      <div
        style={{
          flex: 1,
          textAlign: 'right',
          fontSize: '13px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '20px',
          letterSpacing: '0.65px',
          color: '#7D7D7D',
        }}
      >
        {message}
      </div>
    </div>
  )
}

export default React.memo(Title)
