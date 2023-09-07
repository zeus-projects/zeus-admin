<template>
  <Dialog
    v-model="visible"
    :title="type === 'edit' ? $t('action.edit') : $t('action.add')"
    width="800px"
  >
    <el-form
      ref="formRef"
      :model="form"
      v-loading="loading"
      :rules="rules"
      label-width="100px"
      label-suffix=":"
      shadow="hover"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('admin.dept.parentId')" prop="parentId">
            <el-tree-select
              v-model="form.parentId"
              :data="parentData"
              :props="{ value: 'id', label: 'name', children: 'children' }"
              :placeholder="$t('admin.dept.parentIdTip')"
              check-strictly
              accordion
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('admin.dept.name')" prop="name">
            <el-input v-model="form.name" :placeholder="$t('admin.dept.nameTip')" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('admin.dept.sortOrder')" prop="sortOrder">
            <el-input-number v-model="form.sortOrder" :placeholder="$t('admin.dept.sortTip')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('admin.dept.status')" prop="status">
            <el-switch
              v-model="form.status"
              :active-text="$t('status.enable')"
              :inactive-text="$t('status.disable')"
              :active-value="0"
              :inactive-value="1"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onSubmit()" :disabled="loading">
          {{ $t('action.confirm') }}
        </el-button>
        <el-button @click="close()">{{ $t('action.cancel') }}</el-button>
      </span>
    </template>
  </Dialog>
</template>
<script setup lang="tsx">
import {
  ElButton,
  ElInput,
  ElInputNumber,
  ElSwitch,
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElTreeSelect
} from 'element-plus'
import { Dialog } from '@/components/Dialog'
import { useI18n } from 'vue-i18n'
import { useMessage } from '@/hooks/web/useMessage'
import { SysDept, getDeptTreeApi, saveDeptApi, updateDeptByIdApi } from '@/api/admin/dept'

const formRef = ref<ComponentRef<typeof ElForm>>()
const form: SysDept = reactive<SysDept>({
  id: -1,
  name: '',
  parentId: 0,
  status: 0,
  sortOrder: 999
})

const parentData = ref<any[]>([])
const visible = ref(false)
const loading = ref(false)
const type = ref('')
const rules = ref({
  parentId: [{ required: true, message: '上级部门不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
  sortOrder: [{ required: true, message: '排序不能为空', trigger: 'blur' }]
})

const emit = defineEmits(['refresh'])
const { t } = useI18n()

onMounted(() => {
  loadFormDict()
})

const open = (dialogType: string, row: any) => {
  visible.value = true
  loading.value = true
  unref(formRef)?.resetFields()
  // 在 nextTick 里面，防止 resetFields() 后初始值为第一次赋值后的内容，而非默认值
  nextTick(() => {
    type.value = dialogType
    if (dialogType === 'edit') {
      Object.assign(form, row)
    } else if (row) {
      form.parentId = row.id
    }
  })
  loading.value = false
}

const close = (clearForm: boolean = true) => {
  visible.value = false
  if (clearForm) {
    unref(formRef)?.resetFields()
  }
}

// 提交
const onSubmit = async () => {
  console.log('[onSubmit] validate')
  const valid = await formRef.value?.validate().catch(() => {})
  if (!valid) {
    return false
  }
  try {
    loading.value = true
    if (type.value === 'edit') {
      await updateDeptByIdApi(form)
      useMessage().success(t('message.editSuccess'))
    } else {
      await saveDeptApi(form)
      useMessage().success(t('message.addSuccess'))
    }
    visible.value = false
    emit('refresh')
  } catch (err: any) {
    useMessage().error(err.msg)
  } finally {
    loading.value = false
  }
}

// 从后端获取菜单信息
const loadFormDict = async () => {
  if (parentData.value?.length === 0) {
    await getDeptTreeApi().then((res) => {
      parentData.value = []
      const dept = {
        id: 0,
        name: t('admin.dept.rootdept'),
        children: [] as any[]
      }
      dept.children = res.data
      parentData.value.push(dept)
    })
  }
}

// 暴露变量
defineExpose({
  open,
  close
})
</script>

<style scoped>
.el-form {
  overflow: hidden;
}
</style>
