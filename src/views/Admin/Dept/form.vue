<template>
  <el-dialog v-model="visible" :title="formData.id ? $t('table.edit') : $t('table.add')">
    <el-form ref="formRef" v-model="formData" :rules="dataRules" v-loading="loading">
      <el-row :gutter="20">
        <el-col :span="12" class="mb20">
          <el-form-item :label="$t('admin.dept.parentId')" prop="parentId">
            <el-tree-select
              v-model="formData.parentId"
              :data="parentData"
              :props="{ value: 'id', label: 'name', children: 'children' }"
              class="w100"
              clearable
              check-strictly
              :render-after-expand="false"
              :placeholder="$t('admin.dept.parentIdTip')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="mb20">
          <el-form-item :label="$t('admin.dept.name')" prop="name">
            <el-input v-model="formData.name" :placeholder="$t('admin.dept.nameTip')" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="mb20">
          <el-form-item :label="$t('admin.dept.sort')" prop="sort">
            <el-input-number
              v-model="formData.sort"
              :placeholder="$t('admin.dept.sortTip')"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onSubmit" :disabled="loading">
          {{ $t('form.confirm') }}
        </el-button>
        <el-button @click="visible = false">{{ $t('form.cancel') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="tsx">
import {
  ElButton,
  ElInput,
  ElInputNumber,
  ElRow,
  ElCol,
  ElForm,
  ElDialog,
  ElFormItem,
  ElTreeSelect
} from 'element-plus'
import { useI18n } from 'vue-i18n'
import { getDeptTree, save, update, removeById } from '@/api/admin/dept'

const formRef = ref()
const formData = reactive({
  id: '',
  name: '',
  parentId: '',
  status: '',
  sort: 999
})

const parentData = ref<any[]>([])
const visible = ref(false)
const loading = ref(false)

const dataRules = ref({
  parentId: [{ required: true, message: '上级部门不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
  sort: [{ required: true, message: '排序不能为空', trigger: 'blur' }]
})

const emit = defineEmits(['refresh'])
const { t } = useI18n()

const open = (type: string, id: string) => {
  visible.value = true
  formData.deptId = ''

  nextTick(() => {
    formRef.value?.resetFields()
    formData.parentId = id
  })

  if (type === 'edit') {
    getObj(id)
      .then((res) => {
        Object.assign(formData, res.data)
      })
      .catch((err) => {
        useMessage().error(err.msg)
      })
  }

  getDeptData()
}

// 提交
const onSubmit = async () => {
  const valid = await deptDialogFormRef.value.validate().catch(() => {})
  if (!valid) return false

  try {
    loading.value = true
    dataForm.deptId ? await putObj(dataForm) : await addObj(dataForm)
    useMessage().success(t(dataForm.deptId ? 'common.editSuccessText' : 'common.addSuccessText'))
    visible.value = false
    emit('refresh')
  } catch (err: any) {
    useMessage().error(err.msg)
  } finally {
    loading.value = false
  }
}

// 从后端获取菜单信息
const getDeptData = async () => {
  deptTree().then((res) => {
    parentData.value = []
    const dept = {
      id: '0',
      name: '根部门',
      children: [] as any[]
    }
    dept.children = res.data
    parentData.value.push(dept)
  })
}

// 暴露变量
defineExpose({
  open
})
</script>
@/api/admin/dept/dept
