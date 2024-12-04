// All content, trademarks, and data on this document are the property of Healthworks Analytics, LLC and are protected by applicable intellectual property laws. Unauthorized use, reproduction, or distribution of this material is strictly prohibited.
import React, { useState } from "react";
import more_vert from "../../assets/icons/more_vert.svg";
import { Checkbox, Tooltip } from "antd";
import { PanelDown, PanelUp, SortDown, SortUp } from "../../assets/iconstecxt/icons";



function ScenarioList(props) {
    const [barChartOpen, setBarChartOpen] = useState([]);
    const [isActivePanel, setIsActivePanel] = useState(null)

    const dataSource = [
        {
           
            scenarioName: "AZ_expansion",
            networkType: "Existing",
            createdDate: "Nov 22, 2024",
            createdBy: "rajeev.ranjan@healthworksai.com",
            state: "Arizona",
            county: "Gila, Maricopa",
           
        },
        {
            
            scenarioName: "AZ_expansion2",
            networkType: "Existing",
            createdDate: "Nov 24, 2024",
            createdBy: "rajeev.ranjan@healthworksai.com",
            state: "Arizona",
            county: "Gila, Maricopa",
            
        },
    ];

    return (
        <div className="grow shrink basis-0  py-2 border border-[#e9e8e8] flex-col justify-start items-start inline-flex">
            <div className="self-stretch justify-start items-center inline-flex">
                <div className="w-[7%] h-[42px] p-2 justify-center text-center items-center flex">
                    {/* <div className="text-[#7d7d7d] text-[11px]  font-semibold font-['Roboto'] uppercase leading-none tracking-wide">
                        Id
                    </div> */}
                </div>
                <div className="w-[15%] h-[42px] p-2 justify-between items-center flex">
                    <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">
                        Scenario Name
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortUp />
                        </button>
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortDown />
                        </button>
                    </div>
                </div>
                <div className="w-[10%] h-[42px] p-2 justify-between items-center flex">
                    <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">
                        Network Type
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortUp />
                        </button>
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortDown />
                        </button>
                    </div>
                </div>
                <div className="w-[10%] h-[42px] p-2 justify-between items-center flex">
                    <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">
                        Created On
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortUp />
                        </button>
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortDown />
                        </button>
                    </div>
                </div>
                <div className="w-[15%] h-[42px] p-2 justify-between items-center flex">
                    <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">
                        Created By
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortUp />
                        </button>
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortDown />
                        </button>
                    </div>
                </div>
                <div className="w-[10%] h-[42px] p-2 justify-between items-center flex">
                    <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">
                        State
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortUp />
                        </button>
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortDown />
                        </button>
                    </div>
                </div>
                <div className="w-[20%] h-[42px] p-2 justify-between items-center flex">
                    <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">
                        County
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortUp />
                        </button>
                        <button
                            type="button"
                            className="h-[10px] flex justify-center items-center">
                            <SortDown />
                        </button>
                    </div>
                </div>
                <div className="w-[2%] p-2 justify-start items-center flex">
                    
                    <div className="flex flex-col items-center">
                        
                       
                    </div>
                </div>
                <div className="w-[5%] h-[42px] p-2 justify-start items-center gap-4 flex">
                    <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">
                        Action
                    </div>
                </div>
                
            </div>
            <div className="self-stretch h-px bg-[#7d7d7d]" />
            <div className="h-[470px] overflow-auto w-full">
                {dataSource?.length > 0 ? (
                    dataSource.map((item, index) => (
                        <React.Fragment key={item.scenarioName || index}>
                            <div className="self-stretch  pl-1 pr-1 bg-[#f7f7f7] justify-start items-center flex flex-col border border-[#DDDDDc] m-1">
                                {/* Main Row Content */}
                                <div className="w-full flex justify-start items-center">
                                    <div className="w-[7%] p-2 flex-col justify-start items-start inline-flex">
                                        <div className="text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide">
                                            <Checkbox id={item.scenarioName}></Checkbox>
                                            <span className="pl-2">{}</span>
                                        </div>
                                    </div>
                                    <div className="w-[15%] p-2 flex-col justify-start items-start inline-flex">
                                        <div className="self-stretch text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide">
                                            {item.scenarioName}
                                        </div>
                                    </div>
                                    <div className="w-[10%] p-2 flex-col justify-start items-start gap-1 inline-flex">
                                        <div className="self-stretch text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide">
                                            {item.networkType}
                                        </div>
                                    </div>
                                    <div className="w-[8%] p-2 flex-col justify-start items-start gap-1 inline-flex">
                                        <div className="self-stretch text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide">
                                            {item.createdDate}
                                        </div>
                                    </div>
                                    <div className="w-[17%]  p-2 flex-col justify-start items-start gap-1 inline-flex">
                                        <div className="self-stretch pr-2 text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide overflow-hidden text-ellipsis whitespace-nowrap">
                                            {item.createdBy}
                                        </div>
                                    </div>
                                    <div className="w-[10%] p-2 flex-col justify-start items-start gap-1 inline-flex">
                                        <div className="self-stretch text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide">
                                            {item.state}
                                        </div>
                                    </div>
                                    <div className="w-[18%] p-2 flex-col justify-center items-start gap-1 inline-flex">
                                        <div className="self-stretch justify-start items-start inline-flex">
                                            <div className="grow shrink basis-0 text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide">
                                                {item.county} +Others{" "}
                                                <span className="text-[#7d528b] text-[13px]">
                                                    <Tooltip title="Gila, Maricopa, pima, pinal">
                                                        Show All
                                                    </Tooltip>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[8%] p-2 flex-col justify-start items-start gap-1 inline-flex">
                                        <div className="self-stretch text-[#333333] text-sm text-center font-normal font-['Roboto'] leading-[21px] tracking-wide">
                                            {item.adequacyGaps}
                                        </div>
                                    </div>
                                    <div className="w-[5%] p-2 justify-center items-start gap-1 flex">
                                        <div className="text-center text-[#7d528b] text-[13px] font-bold font-['Roboto'] leading-tight tracking-wide">
                                            Open
                                        </div>
                                        <img src={more_vert} alt="options" className="w-5 h-5" />
                                    </div>
                                    <div
                                        className="flex-col justify-center items-center gap-1 inline-flex cursor-pointer"
                                        onClick={() => {
                                            setIsActivePanel((prev) => (prev === item?.scenarioName ? null : item?.scenarioName))
                                            setBarChartOpen(item?.scenarioName);
                                        }}>
                                        {isActivePanel === item?.scenarioName ? <PanelUp /> : <PanelDown />}
                                    </div>
                                </div>

                                {isActivePanel === item?.scenarioName && barChartOpen.includes(item?.scenarioName) && (
                                    <div className="w-full pl-2 pr-2 pt-2 pb-2">
                                        {/* <Scenariobar /> */}
                                    </div>
                                )}
                            </div>
                        </React.Fragment>
                    ))
                ) : (
                    <div>No data available</div>
                )}
            </div>
        </div>
    );
}

export default ScenarioList;