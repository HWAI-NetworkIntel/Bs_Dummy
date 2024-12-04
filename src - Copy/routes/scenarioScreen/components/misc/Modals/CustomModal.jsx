import React from 'react'
import { Modal } from 'antd'

const CustomModal = ({ title, children, isModalOpen, footer, handleOk, handleCancel, width }) => {
  return (
    <div className="h-auto">
      <Modal
        centered
        title={title}
        open={isModalOpen}
        destroyOnClose={true}
        footer={footer}
        onOk={handleOk}
        onCancel={handleCancel}
        width={width}
        closable={false}
      >
        {children}
      </Modal>
    </div>
  )
}
export default React.memo(CustomModal)
