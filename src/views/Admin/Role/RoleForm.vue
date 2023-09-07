<template>
  <Dialog v-model="state.visible" :title="state.title" width="800px">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      v-loading="state.loading"
      label-width="100px"
      shadow="hover"
      v-if="state.visible"
    >
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item :label="$t('admin.role.name')" prop="name">
            <el-input v-model="form.name" :placeholder="$t('admin.role.nameTip')" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('admin.role.code')" prop="code">
            <el-input v-model="form.code" :placeholder="$t('admin.role.codeTip')" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('admin.role.description')" prop="description">
            <el-input
              type="textarea"
              :rows="3"
              maxlength="150"
              show-word-limit
              clearable
              v-model="form.description"
              :placeholder="$t('admin.role.descriptionTip')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('admin.role.dataScopeType')" prop="dataScopeType">
            <el-select v-model="form.dataScopeType" placeholder="请选择">
              <el-option
                v-for="item in dataScopeTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="form.dataScopeType === '1'">
          <el-form-item prop="dataScope">
            <el-tree
              :data="deptTree"
              :default-checked-keys="form.dataScope"
              :props="{ children: 'children', label: 'name' }"
              :placeholder="$t('common.selectText')"
              ref="deptTreeRef"
              show-checkbox
              default-expand-all
              highlight-current
              node-key="id"
              @check="check"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onSubmit()" :disabled="state.loading">
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
  ElSelect,
  ElOption,
  ElInput,
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElTree
} from 'element-plus'
import { Dialog } from '@/components/Dialog'
import { SysRole, updateRoleByIdApi, saveRoleApi } from '@/api/admin/role'
import { SysMenu, getMenuTreeApi } from '@/api/admin/menu'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { SysDept, getDeptTreeApi } from '@/api/admin/dept'

const { t } = useI18n()

const formRef = ref()
const deptTree = ref<SysDept[]>([])
const menuTree = ref<SysMenu[]>([])
// 部门树形菜单
const deptTreeRef = ref()
const form = reactive<SysRole>({
  name: '',
  code: '',
  description: '',
  dataScopeType: '0',
  dataScope: []
})
const state = reactive({
  visible: false,
  loading: false,
  actionType: '',
  title: ''
})
const dataScopeTypeOptions = [
  {
    label: '全部',
    value: '0'
  },
  {
    label: '自定义',
    value: '1'
  },
  {
    label: '本部门及子部门',
    value: '2'
  },
  {
    label: '本部门',
    value: '3'
  },
  {
    label: '仅当前用户',
    value: '4'
  }
]
const dataScopes = computed<number[]>(() => {
  nextTick()
  if (form.dataScopeType === '1') {
    return unref(deptTreeRef).getCheckedKeys()
  } else {
    return []
  }
})
const validateDataScope = (_rule: any, _value: any, callback: any) => {
  if (form.dataScopeType === '1' && unref(dataScopes).length === 0) {
    callback(new Error('请选择数据权限范围'))
  } else {
    callback()
  }
}
const rules = ref({
  name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '角色权限标识不能为空', trigger: 'blur' }],
  dataScopeType: [{ required: true, message: '数据权限不能为空', trigger: 'blur' }],
  dataScope: [{ validator: validateDataScope, trigger: 'blur' }]
})
const check = () => {
  console.log(form.dataScope)
}
// 从后端获取部门信息
const loadDeptTree = async () => {
  if (deptTree.value?.length === 0) {
    await getDeptTreeApi().then((res) => {
      deptTree.value = res.data
    })
  }
}
// 从后端获取菜单信息
const loadMenuTree = async () => {
  if (menuTree.value?.length === 0) {
    await getMenuTreeApi().then((res) => {
      menuTree.value = res.data
    })
  }
}
onMounted(() => {
  loadDeptTree()
  loadMenuTree()
})
watch(
  () => state.actionType,
  (actionType) => {
    if (actionType === 'add') {
      state.title = t('action.add')
    } else if (actionType === 'edit') {
      state.title = t('action.edit')
    } else {
      state.title = t('action.view')
    }
  }
)
const emit = defineEmits(['refresh'])
const open = (dialogType: string, row: any) => {
  state.visible = true
  state.loading = true
  unref(formRef)?.resetFields()
  // 在 nextTick 里面，防止 resetFields() 后初始值为第一次赋值后的内容，而非默认值
  nextTick(() => {
    state.actionType = dialogType
    if (dialogType === 'edit') {
      Object.assign(form, row)
    }
  })
  state.loading = false
}
const close = (clearForm: boolean = true) => {
  console.log('close')
  if (clearForm) {
    unref(formRef)?.resetFields()
  }
  state.visible = false
}
const onSubmit = async () => {
  const valid = await unref(formRef)?.validate()
  if (!valid) {
    return false
  }
  // 处理 dataScope
  nextTick(() => {
    form.dataScope = unref(dataScopes)
    console.log('form data', form)
  })

  try {
    state.loading = true
    if (state.actionType === 'edit') {
      await updateRoleByIdApi(form)
      useMessage().success(t('message.editSuccess'))
    } else if (state.actionType === 'add') {
      await saveRoleApi(form)
      useMessage().success(t('message.addSuccess'))
    }
    unref(formRef)?.resetFields()
    state.visible = false
    emit('refresh')
  } catch (err: any) {
    useMessage().error(err.msg)
  } finally {
    state.loading = false
  }
}
defineExpose({
  open,
  close
})
</script>
