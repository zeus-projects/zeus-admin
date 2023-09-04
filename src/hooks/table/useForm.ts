import type { ElForm } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export type FormOption = {
  formRef?: ComponentRef<typeof ElForm>
}

export interface FormStateProps {
  title: string
  actionType: 'add' | 'edit' | 'view'
  visible: boolean
  loading: boolean
  formData: {
    [key: string]: any[]
  }
  dicts: {
    [key: string]: any[]
  }
}

export const useForm = (config: FormOption) => {
  const { formRef } = config

  const state = reactive<FormStateProps>({
    title: 'Dialog',
    actionType: 'add',
    visible: false,
    loading: false,
    formData: {},
    dicts: {}
  })

  watch(
    () => state.actionType,
    (actionType) => {
      if (actionType === 'add') {
        state.title = t('table.action.add')
      } else if (actionType === 'edit') {
        state.title = t('table.action.edit')
      } else {
        state.title = t('table.action.view')
      }
    }
  )

  const open = (dialogType: 'add' | 'edit' | 'view', row: any) => {
    state.visible = true
    state.loading = true
    unref(formRef)?.resetFields()
    // 在 nextTick 里面，防止 resetFields() 后初始值为第一次赋值后的内容，而非默认值
    state.actionType = dialogType
    nextTick(() => {
      if (dialogType === 'edit') {
        state.title = '编辑'
        Object.assign(state.formData, row)
      } else if (dialogType === 'view') {
        state.title = '查看'
      } else {
        state.title = '新增'
      }
    })
    state.loading = false
  }

  const close = (reset: boolean = true) => {
    if (reset) {
      unref(formRef)?.resetFields()
    }
    state.visible = false
  }

  return {
    state,
    open,
    close
  }
}
