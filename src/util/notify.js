import { ElNotification } from 'element-plus'

export function notify(message, type, dangerouslyUseHTMLString = false) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000
  })
}

export function notifySuccess(message) {
  notify(message, 'success')
}

export function notifyWarning(message) {
  notify(message, 'warning')
}

export function notifyError(message) {
  notify(message, 'error')
}