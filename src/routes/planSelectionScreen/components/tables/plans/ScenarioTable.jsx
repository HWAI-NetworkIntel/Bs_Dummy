// All content, trademarks, and data on this document are the property of Healthworks Analytics, LLC and are protected by applicable intellectual property laws. Unauthorized use, reproduction, or distribution of this material is strictly prohibited.
import React, { useState } from "react";
import { EditOutlined, SaveOutlined } from "@ant-design/icons"; // Import Ant Design icons

import more_vert from "../../../../../common/images/more_vert.svg";
import star from "../../../../../common/icons/Group.svg";
import { Checkbox, Tooltip } from "antd";
import { PanelDown, PanelUp, SortDown, SortUp } from "../../../../../common/icons/icons";
import { DetailsIcon } from '../../../../../common/images/icons'
import Scenariobar from "./Scenariobar";
import ScenarioDetails from "../../../../scenarioScreen/components/misc/ScenarioDetails/ScenarioDetails";


function ScenarioTable(props) {
    const [barChartOpen, setBarChartOpen] = useState([]);
    const [isActivePanel, setIsActivePanel] = useState(null)
    const [editRowId, setEditRowId] = useState(null); // Tracks which row is being edited
    const [editedScenarioName, setEditedScenarioName] = useState(""); // Tracks edited value

    const handleEditClick = (id, currentName) => {
        setEditRowId(id); // Enable edit for the clicked row
        setEditedScenarioName(currentName); // Pre-fill the input with current name
    };

    const handleSaveClick = (id) => {
        // Perform save logic here (e.g., update API or state)
        console.log("Save edited scenario name:", id, editedScenarioName);

        setEditRowId(null); // Exit edit mode
    };

    // const columns = [
    //     { title: "Id", dataIndex: "id", key: "id", align: "left" },
    //     { title: "Scenario Name", dataIndex: "scenarioName", key: "scenarioName", align: "left" },
    //     { title: "Network Type", dataIndex: "networkType", key: "networkType", align: "right" },
    //     { title: "Created On", dataIndex: "createdDate", key: "createdDate", align: "left" },
    //     { title: "Created By", dataIndex: "createdBy", key: "createdBy", align: "left" },
    //     { title: "State", dataIndex: "state", key: "state", align: "left" },
    //     { title: "County", dataIndex: "county", key: "county", align: "right" },
    //     { title: "Adequacy Gaps", dataIndex: "adequacyGaps", key: "adequacyGaps", align: "right" },
    //     { title: "Actions", align: "right" },
    // ];

    let action = 'Details'
    let userid = "4ac058b6-5815-4b2b-a042-323abaa242f48"
    let userName = "rajeev"

    let itemScenario = {
        "ScenarioId": 614,
        "ScenarioName": "test",
        "Description": "-",
        "CreatedBy": "vidushi.chaudhary@teganalytics.com",
        "CreatedDate": "2024-02-26T05:15:54.347Z",
        "ModifiedDate": "2024-02-26T05:15:54.347Z",
        "SharedBy": null,
        "SharedDescription": null,
        "SubmittedBy": null,
        "ScenarioStatusId": 3,
        "Status": "Ready",
        "BidId": {
            "H3388_014_0": {
                "preAEPEnrollment": 6743,
                "postAEPEnrollment": 8548,
                "simulatedResult": 8579,
                "simulatedChangeFromPreAEP": 1836,
                "simulatedChangeFromPostAEP": 31
            }
        }
    }

    let ClientId = "8"

    let email=  'vidushi.chaudhary@teganalytics.com'
    
    let isAllowed = false
    let Card = 0

    const dataSource = [
        {
            id: "#1142",
            scenarioName: `test scenario`,
            networkType: "Existing",
            createdDate: "Nov 22, 2024",
            createdBy: "Rajeev.ranjan@healthworksai.com",
            state: "Arizona",
            county: "Gila, Maricopa",
            adequacyGaps: "61/180",
        },
        {
            id: "#1143",
            scenarioName: "test scenario 1",
            networkType: "Existing",
            createdDate: "Nov 24, 2024",
            createdBy: "rajeev.ranjan@healthworksai.com",
            state: "Arizona",
            county: "Gila, Maricopa",
            adequacyGaps: "76/180",
        },
    ];

    return (
      <div className="grow shrink basis-0  py-2 border border-[#e9e8e8] flex-col justify-start items-start inline-flex">
        <div className="self-stretch justify-start items-center inline-flex">
        <div className="w-[5%] h-[42px] p-2 justify-between items-center flex">
            <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">
              
            </div>
            <div className="flex flex-col items-center">
              <button type="button" className="h-[10px] flex justify-center items-center">
               
              </button>
              <button type="button" className="h-[10px] flex justify-center items-center">
                
              </button>
            </div>
          </div>
          <div className="w-[20%] h-[42px] p-2 justify-between items-center flex">
            <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">
              Scenario Name
            </div>
            <div className="flex flex-col items-center">
              <button type="button" className="h-[10px] flex justify-center items-center">
                <SortUp />
              </button>
              <button type="button" className="h-[10px] flex justify-center items-center">
                <SortDown />
              </button>
            </div>
          </div>

          <div className="w-[15%] h-[42px] p-2 justify-between items-center flex">
            <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">Created On</div>
            <div className="flex flex-col items-center">
              <button type="button" className="h-[10px] flex justify-center items-center">
                <SortUp />
              </button>
              <button type="button" className="h-[10px] flex justify-center items-center">
                <SortDown />
              </button>
            </div>
          </div>
          <div className="w-[15%] h-[42px] p-2 justify-between items-center flex">
            <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">Created By</div>
            <div className="flex flex-col items-center">
              <button type="button" className="h-[10px] flex justify-center items-center">
                <SortUp />
              </button>
              <button type="button" className="h-[10px] flex justify-center items-center">
                <SortDown />
              </button>
            </div>
          </div>
          <div className="w-[15%] h-[42px] p-2 justify-between items-center flex">
            <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">State</div>
            <div className="flex flex-col items-center">
              <button type="button" className="h-[10px] flex justify-center items-center">
                <SortUp />
              </button>
              <button type="button" className="h-[10px] flex justify-center items-center">
                <SortDown />
              </button>
            </div>
          </div>
          <div className="w-[18%] h-[42px] p-2 justify-between items-center flex">
            <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">County</div>
            <div className="flex flex-col items-center">
              <button type="button" className="h-[10px] flex justify-center items-center">
                <SortUp />
              </button>
              <button type="button" className="h-[10px] flex justify-center items-center">
                <SortDown />
              </button>
            </div>
          </div>

          <div className="w-[15%] h-[42px] p-2 justify-start items-center gap-4 flex">
            <div className="text-[#7d7d7d] text-[11px] font-semibold font-['Roboto'] uppercase leading-none tracking-wide">Action</div>
          </div>
          <div className="w-7 h-[42px] bg-white" />
        </div>
        <div className="self-stretch h-px bg-[#7d7d7d]" />
        <div className="h-[470px] overflow-auto w-full">
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <React.Fragment key={item.ScenarioName || index}>
                <div className="self-stretch  pl-1 pr-1 bg-[#f7f7f7] justify-start items-center flex flex-col border border-[#DDDDDc] m-1">
                  {/* Main Row Content */}
                  <div className="w-full flex justify-start items-center">
                  <div className="w-[7%] p-2 flex-col justify-start items-start inline-flex">
                                        <div className="text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide">
                                            <Checkbox id={item.ScenarioName}></Checkbox>
                                           
                                        </div>
                                    </div>
                    <div className="w-[20%] p-2 flex-col justify-start items-start inline-flex">
                      <div className="self-stretch text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide">
                        
                      {editRowId === item.id ? (
                                    // Show input box in edit mode
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            value={editedScenarioName}
                                            onChange={(e) => setEditedScenarioName(e.target.value)}
                                            className="border p-1 w-full"
                                        />
                                        <button
                                            className="ml-2"
                                            onClick={() => handleSaveClick(item.id)}
                                        >
                                            <SaveOutlined />
                                        </button>
                                    </div>
                                ) : (
                                    // Show scenario name and edit button in normal mode
                                    <div className="flex items-center">
                                        <span>{item.scenarioName}</span>
                                        <button
                                            className="ml-2"
                                            onClick={() =>
                                                handleEditClick(item.id, item.scenarioName)
                                            }
                                        >
                                            <EditOutlined />
                                        </button>
                                    </div>
                                )}
                      </div>
                    </div>

                    <div className="w-[15%] p-2 flex-col justify-start items-start gap-1 inline-flex">
                      <div className="self-stretch text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide">
                        {item.createdDate}
                      </div>
                    </div>
                    <div className="w-[15%]  p-2 flex-col justify-start items-start gap-1 inline-flex">
                      <div className="self-stretch pr-2 text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.createdBy}
                      </div>
                    </div>
                    <div className="w-[15%] p-2 flex-col justify-start items-start gap-1 inline-flex">
                      <div className="self-stretch text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide">
                        {item.state}
                      </div>
                    </div>
                    <div className="w-[18%] p-2 flex-col justify-center items-start gap-1 inline-flex">
                      <div className="self-stretch justify-start items-start inline-flex">
                        <div className="grow shrink basis-0 text-[#333333] text-[13px] font-normal font-['Roboto'] leading-tight tracking-wide">
                          {item.county} +Others{' '}
                          <span className="text-[#7d528b] text-[13px]">
                            <Tooltip title="Gila, Maricopa, pima, pinal">Show All</Tooltip>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-[15%] p-2 justify-center items-start gap-1 flex">
                    <DetailsIcon userName={userName} card={0} item={item}  userId={userid} email={email} clientId={ClientId} />

                      <ScenarioDetails
                        action={action}
                        userid={userid}
                        item={itemScenario}
                        ClientId={ClientId}
                        email={email}
                        isAllowed={item?.CreatedBy === email}
                      />
                    </div>
                    <div className="w-4 h-4 relative">
                    <img src={star} alt="options" className="w-5 h-5" />
                    </div>
                    <div
                      className="flex-col justify-center items-center gap-1 inline-flex cursor-pointer"
                      onClick={() => {
                        setIsActivePanel((prev) => (prev === item?.id ? null : item?.id))
                        setBarChartOpen(item?.id)
                      }}
                    >
                      {isActivePanel === item?.id ? <PanelUp /> : <PanelDown />}
                    </div>
                  </div>

                  {isActivePanel === item?.id && barChartOpen.includes(item?.id) && (
                    <div className="w-full pl-2 pr-2 pt-2 pb-2">
                      <Scenariobar />
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
    )
}

export default ScenarioTable;