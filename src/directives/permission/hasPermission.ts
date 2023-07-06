import type { App, Directive, DirectiveBinding } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useCache } from '@/hooks/web/useCache'
import { intersection } from 'lodash-es'
import { isArray } from '@/utils/is'
import { useAppStoreWithOut } from '@/store/modules/app'

const { t } = useI18n()
const { wsCache } = useCache()
const appStore = useAppStoreWithOut()

// 全部权限
const all_permission = ['*.*.*']

const hasPermission = (value: string | string[]): boolean => {
   // 当前用户具有的权限
   const permissions = wsCache.get(appStore.getUserInfo).permissions as string[]
   // 如果待判断的权限为空，抛出错误
   if (!value) {
      throw new Error(t('permission.hasPermission'))
   }
   // 如果是单个权限，判断当前用户是否具有该单个权限
   if (!isArray(value)) {
      return permissions?.includes(value as string)
   }
   // 如果是多个权限，判断是否含有全部权限
   if (all_permission[0] === permissions[0]) {
      return true
   }
   // 如果是多个权限，且不是全部权限，判断是否含有多个权限中的起码一个权限
   return (intersection(value, permissions) as string[]).length > 0
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
   const value = binding.value
   const flag = hasPermission(value)
   if (!flag) {
      el.parentNode?.removeChild(el)
   }
}

const permiDirective: Directive = {
   mounted
}

export const setupPermissionDirective = (app: App<Element>) => {
   app.directive('permission', permiDirective)
}

export default permiDirective
