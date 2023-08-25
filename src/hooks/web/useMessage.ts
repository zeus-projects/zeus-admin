import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

interface MessageImplements {
  info(title: string): void
  wraning(title: string): void
  success(title: string): void
  error(title: string): void
}

export function useMessage() {
  class MessageClass implements MessageImplements {
    // 普通提示
    info(title: string): void {
      ElMessage.info(title)
    }

    // 警告提示
    wraning(title: string): void {
      ElMessage.warning(title)
    }

    // 成功提示
    success(title: string): void {
      ElMessage.success(title)
    }

    // 错误提示
    error(title: string): void {
      ElMessage.error(title)
    }
  }

  return new MessageClass()
}

export function useMessageBox() {
  class MessageBoxClass implements MessageImplements {
    // 普通提示
    info(msg: string): void {
      ElMessageBox.alert(msg, t('common.reminder'))
    }

    // 警告提示
    wraning(msg: string): void {
      ElMessageBox.alert(msg, t('common.reminder'), { type: 'warning' })
    }

    // 成功提示
    success(msg: string): void {
      ElMessageBox.alert(msg, t('common.reminder'), { type: 'success' })
    }

    // 错误提示
    error(msg: string): void {
      ElMessageBox.alert(msg, t('common.reminder'), { type: 'error' })
    }

    // 确认窗体
    confirm(msg: string) {
      return ElMessageBox.confirm(msg, t('common.reminder'), {
        confirmButtonText: t('common.ok'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      })
    }
    // 提交内容
    prompt(msg: string) {
      return ElMessageBox.prompt(msg, t('common.reminder'), {
        confirmButtonText: t('common.ok'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      })
    }
  }

  return new MessageBoxClass()
}
