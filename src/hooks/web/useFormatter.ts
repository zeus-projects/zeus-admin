import { ElTag } from 'element-plus'
import { h } from 'vue'

export const statusFormatter = (_row: Recordable, _column: Recordable, cellValue: number) => {
   return h(
      ElTag,
      {
         type: cellValue === 0 ? 'success' : 'danger'
      },
      () => (cellValue === 0 ? '启用' : '禁用')
   )
}
