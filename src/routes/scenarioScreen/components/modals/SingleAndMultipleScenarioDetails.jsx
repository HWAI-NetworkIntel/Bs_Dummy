import React from 'react'
import { getModifiedObjectForRendering, mainTitles, rightAlignTitles } from '../../utils/scenarioDetailsAndCompare'

const SingleAndMultipleScenarioDetails = ({ data }) => {
  return (
    <div className="w-full text-sm border border-[#5C276E] h-full overflow-auto">
      {getModifiedObjectForRendering(data).map((item) => (
        <>
          {Object.keys(item)?.map((title, i) => (
            <div className="w-full flex ">
              <div
                className={`min-w-[460px] text-sm  ${mainTitles.includes(title) && 'text-[#7D7D7D] font-semibold'} px-1.5 py-1 border-t ${
                  mainTitles.includes(title) ? 'border-t-[#5C276E]' : ''
                }`}
              >
                {title === 'S NPType' ? 'SNP Type' : title}
              </div>
              <div className={`flex ${item[title].length > 1 ? '' : item[title][0].length > 1 ? '' : ' w-full'} `}>
                {item[title]?.map((arr) => (
                  <div className={`flex ${item[title].length > 1 ? '' : item[title][0].length > 1 ? '' : ' w-full'} `}>
                    <div className="w-[1px] bg-[#5C276E] h-full" />
                    {arr?.map((key) => (
                      <div
                        className={` ${
                          item[title].length > 1 ? 'w-[300px]' : item[title][0].length > 1 ? 'w-[300px]' : 'min-w-[300px] w-full'
                        }  max-h-[108px] overflow-auto border-r ${i === 0 && 'text-[#7D7D7D] font-semibold'}  px-1.5 py-1 border-t  ${
                          mainTitles.includes(title) ? 'border-t-[#5C276E]' : ''
                        } ${rightAlignTitles.includes(title) && key !== 'Not changed' && 'flex justify-end'}`}
                      >
                        {key === 'em' ? '' : key}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ))}
    </div>
  )
}
export default React.memo(SingleAndMultipleScenarioDetails)
