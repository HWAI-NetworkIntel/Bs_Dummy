import React from 'react'
import { BackArrow, Simulate } from '../../../../../common/images/icons'
import { Modal } from 'antd'

const UploadPBP = ({ userId, open, setOpen, data }) => {
  return (
    <Modal open={open} className="p-6" footer={null} width={800} centered closable={false}>
      <div className="w-full h-full ">
        <div className="w-full flex justify-between items-center pb-2 border-b border-[#E9E8E8]">
          <div className="flex gap-x-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M7.87453 0.998752C7.74476 0.652684 7.25524 0.652683 7.12547 0.998751L5.51839 5.2843C5.47782 5.39247 5.39247 5.47782 5.2843 5.51839L0.998752 7.12547C0.652684 7.25524 0.652683 7.74476 0.998751 7.87453L5.2843 9.48161C5.39247 9.52218 5.47782 9.60753 5.51839 9.7157L7.12547 14.0012C7.25524 14.3473 7.74476 14.3473 7.87453 14.0012L9.48161 9.7157C9.52218 9.60753 9.60753 9.52218 9.7157 9.48161L14.0012 7.87453C14.3473 7.74476 14.3473 7.25524 14.0012 7.12547L9.7157 5.51839C9.60753 5.47782 9.52218 5.39247 9.48161 5.2843L7.87453 0.998752Z"
                fill="#5C5C5C"
              />
              <path
                d="M14.1873 10.4994C14.1224 10.3263 13.8776 10.3263 13.8127 10.4994L12.941 12.824C12.9207 12.8781 12.8781 12.9207 12.824 12.941L10.4994 13.8127C10.3263 13.8776 10.3263 14.1224 10.4994 14.1873L12.824 15.059C12.8781 15.0793 12.9207 15.1219 12.941 15.176L13.8127 17.5006C13.8776 17.6737 14.1224 17.6737 14.1873 17.5006L15.059 15.176C15.0793 15.1219 15.1219 15.0793 15.176 15.059L17.5006 14.1873C17.6737 14.1224 17.6737 13.8776 17.5006 13.8127L15.176 12.941C15.1219 12.9207 15.0793 12.8781 15.059 12.824L14.1873 10.4994Z"
                fill="#5C5C5C"
              />
            </svg>
            <p className="text-[#5C5C5C] font-bold">Simulation via Upload</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_1477_12843)">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="#5C5C5C"
                />
              </g>
              <defs>
                <clipPath id="clip0_1477_12843">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="flex justify-between items-center py-3">
          <p className="text-[#7D7D7D] text-xs font-semibold">FILE NAME:</p>
          <p className="text-[#333] text-sm">*Aetna Medicare Premier Plus (PPO) (H5521_272_0)</p>
        </div>
        <div className="flex items-center gap-x-2 h-5">
          <p className="w-12 text-[#7D7D7D] text-xs font-semibold">STEP 1</p>
          <div className="h-[1px] w-full bg-[#E9E8E8]"></div>
        </div>
        <div className="flex justify-between items-center py-2">
          <div className="flex flex-col gap-y-1">
            <div className="h-6 uppercase font-semibold text-[#5C5C5C]">Download PBP File</div>
            <div className="text-[#7D7D7D] text-sm">This file has all the benefit descriptions</div>
          </div>
          <button
            type="button"
            onClick={() => {}}
            className="h-9 w-[104px] flex justify-center items-center gap-x-1 rounded border border-[#DDDDDC]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clipPath="url(#clip0_1477_12862)">
                <path
                  d="M10 13.3334L5.83337 9.16671L7.00004 7.95837L9.16671 10.125V3.33337H10.8334V10.125L13 7.95837L14.1667 9.16671L10 13.3334ZM3.33337 16.6667V12.5H5.00004V15H15V12.5H16.6667V16.6667H3.33337Z"
                  fill="#5C276E"
                />
              </g>
              <defs>
                <clipPath id="clip0_1477_12862">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="text-[#5C276E] font-semibold text-sm">Download</p>
          </button>
        </div>
        <div className="flex items-center gap-x-2 h-5">
          <p className="w-12 text-[#7D7D7D] text-xs font-semibold">STEP 2</p>
          <div className="h-[1px] w-full bg-[#E9E8E8]"></div>
        </div>
        <div className="flex justify-between items-center py-2">
          <div className="flex flex-col gap-y-1">
            <div className="h-6 uppercase font-semibold text-[#5C5C5C]">Download PBP File</div>
            <div className="text-[#7D7D7D] text-sm">This file has all the benefit descriptions</div>
          </div>
        </div>
        <div className="w-full h-[178px] border-dashed border-2 border-[#E9E8E8] rounded flex justify-center items-center">
          <div className="flex justify-center items-center gap-y-2 flex-col">
            <svg className=" cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M14.1667 6.66667L10 2.5M10 2.5L5.83333 6.66667M10 2.5V12.5"
                stroke="#5C5C5C"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[#5C5C5C] text-sm font-normal">
              Drag & Drop or <span className="text-[#7D528B] font-semibold"> Choose a file</span> to upload
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2 text-[#333] text-sm py-2">
          <p className="font-semibold">Please Note: </p>
          <p className=" font-normal">Upload PBP file name should be *H5521_272_0</p>
        </div>
        <div className="h-[1px] w-full bg-[#E9E8E8] mb-2"></div>
        <div className="flex justify-between items-center">
          <div />
          <div className="flex gap-x-2 items-center">
            <button
              className="w-[76px] h-9 rounded bg-white flex pl-1 items-center border-[#DDDDDC] border"
              type="button"
              onClick={() => {
                // navigate('/benefit-simulator/plan-selection/' + userId, {
                //     replace: true,
                // })
                setOpen(false)
              }}
            >
              <BackArrow />
              <p className="text-sm text-[#5C276E]">Back</p>
            </button>
            <button
              // onClick={() => {
              //     simulationHandler()
              // }}
              className="w-[109px] h-9 flex rounded justify-center items-center bg-[#5C276E] "
              type="button"
            >
              <Simulate />
              <p className="text-white pl-2">Simulate</p>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default React.memo(UploadPBP)
