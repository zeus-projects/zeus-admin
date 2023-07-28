export type SysDept = {
   id: number
   name: string
   parentId: number
   level?: number
   sort?: number
   status?: number
   createBy?: string
   createTime?: Date
   updateBy?: string
   updateTime?: Date
   children?: SysDept[]
}
