<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { ref, unref } from 'vue'
import { ElButton, ElDivider, ElRow, ElCol } from 'element-plus'
import { hasPermission } from '@/components/Permission'
import router from '@/router'

const permission = ref('add')

setTimeout(() => {
  console.log(router.currentRoute.value.meta.permission)
  permission.value = 'view'
}, 3000)
</script>

<template>
  <ContentWrap>
    <ElDivider>组件方式判断（已经全局注册，支持动态修改）</ElDivider>
    <ElRow :gutter="20">
      <ElCol :span="8">
        新增权限：
        <Permission permission="add">
          <ElButton type="primary"> Add </ElButton>
        </Permission>
      </ElCol>
      <ElCol :span="8">
        删除权限：
        <Permission permission="delete">
          <ElButton type="danger"> Delete </ElButton>
        </Permission>
      </ElCol>
      <ElCol :span="8">
        3秒后切换查看权限：
        <Permission :permission="permission">
          <ElButton type="primary"> View </ElButton>
        </Permission>
      </ElCol>
    </ElRow>

    <ElDivider>指令方式判断（已经全局注册，不支持动态修改）</ElDivider>
    <ElRow :gutter="20">
      <ElCol :span="8">
        新增权限：
        <ElButton v-permission="'add'" type="primary"> Add </ElButton>
      </ElCol>
      <ElCol :span="8">
        删除权限：
        <ElButton v-permission="'delete'" type="danger"> Delete </ElButton>
      </ElCol>
      <ElCol :span="8">
        3秒后切换查看权限（无法动态修改）：
        <ElButton v-permission="permission" type="primary"> View </ElButton>
      </ElCol>
    </ElRow>

    <ElDivider>函数方式判断</ElDivider>
    <ElRow :gutter="20">
      <ElCol :span="8">
        新增权限：
        <ElButton v-if="hasPermission('add')" type="primary"> Add </ElButton>
      </ElCol>
      <ElCol :span="8">
        删除权限：
        <ElButton v-if="hasPermission('delete')" type="danger"> Delete </ElButton>
      </ElCol>
      <ElCol :span="8">
        3秒后切换查看权限：
        <ElButton v-if="hasPermission(unref(permission))" type="primary"> View </ElButton>
      </ElCol>
    </ElRow>
  </ContentWrap>
</template>
