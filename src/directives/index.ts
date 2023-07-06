import type { App } from 'vue'
import { setupPermissionDirective } from './permission/hasPermission'

/**
 * 导出指令：v-xxx
 * @methods hasPermi 按钮权限，用法: v-permission
 */
export const setupPermission = (app: App<Element>) => {
   setupPermissionDirective(app)
}
