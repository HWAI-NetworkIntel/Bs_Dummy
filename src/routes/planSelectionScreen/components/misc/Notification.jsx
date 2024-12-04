import { notification } from 'antd'

export const openNotification = (() => {
  let notificationShown = false

  return (msg, type) => {
    if (!notificationShown) {
      notificationShown = true
      notification[type]({
        message: msg,
        duration: 2,
        onClose: () => {
          notificationShown = false
        },
      })
    }
  }
})()
