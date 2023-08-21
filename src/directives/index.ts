import type { App } from 'vue'
import { setupPermissionDirective } from './permission'

/**
 * 导出指令：v-permission
 * @methods permission 按钮权限，用法: v-permission
 */
export const setupPermission = (app: App<Element>) => {
  setupPermissionDirective(app)
}
