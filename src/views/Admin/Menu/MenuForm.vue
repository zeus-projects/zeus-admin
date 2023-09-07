<template>
  <Dialog v-model="state.visible" :title="state.title" width="800px">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      v-loading="state.loading"
      label-width="100px"
      shadow="hover"
    >
      <el-row :gutter="0">
        <el-col :span="12">
          <el-form-item :label="$t('admin.menu.type')" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio-button label="menu"> {{ $t('admin.menu.menuType') }} </el-radio-button>
              <el-radio-button label="button"> {{ $t('admin.menu.buttonType') }} </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('admin.menu.parentId')" prop="parentId">
            <el-tree-select
              v-model="form.parentId"
              :data="menuTree"
              :props="{ value: 'id', label: 'name', children: 'children' }"
              :placeholder="$t('admin.menu.parentIdTip')"
              :render-after-expand="false"
              style="width: 285px"
              accordion
              check-strictly
              clearable
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item :label="$t('admin.menu.name')" prop="name">
            <el-input v-model="form.name" :placeholder="$t('admin.menu.nameTip')" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="form.type === 'button'">
          <el-form-item :label="$t('admin.menu.permission')" prop="permission">
            <el-input
              v-model="form.permission"
              :placeholder="$t('admin.menu.permissionTip')"
              clearable
            />
          </el-form-item>
        </el-col>

        <el-col :span="24" v-if="form.type === 'menu'">
          <el-form-item :label="$t('admin.menu.path')" prop="path">
            <el-input v-model="form.path" :placeholder="$t('admin.menu.pathTip')" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="24" v-if="form.type === 'menu'">
          <el-form-item :label="$t('admin.menu.icon')" prop="icon">
            <el-input v-model="form.icon" :placeholder="$t('admin.menu.iconTip')" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('admin.menu.sortOrder')" prop="sortOrder">
            <el-input-number
              v-model="form.sortOrder"
              :placeholder="$t('admin.menu.sortTip')"
              controls-position="right"
              :min="0"
              :max="9999"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="form.type === 'menu'">
          <el-form-item :label="$t('admin.menu.hidden')" prop="hidden">
            <el-radio-group v-model="form.hidden">
              <el-radio-button label="0"> {{ $t('status.display') }} </el-radio-button>
              <el-radio-button label="1"> {{ $t('status.hidden') }} </el-radio-button>
            </el-radio-group>
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
  ElRadioGroup,
  ElRadioButton,
  ElInput,
  ElInputNumber,
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElTreeSelect
} from 'element-plus'
import { Dialog } from '@/components/Dialog'
import { SysMenu, getMenuTreeApi, updateMenuByIdApi, saveMenuApi } from '@/api/admin/menu'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'

const { t } = useI18n()

const formRef = ref()
const form = reactive<SysMenu>({
  id: 0,
  type: 'menu',
  name: '',
  parentId: 0,
  permission: '',
  sortOrder: 1,
  icon: '',
  hidden: 0
})
const state = reactive({
  visible: false,
  loading: false,
  actionType: '',
  title: ''
})
const menuTree = ref<SysMenu[]>([])

const rules = ref({
  type: [{ required: true, message: '菜单类型不能为空', trigger: 'blur' }],
  parentId: [{ required: true, message: '上级菜单不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
  path: [{ required: true, message: '菜单路由路径不能为空', trigger: 'blur' }],
  permission: [{ required: true, message: '菜单权限不能为空', trigger: 'blur' }],
  sortOrder: [{ required: true, message: '排序不能为空', trigger: 'blur' }]
})

const emit = defineEmits(['refresh'])

onMounted(() => {
  loadFormDict()
})

// 从后端获取菜单信息
const loadFormDict = async () => {
  if (menuTree.value?.length === 0) {
    await getMenuTreeApi().then((res) => {
      menuTree.value = []
      const rootMenu: SysMenu = {
        id: 0,
        name: t('admin.menu.rootMenu'),
        children: [],
        parentId: -1,
        type: 'menu'
      }
      rootMenu.children = res.data
      menuTree.value.push(rootMenu)
    })
  }
}

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

const open = (dialogType: string, row: any) => {
  state.visible = true
  state.loading = true
  unref(formRef)?.resetFields()
  // 在 nextTick 里面，防止 resetFields() 后初始值为第一次赋值后的内容，而非默认值
  nextTick(() => {
    state.actionType = dialogType
    if (dialogType === 'edit') {
      Object.assign(form, row)
    } else if (row) {
      form.parentId = row.id
    }
  })
  state.loading = false
}

const close = (clearForm: boolean = true) => {
  state.visible = false
  if (clearForm) {
    unref(formRef)?.resetFields()
  }
}

// 提交
const onSubmit = async () => {
  const valid = await unref(formRef)?.validate()
  if (!valid) {
    return false
  }
  try {
    state.loading = true
    if (state.actionType === 'edit') {
      await updateMenuByIdApi(form)
      useMessage().success(t('message.editSuccess'))
    } else if (state.actionType === 'add') {
      await saveMenuApi(form)
      useMessage().success(t('message.addSuccess'))
    }
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
